import { SanityDocument } from "next-sanity";
import StoryDetailComponent from "../components/StoryDetailComponent";
import StoryListComponent from "../components/StoryListComponent";

import { client } from "@/sanity/client";
const CHECK_IF_CATEGORY_QUERY = `*[_type == "category" && slug.current == $slug][0]`;
const options = { next: { revalidate: 30 } };

export default async function PostPage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const isCategory = await client.fetch<SanityDocument>(CHECK_IF_CATEGORY_QUERY, await params, options);
  const filter = (await params).slug;
  const page = isCategory ? await StoryListComponent({filter}) : await StoryDetailComponent({params});

  return (
    page && page
  );
}