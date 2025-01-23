import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { createTodoSchema, todo } from "../db/schema";
import { publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const findOneSchema = z.object({
  id: z.string(),
});

const updateTodoSchema = findOneSchema.extend({
  values: createTodoSchema.partial(),
});

export const todoRouter = {
  all: publicProcedure.query(async ({ ctx }) => {
    try {
      const todos = await ctx.db.query.todo.findMany({
        orderBy: desc(todo.createdAt),
      });

      return todos;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
        cause: err,
      });
    }
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
    return ctx.db
      .update(todo)
      .set(input.values)
      .where(eq(todo.id, input.id))
      .returning();
  }),
  delete: publicProcedure.input(findOneSchema).mutation(({ ctx, input }) => {
    return ctx.db.delete(todo).where(eq(todo.id, input.id));
  }),
};
