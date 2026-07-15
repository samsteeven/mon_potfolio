import type { ReactNode } from "react";

/** Extrait récursivement le texte brut d'un ReactNode. */
export function getTextContent(children: ReactNode): string {
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
