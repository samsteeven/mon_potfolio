import { describe, it, expect, beforeEach } from "vitest";
import {
  computeReadingTime,
  getPageContent,
  getMdxBody,
  __resetBodyCache,
} from "@/lib/reading-time";

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
    expect(computeReadingTime("", "fallback trois mots ici")).toBeGreaterThanOrEqual(1);
  });
});

describe("getPageContent", () => {
  it("retourne body + readTime en une seule lecture (fichier réel fr)", () => {
    const { body, readTime } = getPageContent("securite-et-code", "writing/fr", "FALLBACK");
    expect(body).not.toBe("FALLBACK");
    expect(body).toContain("changement de perspective");
    expect(readTime).toBeGreaterThanOrEqual(1);
  });

  it("retourne body + readTime (fichier réel en)", () => {
    const { body, readTime } = getPageContent("securite-et-code", "writing/en", "FALLBACK");
    expect(body).not.toBe("FALLBACK");
    expect(body).toContain("shift in perspective");
    expect(readTime).toBeGreaterThanOrEqual(1);
  });

  it("utilise le fallback pour un fichier inexistant", () => {
    const { body, readTime } = getPageContent("fichier-inexistant", "writing/fr", "FALLBACK");
    expect(body).toBe("FALLBACK");
    expect(readTime).toBeGreaterThanOrEqual(1);
  });
});

describe("getMdxBody (rétrocompatibilité)", () => {
  it("retourne le corps d'un fichier existant", () => {
    const body = getMdxBody("securite-et-code", "writing/fr", "FALLBACK");
    expect(body).toContain("changement de perspective");
  });

  it("retourne le fallback pour un fichier inexistant", () => {
    expect(getMdxBody("fichier-inexistant", "writing/fr", "FALLBACK")).toBe("FALLBACK");
  });
});