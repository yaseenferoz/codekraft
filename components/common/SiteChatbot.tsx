"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
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

  if (greetingMatch) {
    return "Hello. I am the CodeKraft website assistant. I can help with our services, process, client work, contact details, and project enquiry flow.";
  }

  if (projectMatch) {
    return `${projectMatch.name} is listed as a ${projectMatch.category} client module. Work focus: ${projectMatch.services.join(", ")}. ${projectMatch.summary}`;
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
    return `CodeKraft offers ${services.map((item) => item.title).join(", ")}. For ${service.title}: ${service.detail}`;
  }

  if (input.includes("process") || input.includes("step") || input.includes("how")) {
    return `CodeKraft follows ${processSteps.map((step) => step.title).join(" -> ")}. Each phase produces a clear artifact, from scope mapping to growth support.`;
  }

  if (input.includes("contact") || input.includes("phone") || input.includes("email") || input.includes("call")) {
    return "You can contact CodeKraft at hello@codekraft.co.in or call +91 80730 49854.";
  }

  if (input.includes("client") || input.includes("portfolio") || input.includes("work")) {
    return `CodeKraft client modules include ${clientProjects.map((project) => project.name).join(", ")}. Open the work module for project links and details.`;
  }

  if (input.includes("about") || input.includes("codekraft")) {
    return siteKnowledge[0] + " " + siteKnowledge[3];
  }

  return "I can answer using only the content available inside this CodeKraft website: services, process, client work, contact details, and studio information.";
}

export function SiteChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
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

        <div className="ck-chatbot-feed">
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
