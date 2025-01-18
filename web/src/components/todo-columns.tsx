import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table/data-table-column-header";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Todo } from "@/utils/types";
import { TodoAction } from "./todo-action";

export const todoColums: ColumnDef<Todo>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
  },
  {
    accessorKey: "isCompleted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isCompleted = row.getValue("isCompleted") as Todo["isCompleted"];
      return (
        <Badge
          className={cn(
            "uppercase",
            isCompleted ? "bg-green-400" : "bg-red-400",
          )}
        >
          {isCompleted ? "Complete" : "InComplete"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Todo["createdAt"];

      const formatedDate = format(date, "MMM dd yyyy, hh:mm a");

      return <span>{formatedDate}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <TodoAction todo={row.original} />;
    },
  },
];
