"use client";

import { useEffect, useRef } from "react";

interface ToolDescriptor {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<unknown>;
}

declare global {
  interface Navigator {
    modelContext?: {
      registerTool: (
        descriptor: ToolDescriptor,
        options?: { signal?: AbortSignal },
      ) => void;
    };
  }
}

export function WebMCPProvider() {
  const registered = useRef(false);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    if (!("modelContext" in navigator)) return;
    if (!navigator.modelContext) return;
    if (registered.current) return;
    registered.current = true;

    const abort = new AbortController();
    const { signal } = abort;

    const tools: ToolDescriptor[] = [
      {
        name: "get_projects",
        description:
          "List all portfolio projects with title, description, role, tech stack, and status",
        inputSchema: { type: "object", properties: {}, required: [] },
        execute: async () => {
          const res = await fetch("/api/data/projects");
          return res.json();
        },
      },
      {
        name: "get_articles",
        description:
          "List all published articles with title, description, date, tags",
        inputSchema: {
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
        inputSchema: { type: "object", properties: {}, required: [] },
        execute: async () => {
          const res = await fetch("/api/data/skills");
          return res.json();
        },
      },
      {
        name: "get_contact",
        description:
          "Get contact information including email and booking link",
        inputSchema: { type: "object", properties: {}, required: [] },
        execute: async () => ({
          email: "contact@samensteeve.com",
          booking: "https://cal.com/samsteeven",
          location: "Open to remote opportunities",
        }),
      },
    ];

    for (const tool of tools) {
      navigator.modelContext.registerTool(tool, { signal });
    }

    return () => abort.abort();
  }, []);

  return null;
}
