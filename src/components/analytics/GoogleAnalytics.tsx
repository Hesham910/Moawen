"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

export function GoogleAnalytics() {
  return (
    <>
      <Script id="moawen-datalayer-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          ${
            GA_MEASUREMENT_ID
              ? `gtag('js', new Date()); gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });`
              : ""
          }
        `}
      </Script>
      {GA_MEASUREMENT_ID ? (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
