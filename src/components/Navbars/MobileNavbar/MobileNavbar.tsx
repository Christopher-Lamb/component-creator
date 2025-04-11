import React, { useState } from "react";
import { getCSS, NavText, ImageLogo, ImageLogoText, Nav, Burger, useAnimatedDropdown, useOutsideHook, NavCustom } from ".";

interface MobileNavbarProps {
  routes: any;
}

const testProps = {
  mainClass: "relative",
  containerClass: "",
  wrapperClass: "bg-stone-500 h-20 max-w-[1200px] mx-auto",
  elementsContainerClass: "h-full grid grid-cols-2",
  elementsArray: {
    objects: {
      text: { type: "text", containerClass: "", textClass: "", text: "" },
      image: { type: "image", containerClass: "", logoClass: "", imgLogo: "" },
      imageText: { type: "imageText", containerClass: "", logoClass: "", imgLogo: "", textClass: "", text: "" },
      burger: {
        type: "burger",
        containerClass: "flex items-center justify-end pr-4",
        burgerGridClass: "flex flex-col",
        burgerContainerClass: "py-[3px] px-[6px] rounded-[10%]",
        burgerBarClass: "w-[35px] h-[5px] my-[6px] bg-white",
        textClass: "flex items-center text-[25px] ml-[10px] ",
        text: "",
      },
    },
    array: [
      { type: "text", containerClass: "text-white h-full flex items-center", textClass: "text-5 ml-4 font-bold", text: "Crisp Company" },
      {
        type: "burger",
        containerClass: "flex items-center justify-end pr-4",
        burgerGridClass: "flex flex-col",
        burgerContainerClass: "py-[3px] px-[6px] rounded-[10%]",
        burgerBarClass: "w-[35px] h-[5px] my-[6px] bg-white",
        textClass: "flex items-center text-[25px] ml-[10px] ",
        text: "",
      },
    ],
  },
  navArray: {
    objects: {
      nav: {
        type: "nav",
        containerClass: "w-full max-w-[1200px] mx-auto",
        navClass: "",
        linkContClass: "relative",
        linkWrapClass: "flex border-b-1",
        linkClass: "block w-full px-2 py-1 hover:bg-stone-50",
        sublinkContainerClass: "",
        sublinkClass: "block w-full pl-2 border-b-1 py-1 bg-stone-50 hover:bg-stone-100",
        arrowContClass: "h-auto flex items-center px-1",
        arrowClass: "size-6",
        timing: ".3s",
      },
      "nav-custom": {
        type: "nav-custom",
        containerClass: "w-full max-w-[1200px] mx-auto",
        navClass: "",
        linkContClass: "relative",
        linkWrapClass: "flex border-b-1",
        linkClass: "block w-full px-2 py-1 hover:bg-stone-50",
        sublinkContainerClass: "",
        sublinkClass: "block w-full pl-2 border-b-1 py-1 bg-stone-50 hover:bg-stone-100",
        arrowContClass: "h-auto flex items-center px-1",
        arrowClass: "size-6",
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
        containerClass: "max-w-[1200px] mx-auto",
        navClass: "",
        linkContClass: "relative",
        linkWrapClass: "flex border-b-1",
        linkClass: "block w-full px-2 py-1 hover:bg-stone-50",
        sublinkContainerClass: "",
        sublinkClass: "block w-full pl-2 border-b-1 py-1 bg-stone-50 hover:bg-stone-100",
        arrowContClass: "h-auto flex items-center px-1",
        arrowClass: "size-6",
        timing: ".3s",
      },
    ],
  },
};

const MobileNavbar: React.FC<MobileNavbarProps> = (props) => {
  const [burgerState, setBurgerState] = useState(false);
  const { routes } = props;
  const { elementsArray, navArray, ...otherCSS } = testProps;

  const { ref, isOpen, open, close } = useAnimatedDropdown(".3s");
  
  const handleOutsideClick = () => {
    setBurgerState(false);
    close();
  };
  
  const outsideRef = useOutsideHook(handleOutsideClick);
  const { cssString, css } = getCSS(otherCSS);

  const { array: elements } = elementsArray as any;

  const { array: navItems } = navArray as any;

  const handleBurgerClick = (val: boolean) => {
    setBurgerState(val);
    isOpen ? close() : open();
  };

  return (
    <div ref={outsideRef} className={css["mainClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["containerClass"]}>
        <div className={css["wrapperClass"]}>
          {elements.length > 0 && (
            <div className={css["elementsContainerClass"]}>
              {elements.map((elProps: any, i: number) => {
                const { type, ...other } = elProps;
                switch (type) {
                  case "text":
                    return <NavText {...other} key={i} />;
                  case "image":
                    return <ImageLogo {...other} key={i} />;
                  case "imageText":
                    return <ImageLogoText {...other} key={i} />;
                  case "burger":
                    return <Burger {...other} key={i} onClick={handleBurgerClick} isBurger={burgerState} />;
                  default:
                    return <></>;
                }
              })}
            </div>
          )}
        </div>
      </div>
      <div ref={ref} className={`absolute overflow-hidden w-full  ${isOpen ? "z-[9002]" : "z-0"}`}>
        <div className={css["navItemsContainer"]}>
          {navItems.map((itemProps: any, i: number) => {
            const { type, ...other } = itemProps;
            switch (type) {
              case "nav":
                return <Nav key={i} {...{ routes, ...other }} />;
              case "nav-custom":
                return <NavCustom key={i} {...other} />;
              default:
                return;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
