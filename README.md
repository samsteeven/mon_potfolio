# Portfolio — Next.js 16 + Fumadocs MDX

Portfolio bilingue (fr/en) de **Samen Steeve** (samsteeven). Contenu dans des fichiers `.mdx` versionnés avec Git — pas de base de données ni CMS.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Fumadocs MDX** — frontmatter typé (Zod), routing basé sur les fichiers
- **Tailwind CSS v4** (CSS-first, pas de `tailwind.config.js`)
- **lucide-react** — icônes
- **TypeScript strict**
- **postcss-preset-env** — compatibilité navigateurs anciens
- **Vitest** + **Playwright** — tests

## Démarrer

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Internationalisation

Le site est bilingue `/en` et `/fr`. La racine `/` redirige vers `/en` via `src/proxy.ts` (Next.js 16+ — fichier `proxy.ts`, export `function proxy`). Les traductions sont dans `src/lib/i18n/` avec un helper `getT(lang)`.

## Thème

Mode clair/sombre géré par l'attribut `data-theme` sur `<html>`, persisté dans `localStorage` (clé `theme`). Le script anti-flash dans `src/app/layout.tsx` applique le thème avant le premier rendu React. Pas de librairie externe.

## Structure du contenu

```
src/content/
├── work/          → études de cas projets
│   ├── tribunejustice.mdx
│   └── digitram.mdx
└── writing/       → articles de blog
    ├── en/
    │   └── *.mdx
    └── fr/
        └── *.mdx
```

Chaque fichier `.mdx` a un frontmatter typé (Zod dans `source.config.ts`).

**Workflow** : créer le fichier `.mdx` → `git push`. Tout est statique au build.

## Routes

```
src/app/
├── layout.tsx              # Root layout (html, head, script anti-flash, JSON-LD)
├── globals.css             # Tokens Tailwind, animations, mode sombre
├── proxy.ts                # Redirection 308 / → /en
├── sitemap.ts              # Sitemap auto-généré
├── robots.ts               # Robots.txt
└── [lang]/
    ├── layout.tsx          # SiteHeader + SiteFooter
    ├── page.tsx            # Accueil (Hero, À propos, Travail, Écrits)
    ├── not-found.tsx       # 404
    ├── [...catchAll]/
    │   └── page.tsx
    ├── work/
    │   ├── page.tsx        # Liste des projets
    │   └── [slug]/
    │       └── page.tsx    # Détail d'un projet (MDX + TOC + JSON-LD)
    └── writing/
        ├── page.tsx        # Liste des articles (filtre par tag)
        └── [slug]/
            └── page.tsx    # Détail d'un article (MDX + TOC + CopyButtons)
```

## Design

- **Palette** : Tokens CSS `bg-paper`, `text-ink`, `border-line`, `text-accent` — pas de couleurs Tailwind par défaut.
- **Polices** : `font-display` (Instrument Sans), `font-sans` (Inter), `font-mono` (JetBrains Mono) — auto-hébergées via `@fontsource`.
- **Animations** : Une seule classe `.fade-up` dans `globals.css` ; composant `ScrollReveal` pour apparitions au défilement. `prefers-reduced-motion` neutralisé.

## Composants principaux

- `site-header.tsx` — Navigation
- `site-footer.tsx` — Pied de page avec contact
- `theme-toggle.tsx` — Bascule clair/sombre
- `project-card.tsx` — Carte de projet
- `status-dot.tsx` — Indicateur shipped/in-progress
- `writing-list.tsx` — Liste d'articles avec filtre par tag
- `scroll-reveal.tsx` — Animation d'entrée au scroll
- `copy-buttons.tsx` — Partage d'article
- `table-of-contents.tsx` — Table des matières latérale
- `mdx/mdx-components.tsx` — Rendu MDX custom

## SEO

- JSON-LD `schema.org/Person` dans le root layout
- `createPageMetadata()` dans `src/lib/metadata.ts` — canonical, hreflang, OpenGraph, Twitter cards
- Sitemap auto-généré
- `x-default` pointé vers `/fr`

## Commandes

```bash
npm run dev           # Serveur de développement
npm run build         # Build de production
npm run lint          # ESLint
npm run test          # Tests unitaires (Vitest)
npm run test:e2e      # Tests e2e (Playwright)
```

## Déploiement

Optimisé pour **Vercel** avec domaine **samensteeve.com** géré sur **Cloudflare** (proxy activé, SSL Complet strict).
