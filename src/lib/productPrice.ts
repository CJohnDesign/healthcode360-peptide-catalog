import type { Product, ProductVariant } from "@/types";

/**
 * Get all prices from a product (variant-level or product-level).
 */
export function getProductPrices(product: Product): number[] {
  const fromVariants = product.variants
    .flatMap((v) => [v.price, v.membershipPrice].filter((p): p is number => typeof p === "number"));
  if (fromVariants.length > 0) return fromVariants;
  const fromProduct = [product.price, product.membershipPrice].filter((p): p is number => typeof p === "number");
  return fromProduct;
}

/**
 * Get display price for a variant (price or membership price).
 */
export function getVariantPrice(variant: ProductVariant, preferMembership = false): number | undefined {
  if (preferMembership && typeof variant.membershipPrice === "number") return variant.membershipPrice;
  if (typeof variant.price === "number") return variant.price;
  if (typeof variant.membershipPrice === "number") return variant.membershipPrice;
  return undefined;
}

/**
 * Get display price for a product (from first variant or product-level).
 */
export function getProductPrice(product: Product, preferMembership = false): number | undefined {
  const prices = getProductPrices(product);
  if (prices.length === 0) return undefined;
  const membershipPrices = product.variants
    .map((v) => v.membershipPrice)
    .filter((p): p is number => typeof p === "number");
  if (preferMembership && membershipPrices.length > 0) return Math.min(...membershipPrices);
  return Math.min(...prices);
}
