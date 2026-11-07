// import { NextResponse } from "next/server";
// import { db } from "@/db";
// import { contactMessages } from "@/db/schema";
// import {
//   CONTACT_RECIPIENT_EMAIL,
//   EmailDispatchError,
//   dispatchContactEmail,
//   sanitizeBodyText,
//   sanitizeHeaderValue,
// } from "@/lib/mailer";
// import { getClientIp, rateLimit } from "@/lib/rate-limit";

// /** Input limits shared with the client-side maxLength attributes. */
// const LIMITS = { name: 80, email: 254, message: 5000 } as const;

// const EMAIL_REGEX =
//   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// export async function POST(request: Request) {
//   // --- Spam protection: per-IP fixed window (5 submissions / 10 minutes) ---
//   const limiter = rateLimit(`contact:${getClientIp(request)}`, 5, 10 * 60 * 1000);
//   if (!limiter.allowed) {
//     return NextResponse.json(
//       {
//         ok: false,
//         error:
//           "Too many messages sent. Please try again in a few minutes. / تم إرسال عدد كبير من الرسائل، يرجى المحاولة بعد بضع دقائق.",
//       },
//       { status: 429, headers: { "Retry-After": String(limiter.retryAfterSeconds) } }
//     );
//   }

//   try {
//     const body = await request.json().catch(() => null);
//     if (!body || typeof body !== "object") {
//       return NextResponse.json(
//         { ok: false, error: "Invalid request body." },
//         { status: 400 }
//       );
//     }

//     // --- Honeypot: real users never fill this hidden field; bots do. ---
//     const honeypot = typeof body?.website === "string" ? body.website.trim() : "";
//     if (honeypot.length > 0) {
//       // Answer like success so bots learn nothing, but deliver nothing.
//       return NextResponse.json({ ok: true, deliveredTo: CONTACT_RECIPIENT_EMAIL });
//     }

//     const locale = body?.locale === "en" ? "en" : "ar";
//     const fail = (en: string, ar: string, status: number) =>
//       NextResponse.json(
//         { ok: false, error: locale === "en" ? en : ar },
//         { status }
//       );

//     // --- Server-side validation (authoritative) ---
//     const rawName = typeof body?.name === "string" ? body.name : "";
//     const rawEmail = typeof body?.email === "string" ? body.email : "";
//     const rawMessage = typeof body?.message === "string" ? body.message : "";

//     const name = sanitizeHeaderValue(rawName).slice(0, LIMITS.name);
//     const email = sanitizeHeaderValue(rawEmail).slice(0, LIMITS.email);
//     const message = sanitizeBodyText(rawMessage.trim()).slice(0, LIMITS.message);

//     if (name.length < 2) {
//       return fail(
//         "Please enter your name.",
//         "يرجى إدخال الاسم بشكل صحيح.",
//         400
//       );
//     }

//     if (!email || !EMAIL_REGEX.test(email)) {
//       return fail(
//         "Please enter a valid email address.",
//         "يرجى إدخال بريد إلكتروني صحيح.",
//         400
//       );
//     }

//     if (message.length < 5) {
//       return fail(
//         "Please write your message before sending.",
//         "يرجى كتابة رسالتك قبل الإرسال.",
//         400
//       );
//     }

//     // --- Deliver first: ok:true is returned ONLY after a provider accepts
//     //     the message. Failures are persisted with status "failed" but the
//     //     UI is told the truth (HTTP 502/503). ---
//     let deliveryStatus: string;
//     try {
//       const dispatchResult = await dispatchContactEmail({
//         name,
//         email,
//         message,
//         locale,
//       });
//       deliveryStatus = dispatchResult.status;
//     } catch (error) {
//       const configured = !(error instanceof EmailDispatchError && error.provider === "none");
//       try {
//         await db.insert(contactMessages).values({
//           name,
//           email,
//           message,
//           recipientEmail: CONTACT_RECIPIENT_EMAIL,
//           locale,
//           deliveryStatus: "failed",
//         });
//       } catch (dbError) {
//         console.error("Contact message persistence failed after dispatch error:", dbError);
//       }
//       console.error("Contact email dispatch failed:", error);
//       return fail(
//         configured
//           ? "The message could not be delivered right now. Please try again or email us directly."
//           : "The message was received but email delivery is not configured yet. Please email us directly.",
//         configured
//           ? "تعذر إرسال الرسالة الآن. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة."
//           : "تم استلام رسالتك لكن خدمة البريد غير مهيأة بعد. يرجى مراسلتنا مباشرة.",
//         configured ? 502 : 503
//       );
//     }

