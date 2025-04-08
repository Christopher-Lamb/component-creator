import React from "react";
import { getCSS, Slide, addClassesToElements, Dots, Arrows } from ".";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

import "./embla.css";

interface HeroCarouselProps {}

const testProps = {
  mainClass: "",
  containerClass: "",
  wrapperClass: "h-200 relative",
  emblaContainerClass: "",
  emblaWrapperClass: "",
  emblaSlideClass: "h-200",
  slideSpacing: "0rem",
  slideSize: "100%",
  slideHeight: "100%",
  htmlContainerClass: "absolute flex items-center px-10 w-full h-200 ",
  htmlWrapperClass: "relative z-3",
  content: "<h1>Hey Hey Overlay</h1>",
  htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [{ elName: "h1", elClass: "text-white font-bold text-10" }] },
  slidesArray: {
    objects: {
      slide: {
        containerClass: "",
        wrapperClass: "",
        imageClass: "h-full",
        img: "",
        htmlContainerClass: "",
        content: "",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
        array: [],
      },
    },
    array: [
      {
        containerClass: "bg-orange-300 h-full",
        wrapperClass: "px-16 h-full relative after:overlay after:bg-blue-700 after:opacity-60 flex flex-col justify-center",
        imageClass: "h-full",
        img: "city_street.jpg",
        htmlContainerClass: "relative z-999 ",
        content: "<h1>Welcome</h1>",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [{ elName: "h1", elClass: "text-18 text-white" }] },
        array: [],
      },
      {
        containerClass: "bg-orange-300 h-full",
        wrapperClass: "",
        imageClass: "h-full",
        img: "bending_rock.jpg",
        htmlContainerClass: "",
        content: "",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
        array: [],
      },
      {
        containerClass: "",
        wrapperClass: "",
        imageClass: "h-full",
        img: "lava.jpg",
        htmlContainerClass: "",
        content: "",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
        array: [],
      },
      {
        containerClass: "bg-orange-300 h-full",
        wrapperClass: "",
        imageClass: "h-full",
        img: "ocean_edge.jpg",
        htmlContainerClass: "",
        content: "",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
        array: [],
      },
      {
        containerClass: "bg-orange-300 h-full",
        wrapperClass: "",
        imageClass: "h-full",
        img: "palm_trees.jpg",
        htmlContainerClass: "",
        content: "",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
        array: [],
      },
    ],
  },
  addOnArray: {
    objects: {
      dots: { type: "dots", containerClass: "absolute translate-y-[-100%]", wrapperClass: "", dotContainerClass: "", dotsClass: "", dotSelectedClass: "" },
      arrows: { type: "arrows", containerClass: "absolute top-[50%] translate-y-[-50%] w-full", wrapperClass: "", iconButtonClass: "", iconClass: "", svg: "" },
    },
    array: [
      {
        type: "dots",
        containerClass: "absolute translate-y-[-100%] w-full",
        wrapperClass: "",
        dotContainerClass: "flex w-full justify-center gap-2",
        dotClass: "bg-black size-10 rounded-[200%] transition relative z-10",
        dotSelectedClass: "scale-110 ring-2 ring-white",
      },
      {
        type: "arrows",
        containerClass: "absolute top-[50%] translate-y-[-50%] w-full",
        wrapperClass: "flex justify-between items-center h-full",
        iconButtonClass: "text-orange-500 hover:text-orange-400",
        iconClass: "size-30",
        svg: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path></svg>`,
      },
    ],
  },
  delay: "10000",
};

const HeroCarousel: React.FC<HeroCarouselProps> = (props) => {
  const {} = props;
  const { slidesArray, slideHeight, slideSize, slideSpacing, content, htmlStylesArray, addOnArray, delay, ...otherCSS } = testProps;

  const { array: slides } = slidesArray as any;
  const { array: addOns } = addOnArray as any;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade(), Autoplay({ delay: parseInt(delay) })]);

  const { cssString, css } = getCSS(otherCSS);
  //Digest html array
  const { array: htmlStyles } = htmlStylesArray as any;
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

  const cssStyleString = htmlCssString + cssString;
  const html = addClassesToElements(content, htmlCSS);

  return (
    <div className={css["mainClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssStyleString || "" }} />
      <div className={css["containerClass"]}>
        <div className={css["wrapperClass"]}>
          {content && (
            <div className={css["htmlContainerClass"]}>
              <div className={css["htmlWrapperClass"]} dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
          )}

          <div className={`embla ${css["emblaContainerClass"]}`} ref={emblaRef}>
            <div className={`embla__wrapper ${css["emblaWrapperClass"]} relative `} style={{ "--slide-spacing": slideSpacing } as React.CSSProperties}>
              {slides.map((elProps: any, i: number) => {
                return (
                  <div key={i} className={`embla__slide ${css["emblaSlideClass"]} `} style={{ "--slide-size": slideSize, "--slide-height": slideHeight } as React.CSSProperties}>
                    <Slide {...elProps} />
                  </div>
                );
              })}
            </div>
          </div>
          {addOns.map((elProps: any, i: number) => {
            const { type, ...otherProps } = elProps;
            switch (type) {
              case "dots":
                return <Dots emblaApi={emblaApi} {...otherProps} />;
              case "arrows":
                return <Arrows emblaApi={emblaApi} {...otherProps} />;
              default:
                return;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
