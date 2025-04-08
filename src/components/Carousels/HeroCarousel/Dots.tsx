import React, { useCallback, useState, useEffect } from "react";
import { getCSS } from ".";
import { EmblaCarouselType } from "embla-carousel";

interface DotsProps {
  emblaApi: EmblaCarouselType | undefined;
}

const Dots: React.FC<DotsProps> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const { emblaApi, ...otherCSS } = props;

  const { cssString, css } = getCSS(otherCSS);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      // if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["wrapperClass"]}>
        <div className={css["dotContainerClass"]}>
          {scrollSnaps.map((num, i) => {
            return <button type="button" onClick={() => onDotButtonClick(i)} className={`${css["dotClass"]} ${selectedIndex === i ? css["dotSelectedClass"] : ""}`}></button>;
          })}
        </div>
      </div>
    </div>
  );
};

type PropType = React.ComponentPropsWithRef<"button">;

export const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

export default Dots;
