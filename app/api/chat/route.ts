import { answerFromSite, buildSiteContext, type ChatMessage } from "@/lib/site-chat";

type ChatLead = {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  requirements: string;
  message: string;
  source: "chatbot";
};

type ChatLeadSaveResult = {
  detected: boolean;
  saved: boolean;
  configured: boolean;
  hasContact: boolean;
  message?: string;
  status?: number;
};

type ChatLeadEmailResult = {
  sent: boolean;
  configured: boolean;
  message?: string;
  status?: number;
};

type ChatLeadTelegramResult = {
  sent: boolean;
  configured: boolean;
  message?: string;
  status?: number;
};

const systemPrompt = `You are CodeKraft AI, the website assistant for CodeKraft.

Rules:
- Answer only using the CodeKraft website context provided below.
- If the user asks outside this context, politely say you can help with CodeKraft services, process, portfolio, contact, team, AI, cloud, mobile, or project planning.
- Do not invent pricing, guarantees, unavailable screenshots, private details, or unsupported claims.
- Act like a calm sales assistant, not a passive FAQ bot.
- When the visitor describes a project, estimate the best-fit solution lane from CodeKraft services and explain what CodeKraft would likely build.
- Collect lead details naturally: name, phone, email, budget, timeline, and requirements. Ask for only one or two missing details at a time.
- If the visitor already shared contact details, acknowledge that CodeKraft can follow up.
- Do not give exact prices. If budget is unclear, ask for an approximate range.
- Be warm, concise, and natural. Avoid repeating the same template answer.
- Use light humor only when it helps. No long jokes.
- Prefer practical next steps.
- Keep most answers under 90 words unless the user asks for detail.

${buildSiteContext()}`;

function detectService(message: string) {
  const input = message.toLowerCase();

  if (input.includes("ecommerce") || input.includes("e-commerce") || input.includes("store")) {
    return "E-Commerce";
  }

  if (input.includes("erp") || input.includes("inventory") || input.includes("business system")) {
    return "ERP / Business System";
  }

  if (input.includes("ui") || input.includes("ux") || input.includes("design")) {
    return "UI/UX Design";
  }

  if (input.includes("maintenance") || input.includes("support")) {
    return "Maintenance";
  }

  if (input.includes("mobile") || input.includes("app")) {
    return "Web / Mobile Application";
  }

  if (input.includes("website") || input.includes("web")) {
    return "Website / Web App";
  }

  return "Chatbot enquiry";
}

function hasLeadIntent(message: string) {
  const input = message.toLowerCase();
  const hasIntentVerb =
    /\b(i|we)\s+(need|want|would like|am looking for|are looking for|plan to|have)\b/.test(input) ||
    /\b(build|create|develop|make|quote|proposal|hire|contact me|call me|talk to|estimate)\b/.test(input);
  const hasServiceNeed = /\b(website|web app|mobile app|ecommerce|e-commerce|erp|business system|cms|ai|cloud)\b/.test(
    input,
  );

  return hasIntentVerb || (hasServiceNeed && /\b(project|need|want|build|create|develop|estimate)\b/.test(input));
}

function extractBudget(message: string) {
  const budgetLabel = message.match(
    /(?:budget|cost|range)\s*(?:is|:|-)?\s*([^\n.]{2,70})(?:\.|\n|$)/i,
  )?.[1];

  if (budgetLabel) {
    return budgetLabel.trim();
  }

  return (
    message.match(/(?:₹|rs\.?|inr)\s*[\d,]+(?:\s*(?:-|to)\s*(?:₹|rs\.?|inr)?\s*[\d,]+)?/i)?.[0]?.trim() ??
    ""
  );
}

function formatConversation(messages: ChatMessage[]) {
  return messages
    .map((message) => `${message.role === "user" ? "Visitor" : "CodeKraft AI"}: ${message.text}`)
    .join("\n\n");
}

