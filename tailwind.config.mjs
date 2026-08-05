/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      // Breakpoints - Sistema de Grid 12 columnas
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      // Max Width - Basado en Grid System
      maxWidth: {
        xs: "20rem",      // 320px
        sm: "40rem",      // 640px
        md: "48rem",      // 768px
        lg: "64rem",      // 1024px
        xl: "80rem",      // 1280px
        "2xl": "96rem",   // 1536px
        // Legacy support
        "container-xs": "600px",
        "container-sm": "688px",
        "container-md": "920px",
        "container-lg": "1200px",
        "container-xl": "1280px",
        // Content containers
        content: "980px",
        "prose-narrow": "760px",
      },
      // Spacing - Modular Scale (Ratio 1.5)
      spacing: {
        xs: "0.5rem",      // 8px
        sm: "0.75rem",     // 12px
        md: "1rem",        // 16px
        lg: "1.5rem",      // 24px
        xl: "2.25rem",     // 36px
        "2xl": "3.375rem", // 54px
        "3xl": "5.0625rem", // 81px
        "4xl": "7.59375rem", // 121.5px
        "5xl": "11.390625rem" // 182.25px
      },
      // Font Size - Perfect Fourth (Ratio 1.25)
      fontSize: {
        xs: ["0.64rem", { lineHeight: "1.2" }],     // 10.24px
        sm: ["0.8rem", { lineHeight: "1.5" }],      // 12.8px
        base: ["1rem", { lineHeight: "1.5" }],      // 16px
        lg: ["1.25rem", { lineHeight: "1.5" }],     // 20px
        xl: ["1.5625rem", { lineHeight: "1.5" }],   // 25px
        "2xl": ["1.953rem", { lineHeight: "1.2" }], // 31.25px
        "3xl": ["2.441rem", { lineHeight: "1.2" }], // 39.06px
        "4xl": ["3.052rem", { lineHeight: "1.2" }], // 48.83px
        "5xl": ["3.815rem", { lineHeight: "1.2" }], // 61.04px
        "6xl": ["4.768rem", { lineHeight: "1.2" }], // 76.29px
        // Fluid display tokens
        display: [
          "clamp(56px, 8vw, 96px)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-sm": [
          "clamp(36px, 5vw, 56px)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
      },
      // Border Radius - Basado en Spacing
      borderRadius: {
        sm: "0.75rem",  // 12px
        DEFAULT: "1rem", // 16px
        md: "1rem",     // 16px
        lg: "1.5rem",   // 24px
        xl: "2.25rem",  // 36px
        "2xl": "3.375rem", // 54px
        full: "9999px"
      },
      // Colors - WCAG AAA Compliant
      colors: {
        skin: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary: "var(--bg-tertiary)",
          text: "var(--text-primary)",
          "text-secondary": "var(--text-secondary)",
          muted: "var(--text-muted)",
          accent: "var(--accent-primary)",
          "on-accent": "var(--md-on-accent)",
          border: "var(--border-light)",
          "border-medium": "var(--border-medium)",
        },
        brand: {
          primary: "var(--accent-primary)",
          hover: "var(--accent-secondary)",
          active: "var(--accent-secondary)",
          accent: "var(--md-accent)",
        },
        status: {
          success: "var(--success)",
          warning: "var(--warning)",
          error: "var(--error)",
          info: "var(--info)",
        },
      },
      // Font Family - Space Grotesk (display) + Inter (body)
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "Space Grotesk",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        body: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "SF Mono", "Consolas", "monospace"],
      },
      // Font Weight
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
      // Letter Spacing
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      // Line Height
      lineHeight: {
        tight: "1.2",
        normal: "1.5",
        relaxed: "1.75",
        loose: "2",
      },
      // Box Shadow - Elevation System
      boxShadow: {
        sm: "0px 1px 2px rgba(46, 48, 51, 0.05), 0px 1px 3px rgba(46, 48, 51, 0.04)",
        DEFAULT: "0px 2px 4px rgba(46, 48, 51, 0.06), 0px 3px 6px rgba(46, 48, 51, 0.05)",
        md: "0px 2px 4px rgba(46, 48, 51, 0.06), 0px 3px 6px rgba(46, 48, 51, 0.05)",
        lg: "0px 4px 8px rgba(46, 48, 51, 0.08), 0px 6px 12px rgba(46, 48, 51, 0.06)",
        xl: "0px 8px 16px rgba(46, 48, 51, 0.09), 0px 12px 24px rgba(46, 48, 51, 0.07)",
        "2xl": "0px 12px 24px rgba(46, 48, 51, 0.10), 0px 16px 32px rgba(46, 48, 51, 0.08)",
        none: "none",
      },
      // Animation Duration
      transitionDuration: {
        fast: "150ms",
        DEFAULT: "300ms",
        normal: "300ms",
        slow: "500ms",
        slower: "700ms",
      },
      // Animation Timing
      transitionTimingFunction: {
        linear: "linear",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      // Z-Index
      zIndex: {
        base: "0",
        dropdown: "1000",
        sticky: "1100",
        fixed: "1200",
        "modal-backdrop": "1300",
        modal: "1400",
        popover: "1500",
        tooltip: "1600",
      },
      // Animation Keyframes
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
        scaleIn: "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
  // Optimización de purge para producción
  safelist: [],
};
