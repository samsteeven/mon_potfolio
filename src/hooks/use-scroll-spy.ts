"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Observe une liste d'IDs de section et retourne l'ID de la section
 * visible la plus proche du haut de la page.
 *
 * @param sectionIds — ex: ["about", "work"]
 * @param deps — dépendances qui déclenchent une re-observation (ex: [isHome])
 * @returns l'ID de la section active, ou null
 */
export function useScrollSpy(
  sectionIds: string[],
  deps: React.DependencyList = [],
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return activeId;
}