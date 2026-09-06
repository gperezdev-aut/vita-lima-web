/**
 * Compara el catálogo de servicios de la web con el catálogo que usan el bot
 * de WhatsApp y la Caja, y reporta toda divergencia de precio, duración o
 * existencia.
 *
 * Nace de un problema real: el 6 de setiembre de 2026 la web publicaba once
 * servicios a un precio distinto del que el bot cotizaba por WhatsApp —el
 * masaje de parte superior aparecía a S/58 en la web y a S/68 en el bot—, y
 * veinticuatro servicios de la web (SVC_027 a SVC_050) ni siquiera existían
 * en el catálogo del bot. Nadie lo detectó por meses porque los tres sistemas
 * guardan su copia del catálogo y ninguno mira la del otro:
 *
 *   - la web        → content/services.ts (este repo, hardcodeado)
 *   - el bot        → Data Table services_catalog_v5 de n8n
 *   - la Caja       → tabla stg_services_catalog_v5 de Supabase
 *
 * Este script no unifica nada: solo hace visible la diferencia para que se
 * decida a mano cuál precio es el correcto. Unificar exige antes decidir
 * dónde vive la fuente única, que es una decisión de negocio y no de código.
 *
 * Uso:
 *   node scripts/check-catalogo.mjs [--bot=ruta.csv] [--caja=ruta.csv]
 *   npm run check:catalogo
 *
 * Por defecto busca el CSV del bot en el repo hermano:
 *   ../vita-lima-bot-n8n/exports/services_catalog_v5.csv
 *
 * El CSV de la Caja es opcional porque esa tabla vive en Supabase y hay que
 * exportarla a mano; sin ella el script compara solo web contra bot.
 *
 * OJO con lo que este script NO puede saber: los CSV son fotos de un momento.
 * El del bot está versionado en Git y puede llevar semanas de retraso frente
 * a la Data Table viva de n8n. Que este script diga "todo coincide" solo
 * significa que la web coincide con la foto, no con producción.
 *
 * Sale con código 1 si encuentra divergencias, para poder encadenarlo en CI.
 */
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const RUTA_BOT_POR_DEFECTO = resolve(
  root,
  "..",
  "vita-lima-bot-n8n",
  "exports",
  "services_catalog_v5.csv"
);

function leerArgumento(nombre) {
  const prefijo = `--${nombre}=`;
  const encontrado = process.argv.find((arg) => arg.startsWith(prefijo));
  return encontrado ? encontrado.slice(prefijo.length) : null;
}

/**
 * Parser de CSV con comillas. No sirve `split(",")`: el catálogo del bot
 * guarda el texto que el bot manda por WhatsApp dentro de una sola celda,
 * con comas y saltos de línea reales dentro de las comillas.
 */
function parsearCsv(texto) {
  const filas = [];
  let fila = [];
  let campo = "";
  let entreComillas = false;

  for (let i = 0; i < texto.length; i += 1) {
    const c = texto[i];

    if (entreComillas) {
      if (c === '"') {
        if (texto[i + 1] === '"') {
          campo += '"';
          i += 1;
        } else {
          entreComillas = false;
        }
      } else {
        campo += c;
      }
      continue;
    }

    if (c === '"') {
      entreComillas = true;
    } else if (c === ",") {
      fila.push(campo);
      campo = "";
    } else if (c === "\n") {
      fila.push(campo);
      filas.push(fila);
      fila = [];
      campo = "";
    } else if (c !== "\r") {
      campo += c;
    }
  }

  if (campo !== "" || fila.length > 0) {
    fila.push(campo);
    filas.push(fila);
  }

  const [cabecera, ...cuerpo] = filas;
  return cuerpo
    .filter((f) => f.some((valor) => valor.trim() !== ""))
    .map((f) => Object.fromEntries(cabecera.map((col, i) => [col.trim(), (f[i] ?? "").trim()])));
}

/**
 * Lee el catálogo de la web directamente del TypeScript, como hace
 * check-images.mjs: este script corre en Node pelado y no compila nada.
 */
function leerCatalogoWeb() {
  const texto = readFileSync(join(root, "content", "services.ts"), "utf8");
  const servicios = new Map();

  for (const bloque of texto.matchAll(/code: "(SVC_\d+)",(.*?)\n {2}\},/gs)) {
    const [, codigo, cuerpo] = bloque;
    const campo = (nombre) => {
      const encontrado = cuerpo.match(new RegExp(`\\n\\s+${nombre}: "?([^"\\n]+?)"?,`));
      return encontrado ? encontrado[1].trim() : "";
    };

    servicios.set(codigo, {
      codigo,
      nombre: campo("name"),
      duracion: campo("duration"),
      precio: campo("price"),
      sede: campo("venue"),
    });
  }

  return servicios;
}

/**
 * Lee un catálogo en formato Data Table (el del bot y el de la Caja comparten
 * columnas porque la tabla de Supabase es una copia de la de n8n).
 *
 * Un mismo `service_code` puede tener varias filas: el catálogo del bot
 * distingue variantes por `CodeId`. Se agrupan en vez de quedarse con la
 * última, porque si dos variantes del mismo código tienen precios distintos
 * eso también es una divergencia que hay que ver.
 */
