# Production-Ready Cloudflare Workers Best Practices

## Configuration
- **Compatibility Date**: Keep it current (e.g., `2026-04-17`) to access latest features.
- **Node.js Compatibility**: Enable `nodejs_compat` flag for modules like `crypto`, `buffer`, etc.
- **Type Generation**: Use `wrangler types` to generate `Env` interfaces; don't hand-write them.
- **Secrets**: Use `wrangler secret put` for API keys and credentials. NEVER in source or config.
- **Environments**: Use named environments (staging, production) in `wrangler.jsonc/toml`.
- **Custom Domains**: Prefer Custom Domains over Routes when the Worker is the origin.

## Performance & Architecture
- **Streaming**: Stream request/response bodies using `TransformStream` to stay within 128MB memory limit.
- **WaitUntil**: Use `ctx.waitUntil()` for non-blocking background tasks (logging, analytics).
- **Bindings**: Use Cloudflare service bindings (R2, KV, D1) instead of REST APIs.
- **Service Bindings**: Use for Worker-to-Worker communication (zero-cost, RPC support).
- **Database**: Use **Hyperdrive** for external Postgres/MySQL to manage connection pooling.
- **Durable Objects**: Use for WebSockets with the Hibernation API for reliability.

## Observability
- **Workers Logs & Traces**: Enable in config. Use `head_sampling_rate` to manage volume.
- **Structured Logging**: Use `console.log(JSON.stringify({...}))` for searchable logs.
- **Error Handling**: Use `console.error` for proper severity in dashboards.

## Security
- **Web Crypto**: Use `crypto.randomUUID()` and `crypto.subtle` for secure operations.
- **Timing Attacks**: Use `crypto.subtle.timingSafeEqual()` for secret comparisons.
- **Global State**: DO NOT store request-scoped state in global variables (isolates are reused).

## Better Auth Specifics
- One auth instance per request.
- Store auth instance on Hono context.
- Pass `ctx.env` and `ctx.executionCtx` to the auth instance.
- Handle KV 60-second replication lag if using KV for sessions (though D1 is preferred for Better Auth).
