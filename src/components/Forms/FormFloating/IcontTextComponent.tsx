import React from "react";
import { getCSS, SvgComponent } from "./";

const IconTextComponent: React.FC<any> = (props) => {
  const { svg, href, text, ...otherProps } = props;
  const { cssString, css } = getCSS(otherProps);
  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <SvgComponent className={css["iconClass"]} svgString={svg} />
      <a href={href} className={css["textClass"]}>
        {text}
      </a>
    </div>
  );
};

export default IconTextComponent;
