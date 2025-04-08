import React from "react";
import { Link } from "gatsby";
const { getCSS, generateCSSMaps } = require("../../../utils/tailwind-to-css/index.js");

type RouteKey = "navbar" | "quickLinks" | "faq";

interface Route {
  id: string;
  name: string;
  path: string;
  subpaths: Route[];
}

interface SimpleNavbarProps {
  logo: string;
  routes: Record<RouteKey, Route[]>;
  containerClass: string;
  linkClass: string;
  logoClass: string;
  routesContClass: string;
}

/**
 * SimpleNavbar Component
 *
 * Props:
 * - logo {string} the UI where home button will be
 * - routes {name:string, path:""} house name and path
 *
 * @param {SimpleNavbarProps} props - The props for the component.
 */

const testProps = {
  mainClass: "relative w-full h-14",
  containerClass: "absolute h-14 w-full flex justify-center",
  wrapperClass: " w-full h-14 flex items-center justify-between max-w-6xl",
  logo: "Kelli's Catering",
  logoClass: "text-med",
  linkContainerClass: "flex gap-4 text-small18 font-semibold",
  linkClass: "hover:text-blue-600",
};

const SimpleNavbar: React.FC<SimpleNavbarProps> = (props) => {
  const { routes } = props;
  const { logo, ...otherCSS } = testProps;

  const { cssString, css } = getCSS(otherCSS);

  return (
    <div className={css["mainClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["containerClass"]}>
        <div className={css["wrapperClass"]}>
          <Link to="/" className={css["logoClass"]}>
            {logo}
          </Link>
          <div className={css["linkContainerClass"]}>
            {routes.navbar.map(({ name, path }) => (
              <Link className={css["linkClass"]} to={path}>
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleNavbar;
