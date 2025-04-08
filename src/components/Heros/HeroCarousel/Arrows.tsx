import React, { useState, useCallback, useEffect } from "react";
import { getCSS, SvgComponent } from ".";

interface ArrowsProps {
  svg: string;
  onPrevClick: () => void;
  onNextClick: () => void;
  iconPrevClass: string;
  iconNextClass: string;
}

const Arrows: React.FC<ArrowsProps> = (props) => {
  const { svg, onPrevClick, onNextClick, iconNextClass, iconPrevClass, ...otherCSS } = props;
  const { cssString, css } = getCSS(otherCSS);

  const onPrevButtonClick = () => {
    onPrevClick();
  };

  const onNextButtonClick = () => {
    onNextClick();
  };

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["wrapperClass"]}>
        <button type="button" className={css["iconButtonClass"]} onClick={onPrevButtonClick}>
          <SvgComponent svgString={svg} className={iconPrevClass} />
        </button>
        <button type="button" className={css["iconButtonClass"]} onClick={onNextButtonClick}>
          <SvgComponent svgString={svg} className={iconNextClass} />
        </button>
      </div>
    </div>
  );
};

export default Arrows;
