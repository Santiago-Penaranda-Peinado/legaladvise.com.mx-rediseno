# Legal Advise - Plataforma Web Corporativa

## Descripción General
Sitio web corporativo del despacho jurídico "Legal Advise", rediseñado desde una plataforma WordPress Legacy hacia una moderna Single-Page Application (SPA) basada en Vanilla JavaScript, HTML5 semántico y preprocesado avanzado con SCSS. 

El sitio está estructurado bajo un ecosistema "Dockerizado", asegurando un despliegue y flujo de trabajo de desarrollo instantáneo, predecible y sin fricciones por discrepancias entre sistemas operativos.

## Metas del Proyecto
1. **Rendimiento Máximo:** Abandonar el peso de bases de datos de WordPress y plugins pesados en favor de código estático minificado.
2. **Interfaz Premium:** Una experiencia de usuario altamente fluida con animaciones nativas al hacer scroll, interacción de componentes táctiles, Parallax, "Glassmorphism" y layouts superpuestos asimétricos modernos.
3. **Escalabilidad y Mantenibilidad:** Diseño modular por componentes en SCSS que emula marcos de trabajo como React, permitiendo cambiar colores y comportamientos globales desde un solo archivo.

---

## Arquitectura y Tecnologías
- **Core Frontend:** HTML5 y Vanilla JavaScript (ES6+ Modules).
- **Estilos:** SCSS compilado con arquitectura BEM + 7-1 (Modificada para partials).
- **Bundler y Servidor Local:** **[Vite](https://vitejs.dev/)**, escogido por su velocidad de compilación casi instantánea (HMR) y empaquetado ultra optimizado para producción.
- **Entorno de Desarrollo:** **Docker & Docker Compose**. El proyecto corre íntegramente dentro de un contenedor Node.js de Alpine Linux, aislando dependencias.

---

## Explicación Estructural (Directorios)

El código fuente está ubicado en `/src`, separando lógica, estilos y el documento de entrada `index.html`.

```text
/
├── docker-compose.yml       # Orquestación del contenedor local (Mapeo Puerto 5173).
├── Dockerfile               # Imagen del sistema basada en Node para correr Vite.
├── package.json             # Manifiesto de dependencias (Vite, Sass).
├── index.html               # Semántica principal. Estructurada por IDs (experiencia, filosofia, etc).
├── /public/                 # Directorio raíz público de Vite. Contiene assets estáticos.
│   └── /images/             # Fotografías, vectores corporativos, fondos parallax.
└── /src/
    ├── /js/
    │   ├── main.js          # Bootstrapper principal. Espera a que el DOM cargue e invoca submódulos.
    │   ├── navigation.js    # Lógica del header interactivo (Background Blur en Scroll) y scroll suave.
    │   ├── slider.js        # Lógica autónoma del Hero de Carrusel rotativo, transiciones automáticas.
    │   └── utils.js         # Utilidades globales, como el IntersectionObserver para animaciones al scroll.
    └── /scss/
        ├── style.scss       # Importador maestro SCSS. Ningún estilo se escribe aquí.
        ├── _variables.scss  # Fuente de la verdad corporativa: Fuentes (Inter/Outfit), Colores y Breakpoints.
        ├── _mixins.scss     # Funciones reutilizables (Media queries para Flex, Grid, Responsividad).
        ├── _base.scss       # Reset global, custom Scrollbars, animaciones globales (.animate-in).
        ├── _layout.scss     # Reglas estructurales que afectan el flujo maestro (Containers, Section Padding).
        ├── _components.scss # UI aislada (Botones expansibles, tarjetas base, utilidades de texto).
        ├── /layout/
        │   ├── _header.scss # Navbar, menú móvil hamburguesa.
        │   └── _footer.scss # Estilos oscuros del pie de página.
        └── /sections/
            ├── _hero.scss             # Tipografía titanica, overlay fotográfico y lógica del slider.
            ├── _experiencia.scss      # Tarjetas escalonadas sobre el tiempo (Timeline asíncrono).
            ├── _filosofia.scss        # Macro-sección oscura con imagen Parallax y frases entrelazadas.
            ├── _infraestructura.scss  # Estructura visual atrevida moderna con layout fotográfico "Roto" (Overlapping).
            ├── _servicios.scss     # Cuadrícula interactiva de áreas jurídicas con elevación z-index avanzada.
            └── _contacto.scss         # Formulario limpio y cuadrícula de datos.
```

## Por qué se construyó de esta manera:
- **Ecosistema JS Modularizado:** Al separar responsabilidades (Ej. slider aislado de navigación), se evita el *"Spaghetti Code"*. Si falla el slider, la navegación seguirá viva. Usar `<script type="module">` permite este entorno.
- **SCSS Partials:** Se extrajo el SCSS monstruoso en un sistema fraccionado. Un desarrollador que necesite actualizar la botonera *solo* abrirá `_components.scss`. Uno que cambie la sección de contacto, solo abrirá `_contacto.scss`.
- **IntersectionObserver nativo:** En lugar de cargar megabytes de librerías como *Animate.css* o *AOS (Animate On Scroll)*, implementamos nuestra propia lógica hiper-ligera en `utils.js` logrando el mismo lujo interactivo consumiendo 0% de memoria innecesaria del navegador.

---

## Cómo Ejecutar el Proyecto (Para Desarrolladores)

El sistema ha sido purgado de la necesidad de instalar dependencias de Node localmente. **Solo requieres tener Docker Desktop encendido.**

1. **Abrir una terminal** en la raíz (donde vive `docker-compose.yml`).
2. Levantar el proyecto en segundo plano:
   ```bash
   docker-compose up -d
   ```
3. Docker autoconstruirá la imagen, descargará el Linux ligero, instalará `Vite` y sus dependencias (como `sass`), y creará el puente hacia tu máquina.
4. **Abrir el Navegador:** 
   Navega a: `http://localhost:5173`
   *El Hot-Module Replacement (HMR) está enlazado directamente a tu disco duro. Si guardas un archivo SCSS o HTML en Windows/Mac, el contenedor detectará el cambio y recargará el navegador al milisegundo en tiempo real.*
5. **Apagar Servidor Docker:**
   ```bash
   docker-compose down
   ```

---

## Generar Versión de Producción (Subida por FTP)

Esta sección explica cómo compilar el sitio en archivos estáticos listos para subir a cualquier hosting tradicional vía FTP (cPanel, FileZilla, etc.).

### 1. Ejecutar el comando de build

Con el contenedor corriendo (o puedes levantarlo solo para el build):

```bash
# Opción A — contenedor ya en ejecución en segundo plano
docker-compose exec legaladvise_vite npm run build

# Opción B — levantar solo para el build y apagar de inmediato
docker-compose run --rm legaladvise_vite npm run build
```

> **Nota:** el nombre del servicio es `legaladvise_vite`, tal como está definido en `docker-compose.yml`.

### 2. Qué genera el build

Vite compila y optimiza todo en la carpeta `/dist` dentro del proyecto:

```text
/dist/
├── index.html          ← HTML minificado con hashes en los imports
├── assets/
│   ├── index-[hash].js ← JavaScript del sitio (minificado + tree-shaken)
│   └── index-[hash].css← CSS final compilado desde todos los SCSS (minificado)
└── images/             ← Copia de /public/images (logos, fotos, etc.)
```

Lo que Vite hace automáticamente:
- Minifica HTML, CSS y JS
- Agrega hashes al nombre de los archivos para invalidar caché
- Elimina código CSS/JS no utilizado (tree-shaking)
- Copia intacto el contenido de `/public` (imágenes, favicons, etc.)

### 3. Verificar el build localmente (opcional pero recomendado)

Antes de subir por FTP, puedes previsualizar la versión de producción localmente:

```bash
docker-compose exec legaladvise_vite npm run preview
```

Esto levanta un servidor de previsualización en `http://localhost:4173`. Si todo se ve bien, procede con la subida.

### 4. Subir por FTP

Sube **únicamente el contenido de la carpeta `/dist`** (no el proyecto completo) a la raíz de tu hosting:

| Origen (local)        | Destino (servidor FTP)    |
|-----------------------|---------------------------|
| `dist/index.html`     | `public_html/index.html`  |
| `dist/assets/`        | `public_html/assets/`     |
| `dist/images/`        | `public_html/images/`     |

> **Importante:** si el sitio no va en la raíz del dominio sino en un subdirectorio (ej. `misitio.com/legal/`), es necesario agregar `base: '/legal/'` en `vite.config.js` antes de compilar:
> ```js
> export default defineConfig({
>     base: '/legal/',   // <-- ruta desde la raíz del dominio
>     css: { devSourcemap: true },
> });
> ```

### 5. Limpiar el build anterior

Si necesitas recompilar, la carpeta `/dist` se sobreescribe automáticamente. Si quieres borrarla manualmente:

```bash
# En PowerShell (Windows)
Remove-Item -Recurse -Force dist
```

---

*Documentación técnica — Legal Advise Web Corporativa. Despliegue automático (CI/CD) pendiente para cuando se defina el dominio definitivo.*
