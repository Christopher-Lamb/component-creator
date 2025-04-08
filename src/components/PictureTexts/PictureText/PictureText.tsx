import React from "react";
import CloudinaryImage from "../../CloudinaryImage";
const { getCSS, generateCSSMaps, addClassesToElements } = require("../../../utils/tailwind-to-css/index.js");

interface PictureTextProps {}

const testProps = {
  id: "",
  containerClass: "max-w-[1200px] mx-auto",
  wrapperClass: "flex gap-8",
  imageClass: "w-full h-[350px] rounded",
  img: "catering.jpg",
  htmlContainerClass: "w-full mt-5",
  content:
    "<h2>Menu Recommendations & Customization</h2><p>At Linda Burns Catering, we offer a wide selection of freshly prepared, home-cooked style dishes to suit any occasion. With 25 years of experience catering events like wedding receptions, graduation parties, and casual dinner gatherings, we ensure your expectations will be met. For the best experience, we recommend selecting up to three appetizers and three entrées from our menu, though we can customize dishes to fit your needs. Whether you have specific dietary preferences or allergy concerns, every item is made to order to accommodate your tastes.</p>",
  h2Class: "text-[31px]",
  aClass: "",
  pClass: "text-small18",
};

const PictureText: React.FC<PictureTextProps> = (props) => {
  const {} = props;
  const { id, img, content, ...otherCSS } = testProps;

  const { cssString, css } = getCSS(otherCSS);

  const html = addClassesToElements(content, { h2: css["h2Class"], p: css["pClass"], a: css["aClass"] });

  return (
    <div className={css["containerClass"]} id={id}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["wrapperClass"]}>
        <CloudinaryImage publicId={img} className={css["imageClass"]} />
        <div dangerouslySetInnerHTML={{ __html: html }} className={css["htmlContainerClass"]} />
      </div>
    </div>
  );
};

export default PictureText;
