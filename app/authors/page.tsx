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

const AUTHOR_QUERY = `*[
  _type == "author"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, name, description, coverImage, slug, registeredAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const authors = await client.fetch<SanityDocument[]>(AUTHOR_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8 flex flex-col gap-4">
      <h1 className="text-4xl font-bold mb-8">Authors</h1>
      <ul className="flex flex-col gap-y-4">
        {authors.map((author) => (
          <Link href={`/authors/${author.slug.current}`} key = {author._id}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-x-4">
            {/* Image */}
            <img className="aspect-video flex"
                src={urlFor(author.coverImage)?.width(370).height(278).url()}
                alt={"Cover Image"}
                width="370"
                height="278"
              />
            {/* Text */}
            <div className="text-left m-6">
              <h2 className="text-2xl font-bold">{author.name}</h2>
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