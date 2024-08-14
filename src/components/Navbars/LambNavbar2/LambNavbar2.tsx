import React from "react";
import { Link } from "gatsby";
import useAnimatedDropdown from "../../../hooks/useAnimatedDropdown";
import CloudinaryImage from "../../CloudinaryImage";
import Burger from "./Burger";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface Route {
  id: string;
  name: string;
  path: string;
  subpaths: Route[];
}

interface LambNavbarProps {
  routes: Record<string, Route[]>;
  callNowHref: string;
  callNow: string;
}

/**
 * LambNavbar Component
 *
 * Description
 *
 * Props:
 * -
 *
 * @param {LambNavbarProps} props - The props for the component.
 */

const LambNavbar: React.FC<LambNavbarProps> = ({ routes, callNow, callNowHref }) => {
  const navLinks = routes?.navbar;

  const { ref, toggle, updateHeight } = useAnimatedDropdown("0.4s");

  return (
    <>
      {/* containerClass */}
      <header className="h-[6.5625rem] md:h-[136px] bg-blue-700 ">
        {/* Navbar */}
        <div className="hidden h-full lg:flex justify-evenly">
          {/* logoClass */}
          <Link to="/" className="h-full flex items-center">
            <CloudinaryImage publicId="2_1.png" className="object-contain w-one h-full" />
          </Link>
          {/* LG: */}
          {/*  */}
          <div className="flex flex-col items-end">
            <div className="h-full flex items-end">
              {/* callNowClass */}
              <button className="py-4 mx-4 px-8 rounded-lg text-2xl bg-white tracking-wider font-semibold">{callNow}</button>
            </div>

            {/* Full Sized Links */}
            <nav className="h-full flex items-end">
              {navLinks.map(({ name, subpaths }) => {
                const { ref, open, close, isOpen } = useAnimatedDropdown(".3s");

                return (
                  <div onMouseOver={open} onMouseOut={close} className="relative inline-block">
                    {/* linkClass */}
                    <span className="lg:text-xl cursor-pointer px-2 inline-block text-white hover:text-blue-100 pb-2 block">{name}</span>
                    {subpaths.length > 0 && (
                      <div ref={ref} className={"absolute overflow-hidden " + (isOpen ? "z-[9999]" : "z-0")}>
                        <ul className="h-full flex flex-col lg:text-lg">
                          {subpaths.map(({ id, name, path }) => (
                            <Link to={path}>
                              {/* sublinkClass */}
                              <li key={id} className="text-nowrap bg-white hover:bg-stone-100 min-w-one py-0.5 px-2">
                                {name}
                              </li>
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
        {/* Navbar END */}
        {/* Mobile Navbar */}
        <div className="lg:hidden h-full flex justify-around">
          {/* logoClass */}
          <Link to="/" className="h-full flex items-center">
            <CloudinaryImage publicId="2_1.png" className="object-contain w-one h-full" />
          </Link>
          <div className="flex items-center justify-center">
            {/* burgerClass */}
            <Burger onClick={toggle} />
          </div>
        </div>
        <div ref={ref} className="overflow-hidden lg:hidden">
          <div className="w-full">
            {navLinks.map(({ path, name, subpaths }) => {
              const { ref, isOpen, toggle } = useAnimatedDropdown("0.4s");

              const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                // e.stopPropagation();
                // console.log(e.isPropagationStopped());
                toggle();
                updateHeight();
              };

              return (
                <>
                  <li className="relative z-[999] w-full flex items-center">
                    <Link to={path} className="w-full">
                      {/* mobileLinkClass */}
                      <span className="inline-block flex justify-between cursor-pointer text-xl kanit bg-blue-100 px-4 py-2 w-full border-b-2 border-blue-200 hover:border-blue-400">
                        {name}
                        {subpaths.length > 0 && (
                          <button aria-label={"Open " + name + " Navigation"} onClick={handleToggle} className="flex items-center justify-center px-2 h-auto cursor-pointer">
                            {isOpen ? <FaChevronUp className="w-7 h-full" /> : <FaChevronDown className="w-7 h-full" />}
                          </button>
                        )}
                      </span>
                    </Link>
                  </li>
                  <div ref={ref} className="grid z-[999] overflow-hidden">
                    {subpaths?.map(({ name, path }, i) => {
                      // const { ref } = useAnimatedDropdown("0.4s");
                      return (
                        <Link to={path} key={path + i}>
                          {/* mobileSublinkClass */}
                          <span className="px-8 py-1 inline-block w-full text-xl border-b-[1px] border-blue-200 hover:border-blue-400 bg-blue-100">{name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="flex lg:hidden justify-end relative z-[998]">
          <a href={callNowHref}>
            {/* mobileCallNowClass */}
            <span className="mx-auto inline-block py-4 mx-4 px-8 text-2xl bg-white border-b-4 border-x-4 border-gray-300 tracking-wider font-semibold">Call {callNow}</span>
          </a>
        </div>
      </header>
    </>
  );
};

export default LambNavbar;
