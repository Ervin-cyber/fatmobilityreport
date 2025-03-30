import { type SanityDocument } from "next-sanity";
import { client } from "./client";
import { Category } from "../types/Category";
import { Author } from "../types/Author";
import { Post } from "../types/Post";
const options = { next: { revalidate: 30 } };
export async function getPosts( filter: string ) : Promise<Post[]> {
    const POSTS_QUERY = `*[
        _type == "post"
        && defined(slug.current)
        ${filter ? `&& *[_type == "category" && slug.current == "${filter}"][0]._id in categories[]._ref` : ""}
      ]|order(publishedAt desc)[0...12]{_id, title, coverImage, slug, publishedAt}`;

    return await client.fetch(POSTS_QUERY, {});
}
export async function getCategories() {
  const CATEGORY_QUERY = `*[_type == "category" && show_on_navigation_bar]|order(order asc){ _id, name, description, slug }`;
  const options = { next: { revalidate: 5 } };
  return await client.fetch<Category[]>(CATEGORY_QUERY, {}, options);
}
export async function getPostCategories(slug:string): Promise<string[]> {
  const CATEGORY_QUERY = `*[_type == "category" && show_on_navigation_bar && _id in *[_type == "post" && slug.current == $slug][0].categories[]._ref].name`;
  const options = { next: { revalidate: 5 } };
  const value = await client.fetch<string[]>(CATEGORY_QUERY, {slug}, options);
  console.log(value);
  return value;
}
export async function getAuthorBySlug(slug: string) {
  const AUTHOR_QUERY = `*[_type == "author" && slug.current == $slug][0]`;
const author = await client.fetch(AUTHOR_QUERY, {slug});
return author;
}
export async function getAuthorByPost(filter: string) {
    //*[_type == "post" && slug.current == "ferrari-s-super-sports-car-every-ten-years"][0].author._ref
  //*[_type == "author" && _id == "fed4b901-0700-45aa-bc66-23a6c800d95a"]
  const AUTHOR_QUERY = `
  *[_type == "author" && _id == *[_type == "post" && slug.current == "${filter}"][0].author._ref][0]`
  const author = await client.fetch(AUTHOR_QUERY, {});
  return author;
}