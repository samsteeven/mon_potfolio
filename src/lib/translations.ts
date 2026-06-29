export const translations = {
  en: {
    nav: {
      work: "Work",
      about: "About",
      writing: "Writing",
    },
    hero: {
      location: "Douala, Cameroon",
      bio: "Full-Stack Developer & Tech Lead. I design systems that hold up in real-world conditions — currently at Tribunejustice, a legaltech platform.",
      status: "AI Agents — MCP · LangGraph · CrewAI",
      readPosts: "Read all posts",
      scheduleMeeting: "Schedule a meeting",
    },
    work: {
      title: "Work",
      caseStudy: "Read case study",
    },
    about: {
      title: "About",
      q1: "What are you working on?",
      a1: "Tech Lead & Project Manager at Tribunejustice, a legaltech platform. In parallel, I integrate AI agents directly into this production stack.",
      q2: "Education & Background",
      a2: "Master EADL at IUC (Douala), currently applying for Master II programs in France.",
      q3: "My Mission & Vision",
      a3: "Contributing concretely to the digital development of Cameroon and sub-Saharan Africa with robust, production-grade tools.",
    },
    writing: {
      title: "Writing",
      seeAll: "See all posts",
      all: "All",
      empty: "No posts found for this filter.",
      searchPlaceholder: "Search by title, description or tag...",
    },
    details: {
      back: "Back",
      role: "Role",
      postIn: "Post in English",
      postInFr: "Post in French",
    },
    footer: {
      location: "Douala, Cameroon",
      specialty: "Full-Stack Developer & Tech Lead",
      rights: "All rights reserved",
    },
    stack: {
      title: "Tech Stack",
      items: [
        { name: "Next.js / React", url: "https://nextjs.org", desc: "My go-to framework for building high-performance, SEO-friendly web applications." },
        { name: "TypeScript", url: "https://www.typescriptlang.org", desc: "Type safety and clarity for building robust and bug-free codebases." },
        { name: "Node.js", url: "https://nodejs.org", desc: "The engine behind my fast and asynchronous API services." },
        { name: "AI Agents (MCP / LangGraph)", url: "https://langchain-ai.github.io/langgraph/", desc: "My emerging expertise in orchestrating production-connected autonomous workflows." },
        { name: "Laravel", url: "https://laravel.com", desc: "The ideal tool to rapidly scaffold robust and secure backends with elegance." },
        { name: "Tailwind CSS", url: "https://tailwindcss.com", desc: "The absolute standard for crafting sleek, modern, and responsive UIs at speed." },
      ]
    },
  },
  fr: {
    nav: {
      work: "Travail",
      about: "À propos",
      writing: "Écrits",
    },
    hero: {
      location: "Douala, Cameroun",
      bio: "Développeur full-stack & Tech Lead. Je conçois des systèmes qui tiennent en conditions réelles — actuellement sur Tribunejustice, une plateforme legaltech.",
      status: "Agents IA — MCP · LangGraph · CrewAI",
      readPosts: "Lire les articles",
      scheduleMeeting: "Planifier une réunion",
    },
    about: {
      title: "À propos",
      q1: "Sur quoi tu travailles ?",
      a1: "Tech Lead & Chef de projet sur Tribunejustice, une plateforme legaltech. En parallèle, j'intègre des agents IA directement dans cette stack de production.",
      q2: "Formation & Études",
      a2: "Master EADL à l'IUC (Douala), avec des candidatures en cours pour un Master II en France.",
      q3: "Ma Mission & Vision",
      a3: "Contribuer concrètement au développement numérique du Cameroun et de l'Afrique subsaharienne avec des outils robustes et de production.",
    },
    work: {
      title: "Travail",
      caseStudy: "Lire l'étude de cas",
    },
    writing: {
      title: "Écrits",
      seeAll: "Voir tous les écrits",
      all: "Tous",
      empty: "Aucun écrit pour ce filtre.",
      searchPlaceholder: "Rechercher par titre, description ou tag...",
    },
    details: {
      back: "Retour",
      role: "Rôle",
      postIn: "Post in English",
      postInFr: "Post in French",
    },
    footer: {
      location: "Douala, Cameroun",
      specialty: "Développeur Full-Stack & Tech Lead",
      rights: "Tous droits réservés",
    },
    stack: {
      title: "Stack technique",
      items: [
        { name: "Next.js / React", url: "https://nextjs.org", desc: "Mon framework de prédilection pour bâtir des applications web performantes et optimisées pour le SEO." },
        { name: "TypeScript", url: "https://www.typescriptlang.org", desc: "La sécurité et la clarté du typage statique pour des bases de code robustes et sans bugs." },
        { name: "Node.js", url: "https://nodejs.org", desc: "Le moteur de mes APIs et serveurs, optimisé pour les entrées/sorties asynchrones rapides." },
        { name: "Agents IA (MCP / LangGraph)", url: "https://langchain-ai.github.io/langgraph/", desc: "Mon expertise émergente pour orchestrer des workflows autonomes connectés à la production." },
        { name: "Laravel", url: "https://laravel.com", desc: "L'outil idéal pour structurer rapidement des backends robustes et sécurisés avec élégance." },
        { name: "Tailwind CSS", url: "https://tailwindcss.com", desc: "L'évidence pour designer des interfaces fluides, propres et responsives à la vitesse de la lumière." },
      ]
    },
  },
} as const;

export type Language = "en" | "fr";
