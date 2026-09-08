# Encargo para Claude Code — la ficha de cita en vitalimaspa.com

Repo: `github.com/gperezdev-aut/vita-lima-web` (Next.js 16 / React 19)
Documento hermano, para el sistema interno: `caja-cambios-para-la-ficha-de-cita.md`
Razonamiento completo: doc `claude/ficha-cita-formulario-propio.md` del proyecto vita-web.

## Qué se construye aquí, y qué no

**Una sola página pública: `/cita/[token]`.** Es la ficha que llena el cliente después de que el
equipo confirmó su cupo y verificó su adelanto. Reemplaza al Google Form
`https://forms.gle/U87y1sTZvp8fevmr7`, que se cierra el día que esto entre a producción.

**Esta aplicación no almacena nada.** Ni base de datos, ni tabla, ni archivo, ni caché en el
servidor. Todo vive en Supabase, que es de `caja-vita-lima`. Esta página:

1. Le pide a caja los datos de la cita por su token.
2. Los muestra.
3. Manda de vuelta lo que el cliente escribió.

**Y no tiene lógica de negocio.** No calcula el adelanto, no conoce los precios, no sabe el
esquema de la base, no decide qué campos son obligatorios. Todo eso llega calculado desde caja.
Si en algún momento hace falta duplicar una regla aquí, es señal de que el contrato está mal y
hay que arreglar el contrato, no copiar la regla.

**Lo que NO se construye en este repo:** la pantalla interna con la que el equipo arma la cita y
registra el pago. Eso es caja (ver el documento hermano). Una versión anterior de este encargo
la pedía aquí; era un error, duplicaba lo que ya existe en «reserva futura».

## El contrato con caja

Dos llamadas, **siempre desde el servidor** (route handler o server action), nunca desde el
navegador: el secreto compartido no puede llegar al cliente.

### Autenticación

Variable de entorno `CAJA_API_SECRET`, mandada en la cabecera `X-Caja-Secret`. **Las cabeceras
llegan en minúsculas** — del lado de caja se compara contra `x-caja-secret`. Esto ya costó tiempo
una vez con el webhook de n8n; no repetirlo aquí.

### `GET {CAJA_API_URL}/api/publico/ficha/:token`

```json
{
  "token": "…",
  "estado": "pendiente",
  "idioma": "es",
  "canal": "directo",
  "cita": {
    "fecha": "2026-09-13",
    "hora": "16:00",
    "sede": "San Borja",
    "sedeDireccion": "…",
    "sedeMapsUrl": "…",
    "personas": 1,
    "servicios": [{ "nombre": "Espalda Libre", "duracionMin": 60 }],
    "duracionTotalMin": 60
  },
  "pago": {
    "moneda": "PEN",
    "adelantoRecibido": 10.0,
    "saldo": 65.0,
    "leyenda": "Adelanto recibido"
  },
  "requiere": {
    "codigoCupon": false,
    "correoObligatorio": false,
    "documentoParaBoleta": "opcional"
  },
  "cliente": { "conocido": true, "nombre": "Rosa", "emailEnmascarado": "r***@gmail.com" },
  "politicaCancelacionUrl": "…"
}
```

`404` → página de «este enlace no existe» con el WhatsApp del negocio.
`410` → «esta ficha ya está completa» o «este enlace venció», también con salida a WhatsApp.

En canal cupón llega además `cupon.vigenteHasta`, y `requiere.codigoCupon = true`.

`requiere.documentoParaBoleta` tiene **solo dos valores: `"no"` y `"opcional"`.** No existe
`"obligatorio"` — el DNI es opcional a propósito. En canal cupón siempre viene `"no"`, porque la
boleta la emite la plataforma.

### `POST {CAJA_API_URL}/api/publico/ficha/:token`

Este es el contrato completo, no hay que inventar campos nuevos:

```json
{
  "telefono": { "crudo": "987 654 321", "pais": "PE" },
  "nombre": "Rosa Quispe",
  "correo": "rosa@ejemplo.com",
  "cumple": { "dia": 14, "mes": 3 },
  "boleta": { "requiere": true, "tipo": "DNI", "numero": "12345678", "razonSocial": null },
  "salud": {
    "embarazo": false, "presion": true, "cirugiaReciente": false,
    "alergias": "", "zonasEvitar": "", "notas": ""
  },
  "consentimientos": { "datos": true, "salud": true, "promociones": false },
  "codigoCupon": null,
  "idioma": "es"
}
```

`boleta.tipo` es `"DNI"` o `"RUC"`. `cumple` y `codigoCupon` pueden ser `null`.
`idioma` manda el idioma elegido en la página, para que la próxima ficha del mismo cliente abra ya
en ese idioma.

