import type { Language } from "@/lib/translations";

export function LanguageFlag({ lang, className = "" }: { lang: Language; className?: string }) {
  if (lang === "fr") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3 2"
        className={`inline-block h-3 w-4.5 rounded-sm shadow-sm align-middle select-none ${className}`}
      >
        <rect width="1" height="2" fill="#002395" />
        <rect x="1" width="1" height="2" fill="#FFFFFF" />
        <rect x="2" width="1" height="2" fill="#ED2939" />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 30"
      className={`inline-block h-3 w-5 rounded-sm shadow-sm align-middle select-none ${className}`}
    >
      <rect width="50" height="30" fill="#012169" />
      <path d="M0,0 L50,30 M50,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L50,30 M50,0 L0,30" stroke="#C8102E" strokeWidth="2" />
      <path d="M25,0 L25,30 M0,15 L50,15" stroke="#fff" strokeWidth="10" />
      <path d="M25,0 L25,30 M0,15 L50,15" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}
