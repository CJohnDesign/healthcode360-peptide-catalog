import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { categories } from "@/data/categories";

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
        Categories
      </h1>
      <p className="text-brand-grey-400 mb-12 max-w-2xl">
        Explore our peptide catalog by therapeutic area.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="group block border border-brand-border bg-brand-black hover:border-brand-grey-500 transition-colors overflow-hidden"
          >
            <PlaceholderImage src={cat.image} aspectRatio="16/9" label={cat.name} />
            <div className="p-6">
              <h2 className="font-display text-lg uppercase tracking-wider text-brand-white group-hover:opacity-80">
                {cat.name}
              </h2>
              <p className="mt-2 text-sm text-brand-grey-400 line-clamp-2">
                {cat.description}
              </p>
              <span className="mt-4 inline-block text-sm text-brand-grey-300 underline underline-offset-2">
                View {cat.productCount} products →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
