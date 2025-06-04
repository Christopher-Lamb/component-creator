import React from "react";
import { getCSS, CloudinaryImage, Content } from ".";

interface SlideProps {
  index: number;
  currentIndex: number;
  containerClass: string;
  wrapperClass: string;
  imageClass: string;
  img: string;
  htmlContainerClass: string;
  content: string;
  htmlArray: any;
}

const Slide: React.FC<SlideProps> = (props) => {
  const { index, currentIndex, img, content, htmlArray, ...otherCSS } = props;

  const { cssString, css } = getCSS(otherCSS);

  // gonna have to manually change this to parse when in production
  const { array: contentEls } = htmlArray as any;

  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["containerClass"]}>
        <div className="absolute w-full h-full">
          {/* bgImageClass */}
          <CloudinaryImage publicId={img} className={css["imageClass"]} />
        </div>
        <div className={`relative ${css["wrapperClass"]}`}>
          {/* <div className={css["htmlContainerClass"]} dangerouslySetInnerHTML={{ __html: html }} /> */}
          {contentEls.map((elProps: any, i: number) => {
            const { type, ...other } = elProps;
            console.log(elProps);
            switch (type) {
              case "content":
                return <Content key={i} {...other} />;
              case "animated-content":
                const { animationContainerClass, animationClass, animationOffClass, ...animatedOther } = other;
                const { cssString: animatedCssString, css: aniCSS } = getCSS({ animationContainerClass, animationClass, animationOffClass });
                return (
                  <div key={i} className={`${aniCSS["animationContainerClass"]} ${index === currentIndex ? aniCSS["animationClass"] : aniCSS["animationOffClass"]}`}>
                    <style type="text/css" dangerouslySetInnerHTML={{ __html: animatedCssString || "" }} />
                    <Content {...animatedOther} />
                  </div>
                );
              default:
                return;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Slide;
