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

---

## 5. Control de Versiones e Integración Continua (GitHub y Cloudflare)
- **Repositorio Local:** Inicializado con Git localmente en la carpeta raíz del proyecto.
- **Archivo `.gitignore`:** Configurado para ignorar la carpeta de backups `codigo-previo/` y los directorios del agente de IA (`.agents/`).
- **Sincronización:** Vinculado con el repositorio oficial de GitHub: `https://github.com/tol3do21/seiken-box.git`. Se empujó la versión local a la rama `main`, activando la integración continua y el auto-despliegue en Cloudflare Pages en la URL pública **[https://seiken-box.pages.dev/](https://seiken-box.pages.dev/)**.
- **Limpieza de Repositorios Viejos:** Se eliminaron definitivamente de GitHub los repositorios obsoletos (`me-gusta-sucre`, `tol3do21.github.io` y `Pagina-Web-Prueba-`) mediante GitHub CLI tras la reautorización del permiso `delete_repo` en la terminal del cliente. La cuenta quedó limpia y solo conserva los proyectos activos de interés.

---

## 6. Mejoras Estéticas de Profundidad (Resuelto hoy)
- **Glows Radiales Verdes:** Se añadieron efectos de iluminación ambiental verde en las secciones oscuras (*Servicios*, *Horarios* y *Testimonios*) utilizando gradientes radiales y elípticos difusos en pseudoelementos CSS (`::before`/`::after`). Esto aporta dinamismo y elimina la sensación plana del fondo oscuro.
- **Imagen de Fondo en Servicios con Glassmorphism:** Se ubicó la foto de gimnásticos avanzados (`seiken-box-gimnasticos-avanzados.jpg`, atleta en sentadilla de arranque overhead) al fondo completo de la sección de *Servicios* (Qué ofrecemos). Se combinó con una máscara de degradado oscuro (`linear-gradient`) para salvaguardar la legibilidad y se aplicó un efecto de *glassmorphism* (translúcido con desenfoque `backdrop-filter`) a las tres tarjetas de servicios (`.svc`). Esto logra un diseño moderno e interactivo donde la foto del atleta es visible de fondo al pasar el cursor (hover translateY). La faja parallax intermedia inicial fue eliminada por completo.
- **Imagen de Fondo en Testimonios (Comunidad):** Se añadió la foto real de la comunidad (`seiken-box-comunidad.jpg`) al fondo completo de la sección de *Testimonios* (La comunidad habla) mediante el pseudoelemento `.testimonios::after`. La imagen está configurada al 100% de escala de grises y con una opacidad sutil de 0.15 para no interferir con la legibilidad del texto de las opiniones, brindando una textura colectiva impecable y premium.

---

## 7. Temas Pendientes
1. **Revisión de Contenidos:** Confirmar si hay cambios o correcciones en la información de horarios o detalles específicos de los entrenamientos.
2. **Edición manual de marcas de agua:** Limpiar las marcas de agua verdes en las imágenes restantes cuando el cliente disponga de las tomas originales sin edición previa.


