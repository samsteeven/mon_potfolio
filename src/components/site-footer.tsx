import { Calendar, Mail } from "lucide-react";
import { translations, type Language } from "@/lib/translations";
import { LinkedinIcon, GithubIcon } from "@/components/icons";

export function SiteFooter({ lang }: { lang: Language }) {
  const t = translations[lang] || translations.en;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper relative z-10">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Identité + copyright */}
          <div className="flex flex-col gap-1.5">
            <span
              className="font-display text-base font-extrabold tracking-tight text-ink"
            >
              Samen Steeve
            </span>
            <span className="font-mono text-[10px] text-ink-soft/70">
              {t.footer.specialty}
            </span>
            <span className="font-mono text-[10px] text-ink-soft/40">
              © {year} Samen Steeve — {t.footer.rights}
            </span>
          </div>

          {/* Icônes des réseaux sociaux */}
          <div className="flex items-center gap-5 text-ink-soft">
            <a
              href="mailto:contact@samensteeve.com"
              className="transition-all duration-200 hover:text-accent hover:scale-110"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/samsteeven"
              target="_blank"
              rel="noopener noreferrer me"
              className="transition-all duration-200 hover:text-accent hover:scale-110"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/samsteeven"
              target="_blank"
              rel="noopener noreferrer me"
              className="transition-all duration-200 hover:text-accent hover:scale-110"
              aria-label="GitHub"
            >
              <GithubIcon className="h-6 w-6" />
            </a>
          </div>

        </div>

        {/* CTA meeting */}
        <div className="mt-8 flex justify-center sm:justify-start">
          <a
            href="https://cal.com/samen-steeve/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-paper transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/15 active:scale-95"
          >
            <Calendar className="h-3.5 w-3.5" />
            {t.footer.bookCall}
          </a>
        </div>
      </div>
    </footer>
  );
}
