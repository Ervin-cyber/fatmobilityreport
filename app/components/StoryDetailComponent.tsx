import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { PortableTextComponents } from "./PortableTextComponents";
import AuthorPreviewComponent  from "./AuthorPreviewComponent";
import { getAuthorByPost } from "@/sanity/sanity-utils";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

export default async function StoryDetailComponent({ params }: { params: Promise<{ slug: string }>;}) {
  //*[_type == "post" && slug.current == "ferrari-s-super-sports-car-every-ten-years"][0].author._ref
  //*[_type == "author" && _id == "fed4b901-0700-45aa-bc66-23a6c800d95a"]
  const author = await getAuthorByPost((await params).slug);
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  //
  return ( post &&
    <main className="container mx-auto min-h-screen max-w-4xl p-8 flex flex-col gap-4">
      <h1 className="text-6xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        <PortableText value={post.body} components={PortableTextComponents}/>
        <AuthorPreviewComponent slug={author.slug.current} _id={author._id} coverImage={author.coverImage} name={author.name}/>
      </div>
    </main>
  );
}