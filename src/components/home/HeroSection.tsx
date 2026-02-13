"use client";

import { ArrowRight } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ButtonLink } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative w-full">
      <PlaceholderImage src="/images/lifestyle/hero.png" aspectRatio="full" label="Hero" context="Vial" />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
        <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight text-brand-white text-center uppercase">
          Precision Peptides.
          <br />
          Elevated Outcomes.
        </h1>
        <p className="mt-4 text-body-sm text-brand-silver text-center max-w-md">
          Clinical-grade compounds for weight management, recovery, longevity, and beyond.
        </p>
        <ButtonLink
          href="/products"
          variant="primary"
          size="lg"
          icon={ArrowRight}
          iconPosition="right"
          className="mt-8"
        >
          Browse Catalog
        </ButtonLink>
      </div>
    </section>
  );
}
