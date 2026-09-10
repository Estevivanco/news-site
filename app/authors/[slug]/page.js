import { notFound } from "next/navigation";
import { getAuthor, getAuthors } from "../../lib/storyblok";
import { StoryblokServerComponent } from "@storyblok/react/rsc";

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

  return (
    <StoryblokServerComponent blok={{ ...story.content, uuid: story.uuid }} />
  );
}