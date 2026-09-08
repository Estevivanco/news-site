import { getStoryblokApi } from "./lib/storyblok";

export default async function Home() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/config", {
    version: "published",
  });

  console.log(data);

  return <div>Check your terminal</div>;
}