# Memoria de Desarrollo: Seiken Training Box
*Fecha de registro: 21 de junio de 2026*

Este documento registra el progreso actual del proyecto, las decisiones de diseño tomadas y los temas pendientes para continuar la sesión de mañana de forma eficiente.

---

## 1. Estado Actual de la Landing Page
El sitio está desarrollado como una SPA (Single Page Application) estática e interactiva utilizando **HTML5 nativo**, **Tailwind CSS (CDN)** y **JavaScript Vanilla**.

### Secciones Completadas
- **Hero:** Diseño de impacto con badge de vidrio templado ("⚡ 5 AÑOS EN SUCRE · MÉTODO OPEX CERTIFICADO"). Centrado vertical y alineación fluida a la izquierda.
- **Manifiesto:** Declaración de identidad con imágenes de apoyo y pilares conceptuales del Box.
- **Servicios:** Tarjetas interactivas con hover para *Fitness Grupal*, *Diseño Individualizado (Opex)* y *Nutrición*.
- **Tarifas y Horarios:** Tabla de horarios interactiva (WOD, Open Box, Especialidades) y tabla de planes/suscripciones.
- **Coaches:** Sección con perfiles y fotos de Esteban, Gabriel, Carolina, Jairo y Lara (Nutrilara).
- **Galería:** Cuadrícula de fotos reales de las clases y comunidad.
- **Ubicación & Contacto:** Mapa embebido de Google Maps y formulario de contacto/enlaces directos de WhatsApp y redes.

---

## 2. Ajustes Recientes del Hero (Resuelto hoy)
- **Problema de la 'N' en 'EVOLUCIÓN':** La última letra del título principal se recortaba en resoluciones altas.
- **Solución Aplicada:**
  1. Se incrementó el `max-width` de `.hero-content` de `640px` a `850px` en la línea 166. Con esto, la animación de revelado de palabras (`overflow: hidden`) cuenta con el ancho necesario y renderiza la palabra completa.
  2. Se eliminó la regla duplicada `.hero-backdrop::after` en la línea 160. Al removerla, volvió a activarse el gradiente doble original (línea 87), que garantiza un fondo oscuro lateral (92% de opacidad) que le da gran lectura a la tipografía blanca/verde frente a la foto del atleta.

---

## 3. Decisiones de Diseño e Imagen
- **Foto del Hero:** Se utiliza `imagen/seiken-box-hero-atleta.jpg` (antiguamente `img__4.jpg`, atleta en parada de manos). 
  * *Actualización reciente:* El usuario subió una versión recortada a **relación de aspecto 3/4**. Se optimizó su compresión reduciéndola de **782.56 KB** a **197.92 KB** (calidad 85, ancho máximo 1600px).
  * *Comportamiento:* El encuadre 3/4 se adapta excelentemente al contenedor del Hero. Llena de forma óptima el fondo en vista móvil y mantiene al atleta visible e imponente a la derecha en pantallas grandes sin comprometer la legibilidad del texto principal en la izquierda. Está configurada en full color con un zoom de `scale(1.15)` y alineación `right center`.
- **Nombres Descriptivos en Imágenes:** Se renombraron todas las imágenes genéricas del box (`img_1.jpg`, `img_2.jpg`, etc.) a nombres semánticos que describen el contenido en minúsculas y separados por guiones para cumplir las directrices de SEO técnico.
- **Compresión de Imágenes (WPO):** Se redujo el tamaño de la imagen de comunidad (`IMG_6551.png`) de 23.27 MB a 187 KB (reducción de 99.2%), previniendo problemas severos de carga y optimizando el Core Web Vital LCP.
- **Sellos/Marcas de Agua (Cuadros verdes "03"):** El usuario solicitó no tomarlos en cuenta, ya que se editarán y limpiarán posteriormente de forma manual.
- **No Desplazar la Foto:** Se descartó el uso de `left:40%` para mover la imagen a la derecha, ya que rompía la composición y dejaba áreas vacías en pantallas medianas.

---

## 4. Optimización de SEO Técnico y Rendimiento (Resuelto hoy)
- **Lazy Loading perezoso:** Se agregaron atributos `loading="lazy"` a todos los logotipos y recursos que cargan por debajo del primer scroll (Manifiesto y Footer), optimizando el rendimiento inicial.
- **Open Graph:** Se actualizó la etiqueta `<meta property="og:image">` con la ruta de la imagen optimizada para mejorar la experiencia de compartir enlaces en redes sociales sin consumir ancho de banda excesivo.
- **Jerarquía Semántica:** Se validó que exista exactamente una etiqueta `<h1>` principal en el Hero y que la estructura descendente de `<h2>`, `<h3>` y `<h4>` sea estrictamente jerárquica y semántica.

---

## 5. Temas Pendientes
1. **Validación Visual Responsiva:** Probar el comportamiento de la 'N' y el texto en distintos anchos de ventana (especialmente tablets y laptops pequeñas).
2. **Revisión de Contenidos:** Confirmar si hay cambios en los horarios definitivos o tarifas de los planes de entrenamiento.
