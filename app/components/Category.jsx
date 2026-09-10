import { StoryblokServerComponent } from "@storyblok/react/rsc";

export default function Category({ blok }) {
  return (
    <div className="mx-auto max-w-5x1 px-6 py-10">
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
