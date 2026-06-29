// No-op service worker — les requêtes vers /sw.js viennent d'une extension
// navigateur. Ce fichier évite qu'elles ne passent par App Router (qui
// les traite mal et bloque le serveur de dev pendant ~50s).
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
