import { PortableText } from "next-sanity";
import { PortableTextComponents } from "../../../(site)/components/PortableTextComponents";
import { getAuthorBySlug } from "@/sanity/sanity-utils";
import { ImageRoundedComponent } from "../../components/ImageComponent";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const author = await getAuthorBySlug((await params).slug);

  return (
    <div className="border-b border-gray-300 py-5">
      <div className="flex justify-center">
        <ImageRoundedComponent image={author.coverImage} width={150} height={150}/>
      </div>
      <h1 className="flex justify-center font-baskervville text-5xl md:text-7xl text-black my-8">{author.name}</h1>
      <div className="prose">
        <PortableText value={author.description} components={PortableTextComponents}/>
        <p className="py-5">Member since: {new Date(author.registeredAt).toLocaleDateString()}</p>
      </div>
    </div>

  );
}