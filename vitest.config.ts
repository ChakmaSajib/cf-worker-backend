export default defineWorkersConfig({
  test: {
    include: ['tests/**/*.test.ts'],   // ← points to tests/ folder
    poolOptions: {
      workers: {
        wrangler: { configPath: './wrangler.json' },
      },
    },
  },
})
