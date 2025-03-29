import { PortableText } from "next-sanity";
import { ImageRoundedComponent } from "@/app/components/ImageComponent";
import { PortableTextComponents } from "../../components/PortableTextComponents";
import { getAuthorBySlug } from "@/sanity/sanity-utils";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const author = await getAuthorBySlug((await params).slug);

  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8 flex flex-col gap-4">
      <h1 className="text-6xl font-bold mb-8">{author.name}</h1>
      <ImageRoundedComponent image={author.coverImage} width={250} height={250}/>
      <div className="prose">
        <PortableText value={author.description} components={PortableTextComponents}/>
        <p>Registered: {new Date(author.registeredAt).toLocaleDateString()}</p>
      </div>
    </main>
  );
}