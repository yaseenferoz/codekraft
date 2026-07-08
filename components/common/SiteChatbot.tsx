"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { answerFromSite, type ChatMessage } from "@/lib/site-chat";

export function SiteChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
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

    void submitQuestion(question);
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
          {thinking ? <p className="ck-chat-message is-assistant">Thinking through the CodeKraft docs...</p> : null}
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
