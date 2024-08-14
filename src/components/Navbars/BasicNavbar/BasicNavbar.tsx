import React from "react";
import { Link } from "gatsby";

interface Route {
  id: string;
  name: string;
  path: string;
  subpaths: Route[];
}

interface BasicNavbarProps {
  logo: string;
  routes: Route[];
  containerClass: string;
  linkClass: string;
  logoClass: string;
  routesContClass: string;
}

/**
 * BasicNavbar Component
 *
 * Props:
 * - logo {string} the UI where home button will be
 * - routes {name:string, path:""} house name and path
 *
 * @param {BasicNavbarProps} props - The props for the component.
 */

const BasicNavbar: React.FC<BasicNavbarProps> = ({ logo, routes, containerClass, logoClass, routesContClass, linkClass }) => {
  return (
    <div className={containerClass}>
      <div className={logoClass}>
        <Link to="/">{logo}</Link>
      </div>
      <div className={routesContClass}>
        {routes.map(({ name, path }) => (
          <Link className={linkClass} to={path}>
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BasicNavbar;
