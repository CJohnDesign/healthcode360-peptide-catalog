import { PRODUCT_IMAGE_SLUGS } from "@/data/productImageSlugs";

/**
 * Per-product image path. Returns the static asset path when an image exists;
 * otherwise empty so PlaceholderImage shows the illustration (vial SVG + product name).
 *
 * Images in public/ are served as static assets by Next.js / Vercel — no
 * serverless function needed, which avoids the 300 MB bundle-size limit.
 */
export function getProductImagePath(slug: string): string {
  return PRODUCT_IMAGE_SLUGS.has(slug)
    ? `/images/products/${slug}.png`
    : "";
}
