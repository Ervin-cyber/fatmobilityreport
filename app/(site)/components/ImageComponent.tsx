import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export type ImageComponentProps = {
  image: string;
  width: number;
  height: number;
} 

export function ImageComponent({image,width,height} : ImageComponentProps) {
    if (!image) return null; 
    return (
        <img className="w-full flex"
        src={urlFor(image)?.width(width).height(height).url()}
        alt={"Cover Image"}
        width={width}
        height={height}
      />
    )
}
export function ImageRoundedComponent({image,width,height} : ImageComponentProps) {
    if (!image) return null; 
    return (
        <img className="flex rounded-full"
        src={urlFor(image)?.width(width).height(height).url()}
        alt={"Cover Image"}
        width={width}
        height={height}
      />
    )
}