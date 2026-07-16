import { Calendar, Download, Mail } from "lucide-react";
import { getT, type Language } from "@/lib/translations";
import { LinkedinIcon, GithubIcon, WhatsappIcon } from "@/components/icons";

export function SiteFooter({ lang }: { lang: Language }) {
  const t = getT(lang);
  const year = new Date().getFullYear();
  const waMsg = lang === "en" ? "Hello%21%20I%27d%20like%20to%20discuss%20a%20project." : "Bonjour%20%21%20Je%20souhaite%20discuter%20d%27un%20projet.";

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
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] text-ink-soft/70">
              <span>{t.footer.specialty}</span>
              <span className="text-ink-soft/25" aria-hidden="true">·</span>
              <a
                href="/cv-samen-steeve.pdf"
                download
                className="inline-flex items-center gap-1 font-semibold text-ink-soft/65 transition duration-200 hover:text-accent"
                aria-label={t.footer.downloadCv}
              >
                <Download className="h-3 w-3" />
                {t.footer.cv}
              </a>
            </span>
            <span className="font-mono text-[10px] text-ink-soft/40">
              © {year} Samen Steeve — {t.footer.rights}
            </span>
          </div>

          {/* Icônes des réseaux sociaux */}
          <div className="flex items-center gap-5 text-ink-soft">
            <a
              href="mailto:contact@samensteeve.com"
              className="transition-all duration-200 hover:text-accent hover:scale-110 active:scale-[0.96]"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/samensteeve"
              target="_blank"
              rel="noopener noreferrer me"
              className="transition-all duration-200 hover:text-accent hover:scale-110 active:scale-[0.96]"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/samsteeven"
              target="_blank"
              rel="noopener noreferrer me"
              className="transition-all duration-200 hover:text-accent hover:scale-110 active:scale-[0.96]"
              aria-label="GitHub"
            >
              <GithubIcon className="h-6 w-6" />
            </a>
            <a
              href={`https://wa.me/237654557446?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer me"
              className="transition-all duration-200 hover:text-accent hover:scale-110 active:scale-[0.96]"
              aria-label="WhatsApp"
            >
              <WhatsappIcon className="h-6 w-6" />
            </a>
          </div>

        </div>

        {/* CTA meeting & Services link */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="https://cal.com/samen-steeve/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-paper transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/15 active:scale-[0.96]"
          >
            <Calendar className="h-3.5 w-3.5" />
            {t.footer.bookCall}
          </a>
          <a
            href={`https://services.samensteeve.com/${lang}`}
            className="font-mono text-xs font-bold text-accent hover:underline flex items-center gap-1.5 transition duration-200"
          >
            {t.nav.services} &rarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