function buildLeadRecordMessage(lead: ChatLead, messages: ChatMessage[]) {
  return [
    "CodeKraft chatbot sales brief",
    "",
    `Requirements: ${lead.requirements || "Not provided"}`,
    `Budget: ${lead.budget || "Not provided"}`,
    "",
    "Conversation:",
    formatConversation(messages),
  ].join("\n");
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function extractChatLead(messages: ChatMessage[]): ChatLead | null {
  const userMessages = messages.filter((message) => message.role === "user").map((message) => message.text);
  const transcript = userMessages.join("\n");
  const latestMessage = userMessages.at(-1) ?? "";
  const email = transcript.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? "";
  const phone = transcript.match(/(?:\+?91[\s-]?)?[6-9]\d{9}\b/)?.[0] ?? "";

  if (!email && !phone && !hasLeadIntent(transcript)) {
    return null;
  }

  const name =
    transcript.match(/(?:my name is|i am|i'm|this is)\s+([a-zA-Z][a-zA-Z\s]{1,40})/i)?.[1]?.trim() ??
    "Chatbot visitor";

  return {
    name,
    email,
    phone,
    service: detectService(transcript),
    budget: extractBudget(transcript),
    requirements: latestMessage || transcript,
    message: "",
    source: "chatbot",
  };
}

async function saveChatLead(lead: ChatLead | null, messages: ChatMessage[]): Promise<ChatLeadSaveResult> {
  if (!lead) {
    return {
      detected: false,
      saved: false,
      configured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
      hasContact: false,
      message: "No project intent, email, or phone number detected in the chat message.",
    };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return {
      detected: true,
      saved: false,
      configured: false,
      hasContact: Boolean(lead.email || lead.phone),
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
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      service: lead.service,
      message: buildLeadRecordMessage(lead, messages),
      source: lead.source,
    }),
  }).catch(() => null);

  if (!response?.ok) {
    const error = await response?.json().catch(() => null);

    return {
      detected: true,
      saved: false,
      configured: true,
      hasContact: Boolean(lead.email || lead.phone),
      message: error?.message ?? "Supabase could not save this chatbot lead.",
      status: response?.status,
    };
  }

  return {
    detected: true,
    saved: true,
    configured: true,
    hasContact: Boolean(lead.email || lead.phone),
  };
}

function buildChatLeadPlainTextEmail(lead: ChatLead, messages: ChatMessage[]) {
  return [
    "New CodeKraft chatbot lead",
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email || "Not provided"}`,
    `Phone: ${lead.phone || "Not provided"}`,
    `Service: ${lead.service}`,
    `Budget: ${lead.budget || "Not provided"}`,
    "",
    "Requirements:",
    lead.requirements || "Not provided",
    "",
    "Conversation:",
    formatConversation(messages),
  ].join("\n");
}

function buildChatLeadTelegramMessage(lead: ChatLead, messages: ChatMessage[]) {
  const conversation = formatConversation(messages);
  const message = [
    "New CodeKraft chatbot lead",
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email || "Not provided"}`,
    `Phone: ${lead.phone || "Not provided"}`,
    `Service: ${lead.service}`,
    `Budget: ${lead.budget || "Not provided"}`,
    "",
    "Requirements:",
    lead.requirements || "Not provided",
    "",
    "Conversation:",
    conversation,
  ].join("\n");

  return message.length > 3900 ? `${message.slice(0, 3900)}\n\n...trimmed for Telegram` : message;
}

