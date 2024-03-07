import React from "react";
import { useErrorBoundary } from "../hooks/useErrorBoundary";

function ErrorBoundary({ children }) {
  const hasError = useErrorBoundary();

  return hasError ? (
    <div>
      <h1>Something went wrong.</h1>
      <h3>Please refresh the page.</h3>
    </div>
  ) : (
    children
  );
}

export default ErrorBoundary;
