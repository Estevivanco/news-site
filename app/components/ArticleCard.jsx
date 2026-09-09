import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ article }) {
  const { title, summary, category, cover_image, author } = article.content;
  const { published_at } = article;
  const authorName = author?.[0]?.content?.name;
  const coverUrl = cover_image?.filename;
  const publishedDate = published_at
    ? new Date(published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-black/10 transition-colors hover:border-accent dark:border-white/15"
    >
      <div className="relative aspect-[16/9] w-full bg-zinc-100 dark:bg-zinc-900">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={cover_image.alt || title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-wide text-zinc-400 dark:text-zinc-600">
            {category || "News"}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {category && (
          <span className="w-fit rounded-full bg-accent/10 px-2 py-0.5 text-xs uppercase tracking-wide text-accent">
            {category}
          </span>
        )}
        <h2 className="text-lg font-semibold leading-snug group-hover:text-accent">
          {title}
        </h2>
        {summary && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {summary}
          </p>
        )}
        {(authorName || publishedDate) && (
          <p className="mt-auto pt-2 text-xs text-zinc-500 dark:text-zinc-500">
            {[authorName, publishedDate].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
