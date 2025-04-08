import { Link } from "gatsby";
import React, { FC } from "react";
import SvgComponent from "../../SvgComponent";
const { getCSS, generateCSSMaps } = require("../../../utils/tailwind-to-css/index.js");

interface LinkBox {
  name: string;
  href: string;
  svg: string;
}

interface LambLinkBoxesProps {
  linkBoxesArray: LinkBox[];
}

/**
 * LambLinkBoxes Component
 *
 * @param {LambLinkBoxesProps} props - The props for the component.
 */

const props = {};

const LambLinkBoxes: FC<LambLinkBoxesProps> = (props) => {
  const { linkBoxesArray, ...otherCSS } = props;

  const { cssString, css } = getCSS(otherCSS);

  const { array: linkBoxes } = JSON.parse(linkBoxesArray as any);

  return (
    // container Class
    <div className={css["containerClass"]}>
      <style dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      {linkBoxes.map(({ name, href, svg }: LinkBox, i: number) => {
        return (
          <Link key={i} to={href} className={css["linkBoxClass"]}>
            {/* svgClass */}
            <SvgComponent svgString={svg} className={css["svgClass"]} />
            {/* textClass */}
            <span className={css["textClass"]}>{name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default LambLinkBoxes;
