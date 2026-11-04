import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/validators/contact";

type Utm = Record<string, string | undefined>;

type Payload = {
  values?: unknown;
  utm?: Utm;
  page?: string;
};

/** Simple in-memory limiter. Per instance, which is enough to blunt form spam. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
    }
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  // Same-origin fetches always send Origin; absent means a server-to-server
  // call (or an old browser), which we do not treat as hostile.
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

function badRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * POST /api/contact
 *
 * Validates the brief with the same schema the client uses, then delivers it
 * through Resend's REST API. No SDK dependency: one fetch, one failure mode.
 *
 * Abuse controls, all cheap and stateless where possible:
 * - same-origin check, so the endpoint is not a free relay for other sites
 * - per-IP rate limit (5 briefs / 10 minutes)
 * - a honeypot field that humans never fill; bots get a silent success
 *
 * If RESEND_API_KEY is not configured the route returns 503 and the client
 * falls back to a pre-filled mailto, so a lead is never silently dropped.
 */
export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return badRequest("invalid_origin", 403);
  }

  const key = clientKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(WINDOW_MS / 1000) } }
    );
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return badRequest("invalid_json");
  }

  // Honeypot: a hidden field no human sees or fills. Report success so the
  // bot does not learn the rule, and never send mail.
  const honeypot = (payload.values as { website?: unknown } | undefined)?.website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(payload.values ?? payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_submission", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, company, projectType, message } = parsed.data;
  const utm = payload.utm ?? {};
  const page = payload.page ?? "unknown";

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "brief@mail.lexpertzai.cc";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Lexpertz AI <brief@mail.lexpertzai.cc>";

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY is not set; returning 503 for mailto fallback"
    );
    return NextResponse.json({ error: "email_not_configured" }, { status: 503 });
  }

  const attribution = Object.entries(utm)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  const text = [
    "New brief from the site",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "—"}`,
    `Project: ${projectType}`,
    "",
    "Message:",
    message,
    "",
    "Attribution",
    attribution || "no UTM parameters",
    `Page: ${page}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New brief: ${projectType}${company ? ` — ${company}` : ""}`,
      text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("[contact] Resend rejected the message", response.status, detail);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
