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
    <div className="border-b border-gray-300">
      <h1 className="text-6xl text-black font-bold mb-8">{author.name}</h1>
      <ImageRoundedComponent image={author.coverImage} width={150} height={150}/>
      <div className="prose py-5">
        <PortableText value={author.description} components={PortableTextComponents}/>
        <p className="py-5">Registered: {new Date(author.registeredAt).toLocaleDateString()}</p>
      </div>
    </div>

  );
}