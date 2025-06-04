import React from "react";
import { getCSS, AnimatedComponent, Card, AnimatedCard } from "./";
interface OpCardsProps {}

const testProps = {
  mainClass: "",
  animationArray: {
    objects: {
      animation: {
        animationContainerClass: "",
        animationClass: "",
        animationOffClass: "",
        animationSettingsArray: {
          objects: { threshold: { type: "threshold", value: "0.5" }, triggerOnce: { type: "triggerOnce", value: "true" }, invisible: { type: "invisible", value: "true" } },
          array: [],
        },
      },
    },
    array: [
      // {
      //   animationContainerClass: "",
      //   animationClass: "translate-y-[0%] opacity-100 transition duration-3000",
      //   animationOffClass: "translate-y-[100%] opacity-0",
      //   animationSettingsArray: {
      //     objects: { threshold: { type: "threshold", value: "0.5" }, triggerOnce: { type: "triggerOnce", value: "true" }, invisible: { type: "invisible", value: "true" } },
      //     array: [],
      //   },
      // },
    ],
  },
  containerClass: "",
  wrapperClass: "w-full flex justify-center",
  cardsArray: {
    objects: {
      card: {
        type: "card",
        containerClass: "relative h-one w-two bg-black overflow-hidden",
        wrapperClass: "w-full h-full",
        href: "",
        imageContainerClass: "absolute w-full h-full",
        imageClass: "",
        img: "",
        alt: "",
        htmlArray: {
          objects: {
            content: {
              type: "content",
              htmlContainerClass: "w-full h-full",
              htmlWrapperClass: "relative z-1 h-full w-full flex items-end opacity-50 hover:opacity-100 transition",
              content: "",
              htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
            },
          },
          array: [],
        },
      },
      "animated-card": {
        type: "animated-card",
        animationContainerClass: "",
        animationClass: "",
        animationOffClass: "",
        animationSettingsArray: {
          objects: { threshold: { type: "threshold", value: "0.5" }, triggerOnce: { type: "triggerOnce", value: "true" }, invisible: { type: "invisible", value: "true" } },
          array: [],
        },
        containerClass: "relative h-one w-two bg-black overflow-hidden",
        wrapperClass: "w-full h-full",
        href: "",
        imageContainerClass: "absolute w-full h-full",
        imageClass: "",
        img: "",
        alt: "",
        htmlArray: {
          objects: {
            content: {
              type: "content",
              htmlContainerClass: "w-full h-full",
              htmlWrapperClass: "relative z-1 h-full w-full flex items-end opacity-50 hover:opacity-100 transition",
              content: "",
              htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
            },
          },
          array: [],
        },
      },
    },
    array: [
      {
        type: "animated-card",
        animationContainerClass: "",
        animationClass: "transition duration-1200 delay-200 translate-y-[0]",
        animationOffClass: "translate-y-[12rem]",
        animationSettingsArray: { objects: {}, array: [{ type: "invisible", value: "false" }] },
        containerClass: "relative h-one w-two bg-orange-600 overflow-hidden",
        wrapperClass: "w-full h-full",
        href: "",
        imageContainerClass: "absolute w-full h-full",
        imageClass: "",
        img: "flower.jpg",
        alt: "",
        htmlArray: {
          objects: {
            content: {
              type: "content",
              htmlContainerClass: "w-full h-full",
              htmlWrapperClass: "relative z-1 h-full w-full flex items-end opacity-50 hover:opacity-100 transition",
              content: "",
              htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
            },
          },
          array: [
            {
              type: "content",
              htmlContainerClass: "w-full h-full",
              htmlWrapperClass: "relative z-1 h-full w-full flex items-end opacity-50 hover:opacity-100 transition",
              content: "<h2>Wumbing</h2>",
              htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [{ elName: "h2", elClass: "text-white block bg-black w-full px-4 py-2 text-5" }] },
            },
          ],
        },
      },
      {
        type: "card",
        containerClass: "relative h-one w-two bg-black overflow-hidden",
        wrapperClass: "w-full h-full",
        href: "/too-the-mart",
        imageContainerClass: "absolute w-full h-full",
        imageClass: "",
        img: "palm_trees.jpg",
        alt: "",
        htmlArray: {
          objects: {
            content: {
              type: "content",
              htmlContainerClass: "",
              htmlWrapperClass: "relative z-1",
              content: "",
              htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [{ elName: "h2", elClass: "text-white block bg-black" }] },
            },
          },
          array: [
            {
              type: "content",
              htmlContainerClass: "w-full h-full",
              htmlWrapperClass: "relative z-1 h-full w-full flex items-end opacity-50 hover:opacity-100 transition",
              content: "<h2>Plumbing</h2>",
              htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [{ elName: "h2", elClass: "text-white block bg-black w-full px-4 py-2 text-5" }] },
            },
          ],
        },
      },
      {
        type: "animated-card",
        animationContainerClass: "",
        animationClass: "transition duration-1200 translate-y-[0]",
        animationOffClass: "translate-y-[15rem]",
        animationSettingsArray: {
          objects: {},
          array: [
            { type: "invisible", value: "true" },
            { type: "threshold", value: "0.99" },
            { type: "triggerOnce", value: "true" },
          ],
        },
        containerClass: "relative h-one w-two bg-blue-500 overflow-hidden",
        wrapperClass: "w-full h-full",
        href: "",
        imageContainerClass: "absolute w-full h-full",
        imageClass: "",
        img: "hawaii.jpg",
        alt: "",
        htmlArray: {
          objects: {
            content: {
              type: "content",
              htmlContainerClass: "w-full h-full",
              htmlWrapperClass: "relative z-1 h-full w-full flex items-end opacity-50 hover:opacity-100 transition",
              content: "",
              htmlStylesArray: { objects: { el: { elName: "", elClass: "" } }, array: [] },
            },
          },
          array: [],
        },
      },
    ],
  },
};

const OpCards: React.FC<OpCardsProps> = (props) => {
  const {} = props;
  const { animationArray, cardsArray, ...otherCSS } = testProps;

  const { array: animation } = animationArray as any;

  const { cssString, css } = getCSS(otherCSS);

  const { array: cards } = cardsArray as any;

  const output = (
    <div className={css["mainClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["containerClass"]}>
        <div className={css["wrapperClass"]}>
          {/* Cards */}
          {cards.map((cardProps: any, i: number) => {
            const { type, ...otherCardProps } = cardProps;
            switch (type) {
              case "card":
                return <Card key={i} {...cardProps} />;
              case "animated-card":
                return <AnimatedCard key={i} {...otherCardProps} />;
              default:
                return;
            }
          })}
        </div>
      </div>
    </div>
  );

  // Handle If there is an animation
  if (animation.length > 0) {
    const [animationObj] = animation;
    const { animationSettingsArray, ...otherAnimationCSS } = animationObj;

    const { cssString: animationCssString, css: aniCSS } = getCSS(otherAnimationCSS);

    const { array: animationSettings } = animationSettingsArray as any;
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
      <AnimatedComponent className={aniCSS["animationContainerClass"]} animationClassName={aniCSS["animationClass"]} animationOffClassName={aniCSS["animationOffClass"]} {...settings}>
        <style type="text/css" dangerouslySetInnerHTML={{ __html: animationCssString || "" }} />
        {output}
      </AnimatedComponent>
    );
  } else {
    return output;
  }
};

export default OpCards;
