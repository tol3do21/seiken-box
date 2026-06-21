# Configuración de Orquestación Automática: CBA Sucre Web

## Stack Tecnológico Obligatorio
- **Framework:** HTML5 Nativo, Limpio y Semántico.
- **Estilos:** Tailwind CSS (vía CDN o configuración local simple).
- **Interactividad:** JavaScript Vanilla (JS Puro).
- **Idioma del Código:** Técnico, limpio y sin modismos/coloquialismos.

## Estándares de SEO y Optimización Técnica
- **Semántica:** Uso obligatorio de etiquetas HTML5 semánticas (<header>, <main>, <section>, etc.).
- **Jerarquía:** Máximo un (1) encabezado <h1> por documento, seguido de una estructura jerárquica estricta (h2, h3).
- **Metadatos:** Incluir metaetiquetas SEO estándar (description, keywords, viewport) y etiquetas Open Graph (og:) para optimización en redes sociales.
- **Imágenes:** Atributo 'alt' descriptivo obligatorio en todas las etiquetas <img> para accesibilidad y SEO. Nombres de archivos de imagen limpios y descriptivos.

## Enrutamiento Automático de Sub-Agentes y Skills
El modelo principal debe actuar como Orquestador General y delegar tareas de forma autónoma a las habilidades de la carpeta `.agents/skills/` según el contexto del prompt del usuario:

### Regla de Recomendación de Modelo de IA (Antes de Iniciar)
* **Evaluación Inicial Obligatoria:** Ante cualquier nueva solicitud del usuario, el modelo principal debe analizar el tipo de tarea y, antes de proponer cambios o escribir código, recomendar explícitamente al usuario qué modelo seleccionar en su cliente de chat para un rendimiento óptimo:
  - **Claude Sonnet 4.6 (Thinking):** Recomendado para maquetación visual, diseño CSS, Tailwind CSS, estructuración de interfaces y animaciones (Skill `frontend-arquitecto`).
  - **Gemini 3.1 Pro (High) o Claude Opus 4.6 (Thinking):** Recomendado para lógica JS compleja, refactorización profunda, algoritmos, depuración de seguridad y resolución de errores críticos.
  - **Gemini 3.5 Flash (High):** Recomendado para optimizaciones rápidas, SEO básico, edición de metadatos, cambios de texto simples y respuestas veloces (Skill `seo-tecnico`).

1. **Si el usuario pide estructurar, diseñar o maquetar componentes visuales:**
   - Recomienda cambiar a **Claude Sonnet 4.6 (Thinking)** e invoca el Skill: `frontend-arquitecto`.
2. **Si el usuario solicita inicializar páginas, editar el <head> o reestructurar contenidos:**
   - Recomienda cambiar a **Gemini 3.5 Flash (High)** o **Gemini 3.1 Pro (High)** e invoca el Skill: `seo-tecnico`.
3. **Si el usuario solicita contenido, imágenes, fotos o mockups visuales reales de la marca:**
   - Invoca automáticamente el Skill: `media-extractor`.
4. **Antes de ejecutar cualquier comando de escritura o modificación en el disco local:**
   - Activa obligatoriamente el Skill: `flujo-aprobacion`.

## Restricciones Estrictas
- **PROHIBIDO** el uso de Python o la creación de servidores backend.
- **PROHIBIDO** el uso de frameworks pesados o librerías ajenas.
- **Protocolo:** Ningún sub-agente puede escribir código directamente en los archivos del espacio de trabajo sin pasar primero por la validación del chat y la aprobación manual del usuario.