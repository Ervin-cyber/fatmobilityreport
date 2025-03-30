import { SanityDocument } from "next-sanity";
import PostDetailComponent from "../../components/PostDetailComponent";

import { client } from "@/sanity/client";
const CHECK_IF_CATEGORY_QUERY = `*[_type == "category" && slug.current == $slug][0]`;
const options = { next: { revalidate: 30 } };

export default async function PostPage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const page =  await PostDetailComponent({params});
  return (
    page && page
  );
}