import { notFound } from "next/navigation";
import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { getArticle, getArticles } from "../../lib/storyblok";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = await getArticle(slug);

  if (!story) return {};

  return {
    title: story.content.title,
    description: story.content.summary,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const story = await getArticle(slug);

  if (!story) {
    notFound();
  }

  return <StoryblokServerComponent blok={story.content} />;
}
