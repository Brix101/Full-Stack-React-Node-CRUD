import { Toaster } from "@/components/ui/sonner.tsx";
import { TodoFormProvider } from "@/providers/todo-form-provider.tsx";
import { TRPCReactProvider } from "@/providers/trpc-provider.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TRPCReactProvider>
      <TodoFormProvider>
        <App />
        <Toaster />
      </TodoFormProvider>
    </TRPCReactProvider>
  </StrictMode>
);
