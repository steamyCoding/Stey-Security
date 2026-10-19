import { CONTACT_SERVICE_OPTIONS } from "./services";

export const INQUIRY_TYPES = [
  "free-review",
  "custom-quote",
  "general-inquiry",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export type ContactInput = {
  inquiryType: InquiryType;
  fullName: string;
  businessEmail: string;
  company: string;
  website: string;
  serviceOfInterest: string;
  message: string;
  authorized: boolean;
};

export type FieldErrors = Partial<Record<keyof ContactInput | "form", string>>;

export const LIMITS = {
  fullName: 120,
  businessEmail: 254,
  company: 160,
  website: 300,
  message: 4000,
  messageMin: 20,
} as const;

// Pragmatic address shape check. Real deliverability is confirmed by a human reply.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Free-mail providers are not rejected: some founders legitimately use them.
// This only checks that the value is a well-formed http(s) URL with a host.
function isValidWebsite(value: string): boolean {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && url.hostname.length > 0;
  } catch {
    return false;
  }
}

const stripControl = (value: unknown): string =>
  typeof value === "string" ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim() : "";

/**
 * Server-side validation. Client-side checks are only a convenience.
 * Returns either normalised input or field-level errors (no internal details).
 */
export function validateContact(raw: unknown): { ok: true; data: ContactInput } | { ok: false; errors: FieldErrors } {
  const body = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const errors: FieldErrors = {};

  const inquiryType = INQUIRY_TYPES.find((t) => t === body.inquiryType);
  if (!inquiryType) errors.inquiryType = "Choose what you need help with.";

  const fullName = stripControl(body.fullName);
  if (!fullName) errors.fullName = "Enter your full name.";
  else if (fullName.length > LIMITS.fullName) errors.fullName = `Keep it under ${LIMITS.fullName} characters.`;

  const businessEmail = stripControl(body.businessEmail);
  if (!businessEmail) errors.businessEmail = "Enter your business email.";
  else if (businessEmail.length > LIMITS.businessEmail || !EMAIL_RE.test(businessEmail))
    errors.businessEmail = "Enter a valid email address.";

  const company = stripControl(body.company);
  if (!company) errors.company = "Enter your company name.";
  else if (company.length > LIMITS.company) errors.company = `Keep it under ${LIMITS.company} characters.`;

  const website = stripControl(body.website);
  if (website && (website.length > LIMITS.website || !isValidWebsite(website)))
    errors.website = "Enter a full address starting with https://, or leave this empty.";

  const serviceOfInterest = stripControl(body.serviceOfInterest);
  if (!(CONTACT_SERVICE_OPTIONS as readonly string[]).includes(serviceOfInterest))
    errors.serviceOfInterest = "Choose a service, or select 'Not sure yet'.";

  const message = stripControl(body.message);
  if (message.length < LIMITS.messageMin) errors.message = `Tell us a little more (at least ${LIMITS.messageMin} characters).`;
  else if (message.length > LIMITS.message) errors.message = `Keep it under ${LIMITS.message} characters.`;

  if (body.authorized !== true) errors.authorized = "You must confirm authorization before we can process this request.";

  if (Object.keys(errors).length > 0 || !inquiryType) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      inquiryType,
      fullName,
      businessEmail,
      company,
      website,
      serviceOfInterest,
      message,
      authorized: true,
    },
  };
}
