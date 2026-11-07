import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Checkout" };

// Placeholder: the multi-step flow (cart -> shipping -> payment -> confirmation)
// is the next milestone. Types and Zod schemas already live in features/checkout.
export default function CheckoutPage() {
  return (
    <EmptyState
      title="Checkout is coming next"
      description="The multi-step checkout flow will be built on the schemas in features/checkout."
      action={
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-lg bg-slate-900 px-5 text-sm font-medium text-white hover:bg-slate-700"
        >
          Continue shopping
        </Link>
      }
    />
  );
}
