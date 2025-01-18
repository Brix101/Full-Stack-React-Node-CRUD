import type { AppRouter } from "@rn-crud/api";
import {
  createTRPCReact,
  inferReactQueryProcedureOptions,
} from "@trpc/react-query";

// infer the types for your router
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;

export const trpc = createTRPCReact<AppRouter>();
