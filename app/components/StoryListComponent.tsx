import Link from "next/link";
import { client } from "@/sanity/client";
import { ImageComponent } from "./ImageComponent";
import { getPosts } from "@/sanity/sanity-utils";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { Post } from "@/types/Post";

const options = { next: { revalidate: 30 } };
export default async function StoryListComponent({filter}: {filter:string}) {
    const posts = await getPosts(filter);
    const categoryDescription:string = await client.fetch(`*[_type == "category" && slug.current == "${filter}"][0].description`, {}, options);
    
    return (
        <main className="container mx-auto min-h-screen max-w-4xl p-8 flex flex-col gap-4">
          <h1 className="text-4xl font-bold mb-4 uppercase items-center ">{categoryDescription}</h1>
          <ul className="flex flex-col gap-y-4">
            {posts.map((post: Post) => (
              <Link href={`/${post.slug.current}`} key = {post._id}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-x-4 hover:scale-101 transition">
                {/* Image */}
                <ImageComponent image={post.coverImage} width={370} height={200}/>
                {/* Text */}
                <div className="text-left m-6">
                  <p className="uppercase"><small>{filter}</small></p>
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