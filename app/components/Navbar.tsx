import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
const options = { next: { revalidate: 10 } };
import Logo from "./Logo";
import { getCategories } from "@/sanity/sanity-utils";
import { Category } from "@/types/Category";

const CATEGORY_QUERY = `*[_type == "category"]|order(order asc){ _id, name, description, slug }`;

  export default async function Navbar() {
    const categories = await getCategories();
    return (
        <div className="w-full h-20">
            <div style={{
                display: "flex",
                justifyContent: "center",
                color: "white"
            }}>
                <Logo/>
            </div>
            <hr></hr>
          <div className="w-full mx-auto h-full m-1">
            <div style={{
                display: "flex",
                justifyContent: "center",
            }}>
              <ul className="hidden md:flex gap-x-6 text-black">
              {categories.map((category : Category) => (
                <li key = {category._id} className="hover:scale-105 transition">
                  <Link href={`/${category.slug.current}`} key = {category._id}>
                    <p>{category.name}</p>
                  </Link>
                </li>
                ))}
              </ul>
            </div>
            <hr className="hidden md:flex"></hr>
          </div>
        </div>
    );
  };