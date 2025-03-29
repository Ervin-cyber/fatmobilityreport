import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "next-sanity";
import { Slug } from "sanity";

export type Post = {
    _id: string;
    _createdAt: Date;
    title: string;
    slug: Slug;
    author: string;
    categories: Array<String>;
    coverImage: string;
    publishedAt: Date;
    body: PortableTextBlock[];
}