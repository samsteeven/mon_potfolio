import { en } from "./en";
import { fr } from "./fr";

export type Language = "en" | "fr";

export const translations = { en, fr } as const;

export type Translation = (typeof translations)[Language];