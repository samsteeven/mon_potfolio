"use client";

import { useEffect } from "react";

interface WebMCPTool {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<unknown>;
}

type ContextEntry = WebMCPTool;

declare global {
  interface Navigator {
    modelContext?: {
      provideContext: (entries: ContextEntry[]) => void;
    };
  }
}

export function WebMCPProvider() {
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    if (!("modelContext" in navigator)) return;
    if (!navigator.modelContext) return;

    const tools: WebMCPTool[] = [
      {
        name: "get_projects",
        description:
          "List all portfolio projects with title, description, role, tech stack, and status",
        input_schema: { type: "object", properties: {}, required: [] },
        execute: async () => {
          const res = await fetch("/api/data/projects");
          return res.json();
        },
      },
      {
        name: "get_articles",
        description:
          "List all published articles with title, description, date, tags, and read time",
        input_schema: {
          type: "object",
          properties: {
            lang: {
              type: "string",
              description: "Language filter: en or fr",
              enum: ["en", "fr"],
            },
          },
          required: [],
        },
        execute: async (args) => {
          const lang = (args.lang as string) || "en";
          const res = await fetch(`/api/data/articles?lang=${lang}`);
          return res.json();
        },
      },
      {
        name: "get_skills",
        description: "List all technical skills with descriptions and links",
        input_schema: { type: "object", properties: {}, required: [] },
        execute: async () => {
          const res = await fetch("/api/data/skills");
          return res.json();
        },
      },
      {
        name: "get_contact",
        description:
          "Get contact information including email and booking link",
        input_schema: { type: "object", properties: {}, required: [] },
        execute: async () => ({
          email: "contact@samensteeve.com",
          booking: "https://cal.com/samsteeven",
          location: "Open to remote opportunities",
        }),
      },
    ];

    navigator.modelContext.provideContext(tools);
  }, []);

  return null;
}
