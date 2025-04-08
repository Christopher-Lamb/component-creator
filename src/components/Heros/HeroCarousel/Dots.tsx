import React, { useCallback, useState, useEffect } from "react";
import { getCSS } from ".";
import { EmblaCarouselType } from "embla-carousel";

interface DotsProps {
  emblaApi: EmblaCarouselType | undefined;
  slidesLength: number;
  index: number;
  onSelect: (index: number) => void;
}

const Dots: React.FC<DotsProps> = (props) => {
  const { emblaApi, slidesLength, onSelect, index, ...otherCSS } = props;
  const [dotIndex, setDotIndex] = useState<number>(0);

  const { cssString, css } = getCSS(otherCSS);

  const onDotButtonClick = (index: number) => {
    onSelect(index);
  };

  useEffect(() => {
    setDotIndex(index);
  }, [index]);

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["wrapperClass"]}>
        <div className={css["dotContainerClass"]}>
          {[...Array(slidesLength).keys()].map((i) => {
            return <button key={i} type="button" onClick={() => onDotButtonClick(i)} className={`${css["dotClass"]} ${dotIndex === i ? css["dotSelectedClass"] : ""}`}></button>;
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
