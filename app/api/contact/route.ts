type ContactProject = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
};

type LeadSaveResult = {
  saved: boolean;
  configured: boolean;
  message?: string;
  status?: number;
};

type TelegramSendResult = {
  sent: boolean;
  configured: boolean;
  message?: string;
  status?: number;
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildPlainTextEmail(project: ContactProject) {
  return [
    "New CodeKraft project enquiry",
    "",
    `Name: ${project.name}`,
    `Email: ${project.email}`,
    `Phone: ${project.phone || "Not provided"}`,
    `Service: ${project.service || "Not selected"}`,
    `Budget: ${project.budget || "Not selected"}`,
    `Timeline: ${project.timeline || "Not selected"}`,
    "",
    "Message:",
    project.message,
  ].join("\n");
}

function buildTelegramLeadMessage(project: ContactProject) {
  const message = [
    "New CodeKraft contact lead",
    "",
    `Name: ${project.name}`,
    `Email: ${project.email}`,
    `Phone: ${project.phone || "Not provided"}`,
    `Service: ${project.service || "Not selected"}`,
    `Budget: ${project.budget || "Not selected"}`,
    `Timeline: ${project.timeline || "Not selected"}`,
    "",
    "Message:",
    project.message,
  ].join("\n");

  return message.length > 3900 ? `${message.slice(0, 3900)}\n\n...trimmed for Telegram` : message;
}

function buildHtmlEmail(project: ContactProject) {
  const fields = [
    ["Name", project.name],
    ["Email", project.email],
    ["Phone", project.phone || "Not provided"],
    ["Service", project.service || "Not selected"],
    ["Budget", project.budget || "Not selected"],
    ["Timeline", project.timeline || "Not selected"],
  ];

  const fieldRows = fields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:14px 16px;border-bottom:1px solid #17213a;color:#7ddfff;font:700 12px Arial, sans-serif;text-transform:uppercase;letter-spacing:.08em;">${escapeHtml(label)}</td>
          <td style="padding:14px 16px;border-bottom:1px solid #17213a;color:#f8f9fc;font:600 15px Arial, sans-serif;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;background:#050816;padding:32px;font-family:Arial, sans-serif;color:#f8f9fc;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;border:1px solid #243455;border-radius:18px;overflow:hidden;background:#080d1d;">
      <tr>
        <td style="padding:28px 30px;background:linear-gradient(135deg,#0b1230,#101a3d 52%,#111024);border-bottom:1px solid #243455;">
          <div style="font-size:12px;color:#37c9ff;font-weight:800;letter-spacing:.14em;text-transform:uppercase;">CodeKraft Contact Module</div>
          <h1 style="margin:12px 0 0;color:#ffffff;font-size:28px;line-height:1.2;">New project enquiry</h1>
          <p style="margin:10px 0 0;color:#aeb8cc;font-size:15px;line-height:1.6;">A visitor submitted a structured JSON brief from the CodeKraft website.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 30px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #17213a;border-radius:14px;overflow:hidden;background:#060a17;">
            ${fieldRows}
          </table>
          <div style="margin-top:22px;padding:20px;border:1px solid #17213a;border-radius:14px;background:#060a17;">
            <div style="color:#37c9ff;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;">Message</div>
            <p style="margin:12px 0 0;color:#f8f9fc;font-size:16px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(project.message)}</p>
          </div>
          <div style="margin-top:22px;padding:16px 18px;border-radius:12px;background:#0d1730;color:#aeb8cc;font-size:13px;line-height:1.6;">
            Reply directly to this email to contact ${escapeHtml(project.name)} at ${escapeHtml(project.email)}.
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:18px 30px;border-top:1px solid #17213a;color:#6f7d96;font-size:12px;">
          Sent by CodeKraft website • hello@codekraft.co.in
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function saveLead(project: ContactProject, source: string): Promise<LeadSaveResult> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return {
      saved: false,
      configured: false,
      message: "Supabase lead storage is not configured.",
    };
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: project.name,
      email: project.email,
      phone: project.phone ?? "",
      service: project.service ?? "",
      message: project.message,
      source,
    }),
  }).catch(() => null);

  if (!response?.ok) {
    const error = await response?.json().catch(() => null);

    return {
      saved: false,
      configured: true,
      message: error?.message ?? "Supabase could not save this lead.",
      status: response?.status,
    };
  }

  return {
    saved: true,
    configured: true,
  };
}

async function sendTelegramLead(project: ContactProject): Promise<TelegramSendResult> {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  if (!telegramBotToken || !telegramChatId) {
    return {
      sent: false,
      configured: false,
      message: "Telegram lead alerts are not configured.",
    };
  }

  const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: telegramChatId,
      text: buildTelegramLeadMessage(project),
      disable_web_page_preview: true,
    }),
  }).catch(() => null);

  if (!response?.ok) {
    const error = await response?.json().catch(() => null);

    return {
      sent: false,
      configured: true,
      message: error?.description ?? "Telegram could not send this lead.",
      status: response?.status,
    };
  }

  return {
    sent: true,
    configured: true,
  };
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload?.project?.email || !payload?.project?.message) {
    return Response.json(
      { ok: false, message: "Missing required contact payload fields." },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "CodeKraft <onboarding@resend.dev>";
  const deliveryEmail = process.env.RESEND_DELIVERY_EMAIL ?? "hello@codekraft.co.in";
  const project = payload.project as ContactProject;
  const leadStorage = await saveLead(project, payload.source ?? "contact-form");
  const telegramLead = await sendTelegramLead(project);

  if (resendApiKey) {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [deliveryEmail],
        reply_to: project.email,
        subject: `CodeKraft project enquiry from ${project.name}`,
        html: buildHtmlEmail(project),
        text: buildPlainTextEmail(project),
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.json().catch(() => null);

      return Response.json(
        {
          ok: leadStorage.saved,
          mode: leadStorage.saved ? "supabase-only" : "resend-error",
          leadSaved: leadStorage.saved,
          leadTelegramSent: telegramLead.sent,
          leadStorage,
          telegramLead,
          message: leadStorage.saved
            ? `Lead saved in Supabase. Email failed: ${resendError?.message ?? "Resend could not send this message."}`
            : resendError?.message ?? "Resend could not send this message.",
          resendStatus: resendResponse.status,
        },
        { status: leadStorage.saved ? 200 : 502 },
      );
    }

    return Response.json({
      ok: true,
      recipient: deliveryEmail,
      mode: "resend",
      leadSaved: leadStorage.saved,
      leadTelegramSent: telegramLead.sent,
      leadStorage,
      telegramLead,
      message: "Project brief sent to CodeKraft inbox.",
    });
  }

  return Response.json({
    ok: leadStorage.saved,
    recipient: deliveryEmail,
    mode: leadStorage.saved ? "supabase" : "not-configured",
    leadSaved: leadStorage.saved,
    leadTelegramSent: telegramLead.sent,
    leadStorage,
    telegramLead,
    message: leadStorage.saved
      ? "Lead saved in Supabase. Add RESEND_API_KEY to send email automatically too."
      : "Lead storage is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
  });
}
