import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { categories } from "@/data/categories";

export function CategoryShowcase() {
  return (
    <section className="py-16 md:py-24 border-t border-brand-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl uppercase tracking-wider text-brand-white mb-12">
          Explore by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group block border border-brand-border bg-brand-black hover:border-brand-grey-500 transition-colors overflow-hidden"
            >
              <PlaceholderImage
                src={cat.image}
                aspectRatio="16/9"
                label={cat.name}
                context={cat.name}
              />
              <div className="p-4">
                <h3 className="font-display text-sm uppercase tracking-wider text-brand-white group-hover:opacity-80">
                  {cat.name}
                </h3>
                <p className="mt-2 text-xs text-brand-grey-400 line-clamp-2">
                  {cat.description}
                </p>
                <span className="mt-2 inline-block text-xs text-brand-grey-300 underline underline-offset-2">
                  {cat.productCount} products
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
