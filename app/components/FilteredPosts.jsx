import { getArticlesByCategory } from "../lib/storyblok";
import ArticleCard from "./ArticleCard";

export default async function FilteredPosts({ blok }) {
  const { category } = blok
  const articles = await getArticlesByCategory(category);

  return (
    <div>
      <h1 className="text-2xl font-semibold capitalize">{category}</h1>
      {articles.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.uuid} article={article} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-zinc-600 dark:text-zinc-400">
          No articles in this category yet.
        </p>
      )}
    </div>
  );
}
