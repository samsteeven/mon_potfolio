import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StatusDot } from "@/components/status-dot";
import type { Language } from "@/lib/translations";

interface ProjectCardData {
  title: string;
  description: string;
  date: string;
  role: string;
  stack: string[];
  status: "shipped" | "in-progress";
  url?: string;
  slug: string;
}

export function ProjectCard({
  project,
  lang,
}: {
  project: ProjectCardData;
  lang: Language;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-paper-raised/20 p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/20 hover:bg-paper-raised hover:shadow-md hover:shadow-accent/[0.01]">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-lg font-semibold text-ink">
            {project.title}
          </h3>
          <StatusDot status={project.status} lang={lang} />
        </div>
        <span className="font-mono text-[11px] text-ink-soft/70">
          {project.role} · {project.date}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-ink-soft">{project.description}</p>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-line/40">
        <div className="flex flex-wrap items-center gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line bg-paper-raised/60 px-2.5 py-0.5 font-mono text-[9px] text-ink-soft transition duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-accent/80 hover:text-accent transition-all duration-200 hover:gap-2 shrink-0"
            >
              {project.url.startsWith("https://github.com")
                ? (lang === "en" ? "View repository" : "Voir le dépôt")
                : (lang === "en" ? "Visit site" : "Voir le site")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          <Link
            href={`/${lang}/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-accent/80 hover:text-accent transition-all duration-200 hover:gap-2 shrink-0"
          >
            {lang === "en" ? "Read case study" : "Lire l'étude de cas"}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Trie les projets : featured en premier, puis par date décroissante. */
export function sortByFeaturedAndDate(
  a: { data: { featured: boolean; date: string } },
  b: { data: { featured: boolean; date: string } },
): number {
  if (b.data.featured !== a.data.featured) {
    return Number(b.data.featured) - Number(a.data.featured);
  }
  return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
}