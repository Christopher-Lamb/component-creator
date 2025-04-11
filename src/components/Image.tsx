import React from "react";
import CloudinaryImage from "./CloudinaryImage";
const { getCSS } = require("../utils/tailwind-to-css/index");

interface ImageProps {
  img: string;
  alt: string;
  containerClass: string;
  wrapperClass: string;
  imageClass: string;
}

/**
 * Image Component
 *
 * @param {ImageProps} props - The props for the component.
 */

const obj = {
  image: {
    type: "image",
    containerClass: "",
    wrapperClass: "",
    imageClass: "",
    img: "",
    alt: "",
  },
};

const Image: React.FC<ImageProps> = (props) => {
  const { img, alt, ...otherCSS } = props;
  const { cssString, css } = getCSS(otherCSS);

  return (
    <div className={css["containerClass"]}>
      <div className={css["wrapperClass"]}>
        <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
        <CloudinaryImage publicId={img} alt={alt} className={css["imageClass"]} />
      </div>
    </div>
  );
};

export default Image;
