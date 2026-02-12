import { notFound } from "next/navigation";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const categoryProducts = products.filter((p) => p.categorySlug === params.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
      />
      <div className="mt-6">
        <PlaceholderImage src={category.image} aspectRatio="16/9" label={category.name} />
      </div>
      <div className="mt-8">
        <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white">
          {category.name}
        </h1>
        <p className="mt-4 text-brand-grey-400 max-w-2xl">{category.description}</p>
      </div>
      <div className="mt-12">
        <ProductGrid products={categoryProducts} />
      </div>
    </div>
  );
}
