// Node modules
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// Project files
import Routes from "./Routes";
import "./main.css";

// Properties
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<h1>Sorry, an error occurred.</h1>}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Routes />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
