import Image from "next/image";
import { notFound } from "next/navigation";
import { StoryblokServerRichText } from "@storyblok/react/rsc";
import { getArticle } from "../../lib/storyblok";

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const story = await getArticle(slug);

  if (!story) {
    notFound();
  }

  const { title, summary, category, cover_image, author, content } =
    story.content;
  const authorName = author?.[0]?.content?.name;
  const coverUrl = cover_image?.filename;

  return (
    <article className="mx-auto max-w-2xl px-6 py-10">
      {category && (
        <span className="w-fit rounded-full bg-accent/10 px-2 py-0.5 text-xs uppercase tracking-wide text-accent">
          {category}
        </span>
      )}
      <h1 className="mt-3 text-3xl font-semibold leading-tight">{title}</h1>
      {summary && (
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          {summary}
        </p>
      )}
      {authorName && (
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">
          {authorName}
        </p>
      )}
      {coverUrl && (
        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={coverUrl}
            alt={cover_image.alt || title}
            fill
            sizes="(min-width: 768px) 672px, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="prose prose-zinc mt-8 max-w-none prose-a:text-accent dark:prose-invert">
        <StoryblokServerRichText document={content} />
      </div>
    </article>
  );
}
