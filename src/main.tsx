// Node modules
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";

// Project files
import Routes from "./Routes";
import { CartProvider } from "state/cartContext";
import { UserProvider } from "state/userContext";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<h1>Sorry, an error occurred.</h1>}>
      <CartProvider>
        <UserProvider>
          <Toaster />
          <Routes />
        </UserProvider>
      </CartProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
