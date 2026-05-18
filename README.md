# Seiken Training Box — Web

Página web one-page para Seiken Training Box (Sucre, Bolivia).

## Cómo abrirla

1. Doble click en `index.html` → se abre en tu navegador.
2. Para editarla: abre la carpeta en VS Code → edita `index.html`.

## Estructura

```
seiken-web/
├── index.html          ← Toda la web (HTML + CSS + JS en un archivo)
├── image-slot.js       ← Componente para arrastrar fotos a los espacios marcados
├── assets/             ← Pon aquí tus fotos reales (jpg / png / webp)
└── README.md           ← Este archivo
```

## Cómo poner las fotos reales

Tienes **dos opciones**:

### Opción A — Arrastrar y soltar (rápido, para probar)

Abre `index.html` en el navegador y arrastra una foto sobre cualquier recuadro que diga
"Drop — …". Doble click para reencuadrar.

> ⚠️ Las fotos arrastradas solo persisten en el entorno Omelette. Si abres el archivo
> directamente en el navegador (file://), se pierden al recargar. Para una web en
> producción usa la Opción B.

### Opción B — Reemplazar `<image-slot>` por `<img>` (para producción)

1. Pon tus fotos en la carpeta `assets/` (ej. `assets/hero.jpg`).
2. En `index.html`, busca cada bloque como este:

   ```html
   <image-slot id="hero-athlete" placeholder="Drop — atleta principal (1200×1500)" shape="rect"></image-slot>
   ```

3. Reemplázalo por:

   ```html
   <img src="assets/hero.jpg" alt="Atleta entrenando" style="width:100%;height:100%;object-fit:cover" />
   ```

## Lista de fotos que necesitas

| ID en el HTML       | Sección                | Sugerencia de imagen                          | Tamaño ideal |
| ------------------- | ---------------------- | --------------------------------------------- | ------------ |
| `hero-bg`           | Hero (fondo)           | Foto ambiente del box en acción               | 1600×900     |
| `hero-athlete`      | Hero (derecha)         | Atleta principal — vertical                   | 1200×1500    |
| `manifesto-img`     | Manifiesto             | Detalle del box / barras / anillas            | 800×1000     |
| `gal-01` a `gal-07` | Galería "Inside"       | 7 fotos variadas del feed @seiken.box         | 800×800      |
| `coach-01` a `04`   | Coaches                | Retrato de cada coach                         | 600×800      |
| `final-bg`          | CTA final (rojo)       | Foto comunidad / grupo entrenando             | 1600×900     |

## Datos que faltan por confirmar

Estos están como **placeholders** — busca y reemplaza en `index.html`:

- **Dirección exacta**: actualmente "Calle Junín #642, entre Bolívar y Estudiantes"
- **Teléfono / WhatsApp**: actualmente +591 745 12 880
- **Email**: actualmente hola@seiken.bo
- **Nombres reales de coaches**: Iván Rodríguez · Valentina Mamani · Marco Calderón · Karla Aguilar
- **Precios mensuales en Bs.**: Open Box 320 · Fitness Grupal 490 · Método Opex 720
- **Horarios reales por día** (sección `<!-- HORARIOS -->`)

## Cómo cambiar el color de acento

En `index.html`, al inicio de `<style>`, edita esta línea:

```css
--accent: #e8412a;   /* el rojo / naranja distintivo */
```

## Cómo publicar la web

La forma más simple:

1. Entra en https://app.netlify.com/drop
2. Arrastra toda la carpeta `seiken-web/` a la página
3. Listo — tendrás una URL pública

O súbela a tu hosting actual por FTP.

## Editar con Claude Code

Si tienes Claude Code en VS Code, puedes pedirle cosas como:

- "Cambia el color principal a verde"
- "Añade una sección de testimonios después de coaches"
- "Cambia el teléfono por +591 765 43 210"
- "Traduce todo al inglés"
- "Agrega un formulario de contacto al final"

---

Hecho con ⚡ para Seiken Training Box · Sucre · 2026
