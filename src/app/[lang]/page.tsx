import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { workSource, writingSource } from "@/lib/source";
import { StatusDot } from "@/components/status-dot";
import { translations, type Language } from "@/lib/translations";

interface PageProps {
  params: Promise<{ lang: Language }>;
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const t = translations[lang] || translations.en;

  const work = workSource
    .getPages()
    .sort((a, b) => Number(b.data.featured) - Number(a.data.featured));

  const allWriting = writingSource
    .getPages()
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
  const writing = allWriting.slice(0, 3);

  return (
    <main className="mx-auto max-w-3xl px-6">
      {/* ---------- HERO ---------- */}
      <section className="py-24 sm:py-32">
        <p
          className="fade-up font-mono text-xs uppercase tracking-widest text-ink-soft"
          style={{ animationDelay: "0ms" }}
        >
          {t.hero.location}
        </p>
        <h1
          className="fade-up mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl"
          style={{ animationDelay: "80ms" }}
        >
          Samen Steeve
        </h1>
        <p
          className="fade-up mt-4 max-w-xl text-lg text-ink-soft"
          style={{ animationDelay: "160ms" }}
        >
          {t.hero.bio}
        </p>
        <div
          className="fade-up mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-paper-raised/60 px-4 py-1.5 shadow-sm backdrop-blur"
          style={{ animationDelay: "240ms" }}
        >
          <StatusDot status="in-progress" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
            {t.hero.status}
          </span>
        </div>
        <div
          className="fade-up mt-10 flex gap-4"
          style={{ animationDelay: "320ms" }}
        >
          <Link
            href="#work"
            className="rounded-full bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-paper transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/15 active:scale-95"
          >
            {t.hero.viewWork}
          </Link>
          <a
            href="mailto:contact@exemple.com"
            className="rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink transition-all duration-300 hover:scale-105 hover:border-accent hover:bg-paper-raised hover:text-accent active:scale-95"
          >
            {t.hero.contact}
          </a>
        </div>
      </section>

      {/* ---------- ABOUT ---------- */}
      <section id="about" className="border-t border-line py-20">
        <h2 className="font-display text-2xl font-semibold">{t.about.title}</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { q: t.about.q1, a: t.about.a1 },
            { q: t.about.q2, a: t.about.a2 },
            { q: t.about.q3, a: t.about.a3 },
          ].map((item, i) => (
            <div
              key={item.q}
              className="fade-up flex flex-col justify-between rounded-2xl border border-line bg-paper-raised/40 p-6 shadow-sm transition-all duration-300 hover:border-accent/30 hover:bg-paper-raised hover:shadow-md"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                  {item.q}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- STACK ---------- */}
      <section id="stack" className="border-t border-line py-20">
        <h2 className="font-display text-2xl font-semibold">{t.stack.title}</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {t.stack.items.map((item, i) => (
            <div
              key={item.name}
              className="fade-up flex flex-col justify-between rounded-2xl border border-line bg-paper-raised/40 p-6 shadow-sm transition-all duration-300 hover:border-accent/30 hover:bg-paper-raised hover:shadow-md"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                  {item.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- WORK ---------- */}
      <section id="work" className="border-t border-line py-20">
        <h2 className="font-display text-2xl font-semibold">{t.work.title}</h2>
        <div className="mt-8 flex flex-col gap-4">
          {work.map((page, i) => {
            const pageLangLabel = page.data.lang === "en" 
              ? (lang === "en" ? "English 🇬🇧" : "Anglais 🇬🇧") 
              : (lang === "en" ? "French 🇫🇷" : "Français 🇫🇷");

            return (
              <Link
                key={page.url}
                href={`/${lang}${page.url}`}
                style={{ animationDelay: `${i * 80}ms` }}
                className="fade-up group flex flex-col gap-3 rounded-2xl border border-line bg-paper-raised/20 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-paper-raised hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-lg font-semibold transition group-hover:text-accent">
                      {page.data.title}
                    </h3>
                    <StatusDot status={page.data.status} />
                    <span className="font-mono text-[10px] text-accent/80 border border-accent/20 bg-accent/5 rounded px-1.5 py-0.5">
                      {lang === "en" ? `In ${pageLangLabel}` : `En ${pageLangLabel}`}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <p className="text-sm text-ink-soft">{page.data.description}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  {page.data.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-line bg-paper-raised/60 px-2 py-0.5 font-mono text-[10px] text-ink-soft transition duration-300 group-hover:border-accent/15 group-hover:bg-accent/5 group-hover:text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------- WRITING ---------- */}
      <section id="writing" className="border-t border-line py-20">
        <h2 className="font-display text-2xl font-semibold">{t.writing.title}</h2>
        <div className="mt-8 flex flex-col gap-3">
          {writing.map((page, i) => {
            const pageLangLabel = page.data.lang === "en" 
              ? (lang === "en" ? "English 🇬🇧" : "Anglais 🇬🇧") 
              : (lang === "en" ? "French 🇫🇷" : "Français 🇫🇷");

            return (
              <Link
                key={page.url}
                href={`/${lang}${page.url}`}
                style={{ animationDelay: `${i * 80}ms` }}
                className="fade-up group flex flex-col gap-2 rounded-2xl border border-line bg-paper-raised/20 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-paper-raised hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-base font-semibold transition group-hover:text-accent">
                      {page.data.title}
                    </h3>
                    <span className="font-mono text-[10px] text-accent/80 border border-accent/20 bg-accent/5 rounded px-1.5 py-0.5">
                      {lang === "en" ? `In ${pageLangLabel}` : `En ${pageLangLabel}`}
                    </span>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] text-ink-soft">
                    {page.data.date}
                  </span>
                </div>
                <p className="text-sm text-ink-soft line-clamp-2">{page.data.description}</p>
              </Link>
            );
          })}
        </div>
        <Link
          href={`/${lang}/writing`}
          className="mt-6 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-ink-soft transition hover:text-accent"
        >
          {t.writing.seeAll} <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </section>
    </main>
  );
}
