import { NextRequest } from "next/server";
import { siteConfig } from "@/lib/site-config";

type Interest = {
  fullName: string; workEmail: string; phone: string; institutionName: string;
  institutionType: string; city: string; state: string; studentCount: string;
  currentSystem: string; mainChallenge: string; modulesOfInterest: string[];
  preferredContactMethod: string; additionalNotes: string; consent: boolean;
  website?: string; formStartedAt?: number;
};

type DeliveryResult = { ok: boolean; configured: boolean; message?: string };
const institutionTypes = new Set(["School", "College", "University", "Coaching Institute", "Training Centre", "Madrasa", "Other"]);
const studentCounts = new Set(["Below 250", "250–500", "500–1,000", "1,000–2,500", "2,500–5,000", "Above 5,000"]);
const contactMethods = new Set(["Email", "Phone", "WhatsApp", "Video call"]);
const allowedModules = new Set(["Admissions", "Student Information", "Attendance", "Fees", "Academics", "Communication", "HR & Payroll", "Library", "Transport", "Analytics"]);
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, max = 500) {
  return String(value ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}

function escapeHtml(value: unknown) {
  return clean(value, 5000).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function normalize(payload: Partial<Interest>): Interest {
  return {
    fullName: clean(payload.fullName, 120), workEmail: clean(payload.workEmail, 180).toLowerCase(),
    phone: clean(payload.phone, 30), institutionName: clean(payload.institutionName, 180),
    institutionType: clean(payload.institutionType, 40), city: clean(payload.city, 100), state: clean(payload.state, 100),
    studentCount: clean(payload.studentCount, 30), currentSystem: clean(payload.currentSystem, 180),
    mainChallenge: clean(payload.mainChallenge, 2500),
    modulesOfInterest: Array.isArray(payload.modulesOfInterest) ? [...new Set(payload.modulesOfInterest.map((item) => clean(item, 60)).filter((item) => allowedModules.has(item)))].slice(0, 10) : [],
    preferredContactMethod: clean(payload.preferredContactMethod, 30), additionalNotes: clean(payload.additionalNotes, 2500),
    consent: payload.consent === true, website: clean(payload.website, 200),
    formStartedAt: typeof payload.formStartedAt === "number" ? payload.formStartedAt : undefined,
  };
}

function validate(item: Interest) {
  if (item.fullName.length < 2 || item.institutionName.length < 2) return "Please provide your name and institution name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.workEmail)) return "Please provide a valid work email.";
  if (!/^[+\d][\d\s()-]{7,19}$/.test(item.phone)) return "Please provide a valid phone number.";
  if (!institutionTypes.has(item.institutionType) || !studentCounts.has(item.studentCount)) return "Please select valid institution details.";
  if (!item.city || !item.state || item.mainChallenge.length < 15) return "Please complete the institution location and operational challenge.";
  if (!item.modulesOfInterest.length || !contactMethods.has(item.preferredContactMethod)) return "Please select modules and a preferred contact method.";
  if (!item.consent) return "Consent is required before CodeKraft can contact you.";
  return null;
}

function checkRateLimit(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || request.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const existing = rateLimit.get(key);
  if (!existing || existing.resetAt <= now) {
    rateLimit.set(key, { count: 1, resetAt: now + 15 * 60_000 });
    return false;
  }
  existing.count += 1;
  return existing.count > 5;
}

async function saveInterest(item: Interest): Promise<DeliveryResult> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { ok: false, configured: false, message: "Database storage is not configured." };
  const response = await fetch(`${url}/rest/v1/campuskraft_interests`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      full_name: item.fullName, work_email: item.workEmail, phone: item.phone,
      institution_name: item.institutionName, institution_type: item.institutionType,
      city: item.city, state: item.state, student_count: item.studentCount,
      current_system: item.currentSystem, main_challenge: item.mainChallenge,
      modules_of_interest: item.modulesOfInterest, preferred_contact_method: item.preferredContactMethod,
      additional_notes: item.additionalNotes, consent: item.consent,
      source: "campuskraft-product-page", status: "new",
    }),
  }).catch(() => null);
  if (!response?.ok) {
    const error = await response?.json().catch(() => null);
    return { ok: false, configured: true, message: error?.message ?? "Database storage failed." };
  }
  return { ok: true, configured: true };
}

function emailText(item: Interest) {
  return [`New CampusKraft institutional interest`, ``, `Name: ${item.fullName}`, `Work email: ${item.workEmail}`, `Phone: ${item.phone}`, `Institution: ${item.institutionName}`, `Type: ${item.institutionType}`, `Location: ${item.city}, ${item.state}`, `Student count: ${item.studentCount}`, `Current system: ${item.currentSystem || "Not provided"}`, `Preferred contact: ${item.preferredContactMethod}`, `Modules: ${item.modulesOfInterest.join(", ")}`, ``, `Main operational challenge:`, item.mainChallenge, ``, `Additional notes:`, item.additionalNotes || "Not provided", ``, `Consent recorded: Yes`, `Source: campuskraft-product-page`].join("\n");
}

