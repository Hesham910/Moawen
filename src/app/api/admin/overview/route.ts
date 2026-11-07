import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { getLegalDocumentBySlug } from "@/db/seed";
import { desc } from "drizzle-orm";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { isAdminAuthorized, isAdminConfigured } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Admin console is not configured." },
      { status: 503 }
    );
  }

  const limiter = rateLimit(`admin-auth:${getClientIp(request)}`, 10, 60 * 1000);
  if (!limiter.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limiter.retryAfterSeconds) } }
    );
  }

  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [privacy, terms, messages] = await Promise.all([
      getLegalDocumentBySlug("privacy"),
      getLegalDocumentBySlug("terms"),
      db
        .select()
        .from(contactMessages)
        .orderBy(desc(contactMessages.createdAt))
        .limit(50),
    ]);

    return NextResponse.json({
      ok: true,
      privacy,
      terms,
      messages,
    });
  } catch (error) {
    console.error("Admin overview API error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load admin overview" },
      { status: 500 }
    );
  }
}
