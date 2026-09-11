import Image from "next/image";
import Link from "next/link";

export default function AuthorCard({ author }) {
  const { name, bio, photo } = author.content;
  const photoUrl = photo?.filename;

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-black/10 transition-colors hover:border-accent dark:border-white/15"
    >
      <div className="relative aspect-[16/9] w-full bg-zinc-100 dark:bg-zinc-900">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={photo.alt || name}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-wide text-zinc-400 dark:text-zinc-600">
            {name}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-lg font-semibold leading-snug group-hover:text-accent">
          {name}
        </h2>
        {bio && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
            {bio}
          </p>
        )}
      </div>
    </Link>
  );
}