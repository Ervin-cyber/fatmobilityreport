import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { PortableTextComponents } from "./PortableTextComponents";
import AuthorPreviewComponent  from "./AuthorPreviewComponent";
import { getAuthorByPost } from "@/sanity/sanity-utils";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

export default async function PostDetailComponent({ params }: { params: Promise<{ slug: string }>;}) {
  //*[_type == "post" && slug.current == "ferrari-s-super-sports-car-every-ten-years"][0].author._ref
  //*[_type == "author" && _id == "fed4b901-0700-45aa-bc66-23a6c800d95a"]
  const author = await getAuthorByPost((await params).slug);
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  //
  return ( post &&
    <div className="py-5">
      <h1 className="font-baskervville text-5xl md:text-7xl text-black mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        <PortableText value={post.body} components={PortableTextComponents}/>    
        <h1 className="text-lg text-center py-4 font-semibold text-gray-500">...</h1>    
        <AuthorPreviewComponent slug={author.slug.current} _id={author._id} coverImage={author.coverImage} name={author.name}/>
      </div>
    </div>

  );
}