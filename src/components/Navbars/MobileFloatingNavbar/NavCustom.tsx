import React from "react";
import { getCSS, useAnimatedDropdown } from ".";
import { Link } from "gatsby";
import { FaChevronUp } from "react-icons/fa6";

interface NavCustomProps {
  containerClass: string;
  navClass: string;
  linkContClass: string;
  linkWrapClass: string;
  linkClass: string;
  sublinkContainerClass: string;
  sublinkClass: string;
  arrowContClass: string;
  arrowClass: string;
  routesArray: any;
  timing: string;
}

const NavCustom: React.FC<NavCustomProps> = (props) => {
  const { routesArray, timing, ...otherCSS } = props;

  const { cssString, css } = getCSS(otherCSS);

  const { array: routes } = routesArray as any;

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <nav className={css["navClass"]}>
        {routes.map(({ name, path, sublinkArray }: any, i: number) => {
          const { ref, isOpen, toggle } = useAnimatedDropdown(timing);

          const { array: sublinks } = sublinkArray as any;

          return (
            <div key={i} className={`relative ${css["linkContClass"]}`}>
              <div className={css["linkWrapClass"]}>
                <Link to={path} className={css["linkClass"]}>
                  {name}
                </Link>
                {sublinks.length > 0 && (
                  <div className={css["arrowContClass"]}>
                    <FaChevronUp onClick={toggle} className={`${isOpen ? "rotate-180" : "rotate-0"} transition cursor-pointer ${css["arrowClass"]}`} />
                  </div>
                )}
              </div>
              <div ref={ref} className={`relative overflow-hidden w-full  ${isOpen ? "z-[9006]" : "z-0"}`}>
                <div className={`${css["sublinkContainerClass"]}`}>
                  {sublinks.map(({ name, path }: any, i: number) => {
                    return (
                      <Link key={i} to={path} className={css["sublinkClass"]}>
                        {name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default NavCustom;
