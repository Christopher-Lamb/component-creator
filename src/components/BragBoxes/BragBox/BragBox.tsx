import React from "react";
const { getCSS, generateCSSMaps, addClassesToElements } = require("../../../utils/tailwind-to-css/");
import CloudinaryImage from "../../CloudinaryImage";

interface BragBoxProps {}

/**
 * BragBox Component
 *
 * Description
 *
 * @param {BragBoxProps} props - The props for the component.
 */

const props = {
  containerClass: "",
  wrapperClass: "flex items-center h-one gap-4 justify-center",
  htmlContainerClass: "flex flex-col text-white items-center z-10 justify-center border-white border-2 p-3 rounded",
  h1Class: "text-large font-bold ",
  h2Class: "text-med",
  h3Class: "",
  pClass: "",
  liClass: "",
  aClass: "",
  itemArray: {
    objects: { content: "" },
    array: [{ content: "<h1>1OO%</h1><h2>Installs</h2>" }, { content: "<h1>1OO%</h1><h2>Installs</h2>" }, { content: "<h1>1OO%</h1><h2>Installs</h2>" }],
  },
  img: "house.jpg",
  imageClass: "relative after:overlay after:bg-black h-one after:opacity-30 after:z-15 ",
};

const BragBox: React.FC<BragBoxProps> = () => {
  const { itemArray, img, ...otherCSS } = props;

  const { cssString, css } = getCSS(otherCSS);

  const { array: contentItems } = itemArray;

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString }} />
      {img && (
        <div className="absolute w-full h-full z-[1]">
          <CloudinaryImage publicId={img} className={css["imageClass"]} />
        </div>
      )}
      <div className={css["wrapperClass"]}>
        {contentItems.map(({ content }: { content: string }, i: number) => {
          const html = addClassesToElements(content, { h1: css["h1Class"], h2: css["h2Class"], h3: css["h3Class"], p: css["pClass"], a: css["aClass"], li: css["liClass"] });

          return <div key={i} className={css["htmlContainerClass"]} dangerouslySetInnerHTML={{ __html: html }}></div>;
        })}
      </div>
    </div>
  );
};

export default BragBox;
