// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { PUBLIC_POSITIONING } from "./src/data/public-positioning.v1.ts";


// https://astro.build/config
export default defineConfig({
  site: PUBLIC_POSITIONING.siteUrl,
  base: "/",

  // Configurar directorio de páginas
  srcDir: "./src",
  publicDir: "./public",

  integrations: [
    react(),
    sitemap(),
  ],

  // Optimizaciones para producción
  build: {
    inlineStylesheets: "auto",
    assets: "_astro",
    format: "directory",
    // Optimización adicional de assets
    assetsPrefix: undefined,
  },

  // Configuración de imágenes optimizada
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        limitInputPixels: 268402689,
      },
    },
    // Formatos optimizados para mejor performance
    domains: [],
    remotePatterns: [],
  },

  // Optimizaciones de Vite
  vite: {
    build: {
      cssCodeSplit: true,
      minify: "esbuild",
      rolldownOptions: {
        external: [
          /\.ipynb$/,
          /notebooks\//
        ],
        output: {
          codeSplitting: {
            groups: [
              {
                name: "react-vendor",
                test: /node_modules[\\/](?:react|react-dom)[\\/]/,
              },
            ],
          },
          chunkFileNames: "chunks/[name].[hash].js",
          assetFileNames: "assets/[name].[hash][extname]",
        },
      },
      chunkSizeWarningLimit: 1000,
      target: "esnext",
      sourcemap: false,
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
      exclude: ["@astrojs/react"],
      esbuildOptions: {
        target: "esnext",
      },
    },
    server: {
      fs: {
        strict: false,
      },
      watch: {
        ignored: [
          "**/node_modules/**",
          "**/dist/**",
          "**/.git/**",
          "**/Certificados/**",
          "**/Proyectos/**",
        ],
      },
    },
    resolve: {
      alias: {
        "@domain": "/src/domain",
        "@infrastructure": "/src/infrastructure",
        "@presentation": "/src/presentation",
        "@shared": "/src/shared",
        "@data": "/src/data",
      },
    },
  },

  output: "static",
  adapter: undefined,
  compressHTML: true,
});
