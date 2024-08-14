import React, { useEffect } from "react";
import CloudinaryImage from "../../../components/CloudinaryImage";

interface LambHeroProps {}

/**
 * LambHero Component
 *
 *
 * @param {LambHeroProps} props - The props for the component.
 */

const LambHero: React.FC<LambHeroProps> = () => {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      const layer2 = document.getElementById("LambHeroBG") || null;
      if (!layer2) return;
      layer2.style.transform = `translateY(${scrollPosition * 0.15}px)`;
    });
  });

  return (
    // containerClass
    <div className="relative h-[630px] lg:h-[700px] w-full overflow-hidden bg-blue-100">
      <div id="LambHeroBG" className="absolute w-full h-full z-[1]">
        <CloudinaryImage publicId="house.jpg" className="absolute object-cover w-full top-[-20px] lg:top-[-300px] h-[700px] lg:h-[1000px]" />
      </div>
      <div className="w-full h-full relative z-[3] flex items-center justify-center">
        {/* Hero content ( this is where the animation would wrap ) */}
        {/* contentContainerClass */}
        <div className="relative text-white max-w-four w-full flex flex-col items-center">
          <span className="text-small18 lg:text-med">Lamb HVAC</span>
          <h1 className="kanit weight-500 text-center text-large lg:text-one">Expert HVAC Solutions at Your Doorstep</h1>
          <p className="text-small18 lg:text-med px-4 md:px-0 mt-2 text-center max-w-four">
            With LambHVAC, experience unmatched comfort through precision climate control – efficient, reliable, and tailored to your needs.{" "}
          </p>
          {/* buttonContainerClass */}
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center mt-2xsmall">
            {/* button1Class */}
            <a
              // button1Href
              href="/contact/"
              className="py-2xsmall px-xsmall rounded bg-primary text-med text-white font-semibold mr-xsmall hover:brightness-150 hover:translate-y-[-1px] shadow-md shadow-[#2458a6ad]"
            >
              {/* button1 */}
              Contact Us
            </a>
            {/* button2Class */}
            <a
              // button2Class
              href="/contact/request-service"
              className="py-[10px] px-xsmall rounded text-med text-white border border-[5px] box-border font-semibold mr-xsmall hover:brightness-150 hover:translate-y-[-1px] shadow-md shadow-[rgba(255,255,255,.4)]"
            >
              {/* button2 */}
              Request Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LambHero;
