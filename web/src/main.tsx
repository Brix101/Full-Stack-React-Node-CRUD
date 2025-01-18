import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TRPCReactProvider } from "@/providers/trpc-provider.tsx";
import { TodoFormProvider } from "@/providers/todo-form-provider.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TRPCReactProvider>
      <TodoFormProvider>
        <App />
        <Toaster />
      </TodoFormProvider>
    </TRPCReactProvider>
  </StrictMode>,
);
