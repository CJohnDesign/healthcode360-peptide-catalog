"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { FilterSidebar } from "@/components/products/FilterSidebar";
import type { Product } from "@/types";

interface FilterableProductGridProps {
  products: Product[];
}

export function FilterableProductGrid({ products }: FilterableProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("name");

  const filteredAndSorted = useMemo(() => {
    let result = selectedCategory
      ? products.filter((p) => p.categorySlug === selectedCategory)
      : [...products];
    result = [...result].sort((a, b) =>
      sortBy === "name"
        ? a.name.localeCompare(b.name)
        : a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
    );
    return result;
  }, [selectedCategory, sortBy, products]);

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="lg:w-56 flex-shrink-0">
        <FilterSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>
      <div className="flex-1 min-w-0">
        <ProductGrid products={filteredAndSorted} />
      </div>
    </div>
  );
}
