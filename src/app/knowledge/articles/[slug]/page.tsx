import { notFound } from "next/navigation";
import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { articles } from "@/data/articles";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: "Knowledge", href: "/knowledge" },
          { label: "Articles", href: "/knowledge/articles" },
          { label: article.title },
        ]}
      />
      <PlaceholderImage src={article.image} aspectRatio="16/9" label={article.title} className="mt-6" />
      <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mt-8">
        {article.title}
      </h1>
      <p className="mt-4 text-brand-grey-400">{article.excerpt}</p>
      <div className="mt-8 text-brand-grey-300 prose prose-invert max-w-none">
        <p>{article.content}</p>
      </div>
      <Link href="/knowledge/articles" className="mt-12 inline-block text-brand-grey-400 hover:text-brand-white">
        ← Back to Articles
      </Link>
    </div>
  );
}
