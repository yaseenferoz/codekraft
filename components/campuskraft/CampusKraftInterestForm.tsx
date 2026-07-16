"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, RotateCcw } from "lucide-react";

const institutionTypes = ["School", "College", "University", "Coaching Institute", "Training Centre", "Madrasa", "Other"];
const studentCounts = ["Below 250", "250–500", "500–1,000", "1,000–2,500", "2,500–5,000", "Above 5,000"];
const moduleOptions = ["Admissions", "Student Information", "Attendance", "Fees", "Academics", "Communication", "HR & Payroll", "Library", "Transport", "Analytics"];

type FormValues = {
  fullName: string; workEmail: string; phone: string; institutionName: string;
  institutionType: string; city: string; state: string; studentCount: string;
  currentSystem: string; mainChallenge: string; modulesOfInterest: string[];
  preferredContactMethod: string; additionalNotes: string; consent: boolean; website: string;
};

const initialValues: FormValues = {
  fullName: "", workEmail: "", phone: "", institutionName: "", institutionType: "",
  city: "", state: "", studentCount: "", currentSystem: "", mainChallenge: "",
  modulesOfInterest: [], preferredContactMethod: "Email", additionalNotes: "", consent: false, website: "",
};

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  if (values.fullName.trim().length < 2) errors.fullName = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.workEmail)) errors.workEmail = "Enter a valid work email.";
  if (!/^[+\d][\d\s()-]{7,19}$/.test(values.phone)) errors.phone = "Enter a valid phone number.";
  if (values.institutionName.trim().length < 2) errors.institutionName = "Enter your institution name.";
  if (!values.institutionType) errors.institutionType = "Select an institution type.";
  if (!values.city.trim()) errors.city = "Enter your city.";
  if (!values.state.trim()) errors.state = "Enter your state.";
  if (!values.studentCount) errors.studentCount = "Select an approximate student count.";
  if (values.mainChallenge.trim().length < 15) errors.mainChallenge = "Please add a little more detail (at least 15 characters).";
  if (!values.modulesOfInterest.length) errors.modulesOfInterest = "Select at least one module.";
  if (!values.consent) errors.consent = "Consent is required before we can contact you.";
  return errors;
}

