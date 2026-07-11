export const en = {
  nav: {
    work: "Work",
    about: "About",
    writing: "Writing",
    opposite: "FR",
  },
  hero: {
    location: "Open to remote opportunities",
    bio: "I design and build resilient software systems, focusing on production security, data integrity, and integrating autonomous AI agent workflows into business operations.",
    status: "Software Engineer · AI Automation",
    readPosts: "Read all posts",
    scheduleMeeting: "Schedule a meeting",
  },
  work: {
    title: "Work",
    caseStudy: "Read case study",
    seoDescription: "Selected case studies by Samen Steeve — software engineering, system architecture, and production systems.",
  },
  about: {
    title: "About me",
    q1: "Who I am",
    a1: "Software Engineer by training. I design and ship resilient software systems with security, reliability, and long-term maintainability built in. I focus on backend engineering, security-first architecture, and automating business processes by integrating autonomous AI agent workflows.",
    q2: "What I work with",
    a2: "Laravel and React (or Angular) are my core tools, with Inertia.js as a seamless bridge. PostgreSQL, Redis, and Docker handle the infrastructure and systems layer. I develop custom orchestration systems to connect AI agents with production data.",
    q3: "What I bring to your project",
    a3: "I take ownership of the full technical scope — architecture decisions, backend reliability, systems security, and automation workflows. I'm most useful on projects where stability, scalability, and operational security are critical.",
    q4: "How to get started",
    a4: "Need to build, secure, or automate a system? I work with companies on a freelance basis to design, build, and audit production systems. Schedule a free 30-minute discovery call to discuss your roadmap, and I'll follow up with a concrete proposal.",
    ctaTitle: "Need to build, secure, or automate a system?",
    ctaSubtitle: "Let's talk. I'll respond with a concrete proposal.",
    ctaButton: "Book a free discovery call",
    services: [
      {
        title: "Fast, reliable delivery",
        desc: "I build systems that are secure, scalable, and maintainable — so you can ship quickly without trading long-term quality."
      },
      {
        title: "Security & data integrity",
        desc: "Security is not an add-on. I design architectures where vulnerabilities are minimized from the start, and data integrity is guaranteed."
      },
      {
        title: "AI-driven automation",
        desc: "I integrate autonomous AI agents into your workflows to reduce manual work, cut errors, and speed up processes — without compromising control or security."
      },
      {
        title: "Technical leadership",
        desc: "As a Tech Lead / Solution Architect, I can align your team, define clear patterns, and ensure the system evolves cleanly over time."
      }
    ],
  },
  writing: {
    title: "Writing",
    seoDescription: "Articles by Samen Steeve on software engineering, system architecture, and the craft of building things that last.",
    seeAll: "See all posts",
    all: "All",
    empty: "No posts found for this filter.",
    searchPlaceholder: "Search by title, description or tag...",
    minRead: "min read",
  },
  notFound: {
    title: "Page not found",
    message: "This page doesn't exist or has moved.",
    cta: "Go back home",
  },
  details: {
    back: "Back",
    role: "Role",
    writtenInEn: "Post in English",
    writtenInFr: "Post in French",
    viewRepository: "View repository",
    visitSite: "Visit the site",
    visitSiteShort: "Visit site",
    readCaseStudy: "Read case study",
    shareText: "Read online:",
    english: "English",
    french: "French",
  },
  toc: {
    contents: "Contents",
    onThisPage: "On this page",
  },
  footer: {
    location: "Open to remote opportunities",
    specialty: "Software Engineer · AI Automation",
    rights: "All rights reserved",
    bookCall: "Book a 30-min call",
  },
  stack: {
    title: "Tech Stack",
    items: [
      { name: "Laravel", url: "https://laravel.com", desc: "My primary backend: secure, structured, and fast to ship. From REST APIs to real-time WebSocket servers." },
      { name: "AdonisJS", url: "https://adonisjs.com", desc: "A structured Node.js framework for building type-safe backends with the same elegance as Laravel." },
      { name: "React / Next.js", url: "https://react.dev", desc: "My frontend of choice for high-performance interfaces — standalone or paired with Inertia." },
      { name: "Angular", url: "https://angular.dev", desc: "For structured, enterprise-grade frontends where component architecture and long-term scalability matter." },
      { name: "Inertia.js", url: "https://inertiajs.com", desc: "The bridge between Laravel and a modern frontend — without the overhead of a separate API layer." },
      { name: "TypeScript", url: "https://www.typescriptlang.org", desc: "Type safety across the full stack. Non-negotiable for anything meant to last in production." },
      { name: "PostgreSQL", url: "https://postgresql.org", desc: "Relational, reliable, battle-tested. My default for anything where data integrity matters." },
      { name: "Redis", url: "https://redis.io", desc: "Cache, queues, real-time pub/sub. The layer that makes backends feel instant." },
      { name: "Docker", url: "https://docker.com", desc: "Consistent environments from dev to production. Every project I ship runs in containers." },
    ]
  },
  testimonials: {
    title: "Recommendations",
    subtitle: "What clients and colleagues say about our collaboration.",
    items: [
      {
        quote: "Steeve designed our hybrid microservices infrastructure from scratch. The offline-first synchronization resolved years of sync failures for our field agents. A rigorous technical approach that delivered on every promise.",
        author: "Jean-Pierre Ndongo",
        role: "Director of Information Systems",
        company: "AGROCAM S.A."
      },
      {
        quote: "As Tech Lead, Steeve not only secured our entire platform but also structured our Angular codebase for scale. His leadership and security-first approach saved us months of rework.",
        author: "Sandrine Eboa",
        role: "Tech Lead & Co-founder",
        company: "Tribunejustice"
      },
      {
        quote: "The migration to M365 and the hybrid Azure network design went seamlessly without a single minute of downtime. Steeve aligned his technical recommendations with our business objectives throughout.",
        author: "Marc Alima",
        role: "CTO",
        company: "ShopNow"
      },
      {
        quote: "Steeve took over our existing Laravel backend and completely transformed it. Automated tests, CI/CD, API documentation — everything that was missing is now in place. The project was delivered on schedule, and our team can finally work with confidence.",
        author: "Carole Mvele",
        role: "Lead Developer",
        company: "Digital Services Group"
      },
      {
        quote: "The security audit he conducted on our platform uncovered critical vulnerabilities we would never have caught on our own. His report was clear, actionable, and he stayed with us through full remediation.",
        author: "Hervé Nkili",
        role: "CEO",
        company: "OpenCode Labs"
      }
    ]
  }
} as const;