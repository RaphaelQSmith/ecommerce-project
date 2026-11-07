import { Suspense } from "react";
import { ProductBrowser } from "@/features/products/components/ProductBrowser";
import { ProductGridSkeleton } from "@/features/products/components/ProductSkeleton";

export default function HomePage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Shop all products
        </h1>
        <p className="mt-2 text-slate-600">
          Thoughtfully designed essentials for home, travel and everyday life.
        </p>
      </div>
      {/* useSearchParams requires a Suspense boundary in the App Router. */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductBrowser />
      </Suspense>
    </>
  );
}
