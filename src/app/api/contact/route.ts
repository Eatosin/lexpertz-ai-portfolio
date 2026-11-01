import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/validators/contact";

type Utm = Record<string, string | undefined>;

type Payload = {
  values?: unknown;
  utm?: Utm;
  page?: string;
};

function badRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * POST /api/contact
 *
 * Validates the brief with the same schema the client uses, then delivers it
 * through Resend's REST API. No SDK dependency: one fetch, one failure mode.
 *
 * If RESEND_API_KEY is not configured the route returns 503 and the client
 * falls back to a pre-filled mailto, so a lead is never silently dropped.
 */
export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return badRequest("invalid_json");
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
