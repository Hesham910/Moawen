import type { Metadata } from "next";
import { getLegalDocumentBySlug } from "@/db/seed";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الشروط والأحكام | معاون — Terms & Conditions | Moawen",
  description:
    "الشروط والأحكام المنظمة لاستخدام منصة معاون وحفظ المستحقات وحقوق العملاء ومقدمي الخدمات.",
  alternates: { canonical: "/terms" },
};

export default async function TermsPage() {
  const doc = await getLegalDocumentBySlug("terms");
  return <LegalDocumentView doc={doc} />;
}
