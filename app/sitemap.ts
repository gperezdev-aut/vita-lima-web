import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base="https://nueva.vitalimaspa.com"; return ["", "/politica-de-privacidad", "/terminos-y-condiciones"].map((path)=>({url:`${base}${path}`,lastModified:new Date()})); }
