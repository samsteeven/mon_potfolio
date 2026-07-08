# AGENTS.md — Contexte pour les agents de code

Ce projet est le portfolio personnel de Samen Steeve (alias samsteeven). Avant toute modification,
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
- postcss-preset-env — compatibilité CSS pour navigateurs anciens (iOS Safari ≥ 9)
- @fontsource/* — polices auto-hébergées pour l'offline-first et les performances PageSpeed

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
- Polices : `font-display` (Outfit / Instrument Sans), `font-sans` (Inter),
  `font-mono` (JetBrains Mono).
  **Ne jamais** charger de polices réseau à l'aide de balises `<link>` Google Fonts dans le layout.
  Toutes les polices doivent être importées via les dépendances npm `@fontsource/*` dans le layout principal `src/app/layout.tsx`.
- Mode sombre : géré par l'attribut `data-theme="dark"` sur `<html>`, basculé par
  `src/components/theme-toggle.tsx` et persisté dans `localStorage` (clé `theme`).
  Le script anti-flash dans `src/app/layout.tsx` (`<head>`) applique l'attribut avant le
  premier rendu — ne pas le retirer, ça causerait un flash de la mauvaise couleur.

## Architecture du thème (important)

- `src/app/layout.tsx` — Root layout **persistant** : contient `<html>`, `<head>`, `<body>`,
  le script anti-flash, les imports de polices Fontsource et le JSON-LD Schema.org. Ce composant n'est **jamais** démonté
  lors des changements de route ou de langue. Ne pas y déplacer de logique de page.
- `src/app/[lang]/layout.tsx` — Sub-layout bilingue : contient uniquement `SiteHeader`,
  `SiteFooter` et `{children}`. Pas de `<html>/<body>` ici.
- L'attribut `data-theme` sur `<html>` est utilisé à la place de la classe `.dark`
  pour éviter que React n'efface l'état lors des transitions de route.

## Routing et internationalisation

- Le site est bilingue `/en` et `/fr`. Les routes sont sous `src/app/[lang]/`.
- `src/proxy.ts` — Fichier proxy Next.js 16+ (équivalent de l'ancien `middleware.ts`
  de Next.js ≤ 15). **Important** : dans Next.js 16, la convention a changé — le fichier
  s'appelle `proxy.ts` et l'export s'appelle `export function proxy(...)`.
  Ne pas le renommer en `middleware.ts`, ça déprécierait la convention.
- La redirection `/` → `/en` est gérée par ce proxy.
- **Changement de langue sans scroll** : Pour éviter que la page ne remonte automatiquement en haut lors du changement de langue, le composant `<Link>` de langue dans `site-header.tsx` utilise la propriété `scroll={false}` de Next.js.

## Utilitaires partagés

- `src/lib/reading-time.ts` — Fonctions `getReadingTime()` et `getMdxBody()` pour calculer
  le temps de lecture et extraire le corps d'un fichier MDX. **Source unique de vérité** —
  ne pas dupliquer cette logique dans les pages, toujours importer depuis ce module.
- `src/lib/mdx.ts` — Fonction `parseFrontmatter()` partagée par les API routes
  (`articles`, `projects`, `llms.txt`). **Source unique de vérité** — ne pas dupliquer.
- `src/lib/blur.ts` — Constante `BLUR_DATA_URL` pour `placeholder="blur"` sur les images.
- `src/lib/source.ts` — Connecte les collections de contenu aux routes (via
  `toFumadocsSource` + `loader` de `fumadocs-core/source`, pas `fumadocs-ui`).

## Mouvement

Une seule classe d'animation existe : `.fade-up` (définie dans `globals.css`), utilisée
avec un délai en ligne (`style={{ animationDelay: "Xms" }}`) pour faire apparaître les
listes en cascade. C'est un site sobre et professionnel, pas une vitrine animée —
si une nouvelle animation est nécessaire, rester dans cet esprit (discret, court,
fonctionnel) plutôt que d'ajouter une librairie d'animation.

Le mode "réduction des animations" du système (`prefers-reduced-motion`) est neutralisé
globalement dans `globals.css`. Ne pas contourner ce comportement.

## Composants MDX, Zoom d'images et Hydratation (⚠️ Très Important)

Le rendu MDX est configuré de façon personnalisée dans `src/components/mdx/mdx-components.tsx` et `mdx-client.tsx` :

### 1. Zoom d'image / Lightbox
- Toutes les balises `<img>` du MDX et les images de couverture (`cover`) des projets et articles utilisent le composant client `ZoomableImage`.
- Au clic, l'image s'ouvre dans un modal fluide plein écran.

### 2. Hydratation HTML valide (Div vs Paragraph)
- Le compilateur MDX enveloppe automatiquement le texte et les images isolées dans des balises `<p>`. 
- **Règle absolue** : Les composants MDX ne doivent jamais générer de balise `<div>` ou de balise `<p>` imbriquée à l'intérieur d'un `<p>`.
- Dans `ZoomableImage`, le conteneur externe est un `<span>` configuré en `block` pour éviter l'imbrication `<p><div>` interdite en HTML.
- Les cartes `<Card>` utilisent quant à elles un conteneur `<div>` externe pour permettre l'inclusion libre de multiples paragraphes, gras, italique et liens sans conflits d'hydratation React.

### 3. Composants riches disponibles dans le MDX
Les rédacteurs d'articles et cas d'études peuvent enrichir la lecture avec les composants exportés :
- `<Callout type="info | tip | warning | danger">` : Pour les encadrés d'alertes avec icônes.
- `<CodeWindow filename="...">` : Pour simuler une fenêtre de code style macOS avec titre.
- `<CardGrid>` et `<Card title="...">` : Pour créer des grilles d'information et présenter des points de manière aérée.

## Contenu — pas de base de données

Le contenu vit dans `src/content/` en fichiers `.mdx`, versionnés avec Git. Le schéma
de frontmatter est défini et validé (Zod) dans `source.config.ts`.

- `src/content/work/{en,fr}/*.mdx` — études de cas projets (sous-dossiers par langue)
  (`title`, `description`, `date`, `role`, `stack[]`, `status: "shipped" | "in-progress"`, `featured`, `cover?`)
- `src/content/writing/{en,fr}/*.mdx` — articles (sous-dossiers par langue)
  (`title`, `description`, `date`, `tags[]`, `published`, `lang`, `cover?`)

Pour publier un nouveau projet ou article : créer le fichier `.mdx` correspondant,
respecter le schéma existant, c'est tout — aucune migration, aucune interface admin.

Le composant `StatusDot` (`src/components/status-dot.tsx`) reflète le champ `status`
des projets : ne pas le détourner pour autre chose, son rôle est précis (livré / en cours).

## Synchronisation du contenu

Quand tu ajoutes, modifies ou supprimes du contenu (projet, article, compétence),
plusieurs fichiers doivent être mis à jour manuellement. Les pages et API routes
lisent soit depuis `src/content/` (dynamique → auto-sync au rebuild), soit depuis
des listes en dur (manuel uniquement).

### Projets — `src/content/work/{en,fr}/*.mdx` (sous-dossiers par langue)

| Fichier | Source | Auto-sync ? |
|---|---|---|
| `src/app/[lang]/page.tsx` | `workSource.getPages()` | ✅ auto |
| `src/app/[lang]/work/page.tsx` | `workSource.getPages()` | ✅ auto |
| `src/app/[lang]/work/[slug]/page.tsx` | Fumadocs loader | ✅ auto |
| `src/app/sitemap.ts` | `workSource.getPages()` | ✅ auto |
| `src/app/api/data/projects/route.ts` | `readdirSync(src/content/work/)` | ✅ auto |
| **`src/app/llms.txt/route.ts`** | `readdirSync(src/content/work/{en,fr}/ + writing/)` | ✅ auto |

### Articles — `src/content/writing/{en,fr}/*.mdx`

| Fichier | Source | Auto-sync ? |
|---|---|---|
| `src/app/[lang]/page.tsx` | `getWritingPages(lang)` | ✅ auto |
| `src/app/[lang]/writing/page.tsx` | `getWritingPages(lang)` | ✅ auto |
| `src/app/[lang]/writing/[slug]/page.tsx` | Fumadocs loader | ✅ auto |
| `src/app/sitemap.ts` | `writingSource.getPages()` | ✅ auto |
| `src/app/api/data/articles/route.ts` | `readdirSync(src/content/writing/)` | ✅ auto |

### Compétences — `src/lib/i18n/{en,fr}.ts`

| Fichier | Source | Auto-sync ? |
|---|---|---|
| **`src/app/api/data/skills/route.ts`** | `import { stack } from "src/lib/i18n/en.ts"` | **🔴 manuel** |

### Procédure

1. **Créer/modifier le fichier `.mdx`** dans `src/content/work/` ou `src/content/writing/`
   en respectant le schéma `source.config.ts`.
2. **Vérifier le bilinguisme** — créer les deux versions `en` et `fr` de l'article si
   nécessaire ; les pages sans version FR utilisent `lang: "en"` dans le frontmatter.
3. **Lancer `npm run build`** — confirme que tout est synchronisé et détecte les
   éventuelles erreurs de schéma.
4. **Pour les compétences** — modifier `src/lib/i18n/en.ts` et `src/lib/i18n/fr.ts`
   (les deux langues en miroir).

## Pages

- `src/app/[lang]/page.tsx` — accueil à sections ancrées (Hero, À propos, Travail, Écrits)
- `src/app/[lang]/work/[slug]/page.tsx` — détail d'un projet
- `src/app/[lang]/writing/page.tsx` — listing complet des écrits, avec filtre par tag
  (`src/components/writing-list.tsx`)
- `src/app/[lang]/writing/[slug]/page.tsx` — détail d'un article
- `src/app/[lang]/[...catchAll]/page.tsx` — page 404 pour routes inconnues

## SEO

- `src/app/layout.tsx` contient un JSON-LD `schema.org/Person` pour le Knowledge Panel Google.
- Chaque page a ses propres balises `<title>` et `<meta description>` via `generateMetadata`.
- Le sitemap est auto-généré à `/sitemap.xml` par Next.js au build.
- Les images OG sont définies dans les métadonnées de chaque page.

## Conventions de rédaction du contenu MDX (⚠️ À respecter impérativement)

Ces règles garantissent l'uniformité visuelle entre tous les articles et études de cas.
Tout agent qui génère ou modifie du contenu `.mdx` doit les appliquer systématiquement.

### Blocs de code — règle fondamentale

**Ne jamais utiliser de fences Markdown nues (` ```lang `) pour afficher du code source.**
Utiliser impérativement le composant `<CodeWindow>` à la place.

| Situation | À faire | À ne pas faire |
|---|---|---|
| Code source (fichier nommé) | `<CodeWindow filename="MonFichier.php">` | ` ```php ` seul |
| Commande shell / terminal | `<CodeWindow filename="terminal">` | ` ```bash ` seul |
| Pseudo-code court inline | `` `code` `` (backtick inline) | ` ``` ` bloc |

**Syntaxe correcte :**
```mdx
<CodeWindow filename="DashboardController.php">
```php
public function index(): Response
{
    return Inertia::render('Dashboard', [
        'projects' => Project::with('client')->latest()->get(),
    ]);
}
```
</CodeWindow>
```

- Le `filename` doit être le vrai nom du fichier (ex : `Dashboard.tsx`, `deploy.sh`).
- Pour un terminal / shell, utiliser `filename="terminal"` ou `filename="bash"`.
- La fence de langage à l'intérieur (` ```php `, ` ```tsx `…) reste obligatoire pour la coloration syntaxique.
- Le bouton "Copier" est automatiquement présent dans la barre de titre — ne pas l'ajouter manuellement.

---

### Callout — quand l'utiliser

```mdx
<Callout type="info">
  Conseil ou contexte neutre.
</Callout>

<Callout type="tip">
  Bonne pratique ou optimisation.
</Callout>

<Callout type="warning">
  Point d'attention, comportement subtil.
</Callout>

<Callout type="danger">
  Erreur courante, pièges, breaking change.
</Callout>
```

- `info` : information de contexte ou d'explication neutre.
- `tip` : bonne pratique, raccourci, conseil d'expérience.
- `warning` : cas limites, comportements surprenants, limitations.
- `danger` : erreurs fréquentes, failles de sécurité, pertes de données potentielles.
- **Ne pas** enchaîner plusieurs Callout consécutifs — alterner avec du texte entre eux.

---

### CardGrid / Card — quand l'utiliser

```mdx
<CardGrid>
  <Card title="Titre A">
    Description concise du point A.
  </Card>
  <Card title="Titre B">
    Description concise du point B.
  </Card>
</CardGrid>
```

- Idéal pour lister des fonctionnalités, avantages, outils ou comparaisons (2 à 4 cartes max).
- Ne pas y mettre du code — utiliser `<CodeWindow>` pour ça.
- Ne pas imbriquer des `<CardGrid>` l'un dans l'autre.

---

### Images dans le MDX

- Les images MDX standard (`![alt](url)`) sont automatiquement rendues via `ZoomableImage` (clic → lightbox plein écran).
- Toujours fournir un attribut `alt` descriptif.
- Pas besoin d'utiliser manuellement `<ZoomableImage>` dans le contenu — la balise `img` Markdown suffit.
- Pour les covers : renseigner le champ `cover` dans le frontmatter (chemin relatif depuis `public/`).

---

### Éléments Markdown natifs — usage attendu

| Élément | Usage |
|---|---|
| `## Titre` | Sections principales de l'article — apparaissent dans la table des matières |
| `### Sous-titre` | Sous-sections — apparaissent aussi dans la TDM |
| `**gras**` | Termes importants, mots-clés techniques |
| `*italique*` | Emphase légère, termes étrangers |
| `` `inline code` `` | Noms de variables, fonctions, classes, commandes courtes |
| `> blockquote` | Citations, extraits de documentation externe |
| `---` | Séparateur thématique entre deux grandes parties |
| Liste `-` | Énumérations simples sans hiérarchie |
| Liste `1.` | Étapes séquentielles (procédures, tutoriels) |

---

### Tone & voix éditoriale

- Ton direct, professionnel, sans marketing ronflant.
- Première personne du singulier autorisée pour les retours d'expérience.
- Éviter les formulations génériques ("dans cet article, nous allons voir…").
- Aller droit au but dès la première phrase — pas d'intro de réchauffement.
- Bilinguisme : chaque article doit exister en `en` et `fr`, avec un contenu adapté (pas une traduction littérale mécanique).

---

## Ce qu'il ne faut pas faire

- Ne pas ajouter de base de données, de CMS headless, ou d'API admin — c'est un choix
  délibéré du projet (simplicité, zéro dépendance externe au runtime).
- Ne pas réintroduire `fumadocs-ui` — le rendu MDX est volontairement custom
  (`src/components/mdx/mdx-components.tsx`) pour garder un contrôle total du design.
- Ne pas casser le mode sombre en ajoutant des couleurs hors tokens.
- Ne pas remplacer le système de thème actuel (`data-theme` + localStorage) by a
  library (`next-themes`, etc.) sans raison concrète — ça fonctionne déjà.
- Ne pas mettre `<html>/<body>` dans `src/app/[lang]/layout.tsx` — ils appartiennent
  au root layout `src/app/layout.tsx`.
- Ne pas renommer `src/proxy.ts` en `middleware.ts` — convention Next.js 16+.
- Ne pas dupliquer la logique de temps de lecture — utiliser `src/lib/reading-time.ts`.
- Le site est bilingue (fr/en), dans un ton direct et professionnel (pas de marketing
  ronflant). Garder cette voix dans tout nouveau contenu généré.

## Definition of done

Avant de considérer une tâche terminée :

1. `npm run build` passe sans erreur ni warning
2. `npm run lint` passe sans erreur ni warning
3. Le rendu reste cohérent en mode clair ET sombre
4. Si du contenu a été ajouté/modifié, le frontmatter respecte le schéma de
   `source.config.ts`

Une tâche qui casse le build ou le lint n'est pas terminée, même si la fonctionnalité
semble marcher en dev.
