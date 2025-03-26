import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

  interface SanityImage {
    asset: {
      _ref: string;
      _type: string;
      url: string;
    };
    alt?: string;
    caption?: string;
  }

export const PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value.asset._ref) return null; // Ensure there's a valid image URL
        return (
          <div className="mt-4">
          <img
            src={urlFor(value.asset._ref)?.width(651).height(366).url()}
            alt={value.alt || "Image"}
            className="aspect-video"
            width="651"
            height="366"
          />
          <p className="m-4">
          <small>
          {value.caption}
          </small>
          </p>
          <hr></hr>
        </div>
        );
      },
    },
  };