import React from "react";

const { getCSS } = require("../../../utils/tailwind-to-css/index.js");

import AnimatedContent from "../../AnimatedContent";
import AnimatedImage from "../../AnimatedImage";
import Image from "../../Image";
import Content from "../../Content";

interface OpPictureTextProps {}

const testProps = {
  mainClass: "",
  containerClass: "",
  wrapperClass: "grid grid-cols-2 gap-x-8",
  leftContainerClass: "",
  leftArray: {
    objects: {
      content: {
        type: "content",
        htmlContainerClass: "",
        htmlWrapperClass: "",
        content: "",
        htmlStylesArray: {
          objects: { el: { elName: "", elClass: "" } },
          array: [],
        },
      },
      image: {
        type: "image",
        containerClass: "",
        wrapperClass: "",
        imageClass: "",
        img: "",
        alt: "",
      },
      "animated-content": {
        type: "animated-content",
        htmlContainerClass: "",
        htmlWrapperClass: "",
        content: "",
        htmlStylesArray: {
          objects: { el: { elName: "", elClass: "" } },
          array: [],
        },
        animationContainerClass: "transition duration-2000 relative",
        animationClass: "translate-x-[0px] opacity-100",
        animationOffClass: "translate-x-[-50%] opacity-10",
        animationSettingsArray: {
          objects: {
            threshold: { type: "threshold", value: "0.5" },
            triggerOnce: { type: "triggerOnce", value: "true" },
            invisible: { type: "invisible", value: "true" },
          },
          array: [],
        },
      },
      "animated-image": {
        type: "animated-image",
        animationContainerClass: "transition duration-2000 relative",
        animationClass: "translate-x-[0px] opacity-100",
        animationOffClass: "translate-x-[-50%] opacity-10",
        animationSettingsArray: {
          objects: {
            threshold: { type: "threshold", value: "0.5" },
            triggerOnce: { type: "triggerOnce", value: "true" },
            invisible: { type: "invisible", value: "true" },
          },
          array: [],
        },
        imageContainerClass: "",
        imageWrapperClass: "",
        imageClass: "",
        img: "",
        alt: "",
      },
    },
    array: [
      {
        type: "animated-image",
        animationContainerClass: "transition duration-2000 relative",
        animationClass: "translate-x-[0px] opacity-100",
        animationOffClass: "translate-x-[-50%] opacity-10",
        animationSettingsArray: {
          objects: {
            threshold: { type: "threshold", value: "0.5" },
            triggerOnce: { type: "triggerOnce", value: "true" },
            invisible: { type: "invisible", value: "true" },
          },
          array: [
            { type: "invisible", value: "false" },
            { type: "threshold", value: "0.0" },
            { type: "triggerOnce", value: "false" },
          ],
        },
        imageContainerClass: "",
        imageWrapperClass: "",
        imageClass: "",
        img: "ocean_edge.jpg",
        alt: "",
      },
      {
        type: "animated-content",
        animationContainerClass: "transition duration-2000 relative",
        animationClass: "translate-x-[0px] opacity-100",
        animationOffClass: "translate-x-[-50%] opacity-10",
        htmlContainerClass: "",
        htmlWrapperClass: "",
        content:
          "<h1>This is America</h1><p>Mollit esse non dolor cupidatat exercitation ad quis nisi tempor exercitation incididunt reprehenderit et. Magna pariatur consequat consectetur enim ipsum culpa irure aliquip. Voluptate Lorem fugiat nisi dolore anim fugiat excepteur quis consectetur irure aliqua cillum. Esse duis veniam quis id officia anim exercitation consequat aliquip do nisi.</p>",
        htmlStylesArray: {
          objects: { el: { elName: "", elClass: "" } },
          array: [
            { elName: "h1", elClass: "text-12" },
            { elName: "p", elClass: "text-4.5" },
          ],
        },
        animationSettingsArray: {
          objects: {
            threshold: { type: "threshold", value: "0.5" },
            triggerOnce: { type: "triggerOnce", value: "true" },
            invisible: { type: "invisible", value: "true" },
          },
          array: [
            { type: "invisible", value: "false" },
            { type: "threshold", value: "0.2" },
            { type: "triggerOnce", value: "false" },
          ],
        },
      },
    ],
  },
  rightContainerClass: "",
  rightArray: {
    objects: {
      content: {
        type: "content",
        htmlContainerClass: "",
        htmlWrapperClass: "",
        content: "",
        htmlStylesArray: {
          objects: { el: { elName: "", elClass: "" } },
          array: [],
        },
      },
      image: {
        type: "image",
        containerClass: "",
        wrapperClass: "",
        imageClass: "",
        img: "",
        alt: "",
      },
      "animated-content": {
        type: "animated-content",
        animationContainerClass: "transition duration-2000 relative",
        animationClass: "translate-x-[0px] opacity-100",
        animationOffClass: "translate-x-[-50%] opacity-10",
        htmlContainerClass: "",
        htmlWrapperClass: "",
        content: "",
        htmlStylesArray: {
          objects: { el: { elName: "", elClass: "" } },
          array: [],
        },
        animationSettingsArray: {
          objects: {
            threshold: { type: "threshold", value: "0.5" },
            triggerOnce: { type: "triggerOnce", value: "true" },
            invisible: { type: "invisible", value: "true" },
          },
          array: [],
        },
      },
      "animated-image": {
        type: "animated-image",
        animationContainerClass: "transition duration-2000 relative",
        animationClass: "translate-x-[0px] opacity-100",
        animationOffClass: "translate-x-[-50%] opacity-10",
        animationSettingsArray: {
          objects: {
            threshold: { type: "threshold", value: "0.5" },
            triggerOnce: { type: "triggerOnce", value: "true" },
            invisible: { type: "invisible", value: "true" },
          },
          array: [],
        },
        imageContainerClass: "",
        imageWrapperClass: "",
        imageClass: "",
        img: "",
        alt: "",
      },
    },
    array: [
      {
        type: "animated-content",
        animationContainerClass: "transition duration-2000 relative",
        animationClass: "translate-x-[0px] opacity-100",
        animationOffClass: "translate-x-[50%] opacity-10",
        htmlContainerClass: "",
        htmlWrapperClass: "",
        content:
          "<h1>This is America</h1><p>Mollit esse non dolor cupidatat exercitation ad quis nisi tempor exercitation incididunt reprehenderit et. Magna pariatur consequat consectetur enim ipsum culpa irure aliquip. Voluptate Lorem fugiat nisi dolore anim fugiat excepteur quis consectetur irure aliqua cillum. Esse duis veniam quis id officia anim exercitation consequat aliquip do nisi.</p>",
        htmlStylesArray: {
          objects: { el: { elName: "", elClass: "" } },
          array: [
            { elName: "h1", elClass: "text-12" },
            { elName: "p", elClass: "text-4.5" },
          ],
        },
        animationSettingsArray: {
          objects: {
            threshold: { type: "threshold", value: "0.5" },
            triggerOnce: { type: "triggerOnce", value: "true" },
            invisible: { type: "invisible", value: "true" },
          },
          array: [
            { type: "invisible", value: "false" },
            { type: "threshold", value: "0.0" },
            { type: "triggerOnce", value: "false" },
          ],
        },
      },
      {
        type: "animated-image",
        animationContainerClass: "transition duration-2000 relative",
        animationClass: "translate-x-[0px] opacity-100",
        animationOffClass: "translate-x-[50%] opacity-10",
        animationSettingsArray: {
          objects: {
            threshold: { type: "threshold", value: "0.5" },
            triggerOnce: { type: "triggerOnce", value: "true" },
            invisible: { type: "invisible", value: "true" },
          },
          array: [
            { type: "invisible", value: "false" },
            { type: "threshold", value: "0.0" },
            { type: "triggerOnce", value: "false" },
          ],
        },
        imageContainerClass: "",
        imageWrapperClass: "",
        imageClass: "",
        img: "ocean_edge.jpg",
        alt: "",
      },
    ],
  },
};

