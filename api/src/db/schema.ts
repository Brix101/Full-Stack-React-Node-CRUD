import { sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const todo = pgTable("todo", (t) => ({
  id: t.uuid("id").notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
  isCompleted: t.boolean().default(false).notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp({ mode: "string" }).$onUpdateFn(() => sql`now()`),
}));

export const createTodoSchema = createInsertSchema(todo, {
  title: z.string().max(256),
  isCompleted: z.boolean().default(false),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
