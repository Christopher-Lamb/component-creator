import React from "react";
import { CloudinaryImage, getCSS } from ".";

interface ImageLogoTextProps {
  containerClass: string;
  logoClass: string;
  imgLogo: string;
  textClass: string;
  text: string;
}

/**
 * ImageLogoText Component
 *
 * Description
 *
 * Props:
 * -
 *
 * @param {ImageLogoTextProps} props - The props for the component.
 */

const ImageLogoText: React.FC<ImageLogoTextProps> = (props) => {
  const { imgLogo, text, ...otherCSS } = props;
  const { cssString, css } = getCSS(otherCSS);

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <span className={css["textClass"]}>{text}</span>
      <CloudinaryImage publicId={imgLogo} className={css["logoClass"]} />
    </div>
  );
};

export default ImageLogoText;
