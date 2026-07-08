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
├── work/          → études de cas projets (sous-dossiers par langue)
│   ├── en/
│   │   └── *.mdx
│   └── fr/
│       └── *.mdx
└── writing/       → articles de blog (sous-dossiers par langue)
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
├── proxy.ts                # Redirection 308 / → /en, Link headers, Markdown negociation
├── sitemap.ts              # Sitemap auto-généré
├── robots.txt/
│   └── route.ts            # Robots.txt + Content-Signals
├── auth.md/
│   └── route.ts            # Auth.md pour agents (WorkOS spec)
├── .well-known/
│   ├── api-catalog/
│   │   └── route.ts        # RFC 9727 — catalogue d'API
│   ├── http-message-signatures-directory/
│   │   └── route.ts        # Web Bot Auth — JWKS directory
│   ├── oauth-authorization-server/
│   │   └── route.ts        # OIDC Discovery (RFC 8414)
│   ├── oauth-protected-resource/
│   │   └── route.ts        # OAuth ressources protégées (RFC 9728)
│   ├── agent-skills/
│   │   └── index.json/
│   │       └── route.ts    # Index de compétences agents
│   └── mcp/
│       └── server-card.json/
│           └── route.ts    # Carte serveur MCP
├── api/
│   ├── md/[...slug]/
│   │   └── route.ts        # Markdown negotiation (Accept: text/markdown)
│   └── data/
│       ├── projects/route.ts
│       ├── articles/route.ts
│       └── skills/route.ts # Données structurées pour WebMCP
└── [lang]/
    ├── layout.tsx          # SiteHeader + SiteFooter + skip-to-content
    ├── loading.tsx         # Squelette de chargement (toutes les pages)
    ├── error.tsx           # Page d'erreur générique
    ├── page.tsx            # Accueil (Hero, À propos, Travail, Écrits)
    ├── not-found.tsx       # 404
    ├── [...catchAll]/
    │   └── page.tsx
    ├── work/
    │   ├── loading.tsx     # Squelette de chargement projets
    │   ├── error.tsx       # Erreur projets
    │   ├── page.tsx        # Liste des projets
    │   └── [slug]/
    │       └── page.tsx    # Détail d'un projet (MDX + TOC + JSON-LD)
    └── writing/
        ├── loading.tsx     # Squelette de chargement articles
        ├── error.tsx       # Erreur articles
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
- `skeleton-card.tsx` — Squelette de chargement pour les listes
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

## Découverte par agents IA

Le site implémente plusieurs mécanismes de découverte pour agents IA :

| Endpoint | Standard | Description |
|---|---|---|
| `/.well-known/api-catalog` | RFC 9727 | Catalogue d'API (linkset+json) |
| `/.well-known/oauth-authorization-server` | RFC 8414 | Métadonnées OAuth/OIDC |
| `/.well-known/oauth-protected-resource` | RFC 9728 | Ressources protégées OAuth |
| `/.well-known/agent-skills/index.json` | Agent Skills RFC | Index des compétences exposées |
| `/.well-known/http-message-signatures-directory` | Web Bot Auth (IETF) | JWKS + signature Ed25519 pour identification bot |
| `/.well-known/mcp/server-card.json` | MCP (draft) | Carte serveur Model Context Protocol |
| `/auth.md` | Auth.md (WorkOS) | Instructions d'authentification agent |
| `/robots.txt` | Content-Signals | `ai-train=no, search=yes, ai-input=no` |
| `Link` headers | RFC 8288 | En-têtes HTTP Link sur toutes les pages |
| `Accept: text/markdown` | Markdown negociation | Contenu des pages en Markdown pour agents |
| `navigator.modelContext` | WebMCP (Chrome) | Outils d'IA exposés côté navigateur |
| `_agents.…` DNS-AID | draft-mozleywilliams | Voir configuration DNS ci-dessous |

### DNS-AID (DNS for AI Discovery)

Pour activer la découverte DNS par agents, ajouter ces enregistrements sur **Cloudflare** (avec DNSSEC activé) :

```
_agents.samensteeve.com.  IN  SVCB 1 . alpn="http"
_a2a._agents.samensteeve.com.  IN  SVCB 1 https://samensteeve.com alpn="https" endpoint=":443"
_index._agents.samensteeve.com.  IN  SVCB 1 https://samensteeve.com alpn="https" endpoint=":443"
```

Ces enregistrements `SVCB/HTTPS` (RFC 9460) signalent aux résolveurs DNS-AID les points d'entrée disponibles. **Configuration manuelle requise** (Cloudflare + DNSSEC).

## Déploiement

Optimisé pour **Vercel** avec domaine **samensteeve.com** géré sur **Cloudflare** (proxy activé, SSL Complet strict).
