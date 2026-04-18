import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    cloudflareTest({
      wrangler: {
        configPath: "./wrangler.json",
      },
    }),
  ],
  test: {
    include: ["tests/**/*.test.ts", "tests/**/*.spec.ts"],
    exclude: ["node_modules", "dist", ".wrangler", "**/*.d.ts"],

    // Setup file for global test configuration
    setupFiles: ["./tests/setup.ts"],

    testTimeout: 10000,

    // Hook timeout
    hookTimeout: 10000,

    // Global test utilities (describe, it, expect without imports)
    globals: true,

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*.test.ts",
        "src/**/*.spec.ts",
        "src/types/**",
        "src/db/migrations/**",
        "src/main.ts",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
      all: true,
      clean: true,
    },

    // Retry failed tests once (helps with flaky tests)
    retry: 1,

    // Bail on first test failure in CI
    bail: process.env.CI ? 1 : 0,

    // Silent console logs in tests (cleaner output)
    silent: false,

    // Reporter
    reporters: process.env.CI ? ["verbose", "json"] : ["verbose"],

    // Watch mode settings
    watch: false,

    // Vitest 4+ pool configuration (no more poolOptions)
    pool: "forks",
    isolate: true,

    // Parallel execution
    maxConcurrency: 5,
    minWorkers: 1,
    maxWorkers: process.env.CI ? 2 : undefined,

    // Environment
    environment: "node",

    // Sequence
    sequence: {
      shuffle: false,
      concurrent: false,
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
