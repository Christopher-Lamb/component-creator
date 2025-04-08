import React, { useState } from "react";
import { getCSS } from "../";
import "./Burger.css";

interface BurgerProps {
  onClick: () => void;
  className?: string;
  text?: React.ReactNode;
}

const Burger: React.FC<BurgerProps> = (props) => {
  const { onClick, text, ...otherCSS } = props;
  const [isActive, setIsActive] = useState(false); // Local state for animation

  const { cssString, css } = getCSS(otherCSS);
  const burgerToggle = () => {
    setIsActive((prev) => !prev); // Toggle state
    onClick();
  };

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <button aria-label="Open navigation menu" className={`burger-grid ${css["burgerGridClass"]}`} onClick={burgerToggle}>
        <div className={`burger-container ${css["burgerContainerClass"]} ${isActive ? "burger-change" : ""}`}>
          <div className={"burger-bar-1 " + css["burgerBarClass"]}></div>
          <div className={"burger-bar-2 " + css["burgerBarClass"]}></div>
          <div className={"burger-bar-3 " + css["burgerBarClass"]}></div>
        </div>
        <p className={`burger-text ${css["textClass"]}`}>{text}</p>
      </button>
    </div>
  );
};

export default Burger;
