import { PortableText } from "next-sanity";
import { PortableTextComponents } from "../../../(site)/components/PortableTextComponents";
import { getAuthorBySlug } from "@/sanity/sanity-utils";
import { ImageRoundedComponent } from "../../components/ImageComponent";
import notFound from "../../[...not-found]/page";
import PostListComponent from "../../components/PostListComponent";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const author = await getAuthorBySlug((await params).slug);

  if (!author) {
    return notFound();
  }
  return (
    <div className="border-b border-gray-300 py-5">
      <div className="flex justify-center">
        <ImageRoundedComponent image={author.coverImage} width={"150px"} height={"auto"} />
      </div>
      <h1 className="flex justify-center font-baskervville text-5xl md:text-7xl text-black my-8">{author.name}</h1>
      <div className="prose">
        <PortableText value={author.description} components={PortableTextComponents} />
        {
          author.registeredAt && (<p className="py-5">Member since: {new Date(author.registeredAt).toLocaleDateString()}</p>)
        }
      </div>
      <div className="border-t border-gray-300">
        <h1 className="font-ubuntu-bold text-2xl text-black font-bold pt-4">Posts by author</h1>
        <PostListComponent slug="" filter={`author._ref == "${author._id}"`} />
      </div>
    </div>

  );
}