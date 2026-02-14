import { PRODUCT_IMAGE_SLUGS } from "@/data/productImageSlugs";

/**
 * Per-product image path. Returns API route when image exists; otherwise empty
 * so PlaceholderImage shows the illustration (vial SVG + product name).
 */
export function getProductImagePath(slug: string): string {
  return PRODUCT_IMAGE_SLUGS.has(slug) ? `/api/product-image/${slug}` : "";
}
