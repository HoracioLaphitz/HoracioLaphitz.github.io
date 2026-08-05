import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.config.*",
        "**/*.d.ts",
        "**/types/",
        "scripts/",
      ],
    },
  },
  resolve: {
    alias: {
      "@domain": resolve(__dirname, "./src/domain"),
      "@application": resolve(__dirname, "./src/application"),
      "@infrastructure": resolve(__dirname, "./src/infrastructure"),
      "@presentation": resolve(__dirname, "./src/presentation"),
      "@shared": resolve(__dirname, "./src/shared"),
      "@main": resolve(__dirname, "./src/main"),
      "@data": resolve(__dirname, "./src/data"),
      "@i18n": resolve(__dirname, "./src/i18n"),
    },
  },
  esbuild: {
    target: "esnext",
  },
  server: {
    deps: {
      inline: [
        /@domain/,
        /@application/,
        /@infrastructure/,
        /@presentation/,
        /@shared/,
        /@main/,
        /@data/,
        /@i18n/,
      ],
    },
  },
});
