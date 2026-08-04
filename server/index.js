const directoryRoutes = new Set([
  "/en", "/ko", "/ar", "/ru",
  "/en/pricing", "/ko/pricing", "/ar/pricing", "/ru/pricing",
  "/en/about", "/ko/about", "/ar/about", "/ru/about"
]);

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (directoryRoutes.has(url.pathname)) {
      url.pathname += "/";
      return Response.redirect(url.toString(), 308);
    }

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return withSecurityHeaders(response);

    const fallbackUrl = new URL("/404.html", request.url);
    const fallback = await env.ASSETS.fetch(new Request(fallbackUrl, request));
    return withSecurityHeaders(new Response(fallback.body, {
      status: 404,
      headers: fallback.headers
    }));
  }
};
