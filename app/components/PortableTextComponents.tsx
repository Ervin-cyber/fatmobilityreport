import { ImageComponent } from "@/app/components/ImageComponent";

  interface SanityImage {
    asset: {
      _ref: any;
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
            <ImageComponent image={value.asset._ref} width={651} height={366}/>
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