import React, { useEffect, useState, useCallback } from "react";
import { Rating } from ".";
import { EmblaOptionsType } from "embla-carousel";
import "./embla.css";
import useEmblaCarousel from "embla-carousel-react";
import { NextButton, PrevButton, usePrevNextButtons } from "./NextPrev";
import Autoplay from "embla-carousel-autoplay";

const { getCSS, generateCSSMaps, addClassesToElements } = require("../../../utils/tailwind-to-css/");

interface CarsouelProps {
  slidesArray: any;
  starSize: string;
  arrowsBool: boolean;
  content: string;
  autoPlayBool: boolean;
}

/**
 * Carsouel Component
 *
 * @param {CarsouelProps} props - The props for the component.
 */

const OPTIONS: EmblaOptionsType = { loop: true, slidesToScroll: "auto" };

const Carsouel: React.FC<CarsouelProps> = (props) => {
  const { slidesArray, content, arrowsBool, autoPlayBool, starSize, ...otherCSS } = props;

  const { newCSSMap, namingMap: css } = generateCSSMaps(otherCSS);
  const cssString = getCSS(newCSSMap);

  const html = addClassesToElements(content, { h1: css["h1Class"], h2: css["h2Class"], h3: css["h3Class"], p: css["pClass"], liClass: css["liClass"], a: css["aClass"] });


  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [Autoplay({ playOnInit: autoPlayBool, delay: 12000 })]);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
  
  //parseArray
  const { array: slides } = slidesArray;

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;

      const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString }} />
      {/* top */}
      {content && <div className={css["htmlContainerClass"]} dangerouslySetInnerHTML={{ __html: html }} />}
      <section className={`relative ${css["wrapperClass"]}`}>
        {arrowsBool && (
          <>
            <div className="absolute top-[50%] left-0 translate-y-[-50%] z-10">
              <PrevButton onClick={() => onButtonAutoplayClick(onPrevButtonClick)} disabled={prevBtnDisabled} className={css["arrowClass"]} />
            </div>
            <div className="absolute right-0 top-[50%] translate-y-[-50%] z-10">
              <NextButton onClick={() => onButtonAutoplayClick(onNextButtonClick)} disabled={nextBtnDisabled} className={css["arrowClass"]} />
            </div>
          </>
        )}
        <div className={`overflow-hidden ${css["slidesContainerClass"]}`} ref={emblaRef}>
          {/* slidesArr */}
          <div className="embla-container">
            {slides.map((obj: any, index: number) => (
              <div className={`embla-slide-container ${css["slideContainerClass"]}`} key={index}>
                <Slide
                  {...obj}
                  slideClassName={`embla-slide ${css["slideClass"]}`}
                  textClassName={css["textClass"]}
                  ratingClassName={css["ratingClass"]}
                  fromClassName={css["fromClass"]}
                  starSize={starSize}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

interface SlideProps {
  slideClassName: string;
  textClassName: string;
  ratingClassName: string;
  fromClassName: string;
  text: string;
  rating: number;
  from: string;
  starSize: string;
}

const Slide: React.FC<SlideProps> = ({ slideClassName, textClassName, ratingClassName, fromClassName, text, rating, from, starSize }) => {
  return (
    <div className={slideClassName}>
      <p className={textClassName}>{text}</p>
      <p className={fromClassName}>{from}</p>
      <Rating rating={rating} className={ratingClassName} size={starSize} />
    </div>
  );
};

const ArrowGroup: React.FC = () => {
  return <div></div>;
};

export default Carsouel;
