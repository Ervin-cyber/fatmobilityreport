import { type SanityDocument } from "next-sanity";
import { client } from "./client";
import { Category } from "../types/Category";
import { Author } from "../types/Author";
import { Post } from "../types/Post";
import { Service } from "../types/Service";
import { SocialPage } from "../types/SocialPage";
import { NavigationItem } from "../types/NavigationItem";
const options = { next: { revalidate: 30 } };
export async function getPosts(filter: string): Promise<Post[]> {
    const POSTS_QUERY = `*[
        _type == "post"
        && defined(slug.current)
        ${filter ? `&& ${filter}` : ""}
      ]|order(publishedAt desc){_id, title, coverImage, slug, publishedAt, categories, body}`;

    return await client.fetch<Post[]>(POSTS_QUERY, {});
}
export async function getCategories() {
    const CATEGORY_QUERY = `*[_type == "category" && show_on_navigation_bar]|order(order asc){ _id, name, description, slug }`;
    const options = { next: { revalidate: 5 } };
    return await client.fetch<Category[]>(CATEGORY_QUERY, {});
}
export async function getCategoryDescription(slug: string): Promise<string> {
    const CATEGORY_QUERY = `*[_type == "category" && slug.current == $slug][0].description`;
    const options = { next: { revalidate: 5 } };
    return await client.fetch<string>(CATEGORY_QUERY, { slug });
}
export async function getPostCategories(slug: string): Promise<string[]> {
    const CATEGORY_QUERY = `*[_type == "category" && show_on_navigation_bar && _id in *[_type == "post" && slug.current == $slug][0].categories[]._ref].name`;
    const options = { next: { revalidate: 5 } };
    const value = await client.fetch<string[]>(CATEGORY_QUERY, { slug });
    return value;
}
export async function getAuthorBySlug(slug: string): Promise<Author> {
    const AUTHOR_QUERY = `*[_type == "author" && slug.current == $slug][0]`;
    const author = await client.fetch<Author>(AUTHOR_QUERY, { slug });
    return author;
}
export async function getAuthorByPost(filter: string): Promise<Author> {
    const AUTHOR_QUERY = `
    *[_type == "author" && _id == *[_type == "post" && slug.current == $filter][0].author._ref][0]`
    const author = await client.fetch<Author>(AUTHOR_QUERY, { filter });
    return author;
}
export async function getAuthorPosts(author: string): Promise<Post[]> {
    const AUTHOR_POSTS_QUERY = `
    *[_type == "post" && author._ref == $author]|order(publishedAt desc)`
    const posts = await client.fetch<Post[]>(AUTHOR_POSTS_QUERY, { author });
    return posts;
}
export async function getSocialPages(): Promise<SocialPage[]> {
    const SOCIAL_PAGE_QUERY = `
    *[_type == "social-page"]`
    const socialPages = await client.fetch<SocialPage[]>(SOCIAL_PAGE_QUERY, {});
    return socialPages;
}
export async function getNavigationItems(): Promise<NavigationItem[]> {
    const NAVIGATION_QUERY = `*[_type == "page"]|order(order asc).type`;
    const options = { next: { revalidate: 5 } };
    const pages = await client.fetch<string[]>(NAVIGATION_QUERY, {});
    let items: NavigationItem[] = []
    for (const page of pages) {
        const data = await client.fetch<NavigationItem[]>(`*[_type == $page && show_on_navigation_bar]|order(order asc){_id, name, slug{current}}`, { page });
        items.push(...data);
    }
    return items;
}
export async function getSlugType(slug: string): Promise<string> {
    const SOCIAL_PAGE_QUERY = `
    *[slug.current == $slug][0]._type`
    const slugType = await client.fetch<string>(SOCIAL_PAGE_QUERY, { slug });
    return slugType;
}
export async function getPostDetail(slug: string): Promise<Post> {
    const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
    const post = await client.fetch<Post>(POST_QUERY, { slug });
    return post;
}
export async function getServiceDetail(slug: string): Promise<Service> {
    const SERVICE_DETAIL_QUERY = `
    *[_type == "service" && slug.current == $slug][0]`
    const service = await client.fetch<Service>(SERVICE_DETAIL_QUERY, { slug });
    return service;
}