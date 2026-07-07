import { test, expect } from "@playwright/test";

test.describe("Navigation principale", () => {
  test("la page d'accueil FR affiche le hero et la nav", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.getByRole("heading", { level: 1, name: "Samen Steeve" })).toBeVisible();
    // Liens de nav présents
    await expect(page.getByRole("link", { name: "Travail" })).toBeVisible();
    await expect(page.getByRole("link", { name: "À propos" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Écrits" })).toBeVisible();
  });

  test("la page /fr/writing liste les articles FR", async ({ page }) => {
    await page.goto("/fr/writing");
    await expect(page.getByRole("heading", { level: 1, name: "Écrits" })).toBeVisible();
    // Au moins un article publié en FR existant
    await expect(page.getByRole("link", { name: /sécurité m'a appris/i })).toBeVisible();
  });

  test("la page /fr/work liste les projets", async ({ page }) => {
    await page.goto("/fr/work");
    await expect(page.getByRole("link", { name: /Tribunejustice/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /DIGITRANS-CM/ })).toBeVisible();
  });

  test("ouverture d'un article de détail writing", async ({ page }) => {
    await page.goto("/fr/writing/securite-et-code");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Le TOC mobile (details) est présent en dessous de xl
    await expect(page.locator("details").first()).toBeVisible();
  });

  test("le switch de langue FR -> EN bascule le slug article identique", async ({ page }) => {
    await page.goto("/fr/writing/securite-et-code");
    const enLink = page.getByRole("link", { name: "EN", exact: true });
    await enLink.click();
    await expect(page).toHaveURL(/\/en\/writing\/securite-et-code$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("404 sur route inexistante", async ({ page }) => {
    await page.goto("/fr/route-inexistante-xyz");
    await expect(page.getByText(/n'existe pas ou a été déplacée/i)).toBeVisible();
  });
});