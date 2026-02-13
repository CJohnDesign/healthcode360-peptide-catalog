"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-display tracking-wider uppercase transition-all duration-button ease-out focus:outline-none focus:ring-2 focus:ring-brand-gold/60 focus:ring-offset-2 focus:ring-offset-brand-black hover:scale-[1.02] active:scale-[0.98] touch-manipulation min-h-[44px]";

const variants = {
  primary:
    "btn-border-silver text-brand-silver-light hover:btn-gold-full hover:text-brand-black",
  secondary:
    "btn-border-silver text-brand-silver hover:btn-border-gold hover:text-brand-gold",
  ghost: (selected: boolean) =>
    selected
      ? "text-brand-gold-light"
      : "text-brand-silver-dark hover:text-brand-gold",
  toggle: (selected: boolean) =>
    selected
      ? "btn-border-gold text-brand-gold-light"
      : "btn-border-silver text-brand-silver hover:btn-border-gold hover:text-brand-gold",
  toggleFilled: (selected: boolean) =>
    selected
      ? "btn-gold-full text-brand-black"
      : "btn-border-silver text-brand-silver hover:btn-gold-full hover:text-brand-black",
};

const sizes = {
  sm: "px-3 py-2 text-caption",
  md: "px-4 py-2 text-body-sm",
  lg: "px-8 py-3 text-body-sm tracking-widest",
};

const iconSizes = {
  sm: 14,
  md: 16,
  lg: 18,
};

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: "primary" | "secondary" | "ghost" | "toggle" | "toggleFilled";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  isSelected?: boolean;
  children: React.ReactNode;
}

export interface ButtonLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "toggle" | "toggleFilled";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  isSelected?: boolean;
  children: React.ReactNode;
}

function getVariantClass(
  variant: ButtonProps["variant"],
  isSelected: boolean
): string {
  if (variant === "toggle") return variants.toggle(isSelected);
  if (variant === "toggleFilled") return variants.toggleFilled(isSelected);
  if (variant === "ghost") return variants.ghost(isSelected);
  return variants[variant ?? "primary"];
}

function renderContent(
  children: React.ReactNode,
  icon?: LucideIcon,
  iconPosition?: "left" | "right",
  size: keyof typeof sizes = "md"
) {
  const Icon = icon;
  const iconSize = iconSizes[size];

  if (!Icon) return children;

  const iconEl = <Icon size={iconSize} className="shrink-0" aria-hidden />;

  if (iconPosition === "right") {
    return (
      <>
        {children}
        {iconEl}
      </>
    );
  }
  return (
    <>
      {iconEl}
      {children}
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  isSelected = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        baseStyles,
        getVariantClass(variant, isSelected),
        sizes[size],
        className
      )}
      {...props}
    >
      {renderContent(children, icon, iconPosition, size)}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  isSelected = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        baseStyles,
        getVariantClass(variant, isSelected),
        sizes[size],
        className
      )}
      {...props}
    >
      {renderContent(children, icon, iconPosition, size)}
    </Link>
  );
}
