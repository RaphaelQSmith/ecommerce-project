import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  role?: "status" | "alert";
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  role,
  className,
}: EmptyStateProps) {
  return (
    <div
      role={role}
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-16 text-center",
        className,
      )}
    >
      {icon ? <div className="text-slate-400">{icon}</div> : null}
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      {description ? (
        <p className="max-w-sm text-sm text-slate-600">{description}</p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
