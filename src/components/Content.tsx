import React from "react";
const { getCSS, addClassesToElements } = require("../utils/tailwind-to-css/index");

interface ContentProps {
  htmlContainerClass: string;
  htmlWrapperClass: string;
  content: string;
  htmlStylesArray: any;
}

//  htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },

/**
 * Content Component

* @param {ContentProps} props - The props for the component.
 */

const obj = {
  content: {
    type: "content",
    htmlContainerClass: "",
    htmlWrapperClass: "",
    content: "",
    htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
  },
};

const Content: React.FC<ContentProps> = (props) => {
  const { content, htmlStylesArray, ...otherCSS } = props;

  const { array: htmlStyles } = htmlStylesArray as any;

  //Digest HTML files
  const getHtmlCss = (): { htmlCssString: string; htmlCSS: any } => {
    const styleObj = htmlStyles.reduce((acc: Record<string, string>, { elName, elClass }: { elName: string; elClass: string }) => {
      const newName = elName + "Class";
      acc[newName] = elClass;
      return acc;
    }, {});

    const { cssString, css } = getCSS(styleObj);

    return {
      htmlCssString: cssString,
      htmlCSS: css,
    };
  };

  const { cssString, css } = getCSS(otherCSS);
  const { htmlCssString, htmlCSS } = getHtmlCss();

  const cssStyleString = htmlCssString + cssString;
  const html = addClassesToElements(content, htmlCSS);

  return (
    <div className={css["htmlContainerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssStyleString || "" }} />
      <div dangerouslySetInnerHTML={{ __html: html }} className={css["htmlWrapperClass"]} />
    </div>
  );
};

export default Content;