//     const [inserted] = await db
//       .insert(contactMessages)
//       .values({
//         name,
//         email,
//         message,
//         recipientEmail: CONTACT_RECIPIENT_EMAIL,
//         locale,
//         deliveryStatus,
//       })
//       .returning({ id: contactMessages.id });

//     return NextResponse.json({
//       ok: true,
//       id: inserted?.id ?? null,
//       deliveryStatus,
//     });
//   } catch (error) {
//     // Log server-side only; never expose internals to the client.
//     console.error("Contact form API error:", error);
//     return NextResponse.json(
//       { ok: false, error: "Unable to process your inquiry right now. / تعذر معالجة طلبك الآن." },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import {
  CONTACT_RECIPIENT_EMAIL,
  EmailDispatchError,
  dispatchContactEmail,
  sanitizeBodyText,
  sanitizeHeaderValue,
} from "@/lib/mailer";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const LIMITS = { name: 80, email: 254, message: 5000 } as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const limiter = rateLimit(
    `contact:${getClientIp(request)}`,
    5,
    10 * 60 * 1000
  );

  if (!limiter.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many messages sent. Please try again in a few minutes. / تم إرسال عدد كبير من الرسائل، يرجى المحاولة بعد بضع دقائق.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(limiter.retryAfterSeconds),
        },
      }
    );
  }

  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const honeypot =
      typeof body.website === "string" ? body.website.trim() : "";

    if (honeypot.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const locale = body.locale === "en" ? "en" : "ar";

    const fail = (en: string, ar: string, status: number) =>
      NextResponse.json(
        { ok: false, error: locale === "en" ? en : ar },
        { status }
      );

    const rawName = typeof body.name === "string" ? body.name : "";
    const rawEmail = typeof body.email === "string" ? body.email : "";
    const rawMessage = typeof body.message === "string" ? body.message : "";

    const name = sanitizeHeaderValue(rawName).slice(0, LIMITS.name);
    const email = sanitizeHeaderValue(rawEmail).slice(0, LIMITS.email);
    const message = sanitizeBodyText(rawMessage.trim()).slice(
      0,
      LIMITS.message
    );

    if (name.length < 2) {
      return fail(
        "Please enter your name.",
        "يرجى إدخال الاسم بشكل صحيح.",
        400
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return fail(
        "Please enter a valid email address.",
        "يرجى إدخال بريد إلكتروني صحيح.",
        400
      );
    }

    if (message.length < 5) {
      return fail(
        "Please write your message before sending.",
        "يرجى كتابة رسالتك قبل الإرسال.",
        400
      );
    }

    let dispatchResult;

    try {
      dispatchResult = await dispatchContactEmail({
        name,
        email,
        message,
        locale,
      });
    } catch (error) {
      const configured = !(
        error instanceof EmailDispatchError &&
        error.provider === "none"
      );

      console.error("Contact email dispatch failed:", error);

      return fail(
        configured
          ? "The message could not be delivered right now. Please try again or email us directly."
          : "Email delivery is not configured yet. Please email us directly.",
        configured
          ? "تعذر إرسال الرسالة الآن. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة."
          : "خدمة البريد الإلكتروني غير مهيأة بعد. يرجى مراسلتنا مباشرة.",
        configured ? 502 : 503
      );
    }

    return NextResponse.json({
      ok: true,
      deliveryStatus: dispatchResult.status,
    });
  } catch (error) {
    console.error("Contact form API error:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          "Unable to process your inquiry right now. / تعذر معالجة طلبك الآن.",
      },
      { status: 500 }
    );
  }
}
