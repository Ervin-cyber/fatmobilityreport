import { PortableTextBlock, Slug } from "sanity";

export type Service = {
    _id: string;
    _createdAt: Date;
    name: string;
    slug: Slug;
    body: PortableTextBlock[];
    order: number;
}