import React from "react";
const { getCSS, generateCSSMaps, addClassesToElements } = require("../../../utils/tailwind-to-css/index.js");
import SvgComponent from "../../SvgComponent";
import CloudinaryImage from "../../CloudinaryImage";

interface FooterProps {
  sectionsArray: string;
  socialsArray: string;
  companyName: string;
  headingContainerClass: string;
  headingText: string;
}

/**
 * Footer Component
 *
 * @param {FooterProps} props - The props for the component.
 */

const Footer: React.FC<FooterProps> = (props) => {
  const { sectionsArray, socialsArray, companyName, headingText, ...otherCSS } = props;

  const { cssString, css } = getCSS(otherCSS);

  const elementCSSMap = { h1: css["h1Class"], h2: css["h2Class"], h3: css["h3Class"], p: css["pClass"], a: css["aClass"], ul: css["ulClass"], li: css["liClass"], strong: css["strongClass"] };
  const { array: sections } = JSON.parse(sectionsArray as any);
  const { array: socials } = JSON.parse(socialsArray as any);

  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["containerClass"]}>
        <div className={css["wrapperClass"]}>
          <span className={css["headingContainerClass"]}>{headingText}</span>
          {sections.length > 0 && (
            <div className={css["sectionsContainerClass"]}>
              {sections.map((obj: any, i: number) => {
                switch (obj.type) {
                  case "text":
                    const { containerClass, htmlContainerClass, content } = obj;
                    const { newCSSMap, namingMap: css } = generateCSSMaps({ containerClass, htmlContainerClass });
                    const { cssString, css } = getCSS(otherCSS);
                    return (
                      <div key={i} className={css["containerClass"]}>
                        <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString }} />
                        <Section content={content} htmlContainerClass={css["htmlContainerClass"]} elMap={elementCSSMap} />
                      </div>
                    );
                  case "socials": {
                    const { iconArray, content, ...otherProps } = obj;
                    const { array: icons } = JSON.parse(iconArray as any);
                    const { newCSSMap, namingMap: css } = generateCSSMaps(otherProps);
                    const { cssString, css } = getCSS(otherCSS);
                    return (
                      <div key={i} className={css["containerClass"]}>
                        <Section content={content} htmlContainerClass={css["htmlContainerClass"]} elMap={elementCSSMap} />
                        <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString }} />
                        <div className={css["iconContainerClass"]}>
                          {icons.map((iconObj: any, i: number) => (
                            <Svg key={i} {...iconObj} />
                          ))}
                        </div>
                      </div>
                    );
                  }
                  default:
                    return;
                }
              })}
            </div>
          )}
          {socials.length > 0 && (
            <div className={css["socialsContainerClass"]}>
              {socials.map((obj: any, i: number) => (
                <Svg key={i} {...obj} />
              ))}
            </div>
          )}
          <p className={css["copyrightClass"]}>
            Copyright © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

interface SectionProps {
  htmlContainerClass: string;
  content: string;
  elMap: Record<string, string>;
}

const Section: React.FC<SectionProps> = ({ htmlContainerClass, content, elMap }) => {
  const html = addClassesToElements(content, elMap);
  return <div className={htmlContainerClass} dangerouslySetInnerHTML={{ __html: html }}></div>;
};

interface SvgProps {
  svg: string;
  href: string;
  iconClass: string;
}

const Svg: React.FC<SvgProps> = (props) => {
  const { svg, href, iconClass } = props;
  return (
    <a href={href}>
      <SvgComponent svgString={svg} className={iconClass} />
    </a>
  );
};

export default Footer;
