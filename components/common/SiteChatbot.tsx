"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Bot, Send, X } from "lucide-react";
import { answerFromSite, type ChatMessage } from "@/lib/site-chat";

export function SiteChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [usedSuggestions, setUsedSuggestions] = useState<string[]>([]);
  const feedRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "CodeKraft AI online. Tell me what you want to build and I can suggest a solution, capture your brief, and help the team follow up.",
    },
  ]);

  const suggestedQuestions = useMemo(() => {
    const recentText = messages
      .slice(-4)
      .map((message) => message.text)
      .join(" ")
      .toLowerCase();

    let suggestions = ["I need a website", "Estimate my project", "Talk to CodeKraft"];

    if (recentText.includes("website") || recentText.includes("web app")) {
      suggestions = ["What pages do I need?", "How long will it take?", "What budget range fits?"];
    } else if (recentText.includes("budget") || recentText.includes("estimate") || recentText.includes("cost")) {
      suggestions = ["What affects the price?", "Can we phase the build?", "Start WhatsApp chat"];
    } else if (recentText.includes("process") || recentText.includes("timeline") || recentText.includes("how long")) {
      suggestions = ["What happens first?", "How do you handle QA?", "What after launch?"];
    } else if (recentText.includes("portfolio") || recentText.includes("client") || recentText.includes("work")) {
      suggestions = ["Show service options", "Which work is similar?", "Start a project brief"];
    } else if (recentText.includes("contact") || recentText.includes("phone") || recentText.includes("email")) {
      suggestions = ["Open contact form", "Start WhatsApp chat", "What details are needed?"];
    }

    return suggestions.filter((suggestion) => !usedSuggestions.includes(suggestion)).slice(0, 3);
  }, [messages, usedSuggestions]);

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

  async function requestAnswer(question: string, nextMessages: ChatMessage[]) {
    setThinking(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-8) }),
      });
      const result = await response.json().catch(() => null);
      return typeof result?.answer === "string" ? result.answer : answerFromSite(question);
    } catch {
      return answerFromSite(question);
    } finally {
      setThinking(false);
    }
  }

  async function submitQuestion(question: string) {
    const nextMessages = [...messages, { role: "user" as const, text: question }];
    setMessages(nextMessages);
    const answer = await requestAnswer(question, nextMessages);
    setMessages((current) => [...current, { role: "assistant", text: answer }]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const question = input.trim();

    if (!question || thinking) {
      return;
    }

    setInput("");
    void submitQuestion(question);
  }

  function ask(question: string) {
    if (thinking) {
      return;
    }

    setUsedSuggestions((current) => [...current, question]);
    void submitQuestion(question);
  }

  return (
    <div
      className={`ck-chatbot ${open ? "is-open" : ""}`}
      style={
        {
          position: "fixed",
          right: "max(1rem, env(safe-area-inset-right))",
          bottom: "max(1rem, env(safe-area-inset-bottom))",
          left: "auto",
          top: "auto",
          zIndex: 2147483000,
          transform: "none",
          pointerEvents: "none",
        } as CSSProperties
      }
    >
      <button
        type="button"
        className="ck-chatbot-fab"
        aria-label="Open CodeKraft assistant"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
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
          {thinking ? <p className="ck-chat-message is-assistant">Thinking through the CodeKraft docs...</p> : null}
        </div>

        {suggestedQuestions.length ? (
          <div className="ck-chat-suggestions">
            {suggestedQuestions.map((question) => (
              <button key={question} type="button" onClick={() => ask(question)}>
                {question}
              </button>
            ))}
          </div>
        ) : null}

        <form className="ck-chatbot-input" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Describe your project, budget, or question..."
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
