import { getArticles } from "../lib/storyblok";
import ArticleCard from "../components/ArticleCard";

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold">All articles</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.uuid} article={article} />
        ))}
      </div>
    </div>
  );
}
