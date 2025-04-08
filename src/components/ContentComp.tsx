import React from "react";
const { getCSS, addClassesToElements } = require("../utils/tailwind-to-css/index");

interface ContentCompProps {
  htmlContainerClass: string;
  content: string;
  htmlStylesArray: any;
}

//  htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },

/**
 * ContentComp Component

* @param {ContentCompProps} props - The props for the component.
 */


const ContentComp: React.FC<ContentCompProps> = (props) => {
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
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssStyleString || "" }} />
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </>
  );
};

export default ContentComp;
