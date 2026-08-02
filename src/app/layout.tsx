import type { Metadata } from "next";
import "./globals.css";
// Polices auto-hébergées via fontsource — aucun appel réseau à Google au runtime
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/outfit/800.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

const themeScript = `
  (function () {
    try {
      var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    } catch (e) {}
  })();
`;

// Données structurées Schema.org — indique à Google qui est Samen Steeve,
// ses coordonnées, ses profils et ses domaines d'expertise.
// Source : https://schema.org/Person
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Samen Steeve",
  alternateName: "samsteeven",
  url: "https://samensteeve.com",
  image: "https://samensteeve.com/profile/profil.png",
  sameAs: [
    "https://github.com/samsteeven",
    "https://linkedin.com/in/samensteeve",
  ],
  jobTitle: "Software Engineer & AI Automation Specialist",
  description:
    "Software Engineer specializing in resilient software systems. Focused on production security, data integrity, and integrating autonomous AI agent workflows into business processes.",
  knowsAbout: [
    "Software Engineering",
    "Systems Architecture",
    "Web Security",
    "Laravel",
    "React",
    "Angular",
    "Inertia.js",
    "AI Agents",
  ],
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://samensteeve.com",
  },
};

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Anti-flash theme script — doit s'exécuter avant l'hydratation React.
            Le warning React 19 "Encountered a script tag" est attendu en dev
            et n'apparaît pas en production. Le script fonctionne via le HTML SSR. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* JSON-LD Person schema pour Google Knowledge Panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink font-sans antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}