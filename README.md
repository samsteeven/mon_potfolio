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

Ce scaffold est volontairement **non designé** — c'est une structure technique fonctionnelle (build + lint propres) en attendant le passage design. Toute la mise en forme vit dans des classes Tailwind directement dans les composants ; aucune dépendance bloquante n'a été prise sur une direction visuelle.

## Avant mise en ligne

- Remplacer `contact@exemple.com` (page d'accueil) par tes vraies coordonnées
- Ajuster ou compléter le contenu des fichiers `.mdx` d'exemple
- Déployer sur Vercel (gratuit pour un usage perso) : `vercel deploy`
