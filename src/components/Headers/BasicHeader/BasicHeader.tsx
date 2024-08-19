import { Link } from "gatsby";
import React from "react";
import CloudinaryImage from "../../CloudinaryImage";
const {
  getCSS,
  generateCSSMaps,
  addClassesToElements,
} = require("../../../utils/tailwind-to-css/");

interface BasicHeaderProps {
  name: string;
  containerClass: string;
  headingClass: string;
}

/**
 * BasicHeader Component
 *
 * Props:
 * -
 *
 * @param {BasicHeaderProps} props - The props for the component.
 */

const props = {
  containerClass: "bg-blue-100 relative h-one w-full overflow-hidden",
  wrapperClass: "z-10 relative",
  autoBreadcrumbsBool: false,
  bgImageBool: true,
  imageClass: "absolute z-1 object-cover top-0 h-one w-full after:overlay after:bg-white after:opacity-40",
  img: "house.jpg",
  breadcrumbContainerClass: "",
  linkClass: "",
  disabledLinkClass: "",
  spacerClass: "",
  breadcrumbArray: {
    objects: { breadcrumb: { name: "", path: "" } },
    array: [
      { name: "new", path: "" },
      { name: "new", path: "" },
      { name: "new", path: "" },
    ],
  },
  imgBackground: "",
  bgClass: "",
  name: "Heading",
};

const kebabCaseToTitleCase = (kebabStr: string): string => {
  if (kebabStr.length === 0) return "Home";

  return kebabStr
    .split("-")
    .map((word: string) => {
      return word.slice(0, 1).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

const getPath = (path: string) => {
  if (path.length === 0) return "/";

  const pathnames = "/air-conditioning/tips/blog".split("/");
  const index = pathnames.indexOf(path) + 1;
  const newPathnames = pathnames.slice(0, index);
  const newPath = pathnames.slice(0, index).join("/");

  return newPath;
};

const BasicHeader: React.FC<BasicHeaderProps> = () => {
  const {
    autoBreadcrumbsBool,
    bgImageBool,
    breadcrumbArray,
    img,
    name,
    ...otherCSS
  } = props;

  const { newCSSMap, namingMap: css } = generateCSSMaps(otherCSS);
  const cssString = getCSS(newCSSMap);

  const { array: breadcrumbs } = breadcrumbArray;

  const paths = "/air-conditioning/tips/blog".split("/");
  console.log("HERE ==>", window.location.pathname, "arr:", paths);

  return (
    <header className={css["containerClass"]}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString }} />
      {bgImageBool && (
        <div className="absolute w-full h-full z-[1]">
          <CloudinaryImage publicId={img} className={css["imageClass"]} />
        </div>
      )}
      <div className={css["wrapperClass"]}>
        {/* BreadCrumbs Container */}
        <div className={css["breadcrumbsClass"]}>
          {autoBreadcrumbsBool
            ? paths.map((path, i) => {
                return (
                  <>
                    {i !== 0 && <span className={css["spacerClass"]}>|</span>}
                    {i !== paths.length - 1 ? (
                      <Link to={getPath(path)} className={css["linkClass"]}>
                        {kebabCaseToTitleCase(path)}
                      </Link>
                    ) : (
                      <span className={css["disabledLinkClass"]}>
                        {kebabCaseToTitleCase(path)}
                      </span>
                    )}
                  </>
                );
              })
            : breadcrumbs.map(({ path, name }, i) => {
                return (
                  <>
                    {i !== 0 && <span className={css["spacerClass"]}>|</span>}
                    {i !== breadcrumbs.length - 1 ? (
                      <Link to={path} className={css["linkClass"]}>
                        {name}
                      </Link>
                    ) : (
                      <span className={css["disabledLinkClass"]}>{name}</span>
                    )}
                  </>
                );
              })}
        </div>
        <h1 className={css["headingClass"]}>{name}</h1>
      </div>
    </header>
  );
};

export default BasicHeader;
