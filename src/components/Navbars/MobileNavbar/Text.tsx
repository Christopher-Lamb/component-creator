import React from "react";
import { getCSS } from ".";

interface TextProps {
  containerClass: string;
  textClass: string;
  text: string;
}

/**
 * Text Component
 *
 * Description
 *
 * Props:
 * -
 *
 * @param {TextProps} props - The props for the component.
 */

const Text: React.FC<TextProps> = (props) => {
  const { text, ...otherCSS } = props;
  const { cssString, css } = getCSS(otherCSS);
  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <span className={css["textClass"]}>{text}</span>
    </div>
  );
};

export default Text;
