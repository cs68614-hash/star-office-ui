// Star Office UI — front-end runtime config (GitHub Pages)
// Edit API_BASE_URL to point to your backend (Cloudflare proxied domain).
window.STAR_OFFICE_CONFIG = {
  API_BASE_URL: "https://api.techsong.dpdns.org"
};

// Helper: always call backend via absolute base URL when provided.
(function () {
  const cfg = window.STAR_OFFICE_CONFIG || {};
  const base = (cfg.API_BASE_URL || "").replace(/\/+$/, "");
  window.__STAR_OFFICE_API_URL__ = function (path) {
    if (!base) return path;
    return base + path;
  };
})();
