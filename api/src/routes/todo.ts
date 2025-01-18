import { and, desc, eq } from "drizzle-orm";
import { publicProcedure } from "../trpc";
import { createTodoSchema, todo } from "../db/schema";
import { z } from "zod";

const findOneSchema = z.object({
  id: z.string(),
});

const updateTodoSchema = findOneSchema.extend({
  values: createTodoSchema.partial(),
});

export const todoRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.todo.findMany({
      orderBy: desc(todo.createdAt),
    });
  }),
  byId: publicProcedure.input(findOneSchema).query(({ ctx, input }) => {
    return ctx.db.query.todo.findFirst({
      where: and(eq(todo.id, input.id)),
    });
  }),
  create: publicProcedure
    .input(createTodoSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(todo).values(input).returning();
    }),
  update: publicProcedure.input(updateTodoSchema).mutation(({ ctx, input }) => {
    return ctx.db.update(todo).set(input.values).where(eq(todo.id, input.id));
  }),
  delete: publicProcedure.input(findOneSchema).mutation(({ ctx, input }) => {
    return ctx.db.delete(todo).where(eq(todo.id, input.id));
  }),
};
