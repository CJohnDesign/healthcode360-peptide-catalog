#!/usr/bin/env node

/**
 * Verify all products have images at the expected path.
 * Also updates the product image manifest for fallback behavior.
 * Run after: npm run generate:product-images-v2 0 91
 *
 * Usage: node scripts/verify-product-images.mjs
 */

import { readdirSync } from "fs";
import { execSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { PRODUCTS } from "./generate-all-product-images-v2.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PRODUCTS_DIR = join(ROOT, "public/images/products");

const SLUGS = PRODUCTS.filter((p) => !p.skip).map((p) => p.slug);

function main() {
  const existing = new Set(readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith(".png")).map((f) => f.replace(".png", "")));
  const missing = SLUGS.filter((s) => !existing.has(s));
  const ok = SLUGS.filter((s) => existing.has(s));

  console.log(`\n📸 Product image verification\n`);
  console.log(`   Total products: ${SLUGS.length}`);
  console.log(`   With images:    ${ok.length}`);
  console.log(`   Missing:        ${missing.length}\n`);

  if (missing.length > 0) {
    console.log("   Missing images:");
    missing.forEach((s) => console.log(`   - ${s}.png`));
    console.log("\n   Run: npm run generate:product-images-v2 0 91\n");
  }

  // Always update manifest so fallback (illustration) works for missing images
  execSync("node scripts/generate-image-manifest.mjs", { stdio: "inherit", cwd: join(ROOT) });

  if (missing.length > 0) {
    process.exit(1);
  }

  console.log("   ✅ All product images present.\n");
}

main();
