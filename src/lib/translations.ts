export const translations = {
  en: {
    nav: {
      work: "Work",
      about: "About",
      writing: "Writing",
    },
    hero: {
      location: "Open to remote opportunities",
      bio: "Software Engineer, Security Researcher, and AI Automation Specialist. I build resilient, high-performance systems, audit and secure digital infrastructures, and orchestrate autonomous AI agent workflows to solve complex operational challenges.",
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
      a1: "I design and audit secure web applications, build robust backend systems, and specialize in integrating autonomous AI agents (MCP, LangGraph) into production workflows to automate business processes.",
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
    notFound: {
      title: "Page not found",
      message: "This page doesn't exist or has moved.",
      cta: "Go back home",
    },
    details: {
      back: "Back",
      role: "Role",
      postIn: "Post in English",
      postInFr: "Post in French",
    },
    footer: {
      location: "Open to remote opportunities",
      specialty: "Software Engineer · Security Researcher · AI Automation",
      rights: "All rights reserved",
      bookCall: "Book a 30-min call",
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
      location: "Disponible pour le travail en remote",
      bio: "Ingénieur Logiciel, Chercheur en Sécurité et Spécialiste en Automatisation IA. Je conçois des systèmes web résilients et performants, j'audite et sécurise les infrastructures numériques, et j'orchestre des flux d'agents IA autonomes pour simplifier les processus complexes.",
      readPosts: "Lire les articles",
      scheduleMeeting: "Planifier une réunion",
    },
    about: {
      title: "À propos",
      q1: "Sur quoi tu travailles ?",
      a1: "Je conçois et audite des applications web sécurisées, développe des architectures backend robustes, et me spécialise dans l'intégration d'agents IA autonomes (MCP, LangGraph) au sein de flux de production.",
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
    notFound: {
      title: "Page introuvable",
      message: "Cette page n'existe pas ou a été déplacée.",
      cta: "Retour à l'accueil",
    },
    details: {
      back: "Retour",
      role: "Rôle",
      postIn: "Post in English",
      postInFr: "Post in French",
    },
    footer: {
      location: "Disponible pour le travail en remote",
      specialty: "Software Engineer · Security Researcher · AI Automation",
      rights: "Tous droits réservés",
      bookCall: "Planifier un appel",
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
