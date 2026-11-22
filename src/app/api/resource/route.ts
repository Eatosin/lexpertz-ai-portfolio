import { NextResponse } from "next/server";

import { resourceSchema } from "@/lib/validators/resource";

type Payload = {
  values?: unknown;
  page?: string;
};

const DOWNLOAD_PATH = "/resources/rag-permission-test-kit.pdf";
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
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

async function sendEmail(
  apiKey: string,
  body: {
    from: string;
    to: string[];
    reply_to?: string;
    subject: string;
    text: string;
  }
): Promise<boolean> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("[resource] Resend rejected the message", response.status, detail);
    return false;
  }

  return true;
}

/**
 * POST /api/resource
 *
 * Sends the requested kit to the lead and notifies the founder. If Resend is
 * not configured, returns the download URL with a 503 so the client can still
 * deliver the asset and offer an email fallback instead of silently dropping
 * the lead.
 */
export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "invalid_origin" }, { status: 403 });
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
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const honeypot = (payload.values as { website?: unknown } | undefined)?.website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = resourceSchema.safeParse(payload.values);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_submission", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, company } = parsed.data;
  const page = payload.page ?? "unknown";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lexpertzai.cc";
  const downloadUrl = `${baseUrl}${DOWNLOAD_PATH}`;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "brief@mail.lexpertzai.cc";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Lexpertz AI <brief@mail.lexpertzai.cc>";

  if (!apiKey) {
    console.warn("[resource] RESEND_API_KEY is not set; returning direct download");
    return NextResponse.json(
      { error: "email_not_configured", downloadUrl },
      { status: 503 }
    );
  }

  const notified = await sendEmail(apiKey, {
    from,
    to: [to],
    reply_to: email,
    subject: `New kit request: ${name}${company ? ` — ${company}` : ""}`,
    text: [
      "New RAG Permission Test Kit request",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "—"}`,
      `Page: ${page}`,
      "",
      `Kit: ${downloadUrl}`,
    ].join("\n"),
  });

  if (!notified) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  const delivered = await sendEmail(apiKey, {
    from,
    to: [email],
    reply_to: to,
    subject: "Your RAG Permission Test Kit",
    text: [
      `Hi ${name},`,
      "",
      "Here is the RAG Permission Test Kit: four personas, a test corpus, the",
      "permission probes, and a scoring sheet you can run in a vendor pilot.",
      "",
      downloadUrl,
      "",
      "If you want the gap list applied to your own deployment, the two-week",
      `AI Proof Audit is here: ${baseUrl}/services/ai-proof-audit`,
      "",
      "— Owadokun",
      "Lexpertz AI",
    ].join("\n"),
  });

  if (!delivered) {
    console.error("[resource] lead delivered but requester email failed", email);
  }

  return NextResponse.json({ ok: true, downloadUrl, emailSent: delivered });
}
