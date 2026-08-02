import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WebMCPProvider } from "@/components/webmcp-provider";
import type { Language } from "@/lib/translations";

export const revalidate = 3600;

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
      ? "Samen Steeve — Ingénieur Logiciel · Automatisation IA"
      : "Samen Steeve — Software Engineer · AI Automation";

  const description =
    lang === "fr"
      ? "Ingénieur logiciel. Je conçois et développe des systèmes logiciels résilients en apportant un soin particulier à la sécurité en production, l'intégrité des données et l'intégration de flux d'agents IA dans les processus métier."
      : "Software Engineer. Designing and building resilient software systems with a focus on production security, data integrity, and integrating autonomous AI workflows into business processes.";

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
          url: `${BASE_URL}/profile/profil.png`,
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
      images: [`${BASE_URL}/profile/profil.png`],
    },
  };
}


// Generates static paths for both languages
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "fr" ? "fr" : "en") as Language;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>
      <WebMCPProvider />
      <SiteHeader lang={lang} />
      <div id="main-content" tabIndex={-1} className="flex-1 outline-none">{children}</div>
      <SiteFooter lang={lang} />
    </>
  );
}
