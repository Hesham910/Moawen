import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

/**
 * Official Moawen contact inbox — the ONLY delivery destination for
 * contact-form messages. Hardcoded on purpose: the recipient must remain
 * fixed and can never be overridden by visitors or request payloads.
 */
export const CONTACT_RECIPIENT_EMAIL = "support@moawen.sa";

/** Provider timeout so a hanging SMTP/API call can never pin the route. */
const PROVIDER_TIMEOUT_MS = 12_000;

export type DeliveryStatus = "sent_smtp" | "sent_resend";

export interface SendContactEmailParams {
  name: string;
  email: string;
  message: string;
  locale: string;
}

export interface DispatchResult {
  status: DeliveryStatus;
  providerNote: string;
}

export class EmailDispatchError extends Error {
  constructor(
    message: string,
    readonly provider?: string
  ) {
    super(message);
    this.name = "EmailDispatchError";
  }
}

/**
 * Removes CR/LF and other control characters so user input can never break
 * out of its MIME header/value context (header-injection hardening).
 */
export function sanitizeHeaderValue(input: string): string {
  return input.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();
}

/**
 * Strips control characters from free-text bodies (keeps \n for paragraphs).
 */
export function sanitizeBodyText(input: string): string {
  return input.replace(/\r\n/g, "\n").replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "");
}

const globalForMailer = globalThis as typeof globalThis & {
  __moawenSmtpTransporter?: Transporter;
};

function getSmtpTransporter(
  smtpHost: string,
  smtpPort: number,
  smtpUser: string,
  smtpPass: string
): Transporter {
  if (globalForMailer.__moawenSmtpTransporter) {
    return globalForMailer.__moawenSmtpTransporter;
  }
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
    connectionTimeout: PROVIDER_TIMEOUT_MS,
    greetingTimeout: PROVIDER_TIMEOUT_MS,
    socketTimeout: PROVIDER_TIMEOUT_MS,
  });
  globalForMailer.__moawenSmtpTransporter = transporter;
  return transporter;
}

export async function dispatchContactEmail({
  name,
  email,
  message,
  locale,
}: SendContactEmailParams): Promise<DispatchResult> {
  // Header-safe values only — the display name and subject can never inject headers.
  const safeName = sanitizeHeaderValue(name);
  const subject =
    locale === "en"
      ? `[Moawen Contact] New inquiry from ${safeName}`
      : `[تواصل معنا - معاون] استفسار جديد من ${safeName}`;

  const textBody = [
    "New contact inquiry from the Moawen landing page",
    `Sender Name: ${safeName}`,
    `Sender Email: ${email}`,
    `Language: ${locale}`,
    "----------------------------------------",
    message,
  ].join("\n");

  const htmlBody = `
    <div style="font-family: Cairo, Poppins, Arial, sans-serif; background:#12171D; color:#F4F2F8; padding:24px; border-radius:16px; border:1px solid rgba(148,122,182,0.35);">
      <h2 style="color:#947AB6; margin:0 0 12px 0;">Moawen / معاون — New Contact Message</h2>
      <p style="margin:6px 0;"><strong>Name:</strong> ${escapeHtml(safeName)}</p>
      <p style="margin:6px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin:6px 0;"><strong>Locale:</strong> ${escapeHtml(locale)}</p>
      <hr style="border:none; border-top:1px solid rgba(148,122,182,0.25); margin:16px 0;" />
      <p style="white-space:pre-line; line-height:1.7; color:#E6DDF2;">${escapeHtml(message)}</p>
    </div>
  `;

  // 1. Direct SMTP dispatch when credentials are configured (server-side only).
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT || "587");

  if (smtpHost && smtpUser && smtpPass) {
    const transporter = getSmtpTransporter(smtpHost, smtpPort, smtpUser, smtpPass);
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Moawen معاون" <${smtpUser}>`,
        to: CONTACT_RECIPIENT_EMAIL,
        replyTo: email,
        subject,
        text: textBody,
        html: htmlBody,
      });
    } catch (error) {
      // Surface the failure — the UI must never show success without provider confirmation.
      throw new EmailDispatchError(
        error instanceof Error ? error.message : "SMTP dispatch failed",
        "smtp"
      );
    }
    return {
      status: "sent_smtp",
      providerNote: `Accepted by SMTP provider for delivery to ${CONTACT_RECIPIENT_EMAIL}`,
    };
  }

  // 2. Resend REST API dispatch when RESEND_API_KEY is configured.
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    let res: Response;
    try {
      res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "Moawen <onboarding@resend.dev>",
          to: [CONTACT_RECIPIENT_EMAIL],
          reply_to: email,
          subject,
          text: textBody,
          html: htmlBody,
        }),
        signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
      });
    } catch (error) {
      throw new EmailDispatchError(
        error instanceof Error ? error.message : "Resend request failed",
        "resend"
      );
    }

    if (!res.ok) {
      // Never leak provider response bodies to the client; log a minimal note.
      console.error(
        `[Moawen Mailer] Resend rejected the message (HTTP ${res.status})`
      );
      throw new EmailDispatchError(
        `Resend returned HTTP ${res.status}`,
        "resend"
      );
    }
    return {
      status: "sent_resend",
      providerNote: `Accepted by Resend for delivery to ${CONTACT_RECIPIENT_EMAIL}`,
    };
  }

  // 3. No provider configured — report honestly. Messages are still persisted
  //    in the database by the contact route, but the API responds with 503 so
  //    the UI never claims an email was delivered when it was not.
  console.info(
    "[Moawen Mailer] No email provider configured (set SMTP_HOST/SMTP_USER/SMTP_PASS or RESEND_API_KEY); message stored in database only."
  );
  throw new EmailDispatchError(
    "No email provider is configured on the server",
    "none"
  );
}

function escapeHtml(str: string): string {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