Los consentimientos van como **booleanos**, no como fechas: la marca de tiempo la pone caja con su
propio reloj al recibirlos, porque esa fecha es la prueba legal y no puede depender del reloj del
celular del cliente.

Respuesta `200`:

```json
{
  "ok": true,
  "icsUrl": "...",
  "whatsappUrl": "...",
  "resumen": {
    "fecha": "2026-09-13", "hora": "16:00",
    "sede": "San Borja", "sedeDireccion": "...", "sedeMapsUrl": "...",
    "servicios": [{ "nombre": "Espalda Libre", "duracionMin": 60 }],
    "moneda": "PEN", "adelantoRecibido": 10.0, "saldo": 65.0
  }
}
```

El `.ics` lo genera caja, para que la lógica de zona horaria viva en un solo sitio.

### Errores

Caja manda solo un código legible por máquina — `{ "error": "cupon_ya_usado", "mensaje": "..." }`.
**Los textos que ve el cliente son de esta web, en español e inglés: caja no traduce ni escribe
copy.** Usar `mensaje` solo como respaldo ante un código desconocido.

| Código | HTTP | Pantalla |
|---|---|---|
| `token_no_existe` | 404 | «este enlace no existe», con WhatsApp |
| `token_vencido` | 410 | «este enlace venció», con WhatsApp |
| `ficha_ya_completa` | 410 | «esta ficha ya está completa», con WhatsApp |
| `cupon_ya_usado` | 409 | qué hacer, no un error genérico |
| `validacion` | 422 | errores de campo |

### Modo stub, para no esperar a caja

El stub no es un fallback: solo se activa expresamente con
`CAJA_API_STUB_ENABLED=true` en desarrollo o pruebas. En producción esa
activación se ignora y tanto `CAJA_API_URL` como `CAJA_API_SECRET` son
obligatorias; si falta cualquiera se muestra un error explícito de
configuración. Las dos llamadas responden desde un archivo de ejemplos locales.
Tokens fijos, para que las capturas y el QA sean reproducibles:

| Token | Caso |
|---|---|
| `stub-nuevo` | Cliente nuevo |
| `stub-conocido` | Cliente conocido (`cliente.conocido = true`) |
| `stub-cupon` | Canal cupón, `requiere.codigoCupon = true` |
| `stub-extranjero` | Teléfono no peruano, correo obligatorio |
| `stub-vencido` | `410 token_vencido` |
| `stub-completa` | `410 ficha_ya_completa` |

Cualquier otro token responde `404 token_no_existe`. Así esta página se construye y se revisa
entera antes de que caja exista, y conectarla después es cambiar una variable de entorno.

---

## La página

Tres pasos, uno por pantalla en móvil, con «Paso 1 de 3».

### Antes del paso 1: la cabecera que cambia el tono

Lo primero que se lee **no es un formulario**:

> **Tu cita está reservada.**
> Sábado 13 de setiembre, 4:00 p.m. · San Borja
> Espalda Libre, 60 min · Adelanto recibido S/10
>
> Solo faltan tus datos — toma menos de un minuto.

Todo eso sale del JSON. En canal cupón la leyenda la manda caja («Pagado en Cuponidad»).

### Paso 1 — Quién eres

| Campo | Regla |
|---|---|
| `telefono` | **Selector de país, Perú por defecto**, validación por país con `libphonenumber-js`. Se manda crudo + país; caja normaliza a E.164 |
| `nombre` | Precargado desde `cliente.nombre` si `conocido`; editable |
| `correo` | Obligatorio si `requiere.correoObligatorio` |
| `cumple` | Opcional, **día y mes sin año** |

Un número peruano mal escrito se rechaza; uno de EE. UU., España o Chile **se acepta**. Un patrón
peruano-solamente le impediría reservar a un turista, que es un cliente real de Vita Lima. El
teléfono extranjero no vuelve obligatorio el correo: esa decisión llega únicamente en
`requiere.correoObligatorio`; si el correo opcional se completa, su formato sí se valida.

Si `cliente.conocido`, este paso se reduce a confirmar el correo y seguir.

### Paso 2 — La cita

No es un formulario: es el resumen con un «cambiar» que lleva a WhatsApp. El cliente **no elige
servicio ni hora** — ya los acordó al pagar el adelanto.

El único campo editable aquí es el **código de cupón**, y solo si `requiere.codigoCupon`. La web
valida formato; la unicidad la decide caja y puede responder `409`.

### Paso 3 — Salud y permisos

Cinco casillas: embarazo, presión alta o baja, cirugía en los últimos 3 meses, alergia a aceites
o cremas, zonas a evitar. Más un campo libre corto.

**Un botón grande «Ninguna de las anteriores»** que salta la pantalla completa: la mayoría no
tiene ninguna y hoy tendría que leer cinco casillas para decir que no.

