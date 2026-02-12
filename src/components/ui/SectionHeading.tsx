import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("text-center", className)}>
      <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-brand-grey-300 text-sm md:text-base max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
