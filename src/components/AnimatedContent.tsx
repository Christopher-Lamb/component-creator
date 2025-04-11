import React from "react";
import AnimatedComponent from "./AnimatedComponent";
import Content from "./Content";
const { getCSS } = require("../utils/tailwind-to-css/index");

interface AnimatedContentProps {
  htmlContainerClass: string;
  htmlWrapperClass: string;
  content: string;
  htmlStylesArray: string;
  animationContainerClass: string;
  animationClass: string;
  animationOffClass: string;
  animationSettingsArray: any;
}

//ex:
const obj = {
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
};

const AnimatedContent: React.FC<AnimatedContentProps> = (props) => {
  const { htmlContainerClass, htmlWrapperClass, htmlStylesArray, content, animationSettingsArray, ...otherCSS } = props;

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
    return acc;
  }, {});

  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <AnimatedComponent animationClassName={css["animationClass"]} className={css["animationContainerClass"]} animationOffClassName={css["animationOffClass"]} {...settings}>
        <Content {...{ htmlContainerClass, htmlWrapperClass, htmlStylesArray, content }} />
      </AnimatedComponent>
    </>
  );
};

export default AnimatedContent;
