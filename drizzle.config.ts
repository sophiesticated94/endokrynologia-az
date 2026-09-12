import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./db/postgres/migrations",
  schema: "./db/postgres/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/endokrynologia_dev",
  },
});
