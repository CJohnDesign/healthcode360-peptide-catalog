import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "blend";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-caption font-display tracking-wider uppercase",
        variant === "blend"
          ? "bg-brand-grey-500 text-brand-grey-200 border border-brand-border"
          : "border border-brand-border text-brand-silver",
        className
      )}
    >
      {children}
    </span>
  );
}
