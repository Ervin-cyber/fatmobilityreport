import { PortableTextBlock } from "next-sanity";
import { Slug } from "sanity";

export type Author = {
    _id: string;
    _createdAt?: Date;
    name: string;
    slug: Slug;
    coverImage: string;
    registeredAt?: Date;
    description: PortableTextBlock[];
}