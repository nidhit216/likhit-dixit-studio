import { NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
  brand?: string;
  type?: string;
  budget?: string;
  message?: string;
};

const emailOk = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

export async function POST(req: Request) {
  let data: Body;
  try {
    data = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { name = "", email = "", brand = "", type = "", budget = "", message = "" } = data;

  if (name.trim().length < 2 || !emailOk(email) || !type || message.trim().length < 4) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL ?? "Likhit Dixit Studio <onboarding@resend.dev>";

  // If email isn't configured yet, don't fail — log it so the form works in dev.
  if (!key || !to) {
    console.log("[inquiry] (email not configured)", { name, email, brand, type, budget, message });
    return NextResponse.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `New inquiry — ${name}${brand ? ` (${brand})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Brand: ${brand || "—"}`,
        `Type: ${type}`,
        `Budget: ${budget || "—"}`,
        "",
        message,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[inquiry] resend error", res.status, detail);
    return NextResponse.json({ ok: false, error: "Email service error." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
