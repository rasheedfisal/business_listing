import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { env } from "../env.server";

if (!env.DATABASE_URL) {
  console.log("==> no database URL");
}

const client = postgres(env.DATABASE_URL, { max: 1 });
const db = drizzle(client, { schema });

// const migrateDb = async () => {
//   try {
//     console.log("==> Migrating client");
//     await migrate(db, { migrationsFolder: "migrations" });
//     console.log("==> Successfully Migrated");
//   } catch (error) {
//     console.log("==> Error Migrating client", error);
//   }
// };
// migrateDb();
export default db;
