import { defineConfig } from "drizzle-kit";

/**
 * Drizzle Kit Configuration for Cloudflare D1
 *
 * - Drizzle Kit uses Wrangler CLI - reads from wrangler.json automatically
 * - No DATABASE_URL needed - D1 is not a traditional database with connection strings
 * - No CLOUDFLARE_ACCOUNT_ID in drizzle config
 * - No CLOUDFLARE_DATABASE_ID in drizzle config
 * - No CLOUDFLARE_API_TOKEN in drizzle config
 *
 * How Wrangler Knows Which Database to Use:
 * The `--env` flag tells Wrangler which environment to use:
 * - Local: `wrangler d1 migrations apply DB --local`
 * - Staging: `wrangler d1 migrations apply DB --remote --env staging`
 * - Production: `wrangler d1 migrations apply DB --remote --env production`
 *
 * Wrangler reads the corresponding database ID from wrangler.json based on the --env flag.
 */

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "sqlite",
  driver: "d1-http",
  strict: true,
  casing: "snake_case",
});
