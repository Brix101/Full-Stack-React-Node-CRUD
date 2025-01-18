import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import * as schema from "./schema";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
});
export const db = drizzle({
  logger: true,
  client: pool,
  casing: "snake_case",
  schema,
});
