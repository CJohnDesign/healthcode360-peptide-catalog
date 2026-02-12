import { products } from "@/data/products";
import { FilterableProductGrid } from "@/components/products/FilterableProductGrid";

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">
        Product Catalog
      </h1>
      <FilterableProductGrid products={products} />
    </div>
  );
}
