import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

let db: PostgresJsDatabase | null = null;

if (process.env.DATABASE_URL) {
  const client = postgres(process.env.DATABASE_URL);
  db = drizzle(client);
} else {
  console.error("DATABASE_URL not set");
}

export default db as PostgresJsDatabase;
