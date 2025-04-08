import React from "react";
import SvgComponent from "../../SvgComponent";
const { getCSS, generateCSSMaps } = require("../../../utils/tailwind-to-css/index.js");

interface InfoBoxesWSVGProps {}

const testProps = {
  containerClass: "flex items-center justify-center",
  wrapperClass: "flex gap-4",
  titleContainerClass: "flex items-center gap-2",
  boxesArray: {
    objects: { box: { containerClass: "", href: "", iconClass: "", svg: "", titleClass: "", title: "", textClass: "", text: "" } },
    array: [
      {
        containerClass: "w-[370px] h-56 bg-black text-white rounded-lg px-11 py-8",
        href: "tel:+15555555555",
        iconClass: "size-8 scale-x-[-1] transition",
        svg: "<svg stroke='currentColor' fill='currentColor' stroke-width='0' viewBox='0 0 512 512' height='1em' width='1em'  xmlns='http://www.w3.org/2000/svg'>  <path d='M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z'></path></svg>",
        titleClass: "block text-med font-bold",
        title: "(555) 555-5555",
        textClass: "block mt-2",
        text: "Prefer to talk? Give us a call and let’s chat about your catering needs!",
      },
      {
        containerClass: "w-[360px] h-full bg-yellow-400 text-black rounded-lg px-11 py-8",
        href: "mailto:exmaple@gmail.com",
        iconClass: "size-10",
        svg: "<svg stroke='currentColor' fill='currentColor' stroke-width='0' viewBox='0 0 24 24' height='200px' width='200px'  xmlns='http://www.w3.org/2000/svg'>  <path fill='none' d='M0 0h24v24H0V0z'></path>  <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z'></path></svg>",
        titleClass: "block text-[24px] font-bold",
        title: "Example@gmail.com",
        textClass: "block mt-1",
        text: "Have a question or need a custom quote? Drop us an email—we’d love to hear from you!",
      },
    ],
  },
};

const InfoBoxesWSVG: React.FC<InfoBoxesWSVGProps> = (props) => {
  const {} = props;
  const { boxesArray, ...otherCSS } = testProps;
  const array = boxesArray.array;

  const { cssString, css } = getCSS(otherCSS);

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["wrapperClass"]}>
        {array.map((arrProps): any => {
          const { href, svg, title, text, iconClass, ...otherCSS } = arrProps;
          const { newCSSMap, namingMap: css2 } = generateCSSMaps(otherCSS);
          const { cssString, css } = getCSS(otherCSS);

          return (
            <a href={href}>
              <div className={css2["containerClass"]}>
                <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
                <div className={css["titleContainerClass"]}>
                  <SvgComponent svgString={svg} className={iconClass} />
                  <span className={`${css2["titleClass"]}`}>{title}</span>
                </div>
                <span className={`${css2["textClass"]}`}>{text}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default InfoBoxesWSVG;
