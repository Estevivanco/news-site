import { getAuthors } from "../lib/storyblok";
import AuthorCard from "../components/AuthorCard";

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Authors</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {authors.map((author) => (
          <AuthorCard key={author.uuid} author={author} />
        ))}
      </div>
    </div>
  );
}