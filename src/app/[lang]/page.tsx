import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Code2, ShieldCheck, Bot, CalendarDays, Users } from "lucide-react";
import { TestimonialsSection } from "@/components/testimonials-section";
import { getWorkPages, getWritingPages } from "@/lib/source";
import { ProjectCard } from "@/components/project-card";
import { getT, type Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/scroll-reveal";
import { LinkedinIcon, GithubIcon, WhatsappIcon } from "@/components/icons";
import { BLUR_DATA_URL } from "@/lib/blur";
import { SERVICES_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ lang: Language }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = getT(lang);
  return createPageMetadata({
    lang,
    title: t.hero.status,
    description: t.hero.bio,
    path: "",
  });
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const t = getT(lang);

  const work = getWorkPages(lang);

  const writing = getWritingPages(lang)
    .filter((p) => p.url !== "/writing/inertia-laravel-react")
    .slice(0, 5);

  return (
    <main id="main-content" className="mx-auto max-w-3xl px-6 pb-24">
      {/* ---------- HERO ---------- */}
      <section className="pt-10 pb-24 sm:pt-18 sm:pb-36">
        {/* Avatar */}
        {/*<div*/}
        {/*  className="fade-up mb-8"*/}
        {/*  style={{ animationDelay: "0ms" }}*/}
        {/*>*/}
        {/*  /!* eslint-disable-next-line @next/next/no-img-element *!/*/}
        {/*  <img*/}
        {/*    src="/profile/profil.png"*/}
        {/*    alt="Samen Steeve"*/}
        {/*    className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-line object-cover object-[center_15%] shadow-md ring-4 ring-paper"*/}
        {/*  />*/}
        {/*</div>*/}

        <p
          className="fade-up font-mono text-xs uppercase tracking-widest text-ink-soft"
          style={{ animationDelay: "60ms" }}
        >
          {t.hero.location}
        </p>
        <h1
          className="fade-up font-display mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl text-ink"
          style={{ animationDelay: "120ms" }}
        >
          Samen Steeve
        </h1>
        <div
          className="fade-up mt-5 inline-flex items-center gap-2.5 rounded-full border border-line bg-paper-raised/60 px-4 py-1.5 shadow-sm backdrop-blur"
          style={{ animationDelay: "180ms" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">
            {t.hero.status}
          </span>
        </div>
        <p
          className="fade-up mt-6 max-w-xl text-lg text-ink-soft"
          style={{ animationDelay: "240ms" }}
        >
          {t.hero.bio}
        </p>
        <div
          className="fade-up mt-10 flex gap-4"
          style={{ animationDelay: "320ms" }}
        >
          <Link
            href={`/${lang}/writing`}
            className="rounded-full border border-line bg-paper-raised/40 px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink transition-all duration-300 hover:scale-105 hover:border-accent/30 hover:bg-paper-raised hover:text-accent hover:shadow-md active:scale-[0.96]"
          >
            {t.hero.readPosts}
          </Link>
          <a
            href="https://cal.com/samen-steeve/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-paper transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/15 active:scale-[0.96]"
          >
            <CalendarDays className="h-3.5 w-3.5" />
            {t.hero.scheduleMeeting}
          </a>
        </div>

        {/* Let's Connect */}
        <div
          className="fade-up mt-12 pt-10 border-t border-line max-w-sm"
          style={{ animationDelay: "400ms" }}
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink/80">
            Let&apos;s connect
          </p>
          <div className="mt-5 flex gap-6 text-ink-soft">
            <a
              href="mailto:contact@samensteeve.com"
              className="transition-all duration-200 hover:text-accent hover:scale-110 active:scale-[0.96]"
              aria-label="Email"
            >
              <Mail className="h-7 w-7" />
            </a>
            <a
              href="https://linkedin.com/in/samensteeve"
              target="_blank"
              rel="noopener noreferrer me"
              className="transition-all duration-200 hover:text-accent hover:scale-110 active:scale-[0.96]"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-7 w-7" />
            </a>
            <a
              href="https://github.com/samsteeven"
              target="_blank"
              rel="noopener noreferrer me"
              className="transition-all duration-200 hover:text-accent hover:scale-110 active:scale-[0.96]"
              aria-label="GitHub"
            >
              <GithubIcon className="h-7 w-7" />
            </a>
            <a
              href="https://wa.me/237654557446"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:text-accent hover:scale-110 active:scale-[0.96]"
              aria-label="WhatsApp"
            >
              <WhatsappIcon className="h-7 w-7" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- ABOUT ---------- */}
      <section id="about" className="py-28 sm:py-36">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-semibold">{t.about.title}</h2>
        </ScrollReveal>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Cards informatives : Qui je suis + Stack */}
          {[
            { q: t.about.q1, a: t.about.a1 },
            { q: t.about.q2, a: t.about.a2 },
          ].map((item, i) => (
            <ScrollReveal key={item.q} delay={i * 80} className="h-full">
              <div className="flex flex-col h-full rounded-2xl border border-line bg-paper-raised/40 p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/35 hover:bg-paper-raised hover:shadow-md">
                <p className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                  {item.q}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{item.a}</p>
              </div>
            </ScrollReveal>
          ))}

          {/* Card Services — design épuré, contenu en grille aérée avec icônes */}
          <ScrollReveal delay={160} className="md:col-span-2">
            <div className="flex flex-col rounded-2xl border border-line bg-paper-raised/40 p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/35 hover:bg-paper-raised hover:shadow-md">
              <p className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                {t.about.q3}
              </p>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {t.about.services.map((service, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  {i === 0 && <Code2 className="mt-1 h-4.5 w-4.5 shrink-0 text-accent" />}
                  {i === 1 && <ShieldCheck className="mt-1 h-4.5 w-4.5 shrink-0 text-accent" />}
                  {i === 2 && <Bot className="mt-1 h-4.5 w-4.5 shrink-0 text-accent" />}
                  {i === 3 && <Users className="mt-1 h-4.5 w-4.5 shrink-0 text-accent" />}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-ink leading-tight">{service.title}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{service.desc}</p>
                  </div>
                </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Card CTA — fond sombre premium, boutons cliquables, mise en page aérée et horizontale */}
          <ScrollReveal delay={240} className="md:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-2xl bg-ink p-8 shadow-lg">
              <div className="max-w-md">
                <p className="font-mono text-xs uppercase tracking-wider text-paper/45 font-semibold">
                  {t.about.q4}
                </p>
                <p className="mt-4 text-base font-semibold leading-snug text-paper">
                  {t.about.ctaTitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">
                  {t.about.ctaSubtitle}
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
                <a
                  href="https://cal.com/samen-steeve/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-mono text-xs uppercase tracking-wider text-white shadow transition-all duration-200 hover:opacity-90 hover:shadow-md hover:shadow-accent/30 active:scale-[0.96]"
                >
                  <CalendarDays className="h-3.5 w-3.5" />
                  {t.about.ctaButton}
                </a>
                <a
                  href="mailto:contact@samensteeve.com"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-paper/20 px-5 py-3 font-mono text-xs uppercase tracking-wider text-paper/75 transition-all duration-200 hover:border-paper/40 hover:text-paper hover:bg-paper/5 active:scale-[0.96]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  contact@samensteeve.com
                </a>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ---------- STACK ---------- */}
      <section id="stack" className="border-t border-line py-28 sm:py-36">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-semibold">{t.stack.title}</h2>
        </ScrollReveal>
        <div className="mt-8 flex flex-col divide-y divide-line">
          {t.stack.items.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 60}>
              <div
                className="group flex items-center justify-between gap-5 py-5 -mx-4 px-4 rounded-xl transition-all duration-300 ease-out hover:bg-paper-raised/40 hover:translate-x-2"
              >
                {/* Numéro */}
                <span className="shrink-0 w-8 font-mono text-[11px] text-ink-soft/40 tabular-nums select-none group-hover:text-accent/60 transition-colors">
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

                {/* Flèche cliquable */}
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-2 -mr-2 rounded-lg text-ink-soft/30 hover:text-accent hover:bg-accent/5 transition-all duration-200"
                    aria-label={`Visit ${item.name}`}
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ---------- WORK ---------- */}
      <section id="work" className="border-t border-line py-28 sm:py-36">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-2xl font-semibold">{t.work.title}</h2>
            <Link
              href={`/${lang}/work`}
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-ink-soft transition hover:text-accent"
            >
              {t.work.seeAll} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </ScrollReveal>
         <div className="mt-8 flex flex-col gap-4">
          {work.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 80}>
                <ProjectCard
                  project={{
                    title: p.title,
                    description: p.description,
                    date: p.date,
                    role: p.role,
                    stack: p.stack,
                    status: p.status,
                    url: p.url,
                    slug: p.slug,
                  }}
                  lang={lang}
                />
              </ScrollReveal>
            ))}
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section id="testimonials" className="border-t border-line py-28 sm:py-36">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-semibold">{t.testimonials.title}</h2>
          <p className="mt-2 text-sm text-ink-soft">{t.testimonials.subtitle}</p>
        </ScrollReveal>
        <TestimonialsSection items={t.testimonials.items} />
      </section>

      {/* ---------- WRITING ---------- */}
      {writing.length > 0 && (
      <section id="writing" className="border-t border-line py-28 sm:py-36">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-2xl font-semibold">{t.writing.title}</h2>
            <Link
              href={`/${lang}/writing`}
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-ink-soft transition hover:text-accent"
            >
              {t.writing.seeAll} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="flex flex-col divide-y divide-line">
          {writing.map((item, i) => {
            const readLabel = `${item.readTime} ${t.writing.minRead}`;

            return (
              <ScrollReveal key={`${item.lang}-${item.url}`} delay={i * 70}>
                <Link
                  href={`/${lang}${item.url}`}
                  className="group flex items-start gap-5 py-6 transition-all duration-300 ease-out -mx-4 px-4 rounded-2xl hover:bg-paper-raised/60 hover:shadow-sm hover:shadow-accent/[0.01] hover:-translate-y-0.5"
                >
                  {/* Miniature à gauche */}
                  <div className="relative shrink-0 w-32 h-24 sm:w-40 sm:h-28 rounded-xl overflow-hidden border border-line bg-paper-raised">
{item.cover ? (
                      <Image
                        src={item.cover}
                        alt={item.title}
                        fill
                        sizes="160px"
                        className="object-cover transition-transform duration-500 group-hover:scale-103"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold text-ink-soft/15 select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  {/* Contenu à droite */}
                  <div className="flex-1 min-w-0">
                    {/* Date + temps de lecture */}
                    <div className="flex items-center gap-2 mb-1.5 font-mono text-xs text-ink-soft">
                      <span>{item.date}</span>
                      <span>·</span>
                      <span className="text-ink-soft">{readLabel}</span>
                    </div>

                    {/* Titre */}
                    <h3 className="font-display text-lg font-semibold text-ink group-hover:text-accent transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-1.5 text-sm text-ink-soft line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tags */}
                    {item.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map((tag: string) => (
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
              </ScrollReveal>
            );
          })}
        </div>
      </section>
      )}

      {/* ---------- SERVICES CTA ---------- */}
      <ScrollReveal delay={100}>
        <section className="border-t border-line py-28 sm:py-36 text-center flex flex-col items-center">
          <div className="max-w-xl relative p-8 md:p-12 rounded-3xl border border-line bg-paper-raised/30 overflow-hidden shadow-sm transition duration-300 hover:border-accent/30">
            {/* Blueprint Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 pointer-events-none" />
            
            <p className="font-mono text-xs uppercase tracking-widest text-accent font-semibold relative z-10 mb-4">
              {lang === "fr" ? "SERVICES PROFESSIONNELS" : "PROFESSIONAL SERVICES"}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink leading-tight relative z-10">
              {t.servicesCta.title}
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-ink-soft relative z-10 max-w-md mx-auto">
              {t.servicesCta.subtitle}
            </p>
            <div className="mt-8 relative z-10">
              <a
                href={`${SERVICES_URL}/${lang}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-paper transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/15 active:scale-[0.96]"
              >
                {t.servicesCta.button}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
