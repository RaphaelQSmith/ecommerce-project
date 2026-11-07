"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "./Button";
import { EmptyState } from "./EmptyState";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (args: { error: Error; reset: () => void }) => ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  override state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    // Hook for an error-reporting service (Sentry, Datadog, ...).
    console.error("ErrorBoundary caught an error", error, info.componentStack);
  }

  reset = (): void => {
    this.setState({ error: null });
  };

  override render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;

    if (this.props.fallback) {
      return this.props.fallback({ error, reset: this.reset });
    }
    return (
      <EmptyState
        role="alert"
        title="Something went wrong"
        description="An unexpected error occurred. You can try again."
        action={<Button onClick={this.reset}>Try again</Button>}
      />
    );
  }
}
