import React from "react";
const { getCSS, generateCSSMaps, addClassesToElements } = require("../../../utils/tailwind-to-css/");
import { CircleWithNumber } from "./";
interface HowItWorksLinearProps {}

/**
 * HowItWorksLinear Component
 *
 * Description
 *
 * Props:
 * -
 *
 * @param {HowItWorksLinearProps} props - The props for the component.
 */
interface TextElement {
  content: string;
}

const testArr: TextElement[] = [
  {
    content:
      "<h2>Step 1: Get in Touch</h2><p>Call us at (856) 412 1845 or fill out our online form to schedule a consultation. We can meet over the phone or through Zoom—whichever works best for you!</p>",
  },
  {
    content:
      "<h2>Share Your Visions</h2><p>Tell us about the type of website you're looking for. We'll discuss the design, features, and overall goals to ensure your website aligns perfectly with your needs.</p>",
  },
  {
    content: "<h2>Personalized Proposal</h2><p>We’ll present you with a customized plan for your website, including design concepts and hosting options, along with clear pricing for everything.</p>",
  },
  {
    content:
      "<h2>Bring Your Website to Life</h2><p>Once everything is finalized, we’ll begin creating your website. We’ll keep you in the loop every step of the way to ensure it meets your expectations.</p>",
  },
];

const props = {
  containerClass: "bg-[#f7f7f7] py-26",
  wrapperClass: "max-w-7xl mx-auto",
  titleClass: "text-large",
  title: "",
  textContainerClass: "ml-4 grid gap-4 mt-4",
  textWrapperClass: "grid grid-cols-2 max-w-5xl",
  htmlContainerClass: "w-full ",
  circleContainerClass: "flex items-center justify-center",
  circleClass: "size-10 text-stone-800 relative z-1 rounded-full bg-stone-50 border-2 border-stone-800 flex items-center justify-center",
  lineClass: "w-0 border-r-2 border-dashed border-stone-800",
  elementsArray: { objects: { element: { content: "" } }, array: [...testArr] },
  h1Class: "",
  h2Class: "text-med",
  h3Class: "",
  pClass: "mt-1",
  aClass: "",
  strongClass: "",
  ulClass: "",
  liClass: "",
};

const HowItWorksLinear: React.FC<HowItWorksLinearProps> = () => {
  const { title, ...otherCSS } = props;

  const { cssString, css } = getCSS(otherCSS);

  const array = props.elementsArray.array;

  return (
    <section className={css["containerClass"]}>
      <div className={css["wrapperClass"]}>
        <style dangerouslySetInnerHTML={{ __html: cssString }}></style>
        <h1 className={css["titleClass"]}>{title}</h1>
        {/* Content Array */}
        <div className={css["textContainerClass"]}>
          {array.map(({ content }, i) => {
            const html = addClassesToElements(content, {
              h1: css["h1Class"],
              h2: css["h2Class"],
              h3: css["h3Class"],
              p: css["pClass"],
              aClass: css["aClass"],
              strongClass: css["strongClass"],
              ulClass: css["ulClass"],
              liClass: css["liClass"],
            });
            let lineCSS = "";

            //Handle CSS connecting circles
            switch (i) {
              case 0:
                lineCSS = "top-1/2 h-full";
                break;
              case array.length - 1:
                lineCSS = "";
                break;
              default:
                lineCSS = "h-full top-1/2";
                break;
            }

            return (
              <div className={css["textWrapperClass"]}>
                <div key={i} className={css["htmlContainerClass"]} dangerouslySetInnerHTML={{ __html: html }}></div>

                <div className={"relative " + css["circleContainerClass"]}>
                  <CircleWithNumber index={i + 1} circleClass={css["circleClass"]} />
                  <div className={`absolute ${css["lineClass"]} ${lineCSS}`}></div>
                </div>
              </div>
            );
          })}
        </div>
        {/*  */}
        <div></div>
      </div>
    </section>
  );
};

export default HowItWorksLinear;
