"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, Braces, Check, ChevronDown, LoaderCircle, RotateCcw } from "lucide-react";

const publicRecipient = "yaseenferoz@codekraft.co.in";

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

type SelectFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function ContactSelect({ label, value, options, onChange }: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`ck-contact-select ${open ? "is-open" : ""}`}>
      <span>{label}</span>
      <button
        type="button"
        className="ck-contact-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
      >
        <span>{value}</span>
        <ChevronDown size={16} />
      </button>
      {open ? (
        <div className="ck-contact-select-menu" role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={option === value}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              <span>{option}</span>
              {option === value ? <Check size={14} /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

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
    if (submitState === "failed" || submitState === "sent") {
      setSubmitState("idle");
    }
  }

  function getButtonContent() {
    if (submitState === "sending") {
      return (
        <>
          sending enquiry
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

    if (submitState === "sent") {
      return (
        <>
          enquiry received
          <Check size={17} />
        </>
      );
    }

    return (
      <>
        Send Enquiry
        <ArrowRight size={17} />
      </>
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
        <ContactSelect
          label="service"
          value={form.service}
          options={["Website / Web App", "E-Commerce", "ERP / Business System", "UI/UX Design", "Maintenance"]}
          onChange={(value) => update("service", value)}
        />
        <ContactSelect
          label="timeline"
          value={form.timeline}
          options={["Flexible", "2-4 weeks", "1-2 months", "Urgent"]}
          onChange={(value) => update("timeline", value)}
        />
        <ContactSelect
          label="budget"
          value={form.budget}
          options={["Let's discuss", "Starter", "Growth", "Custom system"]}
          onChange={(value) => update("budget", value)}
        />
        <label className="ck-json-message">
          <span>message</span>
          <textarea value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="What are we building?" required />
        </label>
        <div className="ck-contact-form-actions">
          <button
            type="submit"
            className={`ck-contact-send is-${submitState}`}
            disabled={submitState === "sending" || submitState === "sent"}
            aria-live="polite"
          >
            {getButtonContent()}
          </button>
        </div>
        {submitState === "failed" ? (
          <p className="ck-contact-form-error" role="alert">
            We could not send your enquiry right now. Please try again or email {publicRecipient}.
          </p>
        ) : null}
      </div>

      <div className="ck-json-preview">
        <div className="ck-contact-terminal-top">
          <span>
            <Braces size={16} />
            project-brief.json
          </span>
          <small>contact.module</small>
        </div>
        {submitState === "sent" ? (
          <section className="ck-json-success" aria-live="polite">
            <span>
              <Check size={19} />
            </span>
            <p>&lt; brief.sent /&gt;</p>
            <h2>Thank You for Contacting CodeKraft</h2>
            <small>Your enquiry has been received. We will review the details and respond as soon as possible at the contact information you provided.</small>
          </section>
        ) : (
          <pre>{JSON.stringify(previewPayload, null, 2)}</pre>
        )}
      </div>
    </form>
  );
}
