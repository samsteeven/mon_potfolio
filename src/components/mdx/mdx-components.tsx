import type { MDXComponents } from "mdx/types";
import { getTextContent } from "@/lib/text";
import { 
  ZoomableImage,
  PreBlock,
  Callout,
  CodeWindow,
  CardGrid,
  Card,
} from "./mdx-client";

// Génère un id slugifié à partir du texte enfant d'un heading
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Mapping des balises MDX par défaut vers les styles du design retenu.
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    h2: ({ children, ...props }) => {
      const id = slugify(getTextContent(children));
      return (
        <h2
          id={id}
          className="mt-10 mb-4 font-display text-2xl font-semibold scroll-mt-24 text-balance"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const id = slugify(getTextContent(children));
      return (
        <h3
          id={id}
          className="mt-8 mb-3 font-display text-xl font-semibold scroll-mt-24 text-balance"
          {...props}
        >
          {children}
        </h3>
      );
    },
    p: (props) => <p className="mb-4 leading-relaxed text-ink-soft text-pretty" {...props} />,
    a: (props) => <a className="text-accent underline hover:opacity-80" {...props} />,
    strong: (props) => <strong className="font-semibold text-ink" {...props} />,
    blockquote: (props) => (
      <blockquote className="my-6 border-l-4 border-accent/40 bg-paper-raised/20 py-3 pl-5 pr-4 font-display italic text-ink-soft rounded-r-lg" {...props} />
    ),
    hr: (props) => <hr className="my-10 border-0 h-px bg-line" {...props} />,
    ul: (props) => <ul className="mb-6 list-disc pl-6 text-ink-soft space-y-1.5" {...props} />,
    ol: (props) => <ol className="mb-6 list-decimal pl-6 text-ink-soft space-y-1.5" {...props} />,
    li: (props) => <li className="mb-1" {...props} />,
    table: (props) => (
      <div className="my-6 w-full overflow-x-auto rounded-xl border border-line bg-paper-raised/10">
        <table className="w-full text-left text-sm text-ink-soft border-collapse" {...props} />
      </div>
    ),
    thead: (props) => <thead className="border-b border-line bg-paper-raised/60 text-ink font-semibold" {...props} />,
    tbody: (props) => <tbody className="divide-y divide-line" {...props} />,
    tr: (props) => <tr className="hover:bg-paper-raised/20 transition-colors" {...props} />,
    th: (props) => <th className="px-4 py-3 font-semibold text-ink" {...props} />,
    td: (props) => <td className="px-4 py-3 leading-relaxed" {...props} />,
    code: (props) => (
      <code
        className="font-mono text-sm"
        {...props}
      />
    ),
    pre: ({ children, ...props }) => (
      <PreBlock {...props}>{children}</PreBlock>
    ),
    // Les images MDX deviennent automatiquement interactives et zoomables
    img: ({ src, alt }) => (
      <ZoomableImage src={src || ""} alt={alt || ""} />
    ),
    // Export des composants riches pour être utilisables dans les fichiers MDX
    Callout,
    CodeWindow,
    CardGrid,
    Card,
    ...components,
  };
}

export { ZoomableImage, PreBlock } from "./mdx-client";
