// Node modules
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

// Project files
import Header from "components/Header";

export function Layout() {
  // Components
  const errorBoundary = <h1>Sorry, an error occurred above routes.</h1>;

  return (
    <div className="content">
      <Header />
      <main>
        <ErrorBoundary fallback={errorBoundary}>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}
