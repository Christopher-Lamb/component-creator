import React from "react";
import { getCSS, Text, ImageLogo, ImageLogoText, Content, Nav, NavCustom } from ".";

interface MainNavbarProps {
  routes: any;
}

const testProps = {
  mainClass: "",
  containerClass: "",
  wrapperClass: "bg-stone-500 h-20 max-w-[1200px] grid grid-cols-2 mx-auto",
  leftContainerClass: "h-full px-4",
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
      nav: { type: "nav", containerClass: "", linkContainerClass: "", linkClass: "", sublinkContainerClass: "h-full flex flex-col", sublinkClass: "", timing: ".1s" },
      "nav-custom": {
        type: "nav-custom",
        containerClass: "",
        linkContainerClass: "",
        linkClass: "",
        sublinkContainerClass: "h-full flex flex-col",
        sublinkClass: "",
        routesArray: { objects: { route: { name: "", path: "", sublinkArray: { objects: { sublink: { name: "", path: "" } }, array: [] } } }, array: [] },
        timing: ".1s",
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
      // {
      //   type: "nav-custom",
      //   containerClass: "h-full",
      //   navClass: "w-full flex gap-3 h-full items-end",
      //   linkClass: "block text-white font-semibold py-1",
      //   sublinkContainerClass: "h-full flex flex-col bg-blue-300 w-30",
      //   sublinkClass: "pl-1 pb-1 hover:bg-stone-300",
      //   routesArray: {
      //     objects: { route: { name: "", path: "", sublinkArray: { objects: { sublink: { name: "", path: "" } }, array: [] } } },
      //     array: [
      //       {
      //         name: "Homeski",
      //         path: "/homski",
      //         sublinkArray: {
      //           objects: { sublink: { name: "", path: "" } },
      //           array: [
      //             { name: "One", path: "/one" },
      //             { name: "Two", path: "/two" },
      //             { name: "Three", path: "/three" },
      //           ],
      //         },
      //       },
      //     ],
      //   },
      //   timing: ".3s",
      // },
    ],
  },
};

const MainNavbar: React.FC<MainNavbarProps> = (props) => {
  const { routes } = props;
  const { leftArray, rightArray, ...otherCSS } = testProps;
  const { cssString, css } = getCSS(otherCSS);

  const { array: leftElements } = leftArray as any;
  const { array: rightElements } = rightArray as any;

  return (
    <div className={css["mainClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["containerClass"]}>
        <div className={css["wrapperClass"]}>
          <div className={css["leftContainerClass"]}>
            {leftElements.map((elProps: any) => {
              const { type, ...other } = elProps;
              switch (type) {
                case "text":
                  return <Text {...other} />;
                case "image":
                  return <ImageLogo {...other} />;
                case "imageText":
                  return <ImageLogoText {...other} />;
                default:
                  return <></>;
              }
            })}
          </div>
          <div className={css["rightContainerClass"]}>
            {rightElements.map((elProps: any, i: number) => {
              const { type, ...other } = elProps;
              switch (type) {
                case "content":
                  return <Content {...other} key={i} />;
                case "nav":
                  return <Nav {...{ routes, ...other }} key={i} />;
                case "nav-custom":
                  return <NavCustom {...other} key={i} />;
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

export default MainNavbar;
