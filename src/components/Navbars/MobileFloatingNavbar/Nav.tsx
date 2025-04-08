import React from "react";
import { getCSS, useAnimatedDropdown } from ".";
import { Link } from "gatsby";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface NavProps {
  containerClass: string;
  navClass: string;
  linkClass: string;
  sublinkContainerClass: string;
  sublinkClass: string;
  routes: any;
  timing: string;
}

/**
 * Nav Component
 *
 * Description
 *
 * Props:
 * -
 *
 * @param {NavProps} props - The props for the component.
 */

const Nav: React.FC<NavProps> = (props) => {
  const { routes, timing, ...otherCSS } = props;

  const { cssString, css } = getCSS(otherCSS);

  const navlinks = routes.navbar;

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <nav className={css["navClass"]}>
        {navlinks.map(({ name, path, subpaths }: any, i: number) => {
          const { ref, isOpen, toggle } = useAnimatedDropdown(timing);

          return (
            <div key={i} className={`relative ${css["linkContClass"]}`}>
              <div className={css["linkWrapClass"]}>
                <Link to={path} className={css["linkClass"]}>
                  {name}
                </Link>
                {subpaths.length > 0 && (
                  <div className={css["arrowContClass"]}>
                    <FaChevronUp onClick={toggle} className={`${isOpen ? "rotate-180" : "rotate-0"} transition cursor-pointer ${css["arrowClass"]}`} />
                  </div>
                )}
              </div>
              <div ref={ref} className={`relative overflow-hidden w-full  ${isOpen ? "z-[9999]" : "z-0"}`}>
                {/* <div className={`h-full w-full transition flex flex-col `}>
                  <div className="h-20 bg-purple-600 w-full"></div>
                </div> */}
                <div className={`${css["sublinkContainerClass"]}`}>
                  {subpaths.map(({ name, path }: any, i: number) => {
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

export default Nav;
