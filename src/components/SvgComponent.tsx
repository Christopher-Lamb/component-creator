import React, { FC } from "react";
const { getCSS } = require("../utils/tailwind-to-css/index.js");

interface SvgComponentProps {
  svgString: string;
  className?: string;
}

const SvgComponent: FC<SvgComponentProps> = ({ svgString, className }) => {
  const { cssString, css } = getCSS({ iconClass: className });

  // Ensure the SVG string has a class if provided
  const enhancedSvgString = className ? svgString.replace("<svg", `<svg class="${css["iconClass"]}"`) : svgString;

  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString }} />
      <div dangerouslySetInnerHTML={{ __html: enhancedSvgString }}></div>
    </>
  );
};

export default SvgComponent;