const OpPictureText: React.FC<OpPictureTextProps> = (props) => {
  const {} = props;
  const { leftArray, rightArray, ...otherCSS } = testProps;

  const { array: leftItems } = leftArray as any;
  const { array: rightItems } = rightArray as any;

  const { cssString, css } = getCSS(otherCSS);

  return (
    <div className={css["mainClass"]}>
      <style
        type="text/css"
        dangerouslySetInnerHTML={{ __html: cssString || "" }}
      />
      <div className={css["containerClass"]}>
        <div className={css["wrapperClass"]}>
          <div className={css["leftContainerClass"]}>
            {leftItems.map((component: any, i: number) => {
              const { type, ...componentProps } = component;
              switch (type) {
                case "content":
                  return <Content key={i} {...componentProps} />;
                case "image":
                  return <Image key={i} {...componentProps} />;
                case "animated-content":
                  return <AnimatedContent key={i} {...componentProps} />;
                case "animated-image":
                  return <AnimatedImage key={i} {...componentProps} />;
                default:
                  return <></>;
              }
            })}
          </div>
          <div className={css["rightContainerClass"]}>
            {rightItems.map((component: any, i: number) => {
              const { type, ...componentProps } = component;
              switch (type) {
                case "content":
                  return <Content key={i} {...componentProps} />;
                case "image":
                  return <Image key={i} {...componentProps} />;
                case "animated-content":
                  return <AnimatedContent key={i} {...componentProps} />;
                case "animated-image":
                  return <AnimatedImage key={i} {...componentProps} />;
                default:
                  return <></>;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpPictureText;
