import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { workSource } from "@/lib/source";
import { StatusDot } from "@/components/status-dot";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getT, type Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { sortByFeaturedAndDate } from "@/components/project-card";

interface PageProps {
  params: Promise<{ lang: Language }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = getT(lang);
  return createPageMetadata({
    lang,
    title: t.work.title,
    description: t.work.seoDescription,
    path: "/work",
  });
}

export default async function WorkIndexPage({ params }: PageProps) {
  const { lang } = await params;
  const t = getT(lang);

  const projects = workSource.getPages().sort(sortByFeaturedAndDate);

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link
        href={`/${lang}`}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-soft transition-all duration-200 hover:text-accent hover:-translate-x-0.5"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t.details.back}
      </Link>

      <h1 className="fade-up mt-8 mb-10 font-display text-3xl font-bold tracking-tight">{t.work.title}</h1>

      <div className="flex flex-col gap-4">
        {projects.map((page, i) => (
          <ScrollReveal key={page.url} delay={i * 80}>
            <Link
              href={`/${lang}/work/${page.slugs.at(-1)}`}
              className="group flex flex-col gap-4 rounded-2xl border border-line bg-paper-raised/20 p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/20 hover:bg-paper-raised hover:shadow-md hover:shadow-accent/[0.01]"
            >
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-lg font-semibold text-ink group-hover:text-accent transition-colors">
                    {page.data.title}
                  </h2>
                  <StatusDot status={page.data.status} lang={lang} />
                </div>
                <span className="font-mono text-[11px] text-ink-soft/70">
                  {page.data.role} · {page.data.date}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-ink-soft">{page.data.description}</p>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-line/40">
                <div className="flex flex-wrap items-center gap-2">
                  {page.data.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line bg-paper-raised/60 px-2.5 py-0.5 font-mono text-[9px] text-ink-soft transition duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-accent/80 group-hover:text-accent transition-all duration-200 group-hover:gap-2 shrink-0">
                  {t.work.caseStudy}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </main>
  );
}