export function CampusKraftInterestForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const loadedAt = useRef(0);

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status === "failed") setStatus("idle");
  }

  function toggleModule(module: string) {
    update("modulesOfInterest", values.modulesOfInterest.includes(module)
      ? values.modulesOfInterest.filter((item) => item !== module)
      : [...values.modulesOfInterest, module]);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "sent") return;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstInvalid = event.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }
    setStatus("sending");
    setServerMessage("");
    const response = await fetch("/api/campuskraft-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, formStartedAt: loadedAt.current }),
    }).catch(() => undefined);
    const result = await response?.json().catch(() => null);
    if (response?.ok && result?.ok) {
      setStatus("sent");
      setValues(initialValues);
      return;
    }
    setStatus("failed");
    setServerMessage(result?.message ?? "We could not register your interest right now. Please try again or contact CodeKraft directly.");
  }

  if (status === "sent") {
    return <div className="ck-campus-form-success" role="status"><span><CheckCircle2 size={28} /></span><p>&lt; interest.registered /&gt;</p><h3>Thank you for your interest in CampusKraft.</h3><p>The CodeKraft team will review your requirements and contact you regarding future product updates or discovery discussions.</p><small>Registration does not guarantee early or pilot access.</small></div>;
  }

  return (
    <form className="ck-campus-form" onSubmit={submit} noValidate aria-busy={status === "sending"}>
      <header><span>institution.interest.json</span><strong>Tell us about your institution</strong><small>Required fields are marked *</small></header>
      <div className="ck-campus-honeypot" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => update("website", e.target.value)} /></label></div>
      <Field label="Full Name *" error={errors.fullName}><input autoComplete="name" value={values.fullName} onChange={(e) => update("fullName", e.target.value)} aria-invalid={!!errors.fullName} required /></Field>
      <Field label="Work Email *" error={errors.workEmail}><input type="email" autoComplete="email" value={values.workEmail} onChange={(e) => update("workEmail", e.target.value)} aria-invalid={!!errors.workEmail} required /></Field>
      <Field label="Phone Number *" error={errors.phone}><input type="tel" autoComplete="tel" value={values.phone} onChange={(e) => update("phone", e.target.value)} aria-invalid={!!errors.phone} required /></Field>
      <Field label="Institution Name *" error={errors.institutionName}><input autoComplete="organization" value={values.institutionName} onChange={(e) => update("institutionName", e.target.value)} aria-invalid={!!errors.institutionName} required /></Field>
      <Field label="Institution Type *" error={errors.institutionType}><select value={values.institutionType} onChange={(e) => update("institutionType", e.target.value)} aria-invalid={!!errors.institutionType} required><option value="">Select type</option>{institutionTypes.map((item) => <option key={item}>{item}</option>)}</select></Field>
      <Field label="Approximate Student Count *" error={errors.studentCount}><select value={values.studentCount} onChange={(e) => update("studentCount", e.target.value)} aria-invalid={!!errors.studentCount} required><option value="">Select range</option>{studentCounts.map((item) => <option key={item}>{item}</option>)}</select></Field>
      <Field label="City *" error={errors.city}><input autoComplete="address-level2" value={values.city} onChange={(e) => update("city", e.target.value)} aria-invalid={!!errors.city} required /></Field>
      <Field label="State *" error={errors.state}><input autoComplete="address-level1" value={values.state} onChange={(e) => update("state", e.target.value)} aria-invalid={!!errors.state} required /></Field>
      <Field label="Current System Used"><input placeholder="Spreadsheets, existing ERP, paper…" value={values.currentSystem} onChange={(e) => update("currentSystem", e.target.value)} /></Field>
      <Field label="Preferred Contact Method"><select value={values.preferredContactMethod} onChange={(e) => update("preferredContactMethod", e.target.value)}><option>Email</option><option>Phone</option><option>WhatsApp</option><option>Video call</option></select></Field>
      <Field wide label="Main Operational Challenge *" error={errors.mainChallenge}><textarea rows={4} placeholder="Which workflow creates the most friction today?" value={values.mainChallenge} onChange={(e) => update("mainChallenge", e.target.value)} aria-invalid={!!errors.mainChallenge} required /></Field>
      <fieldset className="ck-campus-module-picks" aria-invalid={!!errors.modulesOfInterest}><legend>Modules of Interest *</legend><div>{moduleOptions.map((item) => <label key={item}><input type="checkbox" checked={values.modulesOfInterest.includes(item)} onChange={() => toggleModule(item)} /><span>{item}</span></label>)}</div>{errors.modulesOfInterest ? <small role="alert">{errors.modulesOfInterest}</small> : null}</fieldset>
      <Field wide label="Additional Notes"><textarea rows={3} placeholder="Anything else that would help our product discovery?" value={values.additionalNotes} onChange={(e) => update("additionalNotes", e.target.value)} /></Field>
      <label className="ck-campus-consent"><input type="checkbox" checked={values.consent} onChange={(e) => update("consent", e.target.checked)} aria-invalid={!!errors.consent} /><span>I consent to CodeKraft using these details to contact me about CampusKraft product research, updates or future discovery discussions. *</span>{errors.consent ? <small role="alert">{errors.consent}</small> : null}</label>
      {status === "failed" ? <p className="ck-campus-form-error" role="alert">{serverMessage}</p> : null}
      <button type="submit" disabled={status === "sending"} aria-live="polite">{status === "sending" ? <>Registering interest <LoaderCircle className="ck-spin" size={17} /></> : status === "failed" ? <>Try again <RotateCcw size={17} /></> : <>Register Interest <ArrowRight size={17} /></>}</button>
      <p className="ck-campus-form-privacy">Your details are used only for CampusKraft product enquiries and discovery communication. See our <a href="/privacy">privacy policy</a>.</p>
    </form>
  );
}

function Field({ label, error, wide, children }: { label: string; error?: string; wide?: boolean; children: React.ReactNode }) {
  return <label className={wide ? "is-wide" : undefined}><span>{label}</span>{children}{error ? <small role="alert">{error}</small> : null}</label>;
}
