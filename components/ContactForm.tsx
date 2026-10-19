"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { CONTACT_SERVICE_OPTIONS } from "@/lib/services";
import { INQUIRY_TYPES, LIMITS, type FieldErrors, type InquiryType } from "@/lib/contact-schema";
import { SITE } from "@/lib/site";

const INQUIRY_LABELS: Record<InquiryType, string> = {
  "free-review": "Free security review",
  "custom-quote": "Custom assessment quote",
  "general-inquiry": "General service inquiry",
};

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const ids = {
    inquiry: useId(),
    name: useId(),
    email: useId(),
    company: useId(),
    website: useId(),
    service: useId(),
    message: useId(),
    authorized: useId(),
    summary: useId(),
  };
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState("");
  const [inquiryType, setInquiryType] = useState<InquiryType>("free-review");

  // Move focus to the error summary so keyboard and screen reader users hear what went wrong.
  useEffect(() => {
    if (status === "error") document.getElementById(ids.summary)?.focus();
  }, [status, ids.summary]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      inquiryType,
      fullName: String(data.get("fullName") ?? ""),
      businessEmail: String(data.get("businessEmail") ?? ""),
      company: String(data.get("company") ?? ""),
      website: String(data.get("website") ?? ""),
      serviceOfInterest: String(data.get("serviceOfInterest") ?? ""),
      message: String(data.get("message") ?? ""),
      authorized: data.get("authorized") === "on",
      website_confirm: String(data.get("website_confirm") ?? ""),
    };

    setStatus("submitting");
    setErrors({});
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string; fields?: FieldErrors };

      if (response.ok) {
        setStatus("success");
        form.reset();
        setInquiryType("free-review");
        return;
      }

      setErrors(body.fields ?? {});
      setServerMessage(body.error ?? `Something went wrong. Please email ${SITE.email}.`);
      setStatus("error");
    } catch {
      setServerMessage(`We could not reach the server. Check your connection, or email ${SITE.email}.`);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-line p-8 md:p-12">
        <p className="eyebrow">Received</p>
        <h2 className="display mt-4 text-4xl">Thank you. <em>We will reply personally.</em></h2>
        <p className="mt-6 max-w-xl text-muted">
          Requests are reviewed manually by our team. We will reply to the business email you provided. Active testing
          never starts from a form submission alone.
        </p>
      </div>
    );
  }

  const fieldError = (key: keyof FieldErrors, id: string) =>
    errors[key] ? (
      <p id={`${id}-error`} className="mt-2 text-sm text-accent">
        {errors[key]}
      </p>
    ) : null;

  const inputClass =
    "mt-2 w-full border-b border-line bg-transparent py-3 text-base outline-none transition-colors focus:border-accent aria-[invalid=true]:border-accent";

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={serverMessage ? ids.summary : undefined} className="space-y-10">
      {serverMessage && (
        <div id={ids.summary} role="alert" tabIndex={-1} className="border border-accent p-4 text-sm text-accent focus:outline-none">
          {serverMessage}
        </div>
      )}

      <fieldset>
        <legend className="eyebrow mb-4">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {INQUIRY_TYPES.map((type) => (
            <label
              key={type}
              className={`cursor-pointer border px-4 py-3 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
                inquiryType === type ? "border-accent text-accent" : "border-line text-muted hover:text-ink"
              }`}
            >
              <input
                type="radio"
                name="inquiryType"
                value={type}
                checked={inquiryType === type}
                onChange={() => setInquiryType(type)}
                className="sr-only"
              />
              {INQUIRY_LABELS[type]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className="eyebrow">Full name</label>
          <input
            id={ids.name}
            name="fullName"
            autoComplete="name"
            maxLength={LIMITS.fullName}
            required
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? `${ids.name}-error` : undefined}
            className={inputClass}
          />
          {fieldError("fullName", ids.name)}
        </div>
        <div>
          <label htmlFor={ids.email} className="eyebrow">Business email</label>
          <input
            id={ids.email}
            name="businessEmail"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.businessEmail}
            required
            aria-invalid={Boolean(errors.businessEmail)}
            aria-describedby={errors.businessEmail ? `${ids.email}-error` : undefined}
            className={inputClass}
          />
          {fieldError("businessEmail", ids.email)}
        </div>
        <div>
          <label htmlFor={ids.company} className="eyebrow">Company</label>
          <input
            id={ids.company}
            name="company"
            autoComplete="organization"
            maxLength={LIMITS.company}
            required
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? `${ids.company}-error` : undefined}
            className={inputClass}
          />
          {fieldError("company", ids.company)}
        </div>
        <div>
          <label htmlFor={ids.website} className="eyebrow">Website (optional)</label>
          <input
            id={ids.website}
            name="website"
            type="url"
            inputMode="url"
            placeholder="https://"
            autoComplete="url"
            maxLength={LIMITS.website}
            aria-invalid={Boolean(errors.website)}
            aria-describedby={errors.website ? `${ids.website}-error` : undefined}
            className={inputClass}
          />
          {fieldError("website", ids.website)}
        </div>
      </div>

      <div>
        <label htmlFor={ids.service} className="eyebrow">Service of interest</label>
        <select
          id={ids.service}
          name="serviceOfInterest"
          required
          defaultValue=""
          aria-invalid={Boolean(errors.serviceOfInterest)}
          aria-describedby={errors.serviceOfInterest ? `${ids.service}-error` : undefined}
          className={`${inputClass} appearance-none bg-paper pr-8`}
        >
          <option value="" disabled>
            Select a service
          </option>
          {CONTACT_SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {fieldError("serviceOfInterest", ids.service)}
      </div>

      <div>
        <label htmlFor={ids.message} className="eyebrow">Message</label>
        <textarea
          id={ids.message}
          name="message"
          rows={6}
          maxLength={LIMITS.message}
          required
          minLength={LIMITS.messageMin}
          placeholder="What are you building, what should be tested, and what would help most?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={`${ids.message}-hint${errors.message ? ` ${ids.message}-error` : ""}`}
          className={`${inputClass} resize-y`}
        />
        <p id={`${ids.message}-hint`} className="mt-2 text-xs text-muted">
          Please do not include passwords, API keys or other secrets. We will ask for access details only after scope is agreed.
        </p>
        {fieldError("message", ids.message)}
      </div>

      <div>
        <div className="flex items-start gap-4">
          <input
            id={ids.authorized}
            name="authorized"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.authorized)}
            aria-describedby={errors.authorized ? `${ids.authorized}-error` : undefined}
            className="mt-1 size-5 shrink-0 accent-[var(--c-accent)]"
          />
          <label htmlFor={ids.authorized} className="text-sm text-muted">
            I confirm that I am authorized to request security testing of the systems I describe, and I understand that no
            active testing will take place until the scope has been agreed in writing.
          </label>
        </div>
        {fieldError("authorized", ids.authorized)}
      </div>

      {/* Honeypot: hidden from people and assistive technology. Bots tend to fill it in. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor={`${ids.website}-confirm`}>Leave this field empty</label>
        <input id={`${ids.website}-confirm`} name="website_confirm" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs text-muted">
          Requests are reviewed manually. We do not share your details with third parties. See our{" "}
          <a href="/privacy" className="underline underline-offset-4 hover:text-accent">
            Privacy Policy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-3 bg-inverse-bg px-8 py-4 text-sm text-inverse-text transition-colors hover:bg-accent hover:text-paper disabled:cursor-wait disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send Request"} <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
