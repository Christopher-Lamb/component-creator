import React from "react";
const { getCSS, generateCSSMaps, addClassesToElements } = require("../../../utils/tailwind-to-css/");
import CloudinaryImage from "../../CloudinaryImage";

interface CardsProps {}

/**
 * Cards Component
 *
 * -
 *
 * @param {CardsProps} props - The props for the component.
 */

const props = {
  containerClass: "w-full",
  wrapperClass: "flex items-start justify-center gap-4",
  cardContainerClass: "border w-two p-4 hover:scale-110 cursor-pointer transition",
  htmlContainerClass: "relative",
  cardArray: {
    objects: { contentTop: "", img: "", contentBottom: "" },
    array: [
      { contentTop: "<h1>Top</h1>", img: "house.jpg", contentBottom: "<p>BottomCillum nostrud irure enim enim ut aliqua. Anim duis anim duis adipisicing et. Deserunt ea et aliqua Lorem.</p>" },
      { contentTop: "<h1>Top</h1>", img: "house.jpg", contentBottom: "" },
      { contentTop: "<h1>Top</h1>", img: "house.jpg", contentBottom: "" },
    ],
  },
  imageContainerClass: "",
  imageClass: "",
  h1Class: "",
  h2Class: "",
  h3Class: "",
  pClass: "",
  liClass: "",
  aClass: "",
};

const Cards: React.FC<CardsProps> = () => {
  const { cardArray, ...otherCSS } = props;

  const { cssString, css } = getCSS(otherCSS);

  const { array: contentItems } = cardArray;

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString }} />

      <div className={css["wrapperClass"]}>
        {contentItems.map(({ contentTop, img, contentBottom }: { contentTop: string; img: string; contentBottom: string }, i: number) => {
          const htmlTop = addClassesToElements(contentTop, { h1: css["h1Class"], h2: css["h2Class"], h3: css["h3Class"], p: css["pClass"], a: css["aClass"], li: css["liClass"] });
          const htmlBottom = addClassesToElements(contentBottom, { h1: css["h1Class"], h2: css["h2Class"], h3: css["h3Class"], p: css["pClass"], a: css["aClass"], li: css["liClass"] });

          return (
            <div key={i} className={css["cardContainerClass"]}>
              <div className={css["htmlContainerClass"]} dangerouslySetInnerHTML={{ __html: htmlTop }}></div>
              <div className={css["imageContainerClass"]}>
                <CloudinaryImage publicId={img} className={css["imageClass"]} />
              </div>
              <div className={css["htmlContainerClass"]} dangerouslySetInnerHTML={{ __html: htmlBottom }}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
