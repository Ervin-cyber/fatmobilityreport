import { PortableTextBlock, Slug } from "sanity";

export type Category = {
    _id: string;
    _createdAt: Date;
    name: string;
    slug: Slug;
    description: PortableTextBlock[];
    order: number;
}