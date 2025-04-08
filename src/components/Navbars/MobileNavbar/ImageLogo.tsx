import React from "react";
import { getCSS, CloudinaryImage } from ".";

interface ImaageLogoProps {
  containerClass: string;
  logoClass: string;
  imgLogo: string;
}

/**
 * ImaageLogo Component
 *
 * Description
 *
 * Props:
 * -
 *
 * @param {ImaageLogoProps} props - The props for the component.
 */

const ImaageLogo: React.FC<ImaageLogoProps> = (props) => {
  const { imgLogo, ...otherCSS } = props;

  const { cssString, css } = getCSS(otherCSS);

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <CloudinaryImage publicId={imgLogo} className={css["logoClass"]} />
    </div>
  );
};

export default ImaageLogo;
