import React from "react";
import { getCSS, addClassesToElements } from ".";

export interface ContentType {
  type: string;
  content: string;
  containerClass: string;
  wrapperClass: string;
  h1Class: string;
  h2Class: string;
  h3Class: string;
  pClass: string;
  aClass: string;
  ulClass: string;
  liClass: string;
  strongClass: string;
}

const ContentComponent: React.FC<ContentType> = (props) => {
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

export default ContentComponent;
