import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 256 }),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    ...timestamps,
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("email_idx").on(table.email),
    };
  },
);
