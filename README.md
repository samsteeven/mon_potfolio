# Portfolio — starter Next.js 16 + Fumadocs MDX

Scaffold minimal pour un portfolio "une page + études de cas", sans base de données ni CMS — le contenu vit dans des fichiers `.mdx` versionnés avec Git (approche décrite par Daryl Ngako sur lyrad.dev).

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Fumadocs MDX** pour la gestion de contenu (frontmatter typé avec Zod, routing basé sur les fichiers)
- **Tailwind CSS v4**
- Aucune UI Fumadocs (`fumadocs-ui`) — tout le rendu MDX est custom dans `src/components/mdx/mdx-components.tsx`, pour garder un contrôle total sur le design.

## Démarrer

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Structure du contenu

```
src/content/
├── work/        → études de cas projets (TribuneJustice, MèmeForge...)
└── writing/     → articles de blog
```

Chaque fichier `.mdx` a un frontmatter typé (validé par Zod dans `source.config.ts`) :

```md
---
title: "Nom du projet"
description: "Une phrase de résumé."
date: "2026-01-15"
role: "Tech Lead & Chef de projet"
stack: ["Laravel 11", "Next.js"]
status: "in-progress"
featured: true
---

Contenu de l'étude de cas en Markdown/MDX...
```

**Workflow pour publier** : créer le fichier `.mdx` → écrire le contenu → `git push`. Aucune interface d'admin, aucune requête réseau au runtime — tout est généré en statique au build.

## Où sont les pages

- `src/app/page.tsx` — page d'accueil à sections (Hero / À propos / Projets / Articles)
- `src/app/work/[slug]/page.tsx` — page de détail d'un projet
- `src/app/writing/[slug]/page.tsx` — page de détail d'un article
- `src/lib/source.ts` — connecte les collections de contenu aux routes Next.js

## État du design

Ce portfolio est entièrement **designé et personnalisé** avec une esthétique premium et moderne :
- **Palette de couleurs** : Mode sombre haut de gamme basé sur un ton *Zinc mat* très profond (`#09090b` / `#18181b`) avec de discrets halos de lumière colorés (glow radial), et un mode clair épuré.
- **Typographies** : Utilisation d'Inter pour le corps du texte, JetBrains Mono pour les données structurées et de la police géométrique **Outfit** (chargée via Google Fonts) pour l'identité principale.
- **Animations** : Défilement dynamique fluide (`scroll-behavior: smooth`), apparitions progressives au défilement via `IntersectionObserver` (`ScrollReveal`) avec des transitions et effets de survol interactifs (légère translation, mise en valeur des bordures, zoom d'images subtils).

## Déploiement et Production

Le portfolio est optimisé pour être déployé sur **Vercel** avec un nom de domaine géré sur **Cloudflare** (`samensteeve.com`).
- **Configuration DNS** : Pointage CNAME principal vers Vercel avec proxy Cloudflare activé (mode SSL *Complet (strict)* obligatoire). Redirection automatique du sous-domaine `www` vers le domaine racine gérée par Vercel.
- **Emails Professionnels** : Configuration de l'adresse de contact `contact@samensteeve.com` redirigée ou hébergée avec les protocoles SPF, DKIM et DMARC configurés dans Cloudflare pour éviter toute usurpation d'identité.

## Commandes utiles

```bash
npm run dev      # serveur de développement local
npm run build    # compilation de production statique (génère aussi le sitemap et les routes MDX)
npm run lint     # vérification syntaxique et linter ESLint
```

