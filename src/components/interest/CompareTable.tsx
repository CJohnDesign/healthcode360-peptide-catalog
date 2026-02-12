"use client";

import Link from "next/link";
import { InterestButton } from "./InterestButton";
import type { Product } from "@/types";

interface CompareTableProps {
  products: Product[];
}

const COMPARE_ROWS = [
  { key: "Category", get: (p: Product) => p.category },
  { key: "Medication Class", get: (p: Product) => p.medicationClass },
  { key: "Indications", get: (p: Product) => p.indications },
  { key: "Description", get: (p: Product) => p.shortDescription },
  { key: "Strengths", get: (p: Product) => p.variants.map((v) => v.strength).join(", ") },
  { key: "Schedule", get: (p: Product) => p.variants[0]?.schedule ?? "—" },
  {
    key: "Reconstitution",
    get: (p: Product) =>
      p.variants[0]?.reconstitutionVolume
        ? `${p.variants[0].reconstitutionVolume} Bacteriostatic Water`
        : "—",
  },
  { key: "Route", get: (p: Product) => p.administrationRoute },
  { key: "Injection Note", get: (p: Product) => p.injectionNote ?? "—" },
  { key: "Benefits", get: (p: Product) => p.keyBenefits.join("; ") },
  { key: "Notes", get: (p: Product) => p.clinicalNotes },
  { key: "Blend", get: (p: Product) => (p.blendComponents ?? []).join(", ") || "—" },
];

export function CompareTable({ products }: CompareTableProps) {
  const toCompare = products.slice(0, 3);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-brand-border p-4 text-left font-display text-xs uppercase tracking-widest text-brand-grey-400 w-40">
              —
            </th>
            {toCompare.map((p) => (
              <th key={p.slug} className="border border-brand-border p-4 text-left">
                <Link
                  href={`/products/${p.slug}`}
                  className="font-display text-sm uppercase text-brand-white hover:opacity-80"
                >
                  {p.name}
                </Link>
                <div className="mt-2">
                  <InterestButton product={p} size="sm" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((row) => (
            <tr key={row.key}>
              <td className="border border-brand-border p-4 font-display text-xs uppercase tracking-widest text-brand-grey-400">
                {row.key}
              </td>
              {toCompare.map((p) => (
                <td
                  key={p.slug}
                  className="border border-brand-border p-4 text-sm text-brand-grey-300"
                >
                  {row.get(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
