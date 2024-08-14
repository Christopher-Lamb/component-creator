import React, { useState, useRef } from "react";
import { Link } from "gatsby";
// import LAMBHVACLOGO from "../../images/lamb_logox192.png";
import Burger from "./Burger";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import "./Navbar.css";
import Image from "../../../components/Image";

interface Route {
  id: string;
  name: string;
  path: string;
  subpaths: Route[];
}

const NavLink: React.FC<Route> = ({ id, name, path, subpaths }) => {
  const sublinkRef = useRef<HTMLUListElement>(null);

  const hideSubLink = () => {
    if (sublinkRef.current) sublinkRef.current.style.display = "none";
  };
  const showSubLink = () => {
    if (sublinkRef.current) sublinkRef.current.style.display = "";
  };

  return (
    <div onMouseOver={showSubLink} onMouseOut={hideSubLink}>
      <Link to={path}>
        <span className="kanit lg:text-xl text-white hover:text-blue-100 pb-2 block">{name}</span>
      </Link>
      {subpaths.length > 0 && (
        <ul ref={sublinkRef} style={{ display: "none" }} className="bg-white z-[999] absolute flex flex-col shadow p-4 gap-2 lg:text-lg">
          {subpaths.map(({ id, name, path }) => (
            <li key={id}>
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const MobileNavLink: React.FC<Route> = ({ id, name, path, subpaths }) => {
  const subpathsRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const subLinkToggle = () => {
    subpathsRef.current?.classList.toggle("nav-not-active");
    subpathsRef.current?.classList.toggle("nav-active");
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <li className="relative z-[999] bg-blue-100 w-full flex space-arounds items-center border-b-2 border-blue-200">
        <Link to={path} className="w-full px-4 py-2">
          <span className="inline-block cursor-pointer text-xl kanit">{name}</span>
        </Link>
        {subpaths.length > 0 && (
          <button aria-label={"Open " + name + " Navigation"} onClick={subLinkToggle} className=" flex items-center justify-center w-10 h-10 mr-4 cursor-pointer">
            {isOpen ? <FaChevronUp className="w-[20px] h-full" /> : <FaChevronDown className="w-[20px] h-full" />}
          </button>
        )}
      </li>
      <ul ref={subpathsRef} className="nav-not-active grid z-[999] bg-blue-100">
        {subpaths?.map(({ name, path }) => (
          <Link to={path} key={path}>
            <li className="px-8 py-1 text-xl border-b-[1px] border-blue-200">{name}</li>
          </Link>
        ))}
      </ul>
    </>
  );
};

interface NavbarProps {
  routes: Record<string, Route[]>;
  callNowHref: string;
  callNow: string;
}

const Navbar: React.FC<NavbarProps> = ({ routes, callNow, callNowHref }) => {
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const navLinks = routes?.navbar;
  const displayNavToggle = () => {
    mobileNavRef?.current?.classList.toggle("nav-not-active");
  };

  return (
    <header className="h-[6.5625rem] md:h-[136px] bg-blue-500 ">
      <div className="w-full h-full grid grid-cols-2 justify-center-center lg:flex lg:justify-evenly">
        {/* LOGO */}
        <div className="flex items-center ml-8 lg:ml-0 lg:justify-center overflow-hidden">
          <Link to="/">
            <Image fileName="img.jpg" alt="" />
          </Link>
        </div>
        {/* NAV */}
        <div className="hidden lg:block h-full">
          <div className="grid max-w-3xl justify-center items-end h-full">
            {/* Phone Click */}
            <div className="flex justify-end">
              <a href={callNowHref} className="py-4 mx-4 px-8 rounded-lg text-2xl bg-white tracking-wider font-semibold">
                {callNow}
              </a>
            </div>
            <nav className="flex justify-end gap-4 ">
              {navLinks.map((navlink) => (
                <NavLink key={navlink.name} {...navlink} />
              ))}
            </nav>
          </div>
        </div>
        {/* Mobile Burger */}
        <div className="lg:hidden flex items-center justify-end pr-8">
          <Burger onClick={displayNavToggle} />
        </div>
      </div>
      {/* Mobile Nav */}
      <div className="relative w-full lg:hidden">
        <div ref={mobileNavRef} className="absolute nav-not-active w-full bg-blue-100">
          <ul>
            {navLinks.map((navlink) => (
              <MobileNavLink key={navlink.name} {...navlink} />
            ))}
          </ul>
        </div>

        <div className="flex justify-end relative z-[998]">
          <a href={callNowHref}>
            <span className="mx-auto inline-block py-4 mx-4 px-8 text-2xl bg-white border-b-4 border-x-4 border-gray-300 tracking-wider font-semibold">Call {callNow}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
