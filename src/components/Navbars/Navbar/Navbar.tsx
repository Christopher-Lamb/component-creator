import React from "react";
import { Link } from "gatsby";
import { useAnimatedDropdown } from "../../../hooks/useAnimatedDropdown";
import CloudinaryImage from "../../CloudinaryImage";
import Burger from "../Navbar/Burger";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
const { getCSS, generateCSSMaps, addClassesToElements } = require("../../../utils/tailwind-to-css/index.js");

interface NavbarProps {}

/**
 * Navbar Component
 *
 * Description
 *
 * Props:
 * -
 *
 * @param {NavbarProps} props - The props for the component.
 */

const props = {
  containerClass: "h-one bg-blue-400",
  wrapperClass: "flex justify-between max-w-five px-22 mx-auto",
  navClass: "flex items-end gap-3 text-xl font-semibold text-white",
  linkClass: "",
  sublinkContainerClass: "h-full bg-white flex flex-col min-w-one lg:text-lg border shadow",
  sublinkClass: "text-black px-2 w-full py-2 hover:bg-stone-100",
  mobileLinkClass: "w-full bg-blue-200 flex justify-between",
  mobileSublinkClass: "",
  arrowClass: "w-7 h-full text-white",
  routes: {
    navbar: [
      {
        name: "Plumbing",
        subpaths: [
          { name: "Plumbing", subpaths: [], path: "/plumbing" },
          { name: "Custom Building", subpaths: [], path: "/custom-building" },
          { name: "About", subpaths: [], path: "/about" },
        ],
        path: "/plumbing",
      },
      {
        name: "Custom Building",
        subpaths: [
          { name: "Plumbing", subpaths: [], path: "/plumbing" },
          { name: "Custom Building", subpaths: [], path: "/custom-building" },
          { name: "About", subpaths: [], path: "/about" },
        ],
        path: "/custom-building",
      },
      {
        name: "About",
        subpaths: [
          { name: "Plumbing", subpaths: [], path: "/plumbing" },
          { name: "Custom Building", subpaths: [], path: "/custom-building" },
          { name: "About", subpaths: [], path: "/about" },
        ],
        path: "/about",
      },
    ],
  },

  logoContainerClass: "flex h-one items-center text-med text-white gap-3",
  logoClass: "h-small w-small object-cover",
  logoText: "CMP Builders",
  imgLogo: "house.jpg",
  timing: ".4s",
  rightSideContainerClass: "flex items-center",
  itemArray: {
    objects: { item: { content: "", classContainer: "", pClass: "", aClass: "" } },
    array: [
      // { content: "<a href='tel:+18564121845'>856-412-1845</a>", containerClass: "hidden lg:flex items-center justify-end mr-8", pClass: "", aClass: "bg-blue-700 lg:bg-white text-med rounded p-3 px-8" }
    ],
  },
  bannerContainerClass: "",
  burgerClass: "",
};

const Navbar: React.FC<NavbarProps> = () => {
  const { routes, logoText, imgLogo, timing, itemArray, ...otherCSS } = props;
  const navLinks = routes?.navbar;
  //Make Shortcut

  const { cssString, css } = getCSS(otherCSS);

  const { ref, toggle, updateHeight } = useAnimatedDropdown(timing);

  const { array: items } = itemArray;

  return (
    <>
      {/* Make shortcut */}
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <header className={css["containerClass"]}>
        <div className="hidden lg:block">
          <div className={`${css["wrapperClass"]}`}>
            <Link to="/" className={css["logoContainerClass"]}>
              <CloudinaryImage publicId={imgLogo} className={css["logoClass"]} />
              {logoText && <span>{logoText}</span>}
            </Link>
            {/* Full Sized Links */}
            <div className={css["rightSideContainerClass"]}>
              {items.length > 0 &&
                items.map(({ content, containerClass, aClass, pClass }, i) => {
                  const { cssString, css } = getCSS({ aClass, pClass, containerClass });
                  const html = addClassesToElements(content, { p: css["pClass"], a: css["aClass"] });

                  return (
                    <React.Fragment key={i}>
                      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString }} />
                      <div dangerouslySetInnerHTML={{ __html: html }} className={css["containerClass"]}></div>
                    </React.Fragment>
                  );
                })}
              <nav className={css["navClass"]}>
                {navLinks.map(({ name, subpaths, path }, i) => {
                  const { ref, open, close, isOpen } = useAnimatedDropdown(timing);

                  return (
                    <div key={i} onMouseOver={open} onMouseOut={close} className="relative inline-block">
                      {/* linkClass */}
                      <Link to={path} className={css["linkClass"]}>
                        {name}
                      </Link>
                      {subpaths.length > 0 && (
                        <div ref={ref} className={"absolute overflow-hidden " + (isOpen ? "z-[999]" : "z-0")}>
                          <ul className={css["sublinkContainerClass"]}>
                            {subpaths.map(({ name, path }, i) => (
                              <Link to={path} key={i} className={css["sublinkClass"]}>
                                {/* sublinkClass */}
                                <li>{name}</li>
                              </Link>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          <div className={`${css["wrapperClass"]}`}>
            {/* mobileLogoClass */}
            <Link to="/" className={css["logoContainerClass"]}>
              <CloudinaryImage publicId={imgLogo} className={css["logoClass"]} />
              {logoText && <span>{logoText}</span>}
            </Link>
            <div className="flex items-center justify-center lg:hidden">
              {/* burgerClass */}
              <Burger onClick={toggle} className={css["burgerClass"]} />
            </div>
          </div>
        </div>
        <div ref={ref} className="overflow-hidden lg:hidden">
          <div className="w-full">
            {navLinks.map(({ path, name, subpaths }) => {
              const { ref, isOpen, toggle } = useAnimatedDropdown(timing);

              const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                toggle();
                updateHeight();
              };

              return (
                <>
                  <li className="relative z-[999] w-full flex items-center">
                    <Link to={path} className={css["mobileLinkClass"]}>
                      {/* mobileLinkClass */}
                      {name}
                      {subpaths.length > 0 && (
                        <button aria-label={"Open " + name + " Navigation"} onClick={handleToggle} className="flex items-center justify-center px-2 h-auto cursor-pointer">
                          {isOpen ? <FaChevronUp className={css["arrowClass"]} /> : <FaChevronDown className={css["arrowClass"]} />}
                        </button>
                      )}
                    </Link>
                  </li>
                  <div ref={ref} className="grid z-[999] overflow-hidden">
                    {subpaths?.map(({ name, path }, i) => {
                      return (
                        <Link to={path} key={i} className={css["mobileSublinkClass"]}>
                          {/* mobileSublinkClass */}
                          {name}
                        </Link>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </header>
      {items.length > 0 && (
        <div className={css["bannerContainerClass"] + " lg:hidden"}>
          {items.map(({ content, containerClass, aClass, pClass }, i) => {
            const { cssString, css } = getCSS({ aClass, pClass, containerClass });
            const html = addClassesToElements(content, { p: css["pClass"], a: css["aClass"] });

            return (
              <React.Fragment key={i}>
                <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString }} />
                <div dangerouslySetInnerHTML={{ __html: html }} className={css["containerClass"]}></div>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Navbar;
