export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Storefront. Demo store, no real payments are processed.</p>
      </div>
    </footer>
  );
}
