import React from "react";
import { getCSS, Content, CloudinaryImage, AnimatedComponent } from "./";

interface CardProps {
  animationContainerClass: string;
  animationClass: string;
  animationOffClass: string;
  animationSettingsArray: any;
  containerClass: string;
  wrapperClass: string;
  href: string;
  imageContainerClass: string;
  imageClass: string;
  img: string;
  alt: string;
  htmlArray: any;
}

const Card: React.FC<CardProps> = (props) => {
  const { htmlArray, href, img, alt, animationSettingsArray, ...otherCSS } = props;

  const { cssString, css } = getCSS(otherCSS);

  const { array: htmls } = htmlArray as any;

  const { array: animationSettings } = animationSettingsArray as any;
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
  console.log(animationSettings);
  console.log({ settings });

  return (
    <AnimatedComponent className={css["animationContainerClass"]} animationClassName={css["animationClass"]} animationOffClassName={css["animationOffClass"]} {...settings}>
      <a href={href || "/"} className={`block ${css["containerClass"]}`}>
        <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
        <div className={css["imageContainerClass"]}>
          <CloudinaryImage publicId={img} alt={alt} className={css["imageClass"]} />
        </div>
        <div className={css["wrapperClass"]}>
          {htmls.map((htmlObj: any, i: number) => {
            return <Content key={i} {...htmlObj} />;
          })}
        </div>
      </a>
    </AnimatedComponent>
  );
};

export default Card;
