export const BRAND_ASSETS = {
  logoDark: "/logo/logo-dark.svg",
  logoLight: "/logo/logo-light.svg",
  favicon: "/favicon.svg",
} as const;

/* App screenshots ship as optimized WebP (2x the 390px logical screen width,
   ~50-75 KB each). The original SVG sources weighed up to 11.3 MB per file. */
export const HERO_MOCKUP_SCREENS = {
  left: "/imges/screen-3.webp",
  center: "/imges/screen-1.webp",
  right: "/imges/screen-6.webp",
} as const;

export const PRODUCT_EXPERIENCE_SCREENS: string[] = [
  "/imges/screen-1.webp",
  "/imges/screen-2.webp",
  "/imges/screen-3.webp",
  "/imges/screen-4.webp",
  "/imges/screen-5.webp",
  "/imges/screen-6.webp",
  "/imges/screen-7.webp",
  "/imges/screen-8.webp",
  "/imges/screen-9.webp",
  "/imges/screen-10.webp",
];

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/moawen.sa",
  tiktok: "https://www.tiktok.com/@moawen.sa?_r=1",
  x: "https://x.com/moawen_ksa",
} as const;
