import React from "react";
import { getCSS } from ".";

interface NavTextProps {
  containerClass: string;
  textClass: string;
  text: string;
}

const NavText: React.FC<NavTextProps> = (props) => {
  const { text, ...otherCSS } = props;
  const { cssString, css } = getCSS(otherCSS);

  return (
    <a href="/" className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <span className={css["textClass"]}>{text}</span>
    </a>
  );
};

export default NavText;
