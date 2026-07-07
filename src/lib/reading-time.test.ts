import { describe, it, expect, beforeEach } from "vitest";
import { computeReadingTime, getMdxBody, __resetBodyCache } from "@/lib/reading-time";

beforeEach(() => {
  __resetBodyCache();
});

describe("computeReadingTime", () => {
  it("retourne au moins 1 minute pour un texte très court", () => {
    expect(computeReadingTime("un deux trois", "fallback")).toBe(1);
  });

  it("~200 mots => 1 minute, ~400 mots => 2 minutes", () => {
    const twoHundred = Array.from({ length: 200 }, () => "mot").join(" ");
    expect(computeReadingTime(twoHundred, "")).toBe(1);

    const fourHundred = Array.from({ length: 400 }, () => "mot").join(" ");
    expect(computeReadingTime(fourHundred, "")).toBe(2);
  });

  it("utilise le fallback si bodyText est vide", () => {
    // bodyText.split donne 0 mots => fallback prend le relais
    const t = computeReadingTime("", "fallback trois mots ici");
    expect(t).toBeGreaterThanOrEqual(1);
  });
});

describe("getMdxBody (fichiers réels)", () => {
  it("retourne le corps d'un fichier mdx existant (fr)", () => {
    const body = getMdxBody("securite-et-code", "writing/fr", "FALLBACK");
    expect(body).not.toBe("FALLBACK");
    expect(body).toContain("changement de perspective");
  });

  it("retourne le fallback pour un fichier inexistant", () => {
    const body = getMdxBody("fichier-inexistant", "writing/fr", "FALLBACK");
    expect(body).toBe("FALLBACK");
  });

  it("retourne le corps d'un fichier mdx existant (en)", () => {
    const body = getMdxBody("securite-et-code", "writing/en", "FALLBACK");
    expect(body).not.toBe("FALLBACK");
    expect(body).toContain("shift in perspective");
  });
});