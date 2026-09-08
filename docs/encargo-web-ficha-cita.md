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

### `POST {CAJA_API_URL}/api/publico/ficha/:token`

Manda teléfono (crudo + país), nombre, correo, cumpleaños opcional, documento para boleta si
corresponde, el bloque de salud, los tres consentimientos y `codigoCupon` si aplica. Devuelve el
resumen para la pantalla final y una **`icsUrl`** — el `.ics` lo genera caja, para que la lógica
de zona horaria viva en un solo sitio.

`409` → el código de cupón ya estaba usado. Mostrar un mensaje que diga qué hacer, no un error
genérico. `422` → validación.

### Modo stub, para no esperar a caja

Con `CAJA_API_URL` sin definir, las dos llamadas responden desde un archivo de ejemplos locales
con al menos cuatro casos: cliente nuevo, cliente conocido, canal cupón, y teléfono extranjero.
Así esta página se construye y se revisa entera antes de que caja exista, y conectarla después es
cambiar una variable de entorno.

---

## La página

Tres pasos, uno por pantalla en móvil, con «Paso 1 de 3».

### Antes del paso 1: la cabecera que cambia el tono

Lo primero que se lee **no es un formulario**:

> **Tu cupo está reservado y pagado.**
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
peruano-solamente le impediría reservar a un turista, que es un cliente real de Vita Lima.

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

Tres consentimientos **separados y los tres desmarcados**. La Ley 29733 exige consentimiento
expreso, y una casilla premarcada no lo es — hoy la del formulario de la web viene premarcada.

1. Tratamiento de datos, con enlace a la política.
2. **Datos de salud**, aparte del anterior: es categoría sensible y aceptar que le escriban por
   WhatsApp no es lo mismo que aceptar que se guarde una condición médica.
3. Comunicaciones promocionales, **opcional**. Sin esta casilla no se le puede mandar nada del
   post-venta más adelante.

**El DNI no aparece** hasta marcar «necesito boleta a mi nombre», y entonces despliega DNI (8
dígitos) o RUC (11) + razón social. Solo si `requiere.documentoParaBoleta` lo permite.

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
- **Guardar borrador en el dispositivo** mientras llena: la persona se sale a Yape y vuelve, y no
  puede perder lo escrito. **Sin las respuestas de salud** — eso no se guarda en el navegador — y
  borrando el borrador al enviar.
- **Nada de botón «limpiar formulario».** No existe el caso de uso y sí el de tocarlo por error.
- **Sin cuenta, sin contraseña, sin registro.** El enlace es la autenticación.
- **El botón de enviar no puede quedar tapado** por los flotantes «Mi selección» y WhatsApp — es
  un problema real del formulario actual en móvil.
- **Idioma**: la página abre en `idioma` del JSON, con un selector visible para cambiarlo. Así se
  resuelve el bilingüe, en vez de duplicar cada etiqueta dentro de la misma línea como hace el
  Google Form.

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
