import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

const json = (body: unknown, status: number) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

function clientIp(request: Request): string {
  // Trust only the first hop from a platform proxy header. Configure your
  // host to overwrite these headers; they are not trusted when spoofed elsewhere.
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients; the JSON content type still applies
  try {
    const sent = new URL(origin);
    const expected = new URL(SITE.url);
    return sent.host === request.headers.get("host") || sent.host === expected.host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return json({ error: "Request not accepted." }, 403);

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "Unsupported request format." }, 415);
  }

  const length = Number(request.headers.get("content-length") ?? "0");
  if (length > MAX_BODY_BYTES) return json({ error: "Request is too large." }, 413);

  if (!rateLimit(`contact:${clientIp(request)}`, RATE_LIMIT, RATE_WINDOW_MS)) {
    return json({ error: "Too many requests. Please try again later." }, 429);
  }

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return json({ error: "Request is too large." }, 413);
    raw = JSON.parse(text);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot: real visitors never see or fill this field. Pretend success, send nothing.
  if (raw && typeof raw === "object" && (raw as Record<string, unknown>).website_confirm) {
    return json({ ok: true }, 200);
  }

  const result = validateContact(raw);
  if (!result.ok) return json({ error: "Please correct the highlighted fields.", fields: result.errors }, 422);

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    // Do not simulate success when no delivery channel is configured.
    console.error("contact: CONTACT_WEBHOOK_URL is not configured");
    return json(
      { error: `We could not receive your request right now. Please email ${SITE.email} directly.` },
      503,
    );
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "stey-security-website", submittedAt: new Date().toISOString(), ...result.data }),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
    });
    if (!response.ok) throw new Error(`webhook responded ${response.status}`);
  } catch (error) {
    // Log the cause server-side only; never expose it to the visitor.
    console.error("contact: delivery failed", error instanceof Error ? error.name : "unknown");
    return json(
      { error: `We could not send your request. Please try again or email ${SITE.email}.` },
      502,
    );
  }

  return json({ ok: true }, 201);
}
