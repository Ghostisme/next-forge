import { defineConfig, env } from "prisma/config";
import { keys } from "./keys";
import "dotenv/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // url: keys().DATABASE_URL || "postgresql://postgres:123456@localhost:5432/infra_db?schema=public",
    url: keys().DATABASE_URL,
    // url: "postgresql://postgres:123456@localhost:5432/infra_db?schema=public",
    // url: env("DATABASE_URL"),
  },
});
