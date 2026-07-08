import { answerFromSite, buildSiteContext, type ChatMessage } from "@/lib/site-chat";

type ChatLead = {
  name: string;
  email: string;
  phone: string;
  service: string;
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

const systemPrompt = `You are CodeKraft AI, the website assistant for CodeKraft.

Rules:
- Answer only using the CodeKraft website context provided below.
- If the user asks outside this context, politely say you can help with CodeKraft services, process, portfolio, contact, team, AI, cloud, mobile, or project planning.
- Do not invent pricing, guarantees, unavailable screenshots, private details, or unsupported claims.
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
  const intentPatterns = [
    "i need",
    "i want",
    "we need",
    "we want",
    "build",
    "create",
    "develop",
    "make",
    "project",
    "quote",
    "proposal",
    "hire",
    "contact me",
    "call me",
    "website",
    "web app",
    "mobile app",
    "ecommerce",
    "e-commerce",
    "erp",
    "business system",
  ];

  return intentPatterns.some((pattern) => input.includes(pattern));
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
    message: latestMessage || transcript,
    source: "chatbot",
  };
}

async function saveChatLead(lead: ChatLead | null): Promise<ChatLeadSaveResult> {
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
    body: JSON.stringify(lead),
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

  const leadStorage = await saveChatLead(extractChatLead(messages));
  const geminiAnswer = await askGemini(messages);

  if (geminiAnswer) {
    return Response.json({
      ok: true,
      mode: "gemini",
      leadDetected: leadStorage.detected,
      leadSaved: leadStorage.saved,
      leadStorage,
      answer: withLeadNote(geminiAnswer, leadStorage),
    });
  }

  const openAiAnswer = await askOpenAi(messages);

  if (openAiAnswer) {
    return Response.json({
      ok: true,
      mode: "openai",
      leadDetected: leadStorage.detected,
      leadSaved: leadStorage.saved,
      leadStorage,
      answer: withLeadNote(openAiAnswer, leadStorage),
    });
  }

  return Response.json({
    ok: true,
    mode: "local",
    leadDetected: leadStorage.detected,
    leadSaved: leadStorage.saved,
    leadStorage,
    answer: withLeadNote(answerFromSite(latestQuestion), leadStorage),
  });
}
