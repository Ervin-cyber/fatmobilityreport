import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, coverImage, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <Link href={`/${post.slug.current}`}>
          <div className="flex flex-row items-center space-x-reverse mb-5">
            {/* Image */}
            <img className="aspect-video"
                src={urlFor(post.coverImage)?.width(370).height(278).url()}
                alt={"Cover Image"}
                width="370"
                height="278"
              />
            {/* Text */}
            <div className="text-left m-6">
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <p className="text-gray-600">This text is on the left, image on the right.</p>
            </div>
          </div>
          <hr></hr>
          </Link>
        ))}
      </ul>
    </main>
  );
}