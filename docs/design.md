# Sistema de diseño

Referencia de tokens, patrones y componentes visuales del portfolio. La fuente de verdad es `tailwind.config.mjs` (tokens de Tailwind) y `src/presentation/styles/global.css` (variables CSS de tema).

## Tokens de diseño

### Espaciado — escala modular (razón 1.5)

| Token | Valor | px |
|---|---|---|
| `xs` | 0.5rem | 8 |
| `sm` | 0.75rem | 12 |
| `md` | 1rem | 16 |
| `lg` | 1.5rem | 24 |
| `xl` | 2.25rem | 36 |
| `2xl` | 3.375rem | 54 |
| `3xl` | 5.0625rem | 81 |
| `4xl` | 7.59375rem | 121.5 |
| `5xl` | 11.390625rem | 182.25 |

### Tipografía — escala modular (razón 1.25)

| Token | Tamaño | line-height |
|---|---|---|
| `xs` | 0.64rem (10.24px) | 1.2 |
| `sm` | 0.8rem (12.8px) | 1.5 |
| `base` | 1rem (16px) | 1.5 |
| `lg` | 1.25rem (20px) | 1.5 |
| `xl` | 1.5625rem (25px) | 1.5 |
| `2xl` | 1.953rem (31.25px) | 1.2 |
| `3xl` | 2.441rem (39.06px) | 1.2 |
| `4xl` | 3.052rem (48.83px) | 1.2 |
| `5xl` | 3.815rem (61.04px) | 1.2 |
| `6xl` | 4.768rem (76.29px) | 1.2 |

Tokens fluidos para titulares:

- `display`: `clamp(56px, 8vw, 96px)`, line-height 1.05, letter-spacing −0.02em.
- `display-sm`: `clamp(36px, 5vw, 56px)`, line-height 1.1, letter-spacing −0.02em.

### Familias tipográficas

| Token | Stack |
|---|---|
| `font-display` | Space Grotesk → system-ui (titulares) |
| `font-sans` / `font-body` | Inter → system-ui (cuerpo) |
| `font-mono` | JetBrains Mono → SF Mono → Consolas (código, metadatos) |

Las fuentes se cargan en `src/presentation/styles/fonts.css`.

### Color — capas semánticas

Los colores de Tailwind apuntan a variables CSS definidas en `global.css`. El tema claro vive en `:root` y el oscuro en `.dark` (`darkMode: "class"`, alternado por `useTheme`).

**`skin-*`** — superficies y texto:

| Token | Variable | Claro | Oscuro |
|---|---|---|---|
| `skin-primary` | `--bg-primary` | `#FFFFFF` | `#000000` |
| `skin-secondary` | `--bg-secondary` | `#F5F5F7` | `#1C1C1E` |
| `skin-tertiary` | `--bg-tertiary` | `#F0F0F2` | `#2C2C2E` |
| `skin-text` | `--text-primary` | `#1D1D1F` | `#F5F5F7` |
| `skin-text-secondary` | `--text-secondary` | `#3D3D3F` | `#AEAEB2` |
| `skin-muted` | `--text-muted` | `#6E6E73` | `#86868B` |
| `skin-accent` | `--accent-primary` | `#0F766E` | `#2DD4BF` |
| `skin-border` | `--border-light` | `#D2D2D7` | `#38383A` |
| `skin-border-medium` | `--border-medium` | `#C7C7CC` | `#48484A` |

**`brand-*`** — acento de marca:

| Token | Variable | Claro | Oscuro |
|---|---|---|---|
| `brand-primary` | `--accent-primary` | `#0F766E` | `#2DD4BF` |
| `brand-hover` / `brand-active` | `--accent-secondary` | `#0D9488` | `#5EEAD4` |
| `brand-accent` | `--md-accent` | `#0F766E` | `#2DD4BF` |

**`status-*`** — estados:

| Token | Variable | Claro | Oscuro |
|---|---|---|---|
| `status-success` | `--success` | `#34C759` | `#30D158` |
| `status-warning` | `--warning` | `#FF9500` | `#FF9F0A` |
| `status-error` | `--error` | `#FF3B30` | `#FF453A` |
| `status-info` | `--info` | — (sin definir en `global.css`) | — |

### Radios, sombras y elevación

- Las superficies editoriales y cards usan radios de 12–16px. `full` queda reservado para indicadores y filtros compactos.
- La elevación es sutil y se usa sin duplicarla con bordes decorativos.

### Movimiento

Anime.js 4.5.0 se usa mediante `useScopedMotion` para un único momento de entrada en el Hero. El contenido parte visible sin JavaScript, respeta `prefers-reduced-motion` y evita animaciones repetidas por sección. El catálogo conserva movimiento funcional al cambiar filtros.

### Z-index semántico

`base` 0 · `dropdown` 1000 · `sticky` 1100 · `fixed` 1200 · `modal-backdrop` 1300 · `modal` 1400 · `popover` 1500 · `tooltip` 1600.

## Patrón canónico de sección

Todas las secciones de la página principal siguen la misma estructura:

1. `<section id="...">` con ancla estable para la navegación.
2. Contenedor centrado (`max-w-*` + `mx-auto` + padding horizontal responsivo).
3. Encabezado directo en `font-display` con token `display-sm`; sin kicker repetitivo.
4. Contenido en grid/stack con tokens de espaciado.
5. Secciones estáticas; Hero concentra el único gesto de entrada y el catálogo anima solo cambios de resultados.

## Inventario de componentes

| Grupo | Componentes |
|---|---|
| Layout | `Navigation`, `Footer`, `PageLayout.astro` |
| Secciones | `Hero`, `ProjectCategories`, `Skills`, `Experience`, `Certifications` (+ `CertificateModal`), `Contact` |
| UI | `Logo`, `ThemeToggle`, `Icons` |
| Proyectos | `ProjectCard`, `ProjectFilters`, `ResourceDownload` |
| Dashboards | `ProjectDashboard` (registry + slugs), dashboards específicos (ecommerce, financiero, market basket) y shared (`DashboardShell`, `ChartCard`, `KpiCard`, `LoadingSkeleton`, `ErrorState`) |

Nota: `src/presentation/styles/{tokens,design-tokens,design-system}.ts` son módulos legacy sin importadores; no forman parte del sistema activo.
