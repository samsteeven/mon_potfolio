import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { workSource, writingSource } from "@/lib/source";
import { StatusDot } from "@/components/status-dot";
import { translations, type Language } from "@/lib/translations";
import { LanguageFlag } from "@/components/language-flag";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

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
  const writing = allWriting.slice(0, 5);

  return (
    <main className="mx-auto max-w-3xl px-6">
      {/* ---------- HERO ---------- */}
      <section className="py-24 sm:py-32">
        {/* Avatar */}
        <div
          className="fade-up mb-8"
          style={{ animationDelay: "0ms" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar.png"
            alt="Samen Steeve"
            className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-2 border-line object-cover shadow-md"
          />
        </div>

        <p
          className="fade-up font-mono text-xs uppercase tracking-widest text-ink-soft"
          style={{ animationDelay: "60ms" }}
        >
          {t.hero.location}
        </p>
        <h1
          className="fade-up mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl"
          style={{ animationDelay: "120ms" }}
        >
          Samen Steeve
        </h1>
        <p
          className="fade-up mt-4 max-w-xl text-lg text-ink-soft"
          style={{ animationDelay: "180ms" }}
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
            href={`/${lang}/writing`}
            className="rounded-full border border-line bg-paper-raised/40 px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink transition-all duration-300 hover:scale-105 hover:border-accent/30 hover:bg-paper-raised hover:text-accent hover:shadow-md active:scale-95"
          >
            {t.hero.readPosts}
          </Link>
          <a
            href="mailto:samendjiaha@gmail.com"
            className="rounded-full bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-paper transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/15 active:scale-95"
          >
            {t.hero.scheduleMeeting}
          </a>
        </div>

        {/* Let's Connect */}
        <div
          className="fade-up mt-16 pt-8 border-t border-line/50 max-w-xs"
          style={{ animationDelay: "400ms" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft/60">
            Let&apos;s connect
          </p>
          <div className="mt-4 flex gap-5 text-ink-soft">
            <a
              href="mailto:samendjiaha@gmail.com"
              className="transition-all duration-200 hover:text-accent hover:scale-110"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/samsteeven"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:text-accent hover:scale-110"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/samsteeven"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:text-accent hover:scale-110"
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
          </div>
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
        <div className="mt-8 flex flex-col divide-y divide-line">
          {t.stack.items.map((item, i) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="fade-up group flex items-center gap-5 py-5 transition-all duration-200 hover:bg-paper-raised/40 -mx-4 px-4 rounded-xl"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Numéro */}
              <span className="shrink-0 w-8 font-mono text-[11px] text-ink-soft/40 tabular-nums select-none group-hover:text-accent/50 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Contenu */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base font-semibold text-ink group-hover:text-accent transition-colors">
                  {item.name}
                </h3>
                <p className="mt-0.5 text-sm text-ink-soft leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Flèche */}
              <ArrowUpRight className="shrink-0 h-4 w-4 text-ink-soft/30 transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
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
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-semibold transition group-hover:text-accent">
                        {page.data.title}
                      </h3>
                      <StatusDot status={page.data.status} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 self-start font-mono text-[10px] text-accent/80 border border-accent/20 bg-accent/5 rounded px-1.5 py-0.5">
                      <span>
                        {lang === "en" ? `In ${pageLangLabel}` : `En ${pageLangLabel}`}
                      </span>
                      <LanguageFlag lang={(page.data.lang as Language) || "fr"} />
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 mt-1 text-ink-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
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
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-2xl font-semibold">{t.writing.title}</h2>
          <Link
            href={`/${lang}/writing`}
            className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-ink-soft transition hover:text-accent"
          >
            {t.writing.seeAll} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex flex-col divide-y divide-line">
          {writing.map((page, i) => {
            const pageLangLabel = page.data.lang === "en"
              ? (lang === "en" ? "English" : "Anglais")
              : (lang === "en" ? "French" : "Français");

            return (
              <Link
                key={page.url}
                href={`/${lang}${page.url}`}
                style={{ animationDelay: `${i * 70}ms` }}
                className="fade-up group flex items-start gap-5 py-6 transition-all duration-200 -mx-2 px-2 rounded-xl hover:bg-paper-raised/50"
              >
                {/* Miniature à gauche */}
                <div className="shrink-0 w-32 h-24 sm:w-40 sm:h-28 rounded-xl overflow-hidden border border-line bg-paper-raised flex items-center justify-center">
                  {page.data.cover ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={page.data.cover}
                      alt={page.data.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="font-mono text-2xl font-bold text-ink-soft/15 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>

                {/* Contenu à droite */}
                <div className="flex-1 min-w-0">
                  {/* Date + badge langue */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs text-ink-soft/60">{page.data.date}</span>
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] text-accent/70 border border-accent/20 bg-accent/5 rounded px-1.5 py-0.5">
                      {pageLangLabel}
                      <LanguageFlag lang={(page.data.lang as Language) || "fr"} />
                    </span>
                  </div>

                  {/* Titre */}
                  <h3 className="font-display text-lg font-semibold text-ink group-hover:text-accent transition-colors leading-snug">
                    {page.data.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-1.5 text-sm text-ink-soft line-clamp-2">
                    {page.data.description}
                  </p>

                  {/* Tags */}
                  {page.data.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {page.data.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line bg-paper-raised/60 px-2.5 py-0.5 font-mono text-[10px] text-ink-soft group-hover:border-accent/20 group-hover:text-accent/70 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
