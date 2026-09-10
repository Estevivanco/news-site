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

export async function getArticles() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "published",
    starts_with: "articles/",
    resolve_relations: "article.author",
    sort_by: "first_published_at:desc",
  });
  return data.stories;
}

export async function getArticlesByCategory(category) {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "published",
    starts_with: "articles/",
    resolve_relations: "article.author",
    sort_by: "first_published_at:desc",
    filter_query: {
      category: {
        in: category,
      },
    },
  });
  return data.stories;
}

export async function getArticle(slug) {
  const storyblokApi = getStoryblokApi();
  try {
    const { data } = await storyblokApi.get(`cdn/stories/articles/${slug}`, {
      version: "published",
      resolve_relations: "article.author",
    });
    return data.story;
  } catch (error) {
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getAuthor(slug) {
  const storyblokApi = getStoryblokApi();
  try {
    const { data } = await storyblokApi.get(`cdn/stories/authors/${slug}`, {
      version: "published",
    });
    return data.story;
  } catch (error) {
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getAuthors() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "published",
    starts_with: "authors/",
  });
  return data.stories;
}

export async function getArticlesByAuthor(authorUuid) {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "published",
    starts_with: "articles/",
    filter_query: {
      author: {
        in: authorUuid,
      },
    },
  });
  return data.stories
}
