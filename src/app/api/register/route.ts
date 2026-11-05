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
    console.log("REGISTRATION", row); // dev mode: no sheet yet
    return Response.json({ ok: true });
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(row),
  });
  return Response.json({ ok: res.ok }, { status: res.ok ? 200 : 502 });
}