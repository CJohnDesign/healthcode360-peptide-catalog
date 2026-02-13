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
    <nav aria-label="Breadcrumb" className="text-body-sm">
      <ol className="flex items-center gap-2 text-brand-silver">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span className="opacity-50">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-brand-white">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
