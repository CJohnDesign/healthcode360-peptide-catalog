import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

const props = [
  { title: "Clinical Grade", desc: "Pharmacy-compounded to clinical standards." },
  { title: "Provider Guided", desc: "Use under the supervision of licensed healthcare providers." },
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
              <h3 className="font-display text-sm uppercase tracking-widest text-brand-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-brand-grey-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
