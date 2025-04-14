import Link from "next/link";
import { ImageRoundedComponent } from "./ImageComponent";
import { Author } from "@/types/Author";
import { getPortableTextPreview } from "../utils/utils";

export default async function AuthorPreviewComponent({ slug, _id, coverImage, name, description }: Author) {
    return (
        <div className="border-b border-gray-300">
            <div>
                <h1 className="font-ubuntu-bold text-2xl text-black font-bold pt-4">About The Author</h1>
            </div>
            <Link href={`/author/${slug.current}`} key={_id}>
                <div className="flex  sm:flex-row items-center sm:items-start space-y-4 sm:space-x-4 pt-5" key={_id}>
                    <ImageRoundedComponent image={coverImage} width={"110px"} height={"auto"} />
                    <div className="text-left m-6">
                        <h2 className="text-2xl text-black font-bold">{name}</h2>
                        <p className="text-gray-600">{getPortableTextPreview(description)}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}