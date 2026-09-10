import Image from "next/image";
import Link from "next/link";
import { getArticlesByAuthor } from "../lib/storyblok";

export default async function Author({ blok }) {
  const { name, bio, photo, uuid } = blok;
  const articles = await getArticlesByAuthor(uuid);
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
