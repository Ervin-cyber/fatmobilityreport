import Link from "next/link";
import { PostPreviewComponent } from "./ImageComponent";
import { getCategories, getCategoryDescription, getPosts } from "@/sanity/sanity-utils";
import { Post } from "@/types/Post";
import { Category_ref } from "@/types/Category";
import { findNameById, findSlugById, getPortableTextPreview } from "../utils/utils";

export default async function PostListComponent({slug, filter}: {slug:string, filter:string}) {
    const posts = await getPosts(filter);
    const categoryDescription = await getCategoryDescription(slug);
    const categories = await getCategories();
    return (
        <div className="items-center">
          {
            categoryDescription && <h1 className="font-anton text-3xl text-center text-black py-4">{categoryDescription}</h1>
          }
          
          <div className="flex flex-col gap-y-4 divide-y divide-gray-300">
            {posts.map((post: Post) => (
              <div className="flex flex-col sm:flex-row space-y-4 sm:max-w" key = {post._id}>
                <Link className="flex sm:flex-shrink-0 hover:opacity-80 transition object-cover" href={`/post/${post.slug.current}`}>
                  <PostPreviewComponent image={post.coverImage}/>
                </Link>
                <div className="text-left sm:px-6 md:px-6 lg:px-6 xl:px-6">
                  {
                    post.categories.map((category: Category_ref) => (
                      <Link className="" href={`/${findSlugById(categories, category._ref)}`} key={category._ref}>
                        <span className="text-sm text-gray-700 pe-2" key={category._ref}>{findNameById(categories, category._ref)}</span>
                      </Link>
                    ))
                  }
                  <Link className="" href={`/post/${post.slug.current}`}>
                    <h3 className="font-ubuntu-bold font-bold text-black">{post.title}</h3>
                  </Link>
                  <p className="text-gray-600 font-ubuntu-light">{getPortableTextPreview(post.body)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}