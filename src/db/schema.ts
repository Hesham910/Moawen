import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export interface LegalSectionItem {
  id: string;
  order: number;
  headingAr: string;
  headingEn: string;
  bodyAr: string;
  bodyEn: string;
  pointsAr?: string[];
  pointsEn?: string[];
}

export const legalDocuments = pgTable("legal_documents", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  titleAr: text("title_ar").notNull(),
  titleEn: text("title_en").notNull(),
  subtitleAr: text("subtitle_ar").notNull(),
  subtitleEn: text("subtitle_en").notNull(),
  version: text("version").notNull().default("1.0"),
  sections: jsonb("sections").$type<LegalSectionItem[]>().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  /** Fixed official inbox — see src/lib/mailer.ts (CONTACT_RECIPIENT_EMAIL). */
  recipientEmail: text("recipient_email")
    .notNull()
    .default("support@moawen.sa"),
  locale: text("locale").notNull().default("ar"),
  deliveryStatus: text("delivery_status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
