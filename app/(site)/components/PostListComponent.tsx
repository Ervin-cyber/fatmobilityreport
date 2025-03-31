import Link from "next/link";
import { client } from "@/sanity/client";
import { ImageComponent } from "./ImageComponent";
import { getPostCategories, getPosts } from "@/sanity/sanity-utils";
import { Post } from "@/types/Post";

const options = { next: { revalidate: 30 } };
export default async function PostListComponent({filter}: {filter:string}) {
    const posts = await getPosts(filter);
    const categoryDescription:string = await client.fetch(`*[_type == "category" && slug.current == "${filter}"][0].description`, {}, options);
    return (
        <div className="items-center">
          {
            categoryDescription && <h1 className="font-anton text-3xl text-center text-black py-4">{categoryDescription}</h1>
          }
          
          <div className="flex flex-col gap-y-4 divide-y divide-gray-300">
            {posts.map((post: Post) => (
              <div className="flex flex-col sm:flex-row space-y-4 sm:max-w" key = {post._id}>
                <Link className="flex-shrink-0 hover:opacity-80 transition object-cover" href={`/post/${post.slug.current}`}>
                  <ImageComponent image={post.coverImage} width={370} height={200} />
                </Link>
                <div className="text-left sm:px-6 md:px-6 lg:px-6 xl:px-6">
                  <span className="text-sm text-gray-700">CLASSIC</span>
                  <Link className="" href={`/post/${post.slug.current}`}>
                    <h2 className="text-2xl font-ubuntu-bold font-bold text-black">{post.title}</h2>
                  </Link>
                  <p className="text-gray-600 font-ubuntu-light">Secondary Title</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}