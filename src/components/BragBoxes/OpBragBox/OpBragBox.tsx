import React from "react";
import { CloudinaryImage, getCSS, Content, AnimatedContent } from "./";

interface OpBragBoxProps {}

const testProps = {
  mainClass: "",
  containerClass: "relative bg-stone-50 h-two overflow-hidden",
  imageClass: "h-full",
  imgBg: "hawaii.jpg",
  wrapperClass: "relative flex items-center h-full",
  bragItemContainerClass: "grid grid-cols-4 w-full max-w-400 mx-auto",
  bragItemArray: {
    objects: {
      content: {
        type: "content",
        htmlContainerClass: "",
        htmlWrapperClass: "",
        content: "",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
      },
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
          objects: {
            threshold: { type: "threshold", value: "0.5" },
            triggerOnce: { type: "triggerOnce", value: "true" },
            invisible: { type: "invisible", value: "true" },
          },
          array: [],
        },
      },
    },
    array: [
      {
        type: "content",
        htmlContainerClass: "bg-orange-400",
        htmlWrapperClass: "",
        content: "<h1>Wake From A Dream</h1><p>Go to sleep without her</p>",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
      },
      {
        type: "animated-content",
        htmlContainerClass: "",
        htmlWrapperClass: "",
        content: "<h1>SomeText</h1>",
        htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
        animationContainerClass: "transition duration-2000",
        animationClass: "",
        animationOffClass: "translate-x-[-20%]",
        animationSettingsArray: {
          objects: {
            threshold: { type: "threshold", value: "0.5" },
            triggerOnce: { type: "triggerOnce", value: "true" },
            invisible: { type: "invisible", value: "true" },
          },
          array: [],
        },
      },
    ],
  },
};

const OpBragBox: React.FC<OpBragBoxProps> = (props) => {
  const {} = props;
  const { imgBg, bragItemArray, ...otherCSS } = testProps;
  const { cssString, css } = getCSS(otherCSS);

  const { array: bragItems } = bragItemArray as any;

  return (
    <div className={css["mainClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />

      <div className={css["containerClass"]}>
        {imgBg && (
          <div className="absolute w-full h-full">
            <CloudinaryImage publicId={imgBg} className={css["imageClass"]} />
          </div>
        )}
        <div className={css["wrapperClass"]}>
          <div className={css["bragItemContainerClass"]}>
            {bragItems.map((bragProps: any, i: number) => {
              const { type } = bragProps;
              switch (type) {
                case "content":
                  return <Content key={i} {...bragProps} />;
                case "animated-content":
                  return <AnimatedContent key={i} {...bragProps} />;
                default:
                  return;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpBragBox;
