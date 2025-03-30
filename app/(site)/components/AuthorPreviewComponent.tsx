import Link from "next/link";
import { ImageRoundedComponent } from "./ImageComponent";
import { Author } from "@/types/Author";

export default async function AuthorPreviewComponent({slug, _id, coverImage, name} : Author) {
    return (
        <div className="border-b border-gray-300">
            <div>
                <h1 className="text-2xl text-black font-bold pt-4">About The Author</h1>
            </div>
            <Link href={`/author/${slug}`} key = {_id}>
                <div className="flex  sm:flex-row items-center sm:items-start space-y-4 sm:space-x-4 pt-5" key = {_id}>
                    <ImageRoundedComponent image={coverImage} width={110} height={110}/>
                    <div className="text-left m-6">
                        <h2 className="text-2xl text-black font-bold">{name}</h2>
                        <p className="text-gray-600">This text is on the left, image on the right.</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}