import { emptyValues, validate, type RegisterValues } from "@/lib/validation";

export async function POST(req: Request) {
  let body: RegisterValues;
  try {
    body = { ...emptyValues, ...(await req.json()) };
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Bots fill the hidden field: pretend success, save nothing
  if (body.website) return Response.json({ ok: true });

  if (Object.keys(validate(body)).length)
    return Response.json({ ok: false }, { status: 422 });

  const row = {
    date: new Date().toISOString(),
    fullName: body.fullName.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone.trim(),
    status: body.status,
    university: body.university.trim(),
    sessions: body.sessions.join(", "),
  };

  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) {
    console.log("REGISTRATION (no SHEETS_WEBHOOK_URL, not saved)", row);
    return Response.json({ ok: true });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...row, secret: process.env.SHEETS_SECRET }),
      redirect: "follow",
    });

    const text = await res.text();
    console.log("SHEETS REPLY", res.status, text.slice(0, 300));

    let data: { status?: string } = {};
    try {
      data = JSON.parse(text);
    } catch {
      // Google returned an HTML page (login, 404 or script error)
      return Response.json({ ok: false }, { status: 502 });
    }

    if (data.status === "duplicate")
      return Response.json({ ok: false, duplicate: true }, { status: 409 });
    if (data.status === "ok") return Response.json({ ok: true });

    return Response.json({ ok: false }, { status: 502 });
  } catch (err) {
    console.log("SHEETS ERROR", err);
    return Response.json({ ok: false }, { status: 502 });
  }
}