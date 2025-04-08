import React from "react";
const { getCSS, generateCSSMaps, addClassesToElements } = require("../../../utils/tailwind-to-css/index.js");
import CloudinaryImage from "../../CloudinaryImage";
interface SimpleHeroProps {}

const testProps = {
  containerClass: "relative h-four w-full overflow-hidden",
  wrapperClass: "relative text-white h-full z-1",
  bgImageClass: "object-center min-w-[80rem] top-[-400px] w-full left-[-20rem] sm:relative sm:left-0 after:overlay after:bg-black after:opacity-20",
  imgBg: "gathering.jpg",
  htmlContainerClass: "text-center h-full flex justify-center items-center flex-col pb-35",
  content: "<h1>Great Food, Made Just for You</h1><h2>Providing homemade flavors and personalized service for every occasion.</h2>",
  h1Class: "text-15.25 font-bold",
  h2Class: "text-7.75",
};

const SimpleHero: React.FC<SimpleHeroProps> = (props) => {
  const {} = props;
  const { imgBg, content, ...otherCSS } = testProps;

  const { cssString, css } = getCSS(otherCSS);
  const html = addClassesToElements(content, { h1: css["h1Class"], h2: css["h2Class"] });

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div id="heroBG" className="absolute w-full h-full">
        {/* bgImageClass */}
        <CloudinaryImage publicId={imgBg} className={css["bgImageClass"]} />
      </div>
      <div className={`${css["wrapperClass"]}`}>
        <div className={css["htmlContainerClass"]} dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </div>
  );
};

export default SimpleHero;
