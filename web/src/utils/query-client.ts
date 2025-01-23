import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error);
      const title = error instanceof Error ? error.name : "Unknown error";
      const description = `An error occurred: ${
        error instanceof Error ? error.message : "Unknown error"
      }`;

      toast.error(title, {
        description,
        closeButton: true,
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const title = error instanceof Error ? error.name : "Unknown error";
      const description = `An error occurred: ${
        error instanceof Error ? error.message : "Unknown error"
      }`;

      toast.error(title, {
        description,
        closeButton: true,
      });
    },
  }),
});