function leerCatalogoTabla(ruta, etiqueta) {
  let texto;
  try {
    texto = readFileSync(ruta, "utf8");
  } catch {
    return null;
  }

  const filas = parsearCsv(texto);
  const servicios = new Map();
  const sinCodigo = [];

  for (const fila of filas) {
    const codigo = (fila.service_code ?? "").trim();
    const entrada = {
      codigo,
      codeId: fila.CodeId ?? "",
      nombre: fila.option_name ?? "",
      duracion: (fila.duration_min ?? "").trim(),
      // price_pen es el número limpio; `price` viene como "S/ 229".
      precio: (fila.price_pen ?? "").trim() || (fila.price ?? "").replace(/[^\d.]/g, ""),
      sede: fila.sede ?? "",
      activo: (fila.active ?? "").trim().toLowerCase() !== "false",
    };

    if (!codigo) {
      sinCodigo.push(entrada);
      continue;
    }

    if (!servicios.has(codigo)) servicios.set(codigo, []);
    servicios.get(codigo).push(entrada);
  }

  return { etiqueta, ruta, servicios, sinCodigo, totalFilas: filas.length };
}

function comparar(web, tabla) {
  const soloWeb = [];
  const soloTabla = [];
  const divergentes = [];

  for (const codigo of web.keys()) {
    if (!tabla.servicios.has(codigo)) soloWeb.push(codigo);
  }

  for (const codigo of tabla.servicios.keys()) {
    if (!web.has(codigo)) soloTabla.push(codigo);
  }

  for (const [codigo, servicioWeb] of web) {
    for (const variante of tabla.servicios.get(codigo) ?? []) {
      const precioDistinto = variante.precio !== servicioWeb.precio;
      const duracionDistinta = variante.duracion !== servicioWeb.duracion;
      if (precioDistinto || duracionDistinta) {
        divergentes.push({ codigo, web: servicioWeb, tabla: variante, precioDistinto, duracionDistinta });
      }
    }
  }

  soloWeb.sort();
  soloTabla.sort();
  divergentes.sort((a, b) => a.codigo.localeCompare(b.codigo));

  return { soloWeb, soloTabla, divergentes };
}

const plural = (cantidad, singular, pluralForma) =>
  `${cantidad} ${cantidad === 1 ? singular : pluralForma}`;

function informar(tabla, resultado) {
  const { etiqueta } = tabla;
  console.log(`\n── web vs ${etiqueta} ${"─".repeat(Math.max(0, 46 - etiqueta.length))}`);
  console.log(`   fuente: ${tabla.ruta}`);
  console.log(
    `   ${plural(tabla.totalFilas, "fila", "filas")}, ` +
      `${plural(tabla.servicios.size, "código", "códigos")} SVC_, ` +
      `${plural(tabla.sinCodigo.length, "fila", "filas")} sin service_code`
  );

  if (resultado.divergentes.length > 0) {
    const col = (valor, ancho) => String(valor).padEnd(ancho);
    console.log(`\n   Precio o duración distintos (${resultado.divergentes.length}):`);
    console.log(`     ${col("código", 8)} ${col("web", 16)} ${col(etiqueta, 16)} variante`);
    for (const d of resultado.divergentes) {
      const marca = [d.precioDistinto && "precio", d.duracionDistinta && "duración"]
        .filter(Boolean)
        .join(" y ");
      console.log(
        `     ${col(d.codigo, 8)} ` +
          `${col(`${d.web.duracion}min S/${d.web.precio}`, 16)} ` +
          `${col(`${d.tabla.duracion}min S/${d.tabla.precio}`, 16)} ` +
          `${d.tabla.codeId} (${marca})`
      );
    }
  }

  if (resultado.soloWeb.length > 0) {
    console.log(`\n   Solo en la web, ausentes en ${etiqueta} (${resultado.soloWeb.length}):`);
    console.log(`     ${resultado.soloWeb.join(", ")}`);
  }

  if (resultado.soloTabla.length > 0) {
    console.log(`\n   Solo en ${etiqueta}, ausentes en la web (${resultado.soloTabla.length}):`);
    console.log(`     ${resultado.soloTabla.join(", ")}`);
  }

  if (tabla.sinCodigo.length > 0) {
    console.log(
      `\n   ${plural(tabla.sinCodigo.length, "fila", "filas")} de ${etiqueta} ` +
        `sin service_code: no se pueden cruzar con la web.`
    );
  }
}

const web = leerCatalogoWeb();

if (web.size === 0) {
  console.error("check:catalogo — no se pudo leer ningún servicio de content/services.ts.");
  process.exit(1);
}

const fuentes = [
  leerCatalogoTabla(leerArgumento("bot") ?? RUTA_BOT_POR_DEFECTO, "bot (n8n)"),
  leerArgumento("caja") ? leerCatalogoTabla(leerArgumento("caja"), "Caja (Supabase)") : null,
].filter(Boolean);

console.log(`check:catalogo — ${web.size} servicios en content/services.ts`);

if (fuentes.length === 0) {
  console.error(
    `\nNo se encontró ningún catálogo con el que comparar.\n` +
      `  Se buscó el del bot en: ${leerArgumento("bot") ?? RUTA_BOT_POR_DEFECTO}\n` +
      `  Pásalo con --bot=ruta.csv, y el de la Caja con --caja=ruta.csv.`
  );
  process.exit(1);
}

let problemas = 0;

for (const fuente of fuentes) {
  const resultado = comparar(web, fuente);
  informar(fuente, resultado);
  problemas += resultado.divergentes.length + resultado.soloWeb.length + resultado.soloTabla.length;
}

console.log("");

if (problemas === 0) {
  console.log("check:catalogo — los catálogos comparados coinciden.");
  process.exit(0);
}

console.error(`check:catalogo — ${problemas} divergencias entre catálogos.`);
process.exit(1);
