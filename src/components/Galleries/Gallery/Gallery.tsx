import React from "react";
import CloudinaryImage from "../../CloudinaryImage";
import { useStaticQuery, graphql } from "gatsby";

interface GalleryProps {}

/**
 * Gallery Component
 *
 * @param {GalleryProps} props - The props for the component.
 */
const props = {
  imageGroup: [
    "placeholder.png",
    "placeholder.png",
    "3_1.png",
    "placeholder.png",
    "2_1.png",
    "placeholder.png",
    "2_1.png",
    "3_1.png",
    "placeholder.png",
    "placeholder.png",
    "2_1.png",
    "placeholder.png",
    "3_1.png",
    "placeholder.png",
    "placeholder.png",
  ],
};


//pattern
//repeat pattern



const Gallery: React.FC<GalleryProps> = () => {
  const { imageGroup } = props;
  return (
    <div className="w-full">
      <div className="flex mt-med flex-wrap justify-center gap-2 items-start max-w-5xl mx-auto">
        {imageGroup.map((src, i) => {
          console.log(src);
          return (
            <div className="shrink-0 cursor-pointer transition hover:scale-105 h-auto">
              <CloudinaryImage publicId={src} className={"w-three h-one object-cover"} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
