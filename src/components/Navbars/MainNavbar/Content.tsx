import React from "react";
import { addClassesToElements, getCSS } from ".";

interface ContentProps {
  containerClass: string;
  htmlContainerClass: string;
  content: string;
  pClass: string;
  aClass: string;
}

/**
 * Content Component
 *
 * Description
 *
 * Props:
 * -
 *
 * @param {ContentProps} props - The props for the component.
 */

const Content: React.FC<ContentProps> = (props) => {
  const { content, ...otherProps } = props;

  const { cssString, css } = getCSS(otherProps);
  const html = addClassesToElements(content, css);

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["htmlContainerClass"]} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default Content;