function buildChatLeadHtmlEmail(lead: ChatLead, messages: ChatMessage[]) {
  const fields = [
    ["Name", lead.name],
    ["Email", lead.email || "Not provided"],
    ["Phone", lead.phone || "Not provided"],
    ["Service", lead.service],
    ["Budget", lead.budget || "Not provided"],
  ];

  const fieldRows = fields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:13px 15px;border-bottom:1px solid #17213a;color:#7ddfff;font:700 12px Arial, sans-serif;text-transform:uppercase;letter-spacing:.08em;">${escapeHtml(label)}</td>
          <td style="padding:13px 15px;border-bottom:1px solid #17213a;color:#f8f9fc;font:600 15px Arial, sans-serif;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join("");

  const conversation = messages
    .map(
      (message) => `
        <div style="margin-top:12px;padding:14px;border:1px solid #17213a;border-radius:12px;background:${message.role === "user" ? "#101232" : "#061526"};">
          <div style="color:#37c9ff;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;">${message.role === "user" ? "Visitor" : "CodeKraft AI"}</div>
          <div style="margin-top:8px;color:#f8f9fc;font-size:15px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(message.text)}</div>
        </div>
      `,
    )
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;background:#050816;padding:32px;font-family:Arial, sans-serif;color:#f8f9fc;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;margin:0 auto;border:1px solid #243455;border-radius:18px;overflow:hidden;background:#080d1d;">
      <tr>
        <td style="padding:28px 30px;background:linear-gradient(135deg,#0b1230,#101a3d 52%,#111024);border-bottom:1px solid #243455;">
          <div style="font-size:12px;color:#37c9ff;font-weight:800;letter-spacing:.14em;text-transform:uppercase;">CodeKraft AI Sales Assistant</div>
          <h1 style="margin:12px 0 0;color:#ffffff;font-size:28px;line-height:1.2;">New chatbot lead</h1>
          <p style="margin:10px 0 0;color:#aeb8cc;font-size:15px;line-height:1.6;">A visitor shared project intent through the CodeKraft assistant.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 30px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #17213a;border-radius:14px;overflow:hidden;background:#060a17;">
            ${fieldRows}
          </table>
          <div style="margin-top:22px;padding:20px;border:1px solid #17213a;border-radius:14px;background:#060a17;">
            <div style="color:#37c9ff;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;">Requirements</div>
            <p style="margin:12px 0 0;color:#f8f9fc;font-size:16px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(lead.requirements || "Not provided")}</p>
          </div>
          <div style="margin-top:22px;">
            <div style="color:#37c9ff;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;">Conversation</div>
            ${conversation}
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:18px 30px;border-top:1px solid #17213a;color:#6f7d96;font-size:12px;">
          Sent by CodeKraft AI assistant - hello@codekraft.co.in
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function emailChatLead(lead: ChatLead | null, messages: ChatMessage[]): Promise<ChatLeadEmailResult> {
  if (!lead) {
    return {
      sent: false,
      configured: Boolean(process.env.RESEND_API_KEY),
      message: "No chatbot lead detected.",
    };
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return {
      sent: false,
      configured: false,
      message: "Resend is not configured.",
    };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "CodeKraft <onboarding@resend.dev>";
  const deliveryEmail = process.env.RESEND_DELIVERY_EMAIL ?? "hello@codekraft.co.in";
  const subjectName = lead.name && lead.name !== "Chatbot visitor" ? ` from ${lead.name}` : "";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [deliveryEmail],
      reply_to: lead.email || deliveryEmail,
      subject: `CodeKraft chatbot lead${subjectName} - ${lead.service}`,
      html: buildChatLeadHtmlEmail(lead, messages),
      text: buildChatLeadPlainTextEmail(lead, messages),
    }),
  }).catch(() => null);

  if (!response?.ok) {
    const error = await response?.json().catch(() => null);

    return {
      sent: false,
      configured: true,
      message: error?.message ?? "Resend could not email this chatbot lead.",
      status: response?.status,
    };
  }

  return {
    sent: true,
    configured: true,
  };
}

async function telegramChatLead(
  lead: ChatLead | null,
  messages: ChatMessage[],
): Promise<ChatLeadTelegramResult> {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  if (!lead) {
    return {
      sent: false,
      configured: Boolean(telegramBotToken && telegramChatId),
      message: "No chatbot lead detected.",
    };
  }

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
      text: buildChatLeadTelegramMessage(lead, messages),
      disable_web_page_preview: true,
    }),
  }).catch(() => null);

  if (!response?.ok) {
    const error = await response?.json().catch(() => null);

    return {
      sent: false,
      configured: true,
      message: error?.description ?? "Telegram could not send this chatbot lead.",
      status: response?.status,
    };
  }

  return {
    sent: true,
    configured: true,
  };
}

function withLeadNote(answer: string, leadStorage: ChatLeadSaveResult) {
  if (!leadStorage.saved) {
    return answer;
  }

  if (leadStorage.hasContact) {
    return `${answer}\n\nI saved your details as a CodeKraft chatbot lead.`;
  }

  return `${answer}\n\nI saved this as a CodeKraft chatbot lead. Share your email or phone number when you want us to follow up.`;
}

function extractOpenAiText(data: unknown) {
  if (
    typeof data === "object" &&
    data !== null &&
    "output_text" in data &&
    typeof data.output_text === "string"
  ) {
    return data.output_text.trim();
  }

  return "";
}

function extractGeminiText(data: unknown) {
  if (typeof data !== "object" || data === null || !("candidates" in data) || !Array.isArray(data.candidates)) {
    return "";
  }

  const [candidate] = data.candidates;

  if (
    typeof candidate !== "object" ||
    candidate === null ||
    !("content" in candidate) ||
    typeof candidate.content !== "object" ||
    candidate.content === null ||
    !("parts" in candidate.content) ||
    !Array.isArray(candidate.content.parts)
  ) {
    return "";
  }

  return candidate.content.parts
    .map((part: unknown) => {
      if (typeof part === "object" && part !== null && "text" in part && typeof part.text === "string") {
        return part.text;
      }

      return "";
    })
    .join("")
    .trim();
}

