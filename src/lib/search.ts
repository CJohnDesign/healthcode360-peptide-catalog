import type { Product, Article, GlossaryTerm } from "@/types";
import { products } from "@/data/products";
import { articles } from "@/data/articles";
import { glossaryTerms } from "@/data/glossary";

export interface SearchResult {
  products: Product[];
  articles: Article[];
  glossary: GlossaryTerm[];
}

export function search(query: string): SearchResult {
  const q = query.toLowerCase().trim();
  if (!q) return { products: [], articles: [], glossary: [] };

  const searchIn = (text: string) => text.toLowerCase().includes(q);

  const productMatches = products.filter(
    (p) =>
      searchIn(p.name) ||
      searchIn(p.genericName) ||
      searchIn(p.shortDescription) ||
      searchIn(p.fullDescription) ||
      searchIn(p.medicationClass) ||
      searchIn(p.indications) ||
      searchIn(p.category) ||
      p.keyBenefits.some(searchIn)
  );

  const articleMatches = articles.filter(
    (a) => searchIn(a.title) || searchIn(a.excerpt)
  );

  const glossaryMatches = glossaryTerms.filter(
    (g) => searchIn(g.term) || searchIn(g.definition)
  );

  return {
    products: productMatches,
    articles: articleMatches,
    glossary: glossaryMatches,
  };
}
