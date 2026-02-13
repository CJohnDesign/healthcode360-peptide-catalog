import { memo } from "react";
import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Badge } from "@/components/ui/Badge";
import { InterestButton } from "@/components/interest/InterestButton";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group border border-brand-border bg-brand-black hover:border-brand-grey-500 transition-colors flex flex-col">
      <Link href={`/products/${product.slug}`} className="block flex-1">
        <PlaceholderImage
          src={product.image}
          aspectRatio="1/1"
          label={product.name}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        <div className="p-4">
          <Badge variant={product.isBlend ? "blend" : "default"} className="mb-2">
            {product.category}
          </Badge>
          <h3 className="font-display text-body-sm uppercase tracking-wider text-brand-white group-hover:opacity-80">
            {product.name}
          </h3>
          <p className="mt-1 text-caption text-brand-silver line-clamp-2">{product.shortDescription}</p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <InterestButton product={product} />
      </div>
    </div>
  );
});
