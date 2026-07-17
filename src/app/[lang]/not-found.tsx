import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FileText, Home, Layers } from "lucide-react";
import { getT, type Language } from "@/lib/translations";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function NotFound({
  params,
}: Readonly<{
  params?: Promise<{ lang: Language }>;
}>) {
  const resolved = params ? await params : null;
  const lang: Language = resolved?.lang ?? "en";
  const t = getT(lang);

  const quickLinks = [
    {
      href: `/${lang}`,
      label: lang === "fr" ? "Retourner à l'accueil" : "Go back home",
      icon: Home,
      desc: lang === "fr" ? "Page principale et contact" : "Main page & contact details",
    },
    {
      href: `/${lang}/#work`,
      label: lang === "fr" ? "Découvrir mes projets" : "Browse my work",
      icon: Layers,
      desc: lang === "fr" ? "Mes réalisations récentes" : "My recent achievements",
    },
    {
      href: `/${lang}/writing`,
      label: lang === "fr" ? "Lire mes articles" : "Read my articles",
      icon: FileText,
      desc: lang === "fr" ? "Mes billets de blog tech" : "My latest technical posts",
    },
  ];

  return (
    <main className="mx-auto flex min-h-[75vh] max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
      <ScrollReveal className="w-full">
        {/* Badge 404 géant stylisé */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute inset-0 bg-accent/10 blur-xl rounded-full h-16 w-32 mx-auto"></div>
          <span
            className="font-mono text-8xl font-black tracking-widest text-accent/20 select-none"
          >
            404
          </span>
        </div>

        {/* Titres */}
        <h1
          className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl text-ink"
        >
          {t.notFound.title}
        </h1>
        <p className="mt-4 text-base text-ink-soft max-w-md mx-auto leading-relaxed">
          {t.notFound.message}
        </p>

        {/* Liens de navigation rapides */}
        <div className="mt-12 text-left w-full rounded-2xl border border-line bg-paper-raised/40 p-4 sm:p-6 shadow-sm">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-soft px-2 mb-4">
            {lang === "fr" ? "Où souhaitez-vous aller ?" : "Where would you like to go?"}
          </p>
          <div className="flex flex-col gap-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between p-3 rounded-xl transition-all duration-300 ease-out hover:bg-paper-raised hover:translate-x-1.5"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="p-2 rounded-lg bg-accent/5 text-accent/80 transition-colors group-hover:bg-accent/10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                        {link.label}
                      </p>
                      <p className="text-[11px] text-ink-soft/75 mt-0.5 truncate">
                        {link.desc}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-ink-soft/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bouton de retour direct */}
        <Link
          href={`/${lang}`}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised/40 px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink transition-all duration-300 hover:scale-105 hover:border-accent/30 hover:bg-paper-raised hover:text-accent hover:shadow-md active:scale-[0.96]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t.notFound.cta}
        </Link>
      </ScrollReveal>
    </main>
  );
}
