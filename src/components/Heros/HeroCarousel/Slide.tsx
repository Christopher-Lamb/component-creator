import React from "react";
import { getCSS, CloudinaryImage, addClassesToElements } from ".";

interface SlideProps {
  img: string;
  content: string;
  htmlStylesArray: string;
}

const Slide: React.FC<SlideProps> = (props) => {
  const { img, content, htmlStylesArray, ...otherCSS } = props;

  const { cssString, css } = getCSS(otherCSS);

  // gonna have to manually change this to parse when in production
  const { array: htmlStyles } = htmlStylesArray as any;

  //Digest html array
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
  const { htmlCssString, htmlCSS } = getHtmlCss();
  const html = addClassesToElements(content, htmlCSS);

  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["containerClass"]}>
        <div id="heroBG" className="absolute w-full h-full">
          {/* bgImageClass */}
          <CloudinaryImage publicId={img} className={css["imageClass"]} />
        </div>
        <div className={`relative ${css["wrapperClass"]}`}>
          <style type="text/css" dangerouslySetInnerHTML={{ __html: htmlCssString || "" }} />
          <div className={css["htmlContainerClass"]} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </>
  );
};

export default Slide;
