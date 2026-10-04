import { notFound } from "next/navigation";

// Chemins inconnus : 404 directe, jamais de rendu/écriture ISR à la demande.
export const dynamicParams = false;

export function generateStaticParams() {
  return [];
}

export default function CatchAllPage() {
  notFound();
}
