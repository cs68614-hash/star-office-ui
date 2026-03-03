// Star Office UI — front-end runtime config (GitHub Pages)
// Edit API_BASE_URL to point to your backend (Cloudflare proxied domain).
window.STAR_OFFICE_CONFIG = {
  API_BASE_URL: "https://api.techsong.dpdns.org"
};

// Helper: always call backend via absolute base URL when provided.
// Also forward ?token=... from the page URL to every backend request.
(function () {
  const cfg = window.STAR_OFFICE_CONFIG || {};
  const base = (cfg.API_BASE_URL || "").replace(/\/+$/, "");

  const pageToken = new URLSearchParams(window.location.search).get("token") || "";

  function withToken(urlStr) {
    if (!pageToken) return urlStr;
    try {
      const u = new URL(urlStr, window.location.origin);
      // Don't override if caller already set token
      if (!u.searchParams.get("token")) u.searchParams.set("token", pageToken);
      return u.toString();
    } catch (e) {
      // Fallback: best-effort string append
      const sep = urlStr.includes("?") ? "&" : "?";
      return urlStr + sep + "token=" + encodeURIComponent(pageToken);
    }
  }

  window.__STAR_OFFICE_API_URL__ = function (path) {
    const url = base ? (base + path) : path;
    return withToken(url);
  };
})();
