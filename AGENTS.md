# AGENTS.md — Contexte pour les agents de code

Ce projet est le portfolio personnel de Steeven Djiaha. Avant toute modification,
lire ce fichier en entier. Il existe pour éviter que chaque tâche réinvente des
conventions différentes — build et lint doivent rester propres après chaque
intervention (voir "Definition of done" en bas).

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4 (configuration CSS-first, pas de `tailwind.config.js`)
- Fumadocs MDX — gestion de contenu par fichiers, sans base de données ni CMS
- lucide-react — icônes
- TypeScript strict

## Commandes

```bash
npm run dev      # serveur de dev
npm run build    # build de prod (génère aussi les collections MDX)
npm run lint      # eslint
```

## Système de design — à respecter strictement

Tous les tokens visuels sont définis dans `src/app/globals.css` (palette clair/sombre,
polices). Ils sont exposés comme utilitaires Tailwind via `@theme inline` :

- Couleurs : `bg-paper`, `bg-paper-raised`, `text-ink`, `text-ink-soft`, `border-line`,
  `text-accent` / `bg-accent`. **Ne jamais** utiliser une couleur Tailwind par défaut
  (`bg-neutral-100`, `text-gray-500`...) ni une couleur hexadécimale en dur — ça casse
  le mode sombre. Toujours passer par ces tokens.
- Polices : `font-display` (Instrument Sans — titres uniquement), `font-sans` (Inter —
  texte par défaut, pas besoin de la préciser), `font-mono` (JetBrains Mono — labels,
  dates, tags, statuts, code).
- Mode sombre : géré par une classe `.dark` sur `<html>`, basculée par
  `src/components/theme-toggle.tsx` et persistée dans `localStorage` (clé `theme`).
  Le script anti-flash dans `src/app/layout.tsx` (`<head>`) applique la classe avant le
  premier rendu — ne pas le retirer, ça causerait un flash de la mauvaise couleur.

## Mouvement

Une seule classe d'animation existe : `.fade-up` (définie dans `globals.css`), utilisée
avec un délai en ligne (`style={{ animationDelay: "Xms" }}`) pour faire apparaître les
listes en cascade. C'est un site sobre et professionnel, pas une vitrine animée —
si une nouvelle animation est nécessaire, rester dans cet esprit (discret, court,
fonctionnel) plutôt que d'ajouter une librairie d'animation.

Le mode "réduction des animations" du système (`prefers-reduced-motion`) est neutralisé
globalement dans `globals.css`. Ne pas contourner ce comportement.

## Contenu — pas de base de données

Le contenu vit dans `src/content/` en fichiers `.mdx`, versionnés avec Git. Le schéma
de frontmatter est défini et validé (Zod) dans `source.config.ts`.

- `src/content/work/*.mdx` — études de cas projets
  (`title`, `description`, `date`, `role`, `stack[]`, `status: "shipped" | "in-progress"`, `featured`)
- `src/content/writing/*.mdx` — articles
  (`title`, `description`, `date`, `tags[]`, `published`)

Pour publier un nouveau projet ou article : créer le fichier `.mdx` correspondant,
respecter le schéma existant, c'est tout — aucune migration, aucune interface admin.

Le composant `StatusDot` (`src/components/status-dot.tsx`) reflète le champ `status`
des projets : ne pas le détourner pour autre chose, son rôle est précis (livré / en cours).

## Pages

- `src/app/page.tsx` — accueil à sections ancrées (Hero, À propos, Travail, Écrits)
- `src/app/work/[slug]/page.tsx` — détail d'un projet
- `src/app/writing/page.tsx` — listing complet des écrits, avec filtre par tag
  (`src/components/writing-list.tsx`)
- `src/app/writing/[slug]/page.tsx` — détail d'un article
- `src/lib/source.ts` — connecte les collections de contenu aux routes (via
  `toFumadocsSource` + `loader` de `fumadocs-core/source`, pas `fumadocs-ui`)

## Ce qu'il ne faut pas faire

- Ne pas ajouter de base de données, de CMS headless, ou d'API admin — c'est un choix
  délibéré du projet (simplicité, zéro dépendance externe au runtime).
- Ne pas réintroduire `fumadocs-ui` — le rendu MDX est volontairement custom
  (`src/components/mdx/mdx-components.tsx`) pour garder un contrôle total du design.
- Ne pas casser le mode sombre en ajoutant des couleurs hors tokens.
- Ne pas remplacer le système de thème actuel (classe + localStorage) par une
  librairie (`next-themes`, etc.) sans raison concrète — ça fonctionne déjà.
- Le site est en français, dans un ton direct et professionnel (pas de marketing
  ronflant). Garder cette voix dans tout nouveau contenu généré.

## Definition of done

Avant de considérer une tâche terminée :

1. `npm run build` passe sans erreur
2. `npm run lint` passe sans erreur ni warning
3. Le rendu reste cohérent en mode clair ET sombre
4. Si du contenu a été ajouté/modifié, le frontmatter respecte le schéma de
   `source.config.ts`

Une tâche qui casse le build ou le lint n'est pas terminée, même si la fonctionnalité
semble marcher en dev.
