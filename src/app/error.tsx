"use client";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <EmptyState
      role="alert"
      title="Something went wrong"
      description="An unexpected error occurred while loading this page."
      action={<Button onClick={reset}>Try again</Button>}
    />
  );
}
