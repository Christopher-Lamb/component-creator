import React from "react";
import { getCSS, useAnimatedDropdown } from ".";
import { Link } from "gatsby";

interface NavCustomProps {
  containerClass: string;
  navClass: string;
  navlinkContainerClass: string;
  navlinkClass: string;
  sublinkContainerClass: string;
  sublinkClass: string;
  routesArray: any;
  timing: string;
}

/**
 * NavCustom Component
 *
 * Description
 *
 * Props:
 * -
 *
 * @param {NavCustomProps} props - The props for the component.
 */

const NavCustom: React.FC<NavCustomProps> = (props) => {
  const { routesArray, timing, ...otherCSS } = props;

  const { cssString, css } = getCSS(otherCSS);

  const { array: routes } = routesArray as any;

  return (
    <div className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <nav className={css["navClass"]}>
        {routes.map(({ name, path, sublinkArray }: any, i: number) => {
          const { ref, open, close, isOpen } = useAnimatedDropdown(timing);
          const { array: sublinks } = sublinkArray as any;

          return (
            <div key={i} onMouseOver={open} onMouseOut={close}>
              <Link to={path} className={css["linkClass"]}>
                {name}
              </Link>
              <div ref={ref} className={`absolute overflow-hidden ${isOpen ? "z-[9004]" : "z-0"}`}>
                <div className={css["sublinkContainerClass"]}>
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
