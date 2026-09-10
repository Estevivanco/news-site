import { getStories } from "./lib/storyblok";

export default async function sitemap() {
    const siteUrl = process.env.SITE_URL
    const stories = await getStories()

    const dynamicUrls = stories.map((story) => ({
        url: `${siteUrl}/${story.full_slug}`,
        lastModified: new Date(story.published_at)
    }))

    const staticUrls = [
        {
            url: siteUrl,
            lastModified: new Date()
        },
        {
            url: `${siteUrl}/articles`,
            lastModified: new Date()
        }
    ]

    return [...staticUrls, ...dynamicUrls]
}