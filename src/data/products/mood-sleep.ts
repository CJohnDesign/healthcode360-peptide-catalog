import type { Product } from "@/types";
import { getProductImagePath } from "@/lib/productImage";

const base = (o: Partial<Product> & Pick<Product, "slug" | "name" | "genericName" | "category" | "categorySlug" | "shortDescription" | "fullDescription" | "medicationClass" | "indications" | "variants" | "administrationRoute" | "keyBenefits" | "clinicalNotes">): Product => ({
  image: getProductImagePath(o.slug),
  isBlend: false,
  featured: false,
  providerNote: "Consult your prescribing Healthcare Provider for dosing adjustments.",
  ...o,
});

export const moodSleepProducts: Product[] = [
  base({
    slug: "oxytocin",
    name: "Oxytocin",
    genericName: "Oxytocin",
    category: "Mood & Wellness",
    categorySlug: "wellness-mood",
    shortDescription: "Social bonding, emotional wellbeing, stress reduction.",
    fullDescription: "Oxytocin increases social bonding and emotional wellbeing. Helps reduce stress and anxiety.",
    medicationClass: "Stress & anxiety mood peptide",
    indications: "Social bonding, emotional wellbeing, stress reduction",
    administrationRoute: "Subcutaneous",
    keyBenefits: ["Social bonding", "Emotional wellbeing", "Stress reduction", "Anxiety support"],
    clinicalNotes: "Social bonding, emotional wellbeing, stress reduction.",
    variants: [
      { strength: "10 mg", vialSize: "10 mg", concentration: "0.05 mg/unit", schedule: "10 units daily", reconstitutionVolume: "2 mL", price: 165, membershipPrice: 132 },
    ],
  }),
  base({
    slug: "selank",
    name: "Selank",
    genericName: "Selank",
    category: "Mood & Wellness",
    categorySlug: "wellness-mood",
    shortDescription: "Nootropic peptide; anxiety reduction, cognitive support.",
    fullDescription: "Selank is a nootropic peptide that may support anxiety reduction, cognitive function, and emotional balance.",
    medicationClass: "Nootropic peptide",
    indications: "Anxiety reduction, cognitive support",
    administrationRoute: "Subcutaneous",
    keyBenefits: ["Anxiety support", "Cognitive function", "Emotional balance"],
    clinicalNotes: "Nootropic peptide for anxiety and cognition.",
    variants: [
      { strength: "5 mg", vialSize: "5 mg", concentration: "0.025 mg/unit", schedule: "Consult provider", reconstitutionVolume: "2 mL", price: 84, membershipPrice: 68 },
      { strength: "10 mg", vialSize: "10 mg", concentration: "Consult provider", schedule: "Consult provider", reconstitutionVolume: "Consult provider", price: 126, membershipPrice: 101 },
    ],
  }),
  base({
    slug: "semax",
    name: "Semax",
    genericName: "Semax",
    category: "Mood & Wellness",
    categorySlug: "wellness-mood",
    shortDescription: "Nootropic peptide; cognitive enhancement, neuroprotection.",
    fullDescription: "Semax is a nootropic peptide that may support cognitive enhancement, memory, and neuroprotection.",
    medicationClass: "Nootropic peptide",
    indications: "Cognitive enhancement, neuroprotection",
    administrationRoute: "Subcutaneous",
    keyBenefits: ["Cognitive enhancement", "Memory support", "Neuroprotection"],
    clinicalNotes: "Nootropic peptide for cognition.",
    variants: [
      { strength: "30 mg", vialSize: "30 mg", concentration: "Consult provider", schedule: "Consult provider", reconstitutionVolume: "Consult provider", price: 126, membershipPrice: 101 },
    ],
  }),
  base({
    slug: "melanotan-2",
    name: "Melanotan II (MT-II)",
    genericName: "Melanotan II",
    category: "Sleep & Detox",
    categorySlug: "sleep-detox",
    shortDescription: "Tanning peptide; may support libido.",
    fullDescription: "Melanotan II stimulates melanin production for tanning and may support libido.",
    medicationClass: "Melanocortin receptor agonist",
    indications: "Tanning support, libido",
    administrationRoute: "Subcutaneous",
    keyBenefits: ["Tanning support", "Libido support"],
    clinicalNotes: "Melanocortin agonist.",
    variants: [
      { strength: "10 mg", vialSize: "10 mg", concentration: "0.05 mg/unit", schedule: "Consult provider", reconstitutionVolume: "2 mL", price: 120, membershipPrice: 96 },
    ],
  }),
];
