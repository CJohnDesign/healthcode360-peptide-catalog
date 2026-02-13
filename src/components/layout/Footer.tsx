import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-brand-border mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-display text-body-sm tracking-wider uppercase text-brand-silver">
            HealthCode360
          </p>
          <nav className="flex gap-8">
            <Link href="/products" className="text-body-sm text-brand-silver hover:text-brand-white transition-colors">
              Catalog
            </Link>
            <Link href="/categories" className="text-body-sm text-brand-silver hover:text-brand-white transition-colors">
              Categories
            </Link>
            <Link href="/knowledge" className="text-body-sm text-brand-silver hover:text-brand-white transition-colors">
              Knowledge
            </Link>
            <Link href="/interest-list" className="text-body-sm text-brand-silver hover:text-brand-white transition-colors">
              My List
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-body-sm text-brand-silver-dark text-center">
          Compounded for use under the supervision of a licensed healthcare provider. Use only as prescribed.
        </p>
      </div>
    </footer>
  );
}
