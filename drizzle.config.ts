import type { Config } from "drizzle-kit";
import { env } from "@/lib/env.server";

if (!env.DATABASE_URL) {
  console.log("==> Cannot find database url");
}

export default {
  schema: "./lib/supabase/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL || "",
  },
} satisfies Config;
