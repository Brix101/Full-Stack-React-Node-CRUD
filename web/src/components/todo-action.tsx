import { Todo } from "@/utils/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisIcon } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/utils/trpc";
import { getQueryKey } from "@trpc/react-query";

interface TodoActionProps {
  todo: Todo;
}

export function TodoAction({ todo }: TodoActionProps) {
  const utils = trpc.useUtils();

  const deleteKey = getQueryKey(trpc.todo.delete);
  const deleteToastId = deleteKey.join("-");

  const todoDelete = trpc.todo.delete.useMutation({
    onMutate: () => {
      toast.loading("Deleting todo!", {
        id: deleteToastId,
      });
      utils.todo.all.setData(undefined, (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return oldData.filter((data) => data.id !== todo.id);
      });

      const prevData = utils.todo.all.getData(undefined);

      return { prevData };
    },
    onSuccess: () => {
      toast.success("Todo successfully deleted!", {
        id: deleteToastId,
      });
    },
    onError: (err, _, ctx) => {
      toast.error("Failed to delete todo", {
        id: deleteToastId,
        description: err.message,
      });
      utils.todo.all.setData(undefined, ctx?.prevData);
    },
  });

  function handleDeleteAction() {
    toast("Delete todo?", {
      id: deleteToastId,
      action: {
        label: "Delete",
        onClick: () => todoDelete.mutate({ id: todo.id }),
      },
      closeButton: true,
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <EllipsisIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Update</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteAction}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
