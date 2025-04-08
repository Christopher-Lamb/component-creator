import React from "react";
const { getCSS, generateCSSMaps, addClassesToElements } = require("../../../utils/tailwind-to-css/index.js");

interface NumberedDivsProps {}

const testProps = {
  containerClass: "mt-32",
  wrapperClass: "max-w-[1000px] min-h-180 mx-auto bg-[#f1f1f1]  md:grid grid-cols-2 grid-rows-5 md:gap-y-4 md:gap-x-4 lg:gap-x-12",
  divArray: {
    objects: { div: { containerClass: "", numberContainerClass: "", numberClass: "", number: "", content: "", htmlContainerClass: "", h2Class: "", pClass: "" } },
    array: [
      {
        containerClass: "bg-blue-200 row-span-2",
        numberContainerClass: "relative left-0",
        numberClass: "bg-stone-700 text-white size-21 block absolute rounded-full flex items-center justify-center text-[49px] shadow-[0_0_0_20px_100] shadow-white top-[-42px] left-[-25px]",
        number: "1",
        content:
          "<h2>Get in Touch</h2><p>Call us at (856) 412-1845 or fill out our online form to schedule a consultation. We can meet over the phone or through Zoom—whichever works best for you!</p>",
        htmlContainerClass: "px-15 py-16",
        h2Class: "text-[25px] md:text-[39px] font-bold leading-[1.2] ",
        pClass: "mt-2",
      },
      {
        containerClass: "bg-green-200 col-start-2 row-span-3",
        numberContainerClass: "relative",
        numberClass: "bg-stone-700 text-white size-21 block absolute rounded-full flex items-center justify-center text-[49px] shadow-[0_0_0_20px_100] shadow-white top-[-42px] right-[-25px]",
        number: "2",
        content:
          "<h2>Share Your Visions</h2><p>Tell us about the type of website you're looking for. We'll discuss the design, features, and overall goals to ensure your website aligns perfectly with your needs.</p>",
        htmlContainerClass: "px-15 py-16",
        h2Class: "text-[25px] md:text-[39px] font-bold leading-[1.2] ",
        pClass: "mt-2",
      },
      {
        containerClass: "relative bg-red-200 h-full col-start-1 row-span-4",
        numberContainerClass: "absolute h-full flex md:items-end top-[-42px] md:top-[42px] left-[-25px]",
        numberClass: "absolute bg-stone-700 text-white size-21 block rounded-full flex items-center justify-center text-[49px] shadow-[0_0_0_20px_100] shadow-white",
        number: "3",
        content:
          "<h2>Personalized Proposal</h2><p>We’ll present you with a customized plan for your website, including design concepts and hosting options, along with clear pricing for everything.</p>",
        htmlContainerClass: "px-15 py-16",
        h2Class: "text-[25px] md:text-[39px] font-bold leading-[1.2] ",
        pClass: "mt-2",
      },
      {
        containerClass: "relative bg-orange-200 row-span-3",
        numberContainerClass: "absolute h-full flex md:items-end top-[-42px] md:top-[42px] right-[67px]",
        numberClass: "bg-stone-700 text-white size-21 block absolute rounded-full flex items-center justify-center text-[49px] shadow-[0_0_0_20px_100] shadow-white",
        number: "4",
        content:
          "<h2>Bring Your Website to Life</h2><p>We’ll present you with a customized plan for your website, including design concepts and hosting options, along with clear pricing for everything.</p>",
        htmlContainerClass: "px-15 py-16",
        h2Class: "text-[25px] md:text-[39px] font-bold leading-[1.2] ",
        pClass: "mt-2",
      },
    ],
  },
};

interface DivType {
  number: string;
  htmlContainerClass: string;
  content: string;
  h2Class: string;
  pClass: string;
}

const NumberedDivs: React.FC<NumberedDivsProps> = (props) => {
  const {} = props;
  const { divArray, ...otherCSS } = testProps;

  const { array: divs } = divArray;

  const { cssString, css } = getCSS(otherCSS);

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["wrapperClass"]}>
        {divs.map((obj: DivType) => {
          const { content, number, ...otherCSS } = obj;

          const { cssString, css } = getCSS(otherCSS);
          const html = addClassesToElements(content, { h2: css["h2Class"], p: css["pClass"] });

          return (
            <div className={css["containerClass"]}>
              <div className={css["numberContainerClass"]}>
                <span className={css["numberClass"]}>{number}</span>
              </div>
              <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
              <div dangerouslySetInnerHTML={{ __html: html }} className={css["htmlContainerClass"]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NumberedDivs;
