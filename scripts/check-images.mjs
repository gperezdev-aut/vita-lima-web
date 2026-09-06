/**
 * Comprueba que toda imagen referenciada desde content/ exista de verdad en
 * public/ y no esté vacía.
 *
 * Nace de un incidente real: un lote de 32 fotos llegó con un .webp de 0
 * bytes. El nombre era correcto, el archivo estaba en su carpeta, git lo
 * versionó sin quejarse y `next build` lo dio por bueno —Next no abre las
 * imágenes de public/ al compilar—. El fallo solo se veía como una tarjeta
 * rota en producción.
 *
 * Se ejecuta con `npm run check:images`, y va dentro de `npm run validate`
 * para que salte antes de cualquier despliegue.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = join(root, "content");
const publicDir = join(root, "public");

// Rutas absolutas del sitio que apuntan a un archivo de imagen: "/images/...".
// Se leen como texto en vez de importar los módulos porque son TypeScript y
// este script corre en Node pelado, sin compilar nada.
const IMAGE_PATH = /"(\/[^"]*\.(?:webp|jpg|jpeg|png|avif|svg))"/g;

const referencias = new Map(); // ruta de imagen -> archivos de content que la citan

for (const archivo of readdirSync(contentDir).filter((name) => name.endsWith(".ts"))) {
  const texto = readFileSync(join(contentDir, archivo), "utf8");
  for (const [, ruta] of texto.matchAll(IMAGE_PATH)) {
    if (!referencias.has(ruta)) referencias.set(ruta, new Set());
    referencias.get(ruta).add(archivo);
  }
}

const faltantes = [];
const vacias = [];

for (const [ruta, origenes] of referencias) {
  const archivo = join(publicDir, ruta);
  let stats;
  try {
    stats = statSync(archivo);
  } catch {
    faltantes.push({ ruta, origenes });
    continue;
  }
  if (stats.size === 0) vacias.push({ ruta, origenes });
}

function informar(titulo, lista) {
  if (lista.length === 0) return;
  console.error(`\n${titulo}`);
  for (const { ruta, origenes } of lista) {
    console.error(`  ${ruta}  (citada en ${[...origenes].join(", ")})`);
  }
}

const total = referencias.size;

if (faltantes.length === 0 && vacias.length === 0) {
  console.log(`check:images — ${total} imágenes referenciadas, todas presentes y con contenido.`);
  process.exit(0);
}

informar("Imágenes referenciadas que NO existen en public/:", faltantes);
informar("Imágenes que existen pero están vacías (0 bytes):", vacias);
console.error(`\ncheck:images — ${faltantes.length + vacias.length} de ${total} imágenes con problemas.`);
process.exit(1);
