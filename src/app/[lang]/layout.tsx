import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { Language } from "@/lib/translations";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://samensteeve.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang === "fr" ? "fr" : "en";
  const altLang = lang === "fr" ? "en" : "fr";

  const title =
    lang === "fr"
      ? "Samen Steeve — Ingénieur Logiciel & Chercheur en Sécurité"
      : "Samen Steeve — Software Engineer & Security Researcher";

  const description =
    lang === "fr"
      ? "Ingénieur Logiciel, Chercheur en Sécurité et Spécialiste en Automatisation IA. Je conçois des systèmes résilients et sécurise la logique applicative."
      : "Software Engineer, Security Researcher, and AI Automation Specialist. I build resilient systems and secure application logic.";

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        "en": `${BASE_URL}/en`,
        "fr": `${BASE_URL}/fr`,
        "x-default": `${BASE_URL}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: altLang === "fr" ? "fr_FR" : "en_US",
      siteName: "Samen Steeve",
      images: [
        {
          url: "/profil.png",
          width: 800,
          height: 800,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/profil.png"],
    },
  };
}


// Generates static paths for both languages
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

// Applique le thème stocké avant le premier rendu, pour éviter un flash
// de la mauvaise couleur au chargement.
const themeScript = `
  (function () {
    try {
      var stored = localStorage.getItem('theme');
      var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      if (theme === 'dark') document.documentElement.classList.add('dark');
    } catch (e) {}
  })();
`;

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "fr" ? "fr" : "en") as Language;

  return (
    <html lang={lang} className="h-full antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- pattern valide en App Router pour des polices non gérées par next/font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Instrument+Sans:wght@500;600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink font-sans antialiased" suppressHydrationWarning>
        <SiteHeader lang={lang} />
        <div className="flex-1">{children}</div>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
