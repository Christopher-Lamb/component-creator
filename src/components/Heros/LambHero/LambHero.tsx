import React, { useEffect } from "react";
import CloudinaryImage from "../../CloudinaryImage";
import AnimatedComponent from "../../AnimatedComponent";
const { getCSS, generateCSSMaps, addClassesToElements } = require("../../../utils/tailwind-to-css/index.js");

interface LambHeroProps {
  button1: string;
  button1Href: string;
  button2: string;
  button2Href: string;
  imgBg: string;
  content: string;
  invisibleBool: boolean;
}

/**
 * LambHero Component
 *
 *
 * @param {LambHeroProps} props - The props for the component.
 */
const testProps = {
  containerClass: "relative h-[630px] lg:h-[700px] w-full overflow-hidden bg-blue-100",
  img: "house.jpg",
  bgImageClass: "absolute object-cover w-full top-[-20px] lg:top-[-300px] h-[700px] lg:h-[1000px]",
  textContainerClass: "relative text-white max-w-four w-full flex flex-col items-center",
  animationClass: "",
  invisibleBool: true,
  htmlContainerClass: "",
  content: "",
  h1Class: "kanit weight-500 text-center text-large lg:text-one",
  h2Class: "text-small18 lg:text-med px-4 md:px-0 mt-2 text-center max-w-four",
  h3Class: "",
  pClass: "text-small18 lg:text-med",
  buttonContainerClass: "flex flex-col md:flex-row items-center gap-4 justify-center mt-2xsmal",
  buttonsArray: {
    objects: { button: { buttonClass: "", text: "", href: "" } },
    array: [
      { buttonClass: "py-2xsmall px-xsmall rounded bg-primary text-med text-white font-semibold mr-xsmall hover:brightness-150 hover:translate-y-[-1px] shadow-md", text: "Contact", href: "" },
      {
        buttonClass: "py-[10px] px-xsmall rounded text-med text-white border border-5 font-semibold mr-xsmall hover:brightness-150 hover:translate-y-[-1px] shadow-md",
        text: "Request",
        href: "",
      },
    ],
  },
};

const LambHero: React.FC<LambHeroProps> = (props) => {
  const {} = props;
  const { img, content, invisibleBool, buttonsArray, ...otherCSS } = testProps;

  const { cssString, css } = getCSS(otherCSS);
  const html = addClassesToElements(content, css);

  const { array: buttons } = buttonsArray;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const layer2 = document.getElementById("LambHeroBG");
      if (!layer2) return;
      layer2.style.transform = `translateY(${scrollPosition * 0.15}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // containerClass
    <div className={css["containerClass"]}>
      <style dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div id="LambHeroBG" className="absolute w-full h-full z-[1]">
        {/* bgImageClass */}
        <CloudinaryImage publicId={img} className={css["bgImageClass"]} />
      </div>
      <div className="w-full h-full relative z-[3] flex items-center justify-center">
        {/* Hero content ( this is where the animation would wrap ) */}
        {/* textContainerClass */}
        <div className={css["textContainerClass"]}>
          <AnimatedComponent className="w-full h-full" animationClassName={css["animationClass"]} invisible={invisibleBool}>
            <div className={css["htmlContainerClass"]} dangerouslySetInnerHTML={{ __html: html }}></div>
          </AnimatedComponent>

          {/* buttonContainerClass */}
          {buttons.length > 0 && (
            <div className={css["buttonContainerClass"]}>
              {/* button1Class */}
              {buttons.map(({ buttonClass, href, text }: { buttonClass: string; href: string; text: string }, i: number) => {
                const { cssString, css } = getCSS({ buttonClass });
                return (
                  <React.Fragment key={i}>
                    <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString }} />
                    <a href={href} className={css["buttonClass"]}>
                      {text}
                    </a>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LambHero;
