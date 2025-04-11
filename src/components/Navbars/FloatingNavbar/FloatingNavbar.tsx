import React, { useState, useEffect } from "react";
import { getCSS, NavText, ImageLogo, ImageLogoText, NavContent, Nav, NavCustom } from ".";

interface FloatingNavbarProps {
  routes: any;
}

const testProps = {
  mainClass: "w-full",
  containerClass: "fixed translate-y-[-100%] top-0 w-full z-9003",
  containerAnimationClass: "translate-y-[0px] transition duration-400",
  scrollHeight: "100",
  wrapperClass: "bg-stone-500 h-20 max-w-[1200px] grid grid-cols-2 mx-auto",
  leftContainerClass: "h-full",
  leftArray: {
    objects: {
      text: { type: "text", containerClass: "", textClass: "", text: "" },
      image: { type: "image", containerClass: "", logoClass: "", imgLogo: "" },
      imageText: { type: "imageText", containerClass: "", logoClass: "", imgLogo: "", textClass: "", text: "" },
    },
    array: [{ type: "text", containerClass: "text-white h-full flex items-center", textClass: "font-bold", text: "Crisp Company" }],
  },
  rightArray: {
    objects: {
      content: { type: "content", containerClass: "", htmlContainerClass: "", content: "", pClass: "", aClass: "" },
      nav: {
        type: "nav",
        containerClass: "h-full",
        navClass: "w-full flex gap-3 h-full items-end",
        linkClass: "block text-white font-semibold py-1",
        sublinkContainerClass: "h-full border-b border-x flex flex-col min-w-40",
        sublinkClass: "pl-1 pb-1 hover:bg-stone-300 px-2 ",
        timing: "0.1s",
      },
      "nav-custom": {
        type: "nav-custom",
        containerClass: "h-full",
        navClass: "w-full flex gap-3 h-full items-end",
        linkClass: "block text-white font-semibold py-1",
        sublinkContainerClass: "h-full flex flex-col bg-blue-300 min-w-40",
        sublinkClass: "pl-1 pb-1 hover:bg-stone-300",
        routesArray: {
          objects: { route: { name: "", path: "", sublinkArray: { objects: { sublink: { name: "", path: "" } }, array: [] } } },
          array: [],
        },
        timing: ".3s",
      },
    },
    array: [
      {
        type: "nav",
        containerClass: "h-full",
        navClass: "w-full flex gap-3 h-full items-end",
        linkClass: "block text-white font-semibold py-1",
        sublinkContainerClass: "h-full border-b border-x flex flex-col w-40",
        sublinkClass: "pl-1 pb-1 hover:bg-stone-300 px-2 ",
        timing: "0.1s",
      },
    ],
  },
};

const FloatingNavbar: React.FC<FloatingNavbarProps> = (props) => {
  const { routes } = props;
  const { leftArray, rightArray, scrollHeight, ...otherCSS } = testProps;
  const { cssString, css } = getCSS(otherCSS);
  const [visible, setVisible] = useState(false);

  const { array: leftElements } = leftArray as any;
  const { array: rightElements } = rightArray as any;

  useEffect(() => {
    const handleScroll = () => {
      const scrollVal = parseInt(scrollHeight);
      if (window.scrollY > scrollVal) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={css["mainClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={`${css["containerClass"]} ${visible ? css["containerAnimationClass"] : ""}`}>
        <div className={css["wrapperClass"]}>
          <div className={css["leftContainerClass"]}>
            {leftElements.map((elProps: any, i: number) => {
              const { type, ...other } = elProps;
              switch (type) {
                case "text":
                  return <NavText key={i} {...other} />;
                case "image":
                  return <ImageLogo key={i} {...other} />;
                case "imageText":
                  return <ImageLogoText key={i} {...other} />;
                default:
                  return;
              }
            })}
          </div>
          <div className={css["rightContainerClass"]}>
            {rightElements.map((elProps: any, i: number) => {
              const { type, ...other } = elProps;
              switch (type) {
                case "content":
                  return <NavContent key={i} {...other} />;
                case "nav":
                  return <Nav key={i} {...{ routes, ...other }} />;
                case "nav-custom":
                  return <NavCustom key={i} {...other}  />;
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

export default FloatingNavbar;
