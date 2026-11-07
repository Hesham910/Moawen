"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  Save,
  Plus,
  Trash2,
  FileText,
  Mail,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import type { LegalDocumentData } from "@/db/seed";
import type { LegalSectionItem } from "@/db/schema";

interface ContactMessageRow {
  id: number;
  name: string;
  email: string;
  message: string;
  recipientEmail: string;
  locale: string;
  deliveryStatus: string;
  createdAt: string;
}

export default function AdminConsolePage() {
  const { theme } = useAppPreferences();
  const isDark = theme === "dark";

  const [adminSecret, setAdminSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "privacy" | "terms" | "messages"
  >("privacy");

  const [privacyDoc, setPrivacyDoc] = useState<LegalDocumentData | null>(null);
  const [termsDoc, setTermsDoc] = useState<LegalDocumentData | null>(null);
  const [messages, setMessages] = useState<ContactMessageRow[]>([]);

  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [saveBanner, setSaveBanner] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/overview", {
        headers: { "x-admin-secret": adminSecret.trim() },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setAuthError(
          res.status === 503
            ? "لوحة التحكم غير مُهيّأة على الخادم (ADMIN_SECRET غير معرّف)."
            : res.status === 429
              ? "محاولات كثيرة، يرجى الانتظار قليلاً ثم المحاولة مجددًا."
              : "رمز الدخول الإداري غير صحيح."
        );
      } else {
        setAuthenticated(true);
        setPrivacyDoc(data.privacy);
        setTermsDoc(data.terms);
        setMessages(data.messages || []);
      }
    } catch {
      setAuthError("تعذر الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  const currentDoc = activeTab === "privacy" ? privacyDoc : termsDoc;
  const setCurrentDoc = (next: LegalDocumentData) => {
    if (activeTab === "privacy") setPrivacyDoc(next);
    else setTermsDoc(next);
  };

  const handleAddSection = () => {
    if (!currentDoc) return;
    const nextOrder = currentDoc.sections.length + 1;
    const newSection: LegalSectionItem = {
      id: `${currentDoc.slug}-${Date.now()}`,
      order: nextOrder,
      headingAr: `${nextOrder}. بند جديد`,
      headingEn: `${nextOrder}. New Clause`,
      bodyAr: "أدخل نص البند باللغة العربية هنا...",
      bodyEn: "Enter clause text in English here...",
      pointsAr: [],
      pointsEn: [],
    };
    setCurrentDoc({
      ...currentDoc,
      sections: [...currentDoc.sections, newSection],
    });
  };

  const handleDeleteSection = (id: string) => {
    if (!currentDoc || currentDoc.sections.length <= 1) return;
    const filtered = currentDoc.sections
      .filter((s) => s.id !== id)
      .map((s, idx) => ({ ...s, order: idx + 1 }));
    setCurrentDoc({
      ...currentDoc,
      sections: filtered,
    });
  };

  const handleUpdateSection = (
    id: string,
    patch: Partial<LegalSectionItem>
  ) => {
    if (!currentDoc) return;
    setCurrentDoc({
      ...currentDoc,
      sections: currentDoc.sections.map((s) =>
        s.id === id ? { ...s, ...patch } : s
      ),
    });
  };

  const handleSaveDoc = async () => {
    if (!currentDoc) return;
    setSavingSlug(currentDoc.slug);
    setSaveBanner("");
    try {
      const res = await fetch(`/api/legal/${currentDoc.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret.trim(),
        },
        body: JSON.stringify(currentDoc),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setCurrentDoc(data.document);
        setSaveBanner(
          currentDoc.slug === "privacy"
            ? "تم حفظ وتحديث سياسة الخصوصية في قاعدة البيانات بنجاح!"
            : "تم حفظ وتحديث الشروط والأحكام في قاعدة البيانات بنجاح!"
        );
      }
    } finally {
      setSavingSlug(null);
    }
  };

  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-colors ${
        isDark ? "bg-[#12171D] text-[#F5F3FA]" : "bg-[#F8F7FC] text-[#12171D]"
      }`}
    >
      {/* Top Bar */}
      <header
        className={`border-b px-4 py-4 sm:px-8 ${
          isDark
            ? "border-white/[0.08] bg-[#161D26]"
            : "border-[#12171D]/[0.08] bg-white"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <BrandLogo className="h-9 w-auto" />
            </Link>
            <span className="rounded-full bg-[#947AB6]/18 px-3 py-1 text-xs font-bold text-[#947AB6]">
              لوحة تحكم الإدارة CMS
            </span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#947AB6]/35 px-4 py-2 text-xs sm:text-sm font-bold text-[#947AB6] hover:bg-[#947AB6] hover:text-white transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            <span>عرض الموقع</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
        {!authenticated ? (
          <div className="mx-auto max-w-md rounded-3xl border border-[#947AB6]/35 bg-[#161D26] p-8 text-[#F5F3FA] shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#947AB6]/20 text-[#947AB6]">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-extrabold">
              تسجيل الدخول إلى لوحة التحكم
            </h1>
            <p className="mt-2 text-sm text-[#A7B2C2]">
              أدخل رمز الإدارة (متغير البيئة ADMIN_SECRET) لتعديل سياسة الخصوصية
              والشروط والأحكام ومتابعة رسائل العملاء.
            </p>

            <form onSubmit={handleLogin} className="mt-5 space-y-4">
              <input
                type="password"
                required
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                placeholder="رمز الدخول الإداري"
                className="h-12 w-full rounded-xl border border-[#2B3644] bg-[#12171D] px-4 text-sm text-white outline-none focus:border-[#947AB6]"
              />
              {authError ? (
                <p className="text-xs font-medium text-rose-400">{authError}</p>
              ) : null}
              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-[#947AB6] text-sm font-bold text-white hover:bg-[#8469A8]"
              >
                {loading ? "جارٍ التحقق..." : "دخول"}
              </button>
            </form>
          </div>
        ) : (
          <div>
            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-3">
              {[
                {
                  key: "privacy" as const,
                  label: "سياسة الخصوصية",
                  icon: FileText,
                },
                {
                  key: "terms" as const,
                  label: "الشروط والأحكام",
                  icon: FileText,
                },
                {
                  key: "messages" as const,
                  label: `رسائل تواصل معنا (${messages.length})`,
                  icon: Mail,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.key);
                      setSaveBanner("");
                    }}
                    className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition-all ${
                      active
                        ? "border-[#947AB6] bg-[#947AB6] text-white"
                        : isDark
                          ? "border-[#27313E] bg-[#161D26] text-[#B8C2D0] hover:border-[#947AB6]"
                          : "border-[#DDD5EA] bg-white text-[#12171D]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {saveBanner ? (
              <div className="mt-6 flex items-center gap-2.5 rounded-2xl border border-[#947AB6] bg-[#947AB6]/15 px-5 py-3.5 text-sm font-bold text-[#947AB6]">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>{saveBanner}</span>
              </div>
            ) : null}

            {/* Legal Document Editor (Privacy or Terms) */}
            {(activeTab === "privacy" || activeTab === "terms") &&
            currentDoc ? (
              <div className="mt-8 space-y-6">
                <div
                  className={`rounded-3xl border p-6 ${
                    isDark
                      ? "border-[#27313E] bg-[#161D26]"
                      : "border-[#DDD5EA] bg-white"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-current/10">
                    <div>
                      <h2 className="text-xl font-extrabold">
                        تحرير: {currentDoc.titleAr}
                      </h2>
                      <p className="text-xs opacity-75 mt-1">
                        أي تعديل تحفظه هنا ينعكس مباشرة على صفحة /
                        {currentDoc.slug}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/${currentDoc.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[#947AB6]/40 px-4 py-2.5 text-xs font-bold text-[#947AB6]"
                      >
                        <span>معاينة الصفحة</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={handleSaveDoc}
                        disabled={savingSlug === currentDoc.slug}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#947AB6] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#8469A8]"
                      >
                        <Save className="h-4 w-4" />
                        <span>
                          {savingSlug === currentDoc.slug
                            ? "جارٍ الحفظ..."
                            : "حفظ التعديلات"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-bold mb-1.5">
                        العنوان بالعربية
                      </label>
                      <input
                        type="text"
                        value={currentDoc.titleAr}
                        onChange={(e) =>
                          setCurrentDoc({
                            ...currentDoc,
                            titleAr: e.target.value,
                          })
                        }
                        className={`h-11 w-full rounded-xl border px-3.5 text-sm ${
                          isDark
                            ? "border-[#2A3442] bg-[#12171D]"
                            : "border-[#D8CFE6] bg-[#FAF8FD]"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5">
                        العنوان بالإنجليزية
                      </label>
                      <input
                        type="text"
                        dir="ltr"
                        value={currentDoc.titleEn}
                        onChange={(e) =>
                          setCurrentDoc({
                            ...currentDoc,
                            titleEn: e.target.value,
                          })
                        }
                        className={`h-11 w-full rounded-xl border px-3.5 text-sm ${
                          isDark
                            ? "border-[#2A3442] bg-[#12171D]"
                            : "border-[#D8CFE6] bg-[#FAF8FD]"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5">
                        رقم الإصدار
                      </label>
                      <input
                        type="text"
                        dir="ltr"
                        value={currentDoc.version}
                        onChange={(e) =>
                          setCurrentDoc({
                            ...currentDoc,
                            version: e.target.value,
                          })
                        }
                        className={`h-11 w-full rounded-xl border px-3.5 text-sm ${
                          isDark
                            ? "border-[#2A3442] bg-[#12171D]"
                            : "border-[#D8CFE6] bg-[#FAF8FD]"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Sections List */}
                <div className="space-y-4">
                  {currentDoc.sections.map((sec) => (
                    <div
                      key={sec.id}
                      className={`rounded-3xl border p-6 ${
                        isDark
                          ? "border-[#27313E] bg-[#161D26]"
                          : "border-[#DDD5EA] bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-poppins text-xs font-bold text-[#947AB6]">
                          SECTION #{sec.order}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteSection(sec.id)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 hover:underline"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>حذف البند</span>
                        </button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-bold mb-1.5">
                            عنوان البند (عربي)
                          </label>
                          <input
                            type="text"
                            value={sec.headingAr}
                            onChange={(e) =>
                              handleUpdateSection(sec.id, {
                                headingAr: e.target.value,
                              })
                            }
                            className={`h-11 w-full rounded-xl border px-3.5 text-sm ${
                              isDark
                                ? "border-[#2A3442] bg-[#12171D]"
                                : "border-[#D8CFE6] bg-[#FAF8FD]"
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold mb-1.5">
                            عنوان البند (إنجليزي)
                          </label>
                          <input
                            type="text"
                            dir="ltr"
                            value={sec.headingEn}
                            onChange={(e) =>
                              handleUpdateSection(sec.id, {
                                headingEn: e.target.value,
                              })
                            }
                            className={`h-11 w-full rounded-xl border px-3.5 text-sm ${
                              isDark
                                ? "border-[#2A3442] bg-[#12171D]"
                                : "border-[#D8CFE6] bg-[#FAF8FD]"
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold mb-1.5">
                            النص (عربي)
                          </label>
                          <textarea
                            rows={3}
                            value={sec.bodyAr}
                            onChange={(e) =>
                              handleUpdateSection(sec.id, {
                                bodyAr: e.target.value,
                              })
                            }
                            className={`w-full rounded-xl border p-3 text-sm ${
                              isDark
                                ? "border-[#2A3442] bg-[#12171D]"
                                : "border-[#D8CFE6] bg-[#FAF8FD]"
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold mb-1.5">
                            النص (إنجليزي)
                          </label>
                          <textarea
                            rows={3}
                            dir="ltr"
                            value={sec.bodyEn}
                            onChange={(e) =>
                              handleUpdateSection(sec.id, {
                                bodyEn: e.target.value,
                              })
                            }
                            className={`w-full rounded-xl border p-3 text-sm ${
                              isDark
                                ? "border-[#2A3442] bg-[#12171D]"
                                : "border-[#D8CFE6] bg-[#FAF8FD]"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddSection}
                  className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-[#947AB6] px-6 py-3.5 text-sm font-bold text-[#947AB6] hover:bg-[#947AB6]/10"
                >
                  <Plus className="h-4 w-4" />
                  <span>إضافة بند جديد</span>
                </button>
              </div>
            ) : null}

            {/* Contact Messages Tab */}
            {activeTab === "messages" ? (
              <div className="mt-8 space-y-4">
                {messages.length === 0 ? (
                  <p className="opacity-70 text-sm">
                    لا توجد رسائل واردة حتى الآن.
                  </p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`rounded-2xl border p-5 ${
                        isDark
                          ? "border-[#27313E] bg-[#161D26]"
                          : "border-[#DDD5EA] bg-white"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="font-bold">{msg.name}</div>
                        <span className="font-poppins text-xs text-[#947AB6]">
                          {msg.email} → {msg.recipientEmail}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed opacity-90">
                        {msg.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}
