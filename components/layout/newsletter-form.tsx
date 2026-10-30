"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You're on the list. Watch your inbox.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  const dark = variant === "dark";

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") {
              setStatus("idle");
              setMessage("");
            }
          }}
          placeholder="Your email address"
          className={cn(
            "h-12 w-full rounded-full border px-5 text-sm transition focus:outline-none",
            dark
              ? "border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:border-white/60"
              : "border-border bg-white text-foreground placeholder:text-muted-foreground focus:border-foreground",
          )}
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full px-6 text-[10px] font-semibold uppercase tracking-[0.16em] transition disabled:opacity-60",
            dark
              ? "bg-white text-neutral-950 hover:bg-white/90"
              : "bg-foreground text-background hover:bg-foreground/85",
          )}
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : status === "success" ? (
            <Check className="size-4" />
          ) : (
            <>
              Subscribe
              <ArrowRight className="size-3.5" />
            </>
          )}
        </button>
      </form>

      <p
        aria-live="polite"
        className={cn(
          "mt-2 min-h-4 text-xs",
          status === "error" ? "text-red-400" : dark ? "text-white/50" : "text-muted-foreground",
        )}
      >
        {message || "No spam. Early access, restocks and editorial only."}
      </p>
    </div>
  );
}