function emailHtml(item: Interest) {
  const rows = [["Name", item.fullName], ["Work email", item.workEmail], ["Phone", item.phone], ["Institution", item.institutionName], ["Institution type", item.institutionType], ["Location", `${item.city}, ${item.state}`], ["Student count", item.studentCount], ["Current system", item.currentSystem || "Not provided"], ["Preferred contact", item.preferredContactMethod], ["Modules", item.modulesOfInterest.join(", ")]];
  return `<!doctype html><html><body style="margin:0;padding:28px;background:#050816;color:#f8f9fc;font-family:Arial,sans-serif"><table role="presentation" width="100%" style="max-width:700px;margin:auto;border:1px solid #243455;border-radius:18px;background:#080d1d;overflow:hidden"><tr><td style="padding:28px;background:linear-gradient(135deg,#0b1230,#101a3d)"><div style="color:#37c9ff;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase">CampusKraft · Early Interest</div><h1 style="margin:10px 0 6px;font-size:26px">New institutional enquiry</h1><p style="margin:0;color:#aeb8cc">A prospective institution has shared product discovery details.</p></td></tr><tr><td style="padding:26px"><table role="presentation" width="100%" cellspacing="0">${rows.map(([label, value]) => `<tr><td style="padding:11px;border-bottom:1px solid #17213a;color:#7ddfff;font-size:12px;font-weight:bold;text-transform:uppercase">${escapeHtml(label)}</td><td style="padding:11px;border-bottom:1px solid #17213a;color:#f8f9fc">${escapeHtml(value)}</td></tr>`).join("")}</table><div style="margin-top:20px;padding:18px;border:1px solid #17213a;border-radius:12px"><strong style="color:#37c9ff">Main operational challenge</strong><p style="white-space:pre-wrap;line-height:1.65">${escapeHtml(item.mainChallenge)}</p></div><div style="margin-top:14px;padding:18px;border:1px solid #17213a;border-radius:12px"><strong style="color:#37c9ff">Additional notes</strong><p style="white-space:pre-wrap;line-height:1.65">${escapeHtml(item.additionalNotes || "Not provided")}</p></div><p style="color:#7f8ba3;font-size:12px">Consent recorded · Source: campuskraft-product-page · Status: new</p></td></tr></table></body></html>`;
}

async function sendEmail(item: Interest): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, configured: false, message: "Email delivery is not configured." };
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL ?? "CodeKraft <onboarding@resend.dev>",
      to: [process.env.RESEND_DELIVERY_EMAIL ?? siteConfig.contactEmail],
      reply_to: item.workEmail,
      subject: `New CampusKraft Institutional Interest — ${item.institutionName}`,
      html: emailHtml(item), text: emailText(item),
    }),
  }).catch(() => null);
  if (!response?.ok) {
    const error = await response?.json().catch(() => null);
    return { ok: false, configured: true, message: error?.message ?? "Email delivery failed." };
  }
  return { ok: true, configured: true };
}

export async function POST(request: NextRequest) {
  if (checkRateLimit(request)) return Response.json({ ok: false, message: "Too many attempts. Please try again later." }, { status: 429, headers: { "Retry-After": "900" } });
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 30_000) return Response.json({ ok: false, message: "Submission is too large." }, { status: 413 });
  const payload = await request.json().catch(() => null) as Partial<Interest> | null;
  if (!payload) return Response.json({ ok: false, message: "Invalid request payload." }, { status: 400 });
  if (payload.website) return Response.json({ ok: true, message: "Interest registered." });
  if (!payload.formStartedAt || Date.now() - payload.formStartedAt < 1500) return Response.json({ ok: false, message: "Please review the form before submitting." }, { status: 400 });
  const item = normalize(payload);
  const validationError = validate(item);
  if (validationError) return Response.json({ ok: false, message: validationError }, { status: 400 });
  const [storage, email] = await Promise.all([saveInterest(item), sendEmail(item)]);
  if (!storage.ok && !email.ok) {
    console.error("CampusKraft interest delivery failed", { storage: storage.message, email: email.message });
    return Response.json({ ok: false, message: `We could not register your interest right now. Please contact ${siteConfig.contactEmail}.` }, { status: 503 });
  }
  if (!storage.ok || !email.ok) console.warn("CampusKraft interest partially delivered", { storage: storage.message, email: email.message });
  return Response.json({ ok: true, stored: storage.ok, notified: email.ok, message: "Institutional interest registered." });
}
