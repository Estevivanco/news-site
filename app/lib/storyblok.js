import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: process.env.STORYBLOK_REGION,
  },
});

export async function getConfig() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/config", {
    version: "published",
  });
  return data.story.content;
}
