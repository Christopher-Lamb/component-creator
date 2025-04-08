import React, { useState, useEffect, useRef } from "react";
import { getCSS, Slide, addClassesToElements, Dots, Arrows } from ".";

interface HeroCarouselProps {}

const testProps = {
  mainClass: "",
  containerClass: "",
  wrapperClass: "relative h-[700px]",
  slideGroupContainerClass: "relative h-full",
  slideGroupClass: "relative h-full",
  slideClass: "absolute w-full h-full transition duration-500ms ease-in-out",
  // slideSpacing: "0rem",
  // slideSize: "100%",
  // slideHeight: "100%",
  htmlContainerClass: "",
  htmlWrapperClass: "",
  content: "",
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
        htmlStylesArray: '{ "objects": { "el": { "elName": "", "elClass": "" } }, "array": [] }',
      },
    },
    array: [
      {
        containerClass: "flex items-center relative justify-center h-full",
        wrapperClass: "",
        imageClass: "h-full",
        img: "city_street.jpg",
        htmlContainerClass: "relative z-1 flex items-center justify-center",
        content: "<h1>0</h1>",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [{ elName: "h1", elClass: "text-18 text-white" }] },
      },
      {
        containerClass: "flex items-center relative justify-center h-full",
        wrapperClass: "",
        imageClass: "h-full",
        img: "bending_rock.jpg",
        htmlContainerClass: "relative z-1 flex items-center justify-center",
        content: "<h1>1</h1>",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [{ elName: "h1", elClass: "text-18 text-white" }] },
      },
      {
        containerClass: "flex items-center relative justify-center h-full",
        wrapperClass: "",
        imageClass: "h-full",
        img: "lava.jpg",
        htmlContainerClass: "relative z-1 flex items-center justify-center",
        content: "<h1>2</h1>",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [{ elName: "h1", elClass: "text-18 text-white" }] },
      },
      {
        containerClass: "",
        wrapperClass: "",
        imageClass: "h-full",
        img: "ocean_edge.jpg",
        htmlContainerClass: "",
        content: "",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
      },
      {
        containerClass: "",
        wrapperClass: "",
        imageClass: "h-full",
        img: "palm_trees.jpg",
        htmlContainerClass: "",
        content: "",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
      },
    ],
  },
  addOnArray: {
    objects: {
      dots: {
        type: "dots",
        containerClass: "absolute z-5 translate-y-[-130%] w-full",
        wrapperClass: "",
        dotContainerClass: "flex w-full justify-center gap-2",
        dotClass: "relative size-5 rounded-[200%] shadow-inset-[0px_0px_0px_3px_50] shadow-white transition relative z-10",
        dotSelectedClass: "shadow-inset-[0px_0px_0px_3px_100] shadow-white scale-105",
      },
      arrows: {
        type: "arrows",
        containerClass: "absolute z-3 h-full top-[50%] translate-y-[-50%] w-full",
        wrapperClass: "flex justify-between items-center h-full",
        iconButtonClass: "relative text-stone-100 hover:text-white",
        iconPrevClass: "size-30 scale-y-[2]",
        iconNextClass: "size-30 scale-[-1,2]",
        svg: "",
      },
    },
    array: [
      {
        type: "dots",
        containerClass: "absolute z-5 translate-y-[-130%] w-full",
        wrapperClass: "",
        dotContainerClass: "flex w-full justify-center gap-2",
        dotClass: "relative size-5 rounded-[200%] shadow-inset-[0px_0px_0px_3px_50] shadow-white transition relative z-10",
        dotSelectedClass: "shadow-inset-[0px_0px_0px_3px_100] shadow-white scale-105",
      },
      {
        type: "arrows",
        containerClass: "absolute z-3 h-full top-[50%] translate-y-[-50%] w-full",
        wrapperClass: "flex justify-between items-center h-full",
        iconButtonClass: "relative text-orange-500 hover:text-orange-400",
        iconPrevClass: "size-30 scale-y-[2]",
        iconNextClass: "size-30 scale-[-1,2]",
        svg: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path></svg>`,
      },
    ],
  },
  delay: "50000",
};

const HeroCarousel: React.FC<HeroCarouselProps> = (props) => {
  const {} = props;
  const { slidesArray, content, htmlStylesArray, addOnArray, delay, ...otherCSS } = testProps;

  const { array: slides } = slidesArray as any;
  const { array: addOns } = addOnArray as any;

  const { cssString, css } = getCSS(otherCSS);
  const { array: htmlStyles } = htmlStylesArray as any;

  const [slideIndex, setSlideIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto Play functions
  const startAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, parseInt(delay));
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay(); // optional cleanup on unmount
  }, []);

  const onNext = () => {
    startAutoplay();
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const onPrev = () => {
    startAutoplay();
    setSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

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
  const { htmlCssString, htmlCSS } = getHtmlCss();

  const cssStyleString = htmlCssString + cssString;
  const html = addClassesToElements(content, htmlCSS);

  const handleSelectPage = (index: number) => {
    setSlideIndex(index);
  };

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

          <div className={`${css["slideGroupContainerClass"]}`}>
            <div className={`${css["slideGroupClass"]}`}>
              {slides.map((elProps: any, i: number) => {
                return (
                  <div key={i} className={`${css["slideClass"]} ${i === slideIndex ? "opacity-100" : "opacity-0"}`}>
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
                return <Dots key={i} index={slideIndex} slidesLength={slides.length} onSelect={handleSelectPage} {...otherProps} />;
              case "arrows":
                return <Arrows key={i} onNextClick={onNext} onPrevClick={onPrev} {...otherProps} />;
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
