export interface Env {
  ENVIRONMENT: "development" | "staging" | "production";
  LOG_LEVEL: "debug" | "info" | "warn" | "error";

  DB: D1Database;

  // Add other bindings here (KV, R2, etc.)
}
