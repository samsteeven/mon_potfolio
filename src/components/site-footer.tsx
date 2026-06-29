import { translations, type Language } from "@/lib/translations";

export function SiteFooter({ lang }: { lang: Language }) {
  const t = translations[lang] || translations.en;

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-10 font-mono text-[11px] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <span className="tracking-wide">{t.footer.location}</span>
        <div className="flex gap-4">
          <a href="mailto:contact@exemple.com" className="transition duration-200 hover:text-accent">
            Email
          </a>
          <a href="#" className="transition duration-200 hover:text-accent">
            LinkedIn
          </a>
          <a href="#" className="transition duration-200 hover:text-accent">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
