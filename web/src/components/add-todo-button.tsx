import React from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TodoForm } from "./todo-form";

export function AddTodoButton(props: ButtonProps) {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={isOpen} modal>
      <DialogTrigger asChild {...props}>
        <Button>Add Todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>add a new todo</DialogDescription>
        </DialogHeader>
        <TodoForm onCloseForm={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
