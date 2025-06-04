import React, { useState, useEffect, useRef } from "react";
import { getCSS, Slide, Dots, Arrows, Content, AnimatedContent } from ".";

interface HeroCarouselProps {}

const testProps = {
  mainClass: "",
  containerClass: "",
  wrapperClass: "relative h-[700px]",
  slideClass: "absolute w-full h-full transition duration-500 ease-in-out",
  htmlArray: {
    objects: {
      content: {
        type: "content",
        htmlContainerClass: "",
        htmlWrapperClass: "",
        content: "",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
      },
      "animated-content": {
        type: "animated-content",
        animationContainerClass: "",
        animationClass: "",
        animationOffClass: "",
        htmlContainerClass: "",
        htmlWrapperClass: "",
        content: "",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
        animationSettingsArray: {
          objects: { threshold: { type: "threshold", value: "0.5" }, triggerOnce: { type: "triggerOnce", value: "true" }, invisible: { type: "invisible", value: "true" } },
          array: [],
        },
      },
    },
    array: [
      // {
      //   type: "content",
      //   htmlContainerClass: "absolute w-full h-full z-1",
      //   htmlWrapperClass: "flex items-center h-full px-30",
      //   content: "<h1>Hello Mr.Man</h1><a>Button</a>",
      //   htmlStylesArray: {
      //     objects: { el: { elName: "", elClass: "" } },
      //     array: [
      //       { elName: "h1", elClass: "text-white text-12 inline-block" },
      //       { elName: "a", elClass: "text-4 rounded-[13%] bg-white inline-block" },
      //     ],
      //   },
      // },
      // {
      //   type: "animated-content",
      //   animationContainerClass: "absolute w-full h-full z-1 transition",
      //   animationClass: "translate-x-[10%] ",
      //   animationOffClass: "translate-x-[30%]",
      //   animationSettingsArray: {
      //     objects: { threshold: { type: "threshold", value: "0.5" }, triggerOnce: { type: "triggerOnce", value: "true" }, invisible: { type: "invisible", value: "true" } },
      //     array: [{ type: "threshold", value: "0.0" }],
      //   },
      //   htmlContainerClass: "",
      //   htmlWrapperClass: "flex items-center h-full px-30",
      //   content: "<h1>Hello Mr.Man</h1><a>Button</a>",
      //   htmlStylesArray: {
      //     objects: { el: { elName: "", elClass: "" } },
      //     array: [
      //       { elName: "h1", elClass: "text-white text-12 inline-block" },
      //       { elName: "a", elClass: "text-4 rounded-[13%] bg-white inline-block" },
      //     ],
      //   },
      // },
    ],
  },
  slidesArray: {
    objects: {
      slide: {
        containerClass: "relative z-1",
        wrapperClass: "",
        imageClass: "h-full",
        img: "",
        htmlContainerClass: "",
        content: "",
        htmlArray: {
          objects: {
            content: {
              type: "content",
              htmlContainerClass: "",
              htmlWrapperClass: "",
              content: "",
              htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
            },
            "animated-content": {
              type: "animated-content",
              animationContainerClass: "",
              animationClass: "transition duration-1000 delay-400 translate-x-[0%]",
              animationOffClass: "opacity-0 translate-x-[-50%]",
              htmlContainerClass: "",
              htmlWrapperClass: "",
              content: "",
              htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
            },
          },
          array: [],
        },
      },
    },
    array: [
      {
        containerClass: "flex items-center relative justify-center h-full z-1",
        wrapperClass: "",
        imageClass: "h-full",
        img: "city_street.jpg",
        htmlContainerClass: "relative z-1 flex items-center justify-center",
        content: "<h1>0</h1>",
        htmlArray: {
          objects: {},
          array: [
            {
              type: "animated-content",
              animationContainerClass: "",
              animationClass: "bg-red-600 transition duration-1000 delay-400 translate-x-[0%]",
              animationOffClass: "bg-black opacity-0 translate-x-[-50%]",
              htmlContainerClass: "w-full h-full",
              htmlWrapperClass: "flex items-center flex-col h-full px-30",
              content: "<h1>Hello Mr.Man</h1><a href='/'>Button</a>",
              htmlStylesArray: {
                objects: { el: { elName: "", elClass: "" } },
                array: [
                  { elName: "h1", elClass: "text-white text-12 inline-block" },
                  { elName: "a", elClass: "text-4 rounded-[13%] cursor-pointer bg-white inline-block" },
                ],
              },
            },
          ],
        },
      },
      {
        containerClass: "flex items-center relative justify-center h-full",
        wrapperClass: "",
        imageClass: "h-full",
        img: "hawaii.jpg",
        htmlContainerClass: "relative z-1 flex items-center justify-center",
        content: "<h1>0</h1>",
        htmlArray: {
          objects: {
            content: {
              type: "content",
              htmlContainerClass: "",
              htmlWrapperClass: "",
              content: "",
              htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
            },
            "animated-content": {
              type: "animated-content",
              htmlContainerClass: "",
              htmlWrapperClass: "",
              content: "",
              htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
              animationContainerClass: "",
              animationClass: "",
              animationOffClass: "",
              animationSettingsArray: {
                objects: { threshold: { type: "threshold", value: "0.5" }, triggerOnce: { type: "triggerOnce", value: "true" }, invisible: { type: "invisible", value: "true" } },
                array: [],
              },
            },
          },
          array: [],
        },
      },
    ],
  },
  addOnArray: {
    objects: {
      dots: {
        type: "dots",
        containerClass: "absolute h-full w-full",
        wrapperClass: "absolute w-full bottom-4",
        dotContainerClass: "flex w-full justify-center gap-2",
        dotClass: "relative z-500 size-5 rounded-[200%] shadow-inset-[0px_0px_0px_3px_50] shadow-white transition",
        dotSelectedClass: "shadow-inset-[0px_0px_0px_3px_100] shadow-white scale-105",
      },
      arrows: {
        type: "arrows",
        containerClass: "absolute w-full top-[50%] translate-y-[-50%] z-1",
        wrapperClass: "flex justify-between items-center w-full",
        iconButtonClass: "relative text-stone-400 hover:text-white",
        iconPrevClass: "size-30 scale-y-[2]",
        iconNextClass: "size-30 scale-[-1,2]",
        svg: "",
      },
    },
    array: [
      {
        type: "dots",
        containerClass: "absolute h-full w-full",
        wrapperClass: "absolute w-full bottom-4",
        dotContainerClass: "flex w-full justify-center gap-2",
        dotClass: "relative z-500 size-5 rounded-[200%] shadow-inset-[0px_0px_0px_3px_50] shadow-white transition",
        dotSelectedClass: "shadow-inset-[0px_0px_0px_3px_100] shadow-white scale-105",
      },
      {
        type: "arrows",
        containerClass: "absolute w-full top-[50%] translate-y-[-50%] z-1",
        wrapperClass: "flex justify-between items-center w-full",
        iconButtonClass: "relative opacity-30 hover:opacity-70 text-white",
        iconPrevClass: "size-30 scale-y-[2]",
        iconNextClass: "size-30 scale-[-1,2]",
        svg: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="200px" width="200px"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path>
      </svg>`,
      },
    ],
  },
  delay: "500000",
};

const HeroCarousel: React.FC<HeroCarouselProps> = (props) => {
  const {} = props;
  const { slidesArray, htmlArray, addOnArray, delay, ...otherCSS } = testProps;

  const { array: slides } = slidesArray as any;
  const { array: addOns } = addOnArray as any;

  const { cssString, css } = getCSS(otherCSS);
  const { array: htmls } = htmlArray as any;

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

  const handleSelectPage = (index: number) => {
    setSlideIndex(index);
  };

  return (
    <div className={css["mainClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["containerClass"]}>
        <div className={css["wrapperClass"]}>
          {htmls.map((elProps: any, i: number) => {
            const { type, ...other } = elProps;
            switch (type) {
              case "content":
                return <Content key={i} {...other} />;
              case "animated-content":
                return <AnimatedContent key={i} {...other} />;
              default:
                return;
            }
          })}
          {slides.map((elProps: any, i: number) => {
            return (
              <div key={i} className={`${css["slideClass"]} ${i === slideIndex ? "opacity-100" : "opacity-0"}`}>
                <Slide index={i} currentIndex={slideIndex} {...elProps} />
              </div>
            );
          })}

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
