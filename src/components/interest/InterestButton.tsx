"use client";

import { Plus, Check } from "lucide-react";
import { useInterestList } from "@/context/InterestListContext";
import type { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface InterestButtonProps {
  product: Product;
  size?: "sm" | "md";
  compact?: boolean;
  className?: string;
}

export function InterestButton({
  product,
  size = "md",
  compact = false,
  className,
}: InterestButtonProps) {
  const { addItem, removeItem, isInList } = useInterestList();
  const inList = isInList(product.slug);

  const handleClick = () => (inList ? removeItem(product.slug) : addItem(product));

  return (
    <Button
      type="button"
      onClick={handleClick}
      variant="toggleFilled"
      size={compact ? "sm" : size}
      isSelected={inList}
      icon={inList ? Check : Plus}
      iconPosition="left"
      aria-label={compact ? (inList ? "Remove from list" : "Add to list") : undefined}
      className={cn(
        compact ? "w-auto shrink-0 p-2 gap-0" : "w-full",
        className
      )}
    >
      {compact ? "" : inList ? "In List" : "Add to List"}
    </Button>
  );
}
