import type { Metadata } from "next";
import { getLegalDocumentBySlug } from "@/db/seed";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | معاون — Privacy Policy | Moawen",
  description:
    "سياسة الخصوصية وحماية البيانات الشخصية في منصة معاون للخدمات المهنية والمشاريع المستقلة.",
  alternates: { canonical: "/privacy" },
};

export default async function PrivacyPolicyPage() {
  const doc = await getLegalDocumentBySlug("privacy");
  return <LegalDocumentView doc={doc} />;
}
