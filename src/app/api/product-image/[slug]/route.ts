import { NextResponse } from "next/server";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const PRODUCTS_DIR = join(process.cwd(), "public", "images", "products");
const FALLBACK_IMAGE = "supplement-bottle.png";

/** Slug must be safe: alphanumeric and hyphens only */
const SLUG_REGEX = /^[a-z0-9-]+$/;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug || !SLUG_REGEX.test(slug)) {
    return new NextResponse("Invalid slug", { status: 400 });
  }

  const imagePath = join(PRODUCTS_DIR, `${slug}.png`);
  const fallbackPath = join(PRODUCTS_DIR, FALLBACK_IMAGE);

  const path = existsSync(imagePath) ? imagePath : fallbackPath;
  if (!existsSync(path)) {
    return new NextResponse("Image not found", { status: 404 });
  }

  const buffer = readFileSync(path);
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
