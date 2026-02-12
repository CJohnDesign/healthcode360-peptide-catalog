"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { products } from "@/data/products";
import type { Product } from "@/types";

const STORAGE_KEY = "catalog-pep-interest-list";

function getInitialItems(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const slugs: string[] = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(slugs)) return [];
    return slugs
      .map((slug) => products.find((p) => p.slug === slug))
      .filter((p): p is Product => Boolean(p));
  } catch {
    return [];
  }
}

interface InterestListContextValue {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  isInList: (slug: string) => boolean;
  clearList: () => void;
}

const InterestListContext = createContext<InterestListContextValue | null>(null);

export function InterestListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setItems(getInitialItems());
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated || typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map((p) => p.slug)));
  }, [items, hasHydrated]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) =>
      prev.some((p) => p.slug === product.slug) ? prev : [...prev, product]
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const isInList = useCallback(
    (slug: string) => items.some((p) => p.slug === slug),
    [items]
  );

  const clearList = useCallback(() => setItems([]), []);

  return (
    <InterestListContext.Provider
      value={{ items, addItem, removeItem, isInList, clearList }}
    >
      {children}
    </InterestListContext.Provider>
  );
}

export function useInterestList() {
  const ctx = useContext(InterestListContext);
  if (!ctx) throw new Error("useInterestList must be used within InterestListProvider");
  return ctx;
}
