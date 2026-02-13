import { glossaryTerms } from "@/data/glossary";

export default function GlossaryPage() {
  const sorted = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">
        Glossary
      </h1>
      <ul className="space-y-6">
        {sorted.map((term) => (
          <li key={term.slug} id={term.slug} className="border-b border-brand-border pb-6">
            <h2 className="font-display text-body-sm uppercase tracking-wider text-brand-white">
              {term.term}
            </h2>
            <p className="mt-2 text-body-sm text-brand-silver">{term.definition}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
