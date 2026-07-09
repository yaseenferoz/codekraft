"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, Braces, Check, LoaderCircle, RotateCcw } from "lucide-react";

const publicRecipient = "hello@codekraft.co.in";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "Website / Web App",
  budget: "Let's discuss",
  timeline: "Flexible",
  message: "",
};

type SubmitState = "idle" | "sending" | "sent" | "failed";

export function JsonContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const previewPayload = useMemo(
    () => ({
      to: publicRecipient,
      source: "codekraft.contact.module",
      project: {
        name: form.name || "Your Name",
        email: form.email || "your@email.com",
        phone: form.phone || "+91...",
        service: form.service,
        budget: form.budget,
        timeline: form.timeline,
        message: form.message || "Tell us about the idea, problem, or product.",
      },
    }),
    [form],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("sending");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(previewPayload),
    }).catch(() => undefined);

    const result = await response?.json().catch(() => null);

    if (response?.ok && (result?.mode === "resend" || result?.leadSaved)) {
      setSubmitState("sent");
      setForm(initialForm);
      return;
    }

    setSubmitState("failed");
  }

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    if (submitState === "failed") {
      setSubmitState("idle");
    }
  }

  function getButtonContent() {
    if (submitState === "sending") {
      return (
        <>
          sending brief
          <LoaderCircle size={17} className="ck-spin" />
        </>
      );
    }

    if (submitState === "failed") {
      return (
        <>
          failed - try again
          <RotateCcw size={17} />
        </>
      );
    }

    return (
      <>
        send JSON brief
        <ArrowRight size={17} />
      </>
    );
  }

  if (submitState === "sent") {
    return (
      <section className="ck-json-success" aria-live="polite">
        <span>
          <Check size={19} />
        </span>
        <p>&lt; brief.sent /&gt;</p>
        <h2>Project brief delivered.</h2>
        <small>
          CodeKraft received your details. This contact module will stay closed
          until the page is refreshed.
        </small>
      </section>
    );
  }

  return (
    <form className="ck-json-form" onSubmit={handleSubmit}>
      <div className="ck-json-form-fields">
        <label>
          <span>name</span>
          <input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" required />
        </label>
        <label>
          <span>email</span>
          <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@company.com" required />
        </label>
        <label>
          <span>phone</span>
          <input value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+91 80730 49854" />
        </label>
        <label>
          <span>service</span>
          <select value={form.service} onChange={(event) => update("service", event.target.value)}>
            <option>Website / Web App</option>
            <option>E-Commerce</option>
            <option>ERP / Business System</option>
            <option>UI/UX Design</option>
            <option>Maintenance</option>
          </select>
        </label>
        <label>
          <span>timeline</span>
          <select value={form.timeline} onChange={(event) => update("timeline", event.target.value)}>
            <option>Flexible</option>
            <option>2-4 weeks</option>
            <option>1-2 months</option>
            <option>Urgent</option>
          </select>
        </label>
        <label>
          <span>budget</span>
          <select value={form.budget} onChange={(event) => update("budget", event.target.value)}>
            <option>Let&apos;s discuss</option>
            <option>Starter</option>
            <option>Growth</option>
            <option>Custom system</option>
          </select>
        </label>
        <label className="ck-json-message">
          <span>message</span>
          <textarea value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="What are we building?" required />
        </label>
      </div>

      <div className="ck-json-preview">
        <div className="ck-contact-terminal-top">
          <span>
            <Braces size={16} />
            project-brief.json
          </span>
          <small>contact.module</small>
        </div>
        <pre>{JSON.stringify(previewPayload, null, 2)}</pre>
        <button
          type="submit"
          className={`ck-contact-send is-${submitState}`}
          disabled={submitState === "sending"}
          aria-live="polite"
        >
          {getButtonContent()}
        </button>
      </div>
    </form>
  );
}
