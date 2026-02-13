import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-body-sm min-w-0">
      <ol className="flex flex-wrap items-center gap-2 text-brand-silver min-w-0">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 min-w-0">
            {i > 0 && <span className="opacity-50 shrink-0">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-white transition-colors truncate max-w-[180px] sm:max-w-none">
                {item.label}
              </Link>
            ) : (
              <span className="text-brand-white truncate max-w-[180px] sm:max-w-none">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
