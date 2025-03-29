import Link from "next/link";
import { ImageRoundedComponent } from "./ImageComponent";
import { Author } from "@/types/Author";

export default async function AuthorPreviewComponent({slug, _id, coverImage, name} : Author) {
    return (
        <Link href={`/authors/${slug}`} key = {_id}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-x-4" key = {_id}>
            {/* Image */}
            <ImageRoundedComponent image={coverImage} width={220} height={220}/>
            {/* Text */}
            <div className="text-left m-6">
                <h2 className="text-2xl font-bold">{name}</h2>
                <p className="text-gray-600">This text is on the left, image on the right.</p>
            </div>
            </div>
        <hr></hr>
        </Link>
    )
}