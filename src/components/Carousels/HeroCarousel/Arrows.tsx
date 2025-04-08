import React, { useState, useCallback, useEffect } from "react";
import { getCSS, SvgComponent } from ".";
import { EmblaCarouselType } from "embla-carousel";

interface ArrowsProps {
  svg: string;
  emblaApi: EmblaCarouselType;
}

const Arrows: React.FC<ArrowsProps> = (props) => {
  const { svg, emblaApi, ...otherCSS } = props;
  const { cssString, css } = getCSS(otherCSS);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["wrapperClass"]}>
        <button type="button" className={css["iconButtonClass"]} onClick={onPrevButtonClick}>
          <SvgComponent svgString={svg} className={css["iconClass"]} />
        </button>
        <button type="button" className={css["iconButtonClass"]} onClick={onNextButtonClick}>
          <SvgComponent svgString={svg} className={`${css["iconClass"]} scale-x-[-1]`} />
        </button>
      </div>
    </div>
  );
};

export default Arrows;
