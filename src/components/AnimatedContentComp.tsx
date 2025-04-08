import React from "react";
import AnimatedComponent from "./AnimatedComponent";
import ContentComp from "./ContentComp";
const { getCSS } = require("../utils/tailwind-to-css/index");

interface AnimatedContentCompProps {
  htmlContainerClass: string;
  content: string;
  htmlStylesArray: string;
  animationContainerClass: string;
  animationClass: string;
  threshold: string;
  triggerOnce: string;
  invisible: string;
  animationSettingsArray: any;
}

const testProps = {
  animationSettingsArray: {
    objects: { threshold: { type: "threshold", value: "0.5" }, triggerOnce: { type: "triggerOnce", value: "true" }, invisible: { type: "invisible", value: "true" } },
    array: [],
  },
};

const AnimatedContentComp: React.FC<AnimatedContentCompProps> = (props) => {
  const { htmlContainerClass, htmlStylesArray, content, ...otherCSS } = props;
  const { animationSettingsArray } = testProps;

  const { array: animationSettings } = animationSettingsArray as any;
  const { cssString, css } = getCSS(otherCSS);

  const settings = animationSettings.reduce((acc: Record<string, string | number | boolean>, { type, value }: { type: string; value: string }) => {
    switch (type) {
      case "threshold":
        const parseThreshold = parseFloat(value);
        acc["threshold"] = parseThreshold;
        break;
      default:
        if (["true", "false"].includes(value)) {
          const bool = value === "true";
          acc[type] = bool;
        } else {
          acc[type] = value;
        }
    }
  }, {});

  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <AnimatedComponent animationClassName={css["animationClass"]} className={css["animationContainerClass"]} {...settings}>
        <ContentComp {...{ htmlContainerClass, htmlStylesArray, content }} />
      </AnimatedComponent>
    </>
  );
};

export default AnimatedContentComp;
