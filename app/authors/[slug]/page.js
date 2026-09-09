import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAuthor, getAuthors, getArticlesByAuthor } from "../../lib/storyblok";

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = await getAuthor(slug);

  if (!story) return {};

  return {
    title: story.content.name,
    description: story.content.bio?.slice(0, 150),
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const story = await getAuthor(slug);

  if (!story) {
    notFound();
  }

  const { name, bio, photo } = story.content;
  const articles = await getArticlesByAuthor(story.uuid);
  const photoUrl = photo?.filename;

  return (
    <article className="mx-auto max-w-2xl px-6 py-10">
      {photoUrl && (
        <div className="relative h-32 w-32 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={photoUrl}
            alt={photo.alt || name}
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>
      )}
      <h1 className="mt-4 text-3xl font-semibold leading-tight">{name}</h1>
      {bio && (
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">{bio}</p>
      )}

      <h2 className="mt-8 text-xl font-semibold">Artiklar</h2>
      <ul className="mt-4 space-y-3">
        {articles.map((article) => (
          <li key={article.uuid}>
            <Link
              href={`/articles/${article.slug}`}
              className="text-accent hover:underline"
            >
              {article.content.title}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}