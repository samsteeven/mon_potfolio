import { describe, it, expect } from "vitest";
import { leafSlug } from "@/lib/slug";

describe("leafSlug", () => {
  it("retourne le dernier segment d'un slug imbriqué", () => {
    expect(leafSlug(["fr", "mon-article"])).toBe("mon-article");
    expect(leafSlug(["en", "react-laravel-inertia"])).toBe("react-laravel-inertia");
  });

  it("retourne le seul segment quand il n'y en a qu'un (collection work)", () => {
    expect(leafSlug(["tribunejustice"])).toBe("tribunejustice");
  });
});