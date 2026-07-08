import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import Image from "next/image";

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

function getTextContent(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (
    children !== null &&
    typeof children === "object" &&
    "props" in (children as object)
  ) {
    return getTextContent(
      (children as { props: { children?: ReactNode } }).props.children
    );
  }
  return "";
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
    ul: (props) => <ul className="mb-4 list-disc pl-6 text-ink-soft" {...props} />,
    ol: (props) => <ol className="mb-4 list-decimal pl-6 text-ink-soft" {...props} />,
    li: (props) => <li className="mb-1" {...props} />,
    code: (props) => (
      <code
        className="font-mono text-sm"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="mb-6 w-full max-w-full overflow-x-auto rounded-lg border border-line bg-paper-raised p-4 font-mono text-sm"
        {...props}
      />
    ),
    img: ({ src, alt }) => (
      <Image
        src={src || ""}
        alt={alt || ""}
        width={1200}
        height={675}
        className="my-6 h-auto w-full rounded-lg border border-line"
        sizes="(max-width: 768px) 100vw, 672px"
      />
    ),
    ...components,
  };
}
