"use client";

import { Plus, Check } from "lucide-react";
import { useInterestList } from "@/context/InterestListContext";
import type { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface InterestButtonProps {
  product: Product;
  size?: "sm" | "md";
  className?: string;
}

export function InterestButton({ product, size = "md", className }: InterestButtonProps) {
  const { addItem, removeItem, isInList } = useInterestList();
  const inList = isInList(product.slug);

  const handleClick = () => (inList ? removeItem(product.slug) : addItem(product));

  return (
    <Button
      type="button"
      onClick={handleClick}
      variant="toggleFilled"
      size={size}
      isSelected={inList}
      icon={inList ? Check : Plus}
      iconPosition="left"
      className={cn("w-full", className)}
    >
      {inList ? "In List" : "Add to List"}
    </Button>
  );
}
