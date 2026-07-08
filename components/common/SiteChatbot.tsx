"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { clientProjects } from "@/lib/client-projects";
import { processSteps, services, siteKnowledge } from "@/lib/site-modules";

type Message = {
  role: "assistant" | "user";
  text: string;
};

function answerFromSite(question: string) {
  const input = question.toLowerCase();
  const serviceMatch = services.find((service) => input.includes(service.title.toLowerCase().split(" ")[0]));
  const projectMatch = clientProjects.find((project) => input.includes(project.name.toLowerCase()));
  const greetingMatch = /^(hi|hello|hey|yo|namaste|salam|good morning|good afternoon|good evening)\b/.test(input);
  const thanksMatch = /\b(thanks|thank you|nice|great|cool|awesome)\b/.test(input);

  if (greetingMatch) {
    return "Hey, welcome to CodeKraft. I am the tiny studio brain in this corner. Ask me about websites, apps, ERP, AI, cloud, clients, process, or how to start a project.";
  }

  if (thanksMatch) {
    return "Anytime. I run on caffeine-flavored pixels and CodeKraft context. What are we building next?";
  }

  if (projectMatch) {
    return `${projectMatch.name} is one of our ${projectMatch.category} client modules. Focus areas: ${projectMatch.services.join(", ")}. ${projectMatch.summary}`;
  }

  if (input.includes("ai") || input.includes("chatbot") || input.includes("automation") || input.includes("agent")) {
    return "For AI work, CodeKraft can add practical layers like website assistants, enquiry triage, content helpers, smart search, workflow automation, and internal copilots. The useful version is not magic dust; it connects to your real content, forms, data, and business rules.";
  }

  if (input.includes("database") || input.includes("db") || input.includes("data") || input.includes("backend") || input.includes("api")) {
    return "For data-heavy products, we plan the database first: users, roles, tables, relations, files, reports, and API contracts. Then the UI talks to a clean backend instead of turning into a very expensive spreadsheet cosplay.";
  }

  if (input.includes("cloud") || input.includes("deploy") || input.includes("hosting") || input.includes("server")) {
    return "Cloud delivery usually includes deployment, domain setup, environment variables, backups, monitoring, performance checks, and a release path. We want launch day to feel boring in the best possible way.";
  }

  if (input.includes("mobile") || input.includes("android") || input.includes("ios")) {
    return "For mobile, we start with the product flow: login, roles, data screens, forms, notifications, offline needs, and API behavior. Depending on the need, we can build responsive web apps or plan a native-ready mobile architecture.";
  }

  if (input.includes("price") || input.includes("cost") || input.includes("budget") || input.includes("charge")) {
    return "Pricing depends on scope: website, web app, e-commerce, ERP, AI layer, cloud setup, and support needs. Best next step: send a brief through the contact module and we can map a sensible phase-one build.";
  }

  if (input.includes("timeline") || input.includes("time") || input.includes("how long")) {
    return "Timelines depend on complexity. A focused website can move faster; a web app, ERP, mobile app, database, or AI workflow needs discovery, design, build, QA, and launch. CodeKraft prefers clear phases over heroic chaos.";
  }

  if (
    serviceMatch ||
    input.includes("service") ||
    input.includes("build") ||
    input.includes("what do you do") ||
    input.includes("what you do") ||
    input.includes("provide") ||
    input.includes("offer") ||
    input.includes("website") ||
    input.includes("app") ||
    input.includes("erp") ||
    input.includes("ecommerce") ||
    input.includes("e-commerce")
  ) {
    const service = serviceMatch ?? services[0];
    return `CodeKraft builds ${services.map((item) => item.title).join(", ")}. For ${service.title}: ${service.detail}`;
  }

  if (input.includes("process") || input.includes("step") || input.includes("how")) {
    return `Our process is ${processSteps.map((step) => step.title).join(" -> ")}. We start by mapping goals, users, content, database needs, and workflows. Then we design the interface, build frontend/backend, connect cloud and AI layers when needed, test, deploy, and support. Dramatic music optional. QA required.`;
  }

  if (input.includes("contact") || input.includes("phone") || input.includes("email") || input.includes("call")) {
    return "You can contact CodeKraft at hello@codekraft.co.in or call +91 80730 49854. The contact module also sends a structured JSON brief, because apparently even forms deserve a little engineering dignity.";
  }

  if (input.includes("client") || input.includes("portfolio") || input.includes("work")) {
    return `CodeKraft client modules include ${clientProjects.map((project) => project.name).join(", ")}. Open the work module for project links and details.`;
  }

  if (input.includes("about") || input.includes("codekraft")) {
    return siteKnowledge[0] + " " + siteKnowledge[3];
  }

  return "I do not want to invent fake facts, my tiny circuits have standards. Ask me about CodeKraft services, process, database/backend, mobile apps, cloud, AI, client work, pricing direction, or contact details.";
}

export function SiteChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const feedRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "CodeKraft assistant online. Ask about services, process, client work, or how to contact us.",
    },
  ]);

  const suggestedQuestions = useMemo(
    () => ["What services do you offer?", "What is your process?", "Show client work", "How can I contact CodeKraft?"],
    [],
  );

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }

    window.addEventListener("ck:open-chat", handleOpen);
    return () => window.removeEventListener("ck:open-chat", handleOpen);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    feedRef.current?.scrollTo({
      top: feedRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const question = input.trim();

    if (!question) {
      return;
    }

    setMessages((current) => [
      ...current,
      { role: "user", text: question },
      { role: "assistant", text: answerFromSite(question) },
    ]);
    setInput("");
  }

  function ask(question: string) {
    setMessages((current) => [
      ...current,
      { role: "user", text: question },
      { role: "assistant", text: answerFromSite(question) },
    ]);
  }

  return (
    <div className={`ck-chatbot ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="ck-chatbot-fab"
        aria-label="Open CodeKraft assistant"
        onClick={() => setOpen(true)}
      >
        <Bot size={19} />
      </button>

      <section className="ck-chatbot-panel" aria-label="CodeKraft website assistant">
        <div className="ck-chatbot-top">
          <div>
            <Bot size={18} />
            <span>codekraft.ai</span>
          </div>
          <button type="button" aria-label="Close assistant" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="ck-chatbot-feed" ref={feedRef}>
          {messages.map((message, index) => (
            <p key={`${message.role}-${index}`} className={`ck-chat-message is-${message.role}`}>
              {message.text}
            </p>
          ))}
        </div>

        <div className="ck-chat-suggestions">
          {suggestedQuestions.map((question) => (
            <button key={question} type="button" onClick={() => ask(question)}>
              {question}
            </button>
          ))}
        </div>

        <form className="ck-chatbot-input" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask from this website only..."
            aria-label="Ask CodeKraft assistant"
          />
          <button type="submit" aria-label="Send message">
            <Send size={17} />
          </button>
        </form>
      </section>
    </div>
  );
}
