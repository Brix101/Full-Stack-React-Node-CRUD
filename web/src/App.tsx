import { trpc } from "@/utils/trpc";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { todoColums } from "@/components/todo-columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useTodoFormContext } from "@/providers/todo-form-provider";
import { Button } from "./components/ui/button";
import { TodoFormDialog } from "@/components/todo-form-dialog";

function App() {
  const { setIsOpen } = useTodoFormContext();

  const todoQuery = trpc.todo.all.useQuery();

  const data = todoQuery.data ?? [];
  const table = useReactTable({
    data,
    columns: todoColums,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <main className="flex-1 overflow-hidden p-6 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Todos</h1>
        <Button disabled={todoQuery.isLoading} onClick={() => setIsOpen(true)}>
          Add Todo
        </Button>
      </div>
      {todoQuery.isLoading ? (
        <DataTableSkeleton columnCount={todoColums.length} rowCount={10} />
      ) : (
        <DataTable table={table} />
      )}
      <TodoFormDialog />
    </main>
  );
}

export default App;
