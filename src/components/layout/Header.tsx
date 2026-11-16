import Link from "next/link";
import { CartButton } from "@/features/cart/components/CartButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
            Storefront
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 sm:block"
            >
              Shop
            </Link>
            <CartButton />
          </nav>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-7xl justify-end px-4 py-3 sm:px-6 lg:px-8">
        <ThemeToggle />
      </div>
    </>
  );
}
