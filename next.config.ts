import type { NextConfig } from "next";

// Ver app/robots.ts: cuando el sitio no está marcado como producción se emite
// además la cabecera X-Robots-Tag, que es lo que impide que una URL ya
// conocida por Google siga apareciendo en resultados (robots.txt por sí solo
// evita el rastreo, no la indexación de una URL enlazada desde fuera).
const isProductionSite = (process.env.NEXT_PUBLIC_SITE_ENV || "production") === "production";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    if (isProductionSite) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
