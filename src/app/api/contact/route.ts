import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs"; // importante para evitar problemas en algunos deploys

type Payload = {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  website?: string; // honeypot anti-spam
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    if (!resendKey || !toEmail) {
      return NextResponse.json(
        { ok: false, error: "Faltan variables de entorno (RESEND_API_KEY / CONTACT_TO_EMAIL)." },
        { status: 500 }
      );
    }

    const data = (await req.json()) as Partial<Payload>;

    // Honeypot: si viene relleno => bot
    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({ ok: true }); // respondemos ok para no darle info al bot
    }

    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const service = (data.service || "").trim();
    const budget = (data.budget || "").trim();
    const message = (data.message || "").trim();

    // Validaciones mínimas
    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: "Nombre inválido." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Email inválido." }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json({ ok: false, error: "Mensaje demasiado corto." }, { status: 400 });
    }

    const resend = new Resend(resendKey);

    const subject = `Nueva consulta (${service || "Sin servicio"}) — ${name}`;
    const text =
      `Nueva consulta desde la landing\n\n` +
      `Nombre: ${name}\n` +
      `Email: ${email}\n` +
      `Servicio: ${service || "No definido"}\n` +
      `Presupuesto: ${budget || "No definido"}\n\n` +
      `Mensaje:\n${message}\n`;

    const html = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; line-height:1.5">
        <h2>Nueva consulta desde la landing</h2>
        <p><b>Nombre:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Servicio:</b> ${escapeHtml(service || "No definido")}</p>
        <p><b>Presupuesto:</b> ${escapeHtml(budget || "No definido")}</p>
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `;

    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email, // para responderle directo al cliente
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true, id: result.data?.id ?? null });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Error inesperado enviando el mensaje." },
      { status: 500 }
    );
  }
}

// mini helper para evitar que te inyecten HTML en el email
function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
