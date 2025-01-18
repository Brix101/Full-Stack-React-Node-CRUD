import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TodoForm } from "./todo-form";
import { useTodoFormContext } from "@/providers/todo-form-provider";

export function TodoFormDialog() {
  const { isOpen, setIsOpen, todo, setTodo } = useTodoFormContext();

  function handleOnOpenChange(state: boolean) {
    setIsOpen(state);
    if (!state && todo) {
      setTodo(undefined);
    }
  }

  return (
    <Dialog onOpenChange={handleOnOpenChange} open={isOpen} modal>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{todo ? "Update" : "Add"} Todo</DialogTitle>
          <DialogDescription>
            {todo ? "Updating" : "add a new"} todo
          </DialogDescription>
        </DialogHeader>
        <TodoForm />
      </DialogContent>
    </Dialog>
  );
}
