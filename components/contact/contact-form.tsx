"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldError, inputClass, labelClass, selectClass, textareaClass } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const subjects = [
  "Order support",
  "Sizing & fit",
  "Returns & exchanges",
  "Delivery question",
  "Wholesale & stockists",
  "Press & collaborations",
  "Something else",
];

const initialForm: FormState = {
  name: "",
  email: "",
  subject: subjects[0],
  message: "",
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (form.message.trim().length < 10) {
    errors.message = "Tell us a little more so we can help (at least 10 characters).";
  }
  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
    if (status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setFeedback("Please check the highlighted fields.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    const website = new FormData(event.currentTarget).get("website");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: typeof website === "string" ? website : "" }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setFeedback(data.error ?? "We could not send your message. Please try again.");
        return;
      }

      setStatus("sent");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again or email us directly.");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[28rem] flex-col items-center justify-center rounded-3xl border border-border bg-white p-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-8" />
        </div>
        <h2 className="mt-5 text-2xl font-black tracking-[-0.03em]">Message sent.</h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out. A member of the Haven team will get back to you within one
          working day.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setFeedback("");
          }}
          className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground underline underline-offset-4 transition hover:text-foreground"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-border bg-white p-5 shadow-sm sm:p-7"
    >
      <h2 className="text-2xl font-black tracking-[-0.03em]">Send a message</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Fill in the form and we&apos;ll get back to you within one working day.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Your name
          </label>
          <input
            id="contact-name"
            autoComplete="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={cn(inputClass, errors.name && "border-red-500 focus:border-red-500")}
            placeholder="First and last name"
            aria-invalid={Boolean(errors.name)}
          />
          <FieldError message={errors.name} />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email address
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={cn(inputClass, errors.email && "border-red-500 focus:border-red-500")}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
          />
          <FieldError message={errors.email} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-subject" className={labelClass}>
            What can we help with?
          </label>
          <select
            id="contact-subject"
            value={form.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            className={selectClass}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={labelClass}>
            Message
          </label>
          <textarea
            id="contact-message"
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            className={cn(textareaClass, errors.message && "border-red-500 focus:border-red-500")}
            placeholder="Tell us a little more — order number, size, or the piece you're asking about."
            aria-invalid={Boolean(errors.message)}
          />
          <FieldError message={errors.message} />
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div aria-live="polite" className="mt-4 min-h-4">
        {feedback ? <p className="text-xs font-medium text-red-600">{feedback}</p> : null}
      </div>

      <Button type="submit" size="lg" className="mt-2 w-full" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send className="size-4" />
          </>
        )}
      </Button>

      <p className="mt-3 text-center text-[10px] leading-relaxed text-muted-foreground">
        By sending this message you agree to our privacy policy. We never share your details.
      </p>
    </form>
  );
}
