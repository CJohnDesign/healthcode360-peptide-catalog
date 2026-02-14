import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { PHYSICIAN_REVIEW_PROVIDER_GUIDED } from "@/data/copy";

const props = [
  { title: "Clinical Grade", desc: "Pharmacy-compounded to clinical standards." },
  { title: "Provider Guided", desc: PHYSICIAN_REVIEW_PROVIDER_GUIDED },
  { title: "Precision Formulated", desc: "Consistent dosing, clear protocols." },
];

export function ValueProps() {
  return (
    <section className="py-16 md:py-24 border-t border-brand-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PlaceholderImage src="/images/lifestyle/value-props.png" aspectRatio="16/9" label="Value Props" context="Clinical" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {props.map((p) => (
            <div key={p.title} className="text-center">
              <h3 className="font-display text-body-sm uppercase tracking-widest text-brand-white">
                {p.title}
              </h3>
              <p className="mt-2 text-body-sm text-brand-silver">{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center">
          <Link
            href="/contact"
            className="text-body-sm font-display tracking-wider uppercase text-brand-silver hover:text-brand-white transition-colors"
          >
            Contact Us
          </Link>
        </p>
      </div>
    </section>
  );
}
