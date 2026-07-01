import type { Metadata } from "next";
import "./globals.css";

const themeScript = `
  (function () {
    try {
      var stored = localStorage.getItem('theme');
      var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
`;

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Anti-flash theme script */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Custom fonts */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- pattern valide en App Router pour des polices non gérées par next/font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Instrument+Sans:wght@500;600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
