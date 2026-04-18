import { Hono } from "hono";
import type { Env } from "./types/env";

const app = new Hono<{ Bindings: Env }>();

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    environment: c.env.ENVIRONMENT,
    logLevel: c.env.LOG_LEVEL,
  });
});

export default app;
