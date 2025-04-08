import React from "react";
import { getCSS, useAnimatedDropdown } from ".";
import { Link } from "gatsby";

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
          const { ref, open, close, isOpen } = useAnimatedDropdown(timing);

          return (
            <div key={i} onMouseOver={open} onMouseOut={close}>
              <Link to={path} className={css["linkClass"]}>
                {name}
              </Link>
              <div ref={ref} className={`absolute overflow-hidden ${isOpen ? "z-[9999]" : "z-0"}`}>
                <div className={css["sublinkContainerClass"]}>
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
