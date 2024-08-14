import { Link } from "gatsby";
import React, { useRef, useEffect, FC } from "react";

interface LinkBox {
  name: string;
  href: string;
  svg: string;
}

interface LambLinkBoxesProps {
  linkBoxes: LinkBox[];
}

/**
 * LambLinkBoxes Component
 *
 * @param {LambLinkBoxesProps} props - The props for the component.
 */

const LambLinkBoxes: React.FC<LambLinkBoxesProps> = (props) => {
  const { linkBoxes } = props;

  //Take an array of
  return (
    <div className="flex">
      {linkBoxes.map(({ name, href, svg }, i) => {
        return (
          // container Class
          <Link to={href} className="flex flex-col hover:scale-110 hover:border-b-4 border-blue-100 mb-4 hover:mb-0">
            {/* svg Class */}
            <SvgComponent svgString={svg} className="w-20 h-20" />
            {/* textClass */}
            <span className="inline-block text-center text-small-18">{name}</span>
          </Link>
        );
      })}
    </div>
  );
};

interface SvgComponentProps {
  svgString: string;
  className?: string;
}

const SvgComponent: FC<SvgComponentProps> = ({ svgString, className }) => {
  const svgContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (svgContainerRef.current && svgString) {
      // Parse the SVG string into a document fragment
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgString, "image/svg+xml");
      const svgElement = doc.querySelector("svg");

      // Clear the container (in case it had previous content)
      svgContainerRef.current.innerHTML = "";

      // Append the parsed SVG element to the container
      if (svgElement) {
        if (className) {
          svgElement.setAttribute("class", className);
        }

        // Ensure the viewBox attribute is set to scale correctly
        if (!svgElement.getAttribute("viewBox")) {
          const width = svgElement.getAttribute("width") || "100";
          const height = svgElement.getAttribute("height") || "100";
          svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
          svgElement.removeAttribute("width");
          svgElement.removeAttribute("height");
        }

        svgContainerRef.current.appendChild(svgElement);
      }
    }
  }, [svgString, className]);

  return <div ref={svgContainerRef}></div>;
};

export default LambLinkBoxes;
