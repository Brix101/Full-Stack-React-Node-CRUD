import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RouterInputs, RouterOutputs } from "@rn-crud/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/utils/trpc";
import { getQueryKey } from "@trpc/react-query";
import { toast } from "sonner";

interface TodoFormProps {
  onCloseForm?(open: boolean): void;
}

const input = z.object({
  title: z.string().max(256),
  isCompleted: z.boolean().default(false),
});

export function TodoForm(props: TodoFormProps) {
  const utils = trpc.useUtils();
  const form = useForm({
    resolver: zodResolver(input),
    defaultValues: {
      title: "",
      isCompleted: false,
    },
  });

  const mutationKey = getQueryKey(trpc.todo.create);
  const toastId = mutationKey.join("-");

  const createMutation = trpc.todo.create.useMutation({
    onMutate: () => {
      toast.loading("Adding todo!", {
        id: toastId,
      });
    },
    onSuccess: (data) => {
      utils.todo.all.setData(undefined, (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return data.concat(oldData);
      });

      toast.success("Todo successfully added!", {
        id: toastId,
      });
    },
    onError: (err) => {
      toast.error("Failed to add todo", {
        id: toastId,
        description: err.message,
      });
    },
  });

  function onSubmit(values: RouterInputs["todo"]["create"]) {
    if (props.onCloseForm) {
      props.onCloseForm(false);
    }

    createMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isCompleted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Todo is Complete</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">
          Add
          <span className="sr-only">Add</span>
        </Button>
      </form>
    </Form>
  );
}