Tres consentimientos **separados y desmarcados**. La Ley 29733 exige consentimiento
expreso, y una casilla premarcada no lo es — hoy la del formulario de la web viene premarcada.

1. Tratamiento de datos, con enlace a la política.
2. **Datos de salud**, aparte del anterior: aparece y es obligatorio únicamente cuando se marcó
   una condición o se ingresó texto sensible. Con «Ninguna de las anteriores» no aparece y se
   envía `consentimientos.salud = false`.
3. Comunicaciones promocionales, **opcional**. Sin esta casilla no se le puede mandar nada del
   post-venta más adelante.

**El DNI no aparece** hasta marcar «necesito boleta a mi nombre», y entonces despliega DNI (8
dígitos) o RUC (11) + razón social. Solo si `requiere.documentoParaBoleta = "opcional"`; con
`"no"` (canal cupón, por ejemplo) esta casilla ni se muestra.

### Pantalla final

Resumen, dirección con enlace a Maps, **adelanto recibido y saldo a pagar al llegar**, botón
«agregar a mi calendario» apuntando a la `icsUrl` de caja, política de cancelación en dos líneas,
y un botón de WhatsApp con el mensaje ya armado por si quiere cambiar algo.

Esto hoy no existe: el formulario actual no cambia al enviar, y si el bloqueador se come el
`window.open` la persona se queda sin saber si su reserva salió.

## Reglas de UX

- **Teclados correctos**: `inputmode="numeric"` en el teléfono, `type="email"` con
  `autocomplete="email"`, `autocomplete="name"`, `autocomplete="tel"`. Es lo que más acelera el
  llenado en celular y no cuesta nada.
- **Guardar borrador en el dispositivo** mientras llena, con clave por token (`vita:ficha:<token>`):
  una pareja que reserva un paquete para dos puede abrir dos fichas en el mismo celular, y no
  deben mezclarse. Guardar también la fecha y descartarlo pasadas 24 horas. **Sin las respuestas
  de salud** — eso no se guarda en el navegador — y borrando el borrador al enviar con éxito.
- **Nada de botón «limpiar formulario».** No existe el caso de uso y sí el de tocarlo por error.
- **Sin cuenta, sin contraseña, sin registro.** El enlace es la autenticación.
- **El botón de enviar no puede quedar tapado** por los flotantes «Mi selección» y WhatsApp — es
  un problema real del formulario actual en móvil.
- **Idioma**: la página abre en `idioma` del JSON, con un selector visible para cambiarlo. **El
  selector no toca la URL** — el enlace es uno solo por cliente y se pega en WhatsApp; si
  navegara a otra dirección, dejaría de ser ese enlace. Solo cambia el texto en el cliente, y el
  idioma elegido se manda en el `POST` para que la próxima ficha del mismo cliente abra ya en ese
  idioma.

## Detalles del repo

- Colores centralizados en `app/globals.css` (paleta cítrica). No introducir literales nuevos.
- El catálogo (`content/services.ts`) **no se usa aquí**: los nombres de servicio llegan en el
  JSON. Que la ficha no dependa del catálogo es lo que evita que se desincronicen.
- Tras cada despliegue de Next.js, quien tuviera la página abierta ve
  `Failed to find Server Action`; es el JS viejo y se arregla recargando. Probar en incógnito.
- El webhook de n8n (`app/api/reservas/route.ts`) es de otro formulario y **no se toca**. Esta
  ficha escribe en caja, no en Sheets.

## Criterios de aceptación

- [ ] Un cliente nuevo completa la ficha en **menos de un minuto** en móvil.
- [ ] Un cliente conocido la completa en **una sola pantalla**.
- [ ] Salir de la página a otra app y volver **no borra** lo ya escrito — y el borrador guardado
      **no contiene** ninguna respuesta de salud.
- [ ] Un número de EE. UU., España o Chile **se acepta**; uno peruano mal escrito se rechaza.
- [ ] Con número no peruano el correo es obligatorio y la página abre en inglés.
- [ ] Las tres casillas de consentimiento llegan desmarcadas y la de salud es independiente.
- [ ] El DNI no aparece hasta marcar «necesito boleta a mi nombre».
- [ ] Al enviar, la página cambia y muestra el resumen **aunque el `window.open` de WhatsApp
      falle**.
- [ ] Token inexistente, vencido y ya usado tienen cada uno su pantalla, con salida a WhatsApp.
- [ ] El código de cupón duplicado muestra qué hacer, no un error genérico.
- [ ] Con `CAJA_API_URL` sin definir, la página funciona entera contra el stub.
- [ ] `npm run typecheck`, `npm run lint` y `npm run build` pasan.
- [ ] Capturas en móvil de los tres pasos, la pantalla final y las tres pantallas de error.
