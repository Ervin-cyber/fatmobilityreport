import { PortableText, type SanityDocument } from "next-sanity";
import { PortableTextComponents } from "./PortableTextComponents";
import AuthorPreviewComponent  from "./AuthorPreviewComponent";
import { getAuthorByPost, getPostDetail } from "@/sanity/sanity-utils";
import { getPortableTextPreview } from "../utils/utils";

export default async function PostDetailComponent({ params }: { params: Promise<{ slug: string }>;}) {
  const author = await getAuthorByPost((await params).slug);
  const post = await getPostDetail((await params).slug);
  return ( post &&
    <div className="py-5">
      <h1 className="font-baskervville text-5xl md:text-7xl text-black mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        <PortableText value={post.body} components={PortableTextComponents}/>    
        <h1 className="text-lg text-center py-4 font-semibold text-gray-500">...</h1>    
        <AuthorPreviewComponent slug={author.slug} _id={author._id} coverImage={author.coverImage} name={author.name} description={author.description}/>
      </div>
    </div>

  );
}