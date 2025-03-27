import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Link from "next/link";

import { PortableTextComponents } from "../../../components/PortableTextComponents";

const AUTHOR_QUERY = `*[_type == "author" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const author = await client.fetch<SanityDocument>(AUTHOR_QUERY, await params, options);

  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8 flex flex-col gap-4">
      <Link href="/authors/" className="hover:underline">
        ← Back to authors
      </Link>
      <h1 className="text-6xl font-bold mb-8">{author.name}</h1>
      <img className="aspect-video flex"
                src={urlFor(author.coverImage)?.width(370).height(278).url()}
                alt={"Cover Image"}
                width="370"
                height="278"
              />
      <div className="prose">
        <PortableText value={author.description} components={PortableTextComponents}/>
        <p>Registered: {new Date(author.registeredAt).toLocaleDateString()}</p>
      </div>
    </main>
  );
}