async function askGemini(messages: ChatMessage[]) {
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!geminiApiKey) {
    return "";
  }

  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const conversation = messages.slice(-8).map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.text }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": geminiApiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: conversation,
        generationConfig: {
          temperature: 0.55,
          maxOutputTokens: 260,
        },
      }),
    },
  ).catch(() => null);

  if (!response?.ok) {
    return "";
  }

  const data = await response.json().catch(() => null);
  return extractGeminiText(data);
}

async function askOpenAi(messages: ChatMessage[]) {
  const openAiApiKey = process.env.OPENAI_API_KEY;

  if (!openAiApiKey) {
    return "";
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
  const conversation = messages.slice(-8).map((message) => ({
    role: message.role,
    content: message.text,
  }));

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAiApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...conversation,
      ],
      temperature: 0.55,
      max_output_tokens: 260,
    }),
  }).catch(() => null);

  if (!response?.ok) {
    return "";
  }

  const data = await response.json().catch(() => null);
  return extractOpenAiText(data);
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const messages = Array.isArray(payload?.messages) ? (payload.messages as ChatMessage[]) : [];
  const latestQuestion = [...messages].reverse().find((message) => message.role === "user")?.text?.trim();

  if (!latestQuestion) {
    return Response.json(
      { ok: false, answer: "Ask me something about CodeKraft and I will help." },
      { status: 400 },
    );
  }

  const lead = extractChatLead(messages);
  const leadStorage = await saveChatLead(lead, messages);
  const geminiAnswer = await askGemini(messages);

  if (geminiAnswer) {
    const finalMessages = [...messages, { role: "assistant" as const, text: geminiAnswer }];
    const leadEmail = leadStorage.saved
      ? await emailChatLead(lead, finalMessages)
      : { sent: false, configured: Boolean(process.env.RESEND_API_KEY), message: "Lead was not saved." };
    const leadTelegram = leadStorage.saved
      ? await telegramChatLead(lead, finalMessages)
      : { sent: false, configured: Boolean(process.env.TELEGRAM_BOT_TOKEN), message: "Lead was not saved." };

    return Response.json({
      ok: true,
      mode: "gemini",
      leadDetected: leadStorage.detected,
      leadSaved: leadStorage.saved,
      leadEmailSent: leadEmail.sent,
      leadTelegramSent: leadTelegram.sent,
      leadEmail,
      leadTelegram,
      leadStorage,
      answer: withLeadNote(geminiAnswer, leadStorage),
    });
  }

  const openAiAnswer = await askOpenAi(messages);

  if (openAiAnswer) {
    const finalMessages = [...messages, { role: "assistant" as const, text: openAiAnswer }];
    const leadEmail = leadStorage.saved
      ? await emailChatLead(lead, finalMessages)
      : { sent: false, configured: Boolean(process.env.RESEND_API_KEY), message: "Lead was not saved." };
    const leadTelegram = leadStorage.saved
      ? await telegramChatLead(lead, finalMessages)
      : { sent: false, configured: Boolean(process.env.TELEGRAM_BOT_TOKEN), message: "Lead was not saved." };

    return Response.json({
      ok: true,
      mode: "openai",
      leadDetected: leadStorage.detected,
      leadSaved: leadStorage.saved,
      leadEmailSent: leadEmail.sent,
      leadTelegramSent: leadTelegram.sent,
      leadEmail,
      leadTelegram,
      leadStorage,
      answer: withLeadNote(openAiAnswer, leadStorage),
    });
  }

  const localAnswer = answerFromSite(latestQuestion);
  const finalMessages = [...messages, { role: "assistant" as const, text: localAnswer }];
  const leadEmail = leadStorage.saved
    ? await emailChatLead(lead, finalMessages)
    : { sent: false, configured: Boolean(process.env.RESEND_API_KEY), message: "Lead was not saved." };
  const leadTelegram = leadStorage.saved
    ? await telegramChatLead(lead, finalMessages)
    : { sent: false, configured: Boolean(process.env.TELEGRAM_BOT_TOKEN), message: "Lead was not saved." };

  return Response.json({
    ok: true,
    mode: "local",
    leadDetected: leadStorage.detected,
    leadSaved: leadStorage.saved,
    leadEmailSent: leadEmail.sent,
    leadTelegramSent: leadTelegram.sent,
    leadEmail,
    leadTelegram,
    leadStorage,
    answer: withLeadNote(localAnswer, leadStorage),
  });
}
