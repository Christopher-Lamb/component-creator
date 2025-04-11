import React from "react";
const { getCSS } = require("../utils/tailwind-to-css/index");
import Image from "./Image";
import AnimatedComponent from "./AnimatedComponent";

interface AnimatedImageProps {
  animationContainerClass: string;
  animationClass: string;
  animationOffClass: string;
  triggerOnce?: string;
  invisible?: string;
  threshold?: number;
  animationSettingsArray: any;

  imageContainerClass: string;
  imageWrapperClass: string;
  imageClass: string;
  img: string;
  alt: string;
}

// Ex:
const obj = {
  "animated-image": {
    type: "animated-image",
    animationContainerClass: "",
    animationClass: "",
    animationOffClass: "",
    animationSettingsArray: {
      objects: { threshold: { type: "threshold", value: "0.5" }, triggerOnce: { type: "triggerOnce", value: "true" }, invisible: { type: "invisible", value: "true" } },
      array: [],
    },
    imageContainerClass: "",
    imageWrapperClass: "",
    imageClass: "",
    img: "",
    alt: "",
  },
};

/**
 * AnimatedImage Component
 *
 * Description
 *
 * Props:
 * -
 *
 * @param {AnimatedImageProps} props - The props for the component.
 */

const AnimatedImage: React.FC<AnimatedImageProps> = (props) => {
  const { animationSettingsArray, imageContainerClass, imageWrapperClass, imageClass, img, alt, ...otherCSS } = props;

  const { array: animationSettings } = animationSettingsArray as any;
  const { cssString, css } = getCSS(otherCSS);

  const settings = animationSettings.reduce((acc: Record<string, string | number | boolean>, { type, value }: { type: string; value: string }) => {
    switch (type) {
      case "threshold":
        const parseThreshold = parseFloat(value);
        acc["threshold"] = parseThreshold;
        break;
      default:
        if (["true", "false"].includes(value)) {
          const bool = value === "true";
          acc[type] = bool;
        } else {
          acc[type] = value;
        }
    }
    return acc;
  }, {});

  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <AnimatedComponent className={css["animationContainerClass"]} animationClassName={css["animationClass"]} animationOffClassName={css["animationOffClass"]} {...settings}>
        <Image containerClass={imageContainerClass} wrapperClass={imageWrapperClass} imageClass={imageClass} img={img} alt={alt} />
      </AnimatedComponent>
    </>
  );
};

export default AnimatedImage;
