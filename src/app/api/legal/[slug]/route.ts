import { NextResponse } from "next/server";
import { db } from "@/db";
import { legalDocuments, type LegalSectionItem } from "@/db/schema";
import { getLegalDocumentBySlug } from "@/db/seed";
import { eq } from "drizzle-orm";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { isAdminAuthorized, isAdminConfigured } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  if (slug !== "privacy" && slug !== "terms") {
    return NextResponse.json(
      { ok: false, error: "Document not found" },
      { status: 404 }
    );
  }

  const doc = await getLegalDocumentBySlug(slug);
  return NextResponse.json({ ok: true, document: doc });
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
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
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { slug } = await context.params;
  if (slug !== "privacy" && slug !== "terms") {
    return NextResponse.json(
      { ok: false, error: "Document not found" },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const clip = (value: unknown, max: number): string =>
      String(value ?? "")
        .trim()
        .slice(0, max);
    const clipList = (value: unknown, maxItems: number, maxLen: number): string[] =>
      Array.isArray(value)
        ? value
            .filter((p): p is string => typeof p === "string")
            .slice(0, maxItems)
            .map((p) => p.slice(0, maxLen))
        : [];

    const titleAr = clip(body?.titleAr, 200);
    const titleEn = clip(body?.titleEn, 200);
    const subtitleAr = clip(body?.subtitleAr, 400);
    const subtitleEn = clip(body?.subtitleEn, 400);
    const version = clip(body?.version, 20) || "1.0";
    const rawSections: unknown[] = Array.isArray(body?.sections) ? body.sections : [];

    // Validate & cap the sections payload (shape, count, and string lengths).
    const sections: LegalSectionItem[] = rawSections
      .slice(0, 60)
      .map((raw, index): LegalSectionItem | null => {
        if (!raw || typeof raw !== "object") return null;
        const item = raw as Partial<LegalSectionItem>;
        if (typeof item.headingAr !== "string" || typeof item.headingEn !== "string") {
          return null;
        }
        return {
          id: clip(item.id, 80) || `${slug}-${index + 1}`,
          order: Number.isFinite(item.order) ? Number(item.order) : index + 1,
          headingAr: clip(item.headingAr, 300),
          headingEn: clip(item.headingEn, 300),
          bodyAr: clip(item.bodyAr, 8000),
          bodyEn: clip(item.bodyEn, 8000),
          pointsAr: clipList(item.pointsAr, 20, 1000),
          pointsEn: clipList(item.pointsEn, 20, 1000),
        };
      })
      .filter((item): item is LegalSectionItem => item !== null)
      .sort((a, b) => a.order - b.order)
      .map((item, index) => ({ ...item, order: index + 1 }));

    if (!titleAr || !titleEn || sections.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Invalid legal document payload" },
        { status: 400 }
      );
    }

    const existing = await db
      .select()
      .from(legalDocuments)
      .where(eq(legalDocuments.slug, slug))
      .limit(1);

    const now = new Date();
    if (existing.length === 0) {
      await db.insert(legalDocuments).values({
        slug,
        titleAr,
        titleEn,
        subtitleAr,
        subtitleEn,
        version,
        sections,
        updatedAt: now,
      });
    } else {
      await db
        .update(legalDocuments)
        .set({
          titleAr,
          titleEn,
          subtitleAr,
          subtitleEn,
          version,
          sections,
          updatedAt: now,
        })
        .where(eq(legalDocuments.slug, slug));
    }

    const updated = await getLegalDocumentBySlug(slug);
    return NextResponse.json({ ok: true, document: updated });
  } catch (error) {
    console.error("Update legal document error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save legal document" },
      { status: 500 }
    );
  }
}
