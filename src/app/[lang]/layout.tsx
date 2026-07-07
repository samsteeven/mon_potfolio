import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WebMCPProvider } from "@/components/webmcp-provider";
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
        "x-default": `${BASE_URL}/fr`,
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

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "fr" ? "fr" : "en") as Language;

  return (
    <>
      <WebMCPProvider />
      <SiteHeader lang={lang} />
      <div className="flex-1">{children}</div>
      <SiteFooter lang={lang} />
    </>
  );
}
