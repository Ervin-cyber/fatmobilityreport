import { Slug } from "sanity";

export type NavigationItem = {
    _id: string;
    _createdAt: Date;
    name: string;
    slug: Slug;
}