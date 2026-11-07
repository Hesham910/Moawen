import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/500.css";
import "@fontsource/cairo/600.css";
import "@fontsource/cairo/700.css";
import "@fontsource/cairo/800.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "./globals.css";
import { AppPreferencesProvider } from "@/context/AppPreferencesContext";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { BRAND_ASSETS, SOCIAL_LINKS } from "@/config/mockups";
import { DICTIONARY } from "@/i18n/dictionary";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#12171D" },
    { media: "(prefers-color-scheme: light)", color: "#F8F7FC" },
  ],
  width: "device-width",
  initialScale: 1,
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://moawen.sa";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "معاون | اختر من يعاونك — منصة الخدمات المهنية والمشاريع المستقلة",
    template: "%s | معاون — Moawen",
  },
  description:
    "في معاون، قرّبنا لك مختصين من مختلف أنحاء العالم العربي، بمهارات وخبرات متنوعة تقدر تتعاون معهم لإنجاز اللي تحتاجه بثقة ومرونة.",
  keywords: [
    "معاون",
    "Moawen",
    "عمل حر",
    "مستقلين",
    "خدمات مهنية",
    "إنجاز مشاريع",
    "تطبيق معاون",
    "freelance platform",
    "Arab specialists",
  ],
  authors: [{ name: "Moawen — معاون" }],
  creator: "Moawen",
  publisher: "Moawen",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: BRAND_ASSETS.favicon, type: "image/svg+xml" }],
    shortcut: [{ url: BRAND_ASSETS.favicon, type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "معاون | Moawen",
    locale: "ar_SA",
    alternateLocale: ["en_US"],
    title: "معاون | اختر من يعاونك — منصة الخدمات المهنية والمشاريع المستقلة",
    description:
      "منصة تجمع من يحتاج إلى إنجاز العمل بمن يستطيع إنجازه بثقة ومرونة وحفظ كامل للمستحقات.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "معاون — Moawen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "معاون | اختر من يعاونك",
    description:
      "في معاون، قرّبنا لك مختصين من مختلف أنحاء العالم العربي لإنجاز أعمالك ومشاريعك بثقة ومرونة.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Applies the visitor's saved locale/theme BEFORE hydration so the first
 * paint already matches their preference (no dark→light flash, no RTL/LTR
 * flash for English visitors). Kept tiny and dependency-free.
 */
const preferenceBootstrap = `(function(){try{var l=localStorage.getItem("moawen_locale");var t=localStorage.getItem("moawen_theme");var d=document.documentElement;if(l==="ar"||l==="en"){d.lang=l;d.dir=l==="ar"?"rtl":"ltr";}if(t==="light"||t==="dark"){d.classList.remove("dark","light");d.classList.add(t);}}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  // JSON-LD: only claims that match reality. The apps are NOT launched yet, so
  // no MobileApplication/SoftwareApplication node is emitted, and the contact
  // email is the single official inbox support@moawen.sa.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "معاون — Moawen",
        url: SITE_URL,
        description:
          "منصة تجمع من يحتاج إلى إنجاز العمل بمن يستطيع إنجازه بثقة ومرونة.",
        sameAs: [
          SOCIAL_LINKS.instagram,
          SOCIAL_LINKS.x,
          SOCIAL_LINKS.tiktok,
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "support@moawen.sa",
          contactType: "customer support",
          availableLanguage: ["Arabic", "English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "معاون | Moawen",
        inLanguage: "ar",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "معاون | اختر من يعاونك — منصة الخدمات المهنية والمشاريع المستقلة",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "ar",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: DICTIONARY.ar.faq.leadQuestion,
            acceptedAnswer: {
              "@type": "Answer",
              text: DICTIONARY.ar.faq.leadAnswer,
            },
          },
          ...DICTIONARY.ar.faq.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        ],
      },
    ],
  };

  return (
    <html
      lang="ar"
      dir="rtl"
      className="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferenceBootstrap }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#12171D] text-[#F5F3FA] antialiased selection:bg-[#947AB6] selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:start-3 focus:z-[10000] focus:rounded-xl focus:bg-[#947AB6] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          تجاوز إلى المحتوى الرئيسي
        </a>
        <GoogleAnalytics />
        <AppPreferencesProvider>
          <CustomCursor />
          {children}
        </AppPreferencesProvider>
      </body>
    </html>
  );
}
