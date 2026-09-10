import { getCategory } from "@/app/lib/storyblok";
import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }) {
  const { category } = await params
  const story = await getCategory(category)

  if (!story) {
    notFound()
  }

  return <StoryblokServerComponent blok={story.content} />
}