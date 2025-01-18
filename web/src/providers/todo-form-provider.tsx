import { Todo } from "@/utils/types";
import React from "react";

interface TodoFormContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo?: Todo;
  setTodo: React.Dispatch<React.SetStateAction<Todo | undefined>>;
}

const TodoFormContext = React.createContext<TodoFormContextType | undefined>(
  undefined,
);

export function TodoFormProvider(props: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [todo, setTodo] = React.useState<Todo | undefined>(undefined);

  return (
    <TodoFormContext.Provider value={{ isOpen, setIsOpen, todo, setTodo }}>
      {props.children}
    </TodoFormContext.Provider>
  );
}

export function useTodoFormContext() {
  const context = React.useContext(TodoFormContext);
  if (!context) {
    throw new Error(
      "useTodoFormContext must be used within a TodoFormProvider",
    );
  }
  return context;
}
