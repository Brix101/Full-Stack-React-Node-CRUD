import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RouterInputs } from "@rn-crud/api";
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
import { useTodoFormContext } from "@/providers/todo-form-provider";

const input = z.object({
  title: z.string().max(256),
  isCompleted: z.boolean().default(false),
});

export function TodoForm() {
  const { setIsOpen, todo, setTodo } = useTodoFormContext();

  const utils = trpc.useUtils();
  const form = useForm({
    resolver: zodResolver(input),
    defaultValues: {
      title: todo?.title ?? "",
      isCompleted: todo?.isCompleted ?? false,
    },
  });

  const createKey = getQueryKey(trpc.todo.create);
  const createToastId = createKey.join("-");
  const createMutation = trpc.todo.create.useMutation({
    onMutate: () => {
      toast.loading("Adding todo!", {
        id: createToastId,
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
        id: createToastId,
      });
    },
    onError: (err) => {
      toast.error("Failed to add todo", {
        id: createToastId,
        description: err.message,
      });
    },
  });

  const updateKey = getQueryKey(trpc.todo.update);
  const updateToastId = updateKey.join("-");
  const updateMutation = trpc.todo.update.useMutation({
    onMutate: ({ id, values }) => {
      toast.loading("Updating todo!", {
        id: updateToastId,
      });
      utils.todo.all.setData(undefined, (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return oldData.map((item) => {
          if (item.id === id) {
            return { ...item, values };
          }
          return item;
        });
      });

      const prevData = utils.todo.all.getData(undefined);

      return { prevData };
    },
    onSuccess: (data) => {
      utils.todo.all.setData(undefined, (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return oldData.map((item) => {
          const updatedTodo = data?.find((upData) => upData.id === item.id);
          if (updatedTodo) {
            return { ...item, ...updatedTodo };
          }
          return item;
        });
      });

      toast.success("Todo successfully updated!", {
        id: updateToastId,
      });
    },
    onError: (err, _, ctx) => {
      console.log(err);
      toast.error("Failed to update todo", {
        id: updateToastId,
        description: err.message,
      });
      utils.todo.all.setData(undefined, ctx?.prevData);
    },
  });

  function onSubmit(values: RouterInputs["todo"]["create"]) {
    if (todo) {
      updateMutation.mutate({
        id: todo.id,
        values: values,
      });
    } else {
      createMutation.mutate(values);
    }
    setIsOpen(false);
    setTodo(undefined);
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
        <Button type="submit">{todo ? "Update" : "Add"}</Button>
      </form>
    </Form>
  );
}
