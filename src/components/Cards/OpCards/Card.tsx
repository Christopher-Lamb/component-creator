import React from "react";
import { getCSS, Content, CloudinaryImage } from "./";

interface CardProps {
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
  const { htmlArray, href, img, alt, ...otherCSS } = props;

  const { cssString, css } = getCSS(otherCSS);

  const { array: htmls } = htmlArray as any;

  return (
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
  );
};

export default Card;
