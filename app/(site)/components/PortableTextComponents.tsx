import { DetailImageComponent } from "./ImageComponent";


  interface SanityImage {
    asset: {
      _ref: any;
      _type: string;
      url: string;
    };
    alt?: string;
    caption?: string;
    width?: string;
    height?: string;
  }

export const PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value.asset._ref) return null; // Ensure there's a valid image URL
      const { width, height } = value;
        return (
          <div className="py-2">  
            <DetailImageComponent image={value.asset._ref} width={width} height={height}/>
            { value.caption && 
              <p className="w-full border-b border-gray-300">
                <small className="m-4">
                {value.caption}
                </small>
              </p>
            }
          </div>
        );
      },
      
    },
  };