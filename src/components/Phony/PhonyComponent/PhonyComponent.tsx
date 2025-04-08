import fff from "refffact";
import React from "react";
const { getCSS, generateCSSMaps, addClassesToElements, penski } = require("../../../utils/tailwind-to-css/index.js");
import CloudinaryImage from "../../CloudinaryImage";

interface PhonyComponentProps {
  routes: string;
  something: string;
}

const testProps = {
  containerClass: "",
  wrapperClass: "",
  cardArray: {
    objects: { card: { content: "" } },
    array: [
      { content: "<h1>$450</h1><h2>Basic Plan</h2><ul><li>5 Pages Total</li><li>SEO</li><li>Home, Contact, About</li><li>2 misc. Pages</li></ul><a>Get Started</a>" },
      { content: "<h1>$750</h1><h2>Basic Plan</h2><ul><li>10 Pages Total</li><li>SEO</li><li>Home, Contact, About</li><li>2 misc. Pages</li></ul><a>Get Started</a>" },
      { content: "<h1>$1600</h1><h2>High Content Plan</h2><ul><li>10+ Pages Total</li><li>SEO</li><li>Home, Contact, About</li><li>2 misc. Pages</li></ul><a>Get Started</a>" },
    ],
  },
};

const PhonyComponent: React.FC<PhonyComponentProps> = (props) => {
  const { routes, something } = props;
  const { ...otherCSS } = testProps;
  const { cssString, css } = getCSS(otherCSS);

  return (
    <div className={css["containerClass"]}>
      {routes} {something}
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["wrapperClass"]}></div>
    </div>
  );
};

export default PhonyComponent;
