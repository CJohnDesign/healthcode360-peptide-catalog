"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { InterestButton } from "@/components/interest/InterestButton";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types";
import { IFU_DEFAULTS } from "@/types";

interface RelatedProduct {
  slug: string;
  name: string;
  shortDescription: string;
}

interface ProductDetailProps {
  product: Product;
  relatedProducts: RelatedProduct[];
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const variant = product.variants[selectedVariant];
  const related = relatedProducts;

  return (
    <article>
      <Breadcrumb
        items={[
          { label: "Catalog", href: "/products" },
          { label: product.category, href: `/categories/${product.categorySlug}` },
          { label: product.name },
        ]}
      />
      <div className="mt-6">
        <PlaceholderImage
          src={product.image}
          aspectRatio="16/9"
          label={product.name}
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant={product.isBlend ? "blend" : "default"}>{product.category}</Badge>
          </div>
          <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white">
            {product.name}
          </h1>
          {product.genericName !== product.name && (
            <p className="mt-2 text-brand-grey-400">{product.genericName}</p>
          )}
          <p className="mt-2 text-xs font-display tracking-wider uppercase text-brand-grey-500">
            {product.medicationClass}
          </p>
          <p className="mt-4 text-brand-grey-300">{product.fullDescription}</p>
          <div className="mt-4">
            <h3 className="font-display text-xs uppercase tracking-widest text-brand-grey-400 mb-1">
              Indications
            </h3>
            <p className="text-sm text-brand-grey-300">{product.indications}</p>
          </div>
          <ul className="mt-6 space-y-2">
            {product.keyBenefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-brand-grey-300">
                <span className="text-brand-grey-500">—</span> {b}
              </li>
            ))}
          </ul>
          {product.isBlend && product.blendComponents && (
            <div className="mt-6">
              <h3 className="font-display text-xs uppercase tracking-widest text-brand-grey-400 mb-2">
                Blend Components
              </h3>
              <p className="text-sm text-brand-grey-300">
                {product.blendComponents.join(", ")}
              </p>
            </div>
          )}
        </div>
        <div className="space-y-6">
          {product.variants.length > 1 && (
            <div>
              <h3 className="font-display text-xs uppercase tracking-widest text-brand-grey-400 mb-2">
                Strength
              </h3>
              <div className="flex gap-2">
                {product.variants.map((v, i) => (
                  <Button
                    key={i}
                    type="button"
                    onClick={() => setSelectedVariant(i)}
                    variant="toggle"
                    size="md"
                    isSelected={selectedVariant === i}
                    icon={selectedVariant === i ? Check : undefined}
                    iconPosition="left"
                  >
                    {v.strength}
                  </Button>
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 className="font-display text-xs uppercase tracking-widest text-brand-grey-400 mb-2">
              Medication Details
            </h3>
            <p className="text-xs text-brand-grey-500">{variant.vialSize} vial</p>
            <p className="mt-1 text-xs text-brand-grey-500">
              Concentration: {variant.concentration}
            </p>
            {variant.reconstitutionVolume && (
              <p className="mt-1 text-xs text-brand-grey-500">
                Bacteriostatic Water {variant.reconstitutionVolume}
              </p>
            )}
          </div>
          <div>
            <h3 className="font-display text-xs uppercase tracking-widest text-brand-grey-400 mb-2">
              Dosing
            </h3>
            <p className="text-sm text-brand-grey-300">{variant.schedule}</p>
          </div>
          <div>
            <h3 className="font-display text-xs uppercase tracking-widest text-brand-grey-400 mb-2">
              Administration
            </h3>
            <p className="text-sm text-brand-grey-300">{product.administrationRoute}</p>
            {product.injectionNote && (
              <p className="mt-2 text-xs text-brand-grey-500 border-l-2 border-brand-grey-500 pl-3">
                {product.injectionNote}
              </p>
            )}
          </div>
          <div>
            <h3 className="font-display text-xs uppercase tracking-widest text-brand-grey-400 mb-2">
              Injection Technique
            </h3>
            <ul className="space-y-1">
              {(product.injectionTechnique ?? IFU_DEFAULTS.injectionTechnique).map((step) => (
                <li key={step} className="text-xs text-brand-grey-500 flex items-start gap-2">
                  <span className="text-brand-grey-500 shrink-0">•</span> {step}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xs uppercase tracking-widest text-brand-grey-400 mb-2">
              Missed Dose
            </h3>
            <ul className="space-y-1">
              {(product.missedDose ?? IFU_DEFAULTS.missedDose).map((item) => (
                <li key={item} className="text-xs text-brand-grey-500 flex items-start gap-2">
                  <span className="text-brand-grey-500 shrink-0">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xs uppercase tracking-widest text-brand-grey-400 mb-2">
              Storage & Handling
            </h3>
            <p className="text-xs text-brand-grey-500">{IFU_DEFAULTS.storage}</p>
          </div>
          <div>
            <h3 className="font-display text-xs uppercase tracking-widest text-brand-grey-400 mb-2">
              Notes
            </h3>
            <p className="text-sm text-brand-grey-300">{product.clinicalNotes}</p>
            {product.providerNote && (
              <p className="mt-2 text-xs text-brand-grey-500">{product.providerNote}</p>
            )}
          </div>
          <div>
            <h3 className="font-display text-xs uppercase tracking-widest text-brand-grey-400 mb-2">
              Disclaimer
            </h3>
            <p className="text-xs text-brand-grey-500 italic">{IFU_DEFAULTS.disclaimer}</p>
          </div>
          <p className="text-xs text-brand-grey-500">{IFU_DEFAULTS.effectiveDate}</p>
          <InterestButton product={product} className="mt-4" />
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-16 pt-16 border-t border-brand-border">
          <h2 className="font-display text-lg uppercase tracking-wider text-brand-white mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="block border border-brand-border p-4 hover:border-brand-grey-500 transition-colors"
              >
                <p className="font-display text-sm uppercase tracking-wider text-brand-white">
                  {p.name}
                </p>
                <p className="mt-1 text-xs text-brand-grey-500">{p.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
