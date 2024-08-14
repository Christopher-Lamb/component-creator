const { TailwindtoCSS } = require("./TailwindToCss");
// const fs = require("fs");
//Function that takes a object of classNames and tailwindcss pair and turns it into a CSS file

const breakpointMap = {
  sm: "@media (min-width: 640px) {",
  md: "@media (min-width: 768px) {",
  lg: "@media (min-width: 1024px) {",
  xl: "@media (min-width: 1280px) {",
  "2xl": "@media (min-width: 1536px) {",
};

//each location will have its respective css strings paired with it
// every pass through we are finding if this location exits
// if it does then we append to the current string
// if it doesnt we create a new key value pair
// Store break points seperately from locations. after we are dont sorting the strings to specific locations we will then pair the sepcific locations to break points.

/**
 * Take a Map of classNames and tailwindcss strings and turn it into a css file
 *
 * @param {Map} classNameObj
 * @returns
 */
const getCSS = (classNameObj, isClassName = true) => {
  const cssObject = {
    none: {},
  };
  let keyframesStr = "";
  const addedIds = new Set();

  Object.entries(classNameObj).forEach(([className, tailwindcss]) => {
    const { css } = TailwindtoCSS(tailwindcss);

    css.forEach(({ breakpoint, state, css, keyframes }) => {
      if (!(breakpoint in cssObject) && breakpoint) {
        cssObject[breakpoint] = {};
        //func create break point add to file
      }

      // Handle Keyframes no duplicates
      if (!addedIds.has(keyframes.id) && keyframes.id) {
        // Check if the ID has already been added
        keyframesStr += `\n${keyframes.string}`; // Add the string to the main string
        addedIds.add(keyframes.id); // Record the ID as added
      }

      const newIdentity = `${state ? state + "-" : ""}${className}`;
      // Create new location key value in
      if (!(newIdentity in cssObject[breakpoint || "none"])) {
        cssObject[breakpoint || "none"][newIdentity] = { className, state, css, keyframes };
      } else {
        cssObject[breakpoint || "none"][newIdentity].css += css;
      }
    });
  });

  //from the cssObject create the css file string
  let cssString = "";

  const doubleColon = ["before", "after"];

  const formatState = (stateStr) => {
    if (doubleColon.includes(stateStr)) {
      return ":" + stateStr;
    }
    return stateStr;
  };

  const selector = isClassName ? "." : "";

  Object.entries(cssObject).forEach(([breakpoint, obj]) => {
    //This is where we create the breakpoint
    if (breakpoint !== "none") {
      cssString += "\n" + breakpointMap[breakpoint];
    }

    //Loop through each key value pair and build each class
    Object.values(obj).forEach(({ className, state, css }) => {
      const formatCss = css.replace(/;/g, `;\n  `);
      cssString += `\n${selector}${className}${state ? ":" + formatState(state) : ""} {\n  ${formatCss}}\n`;
    });

    // close the breakpoint here
    if (breakpoint !== "none") {
      cssString += "}\n";
    }
  });

  //Build a list of keyframes and add them to t
  return (cssString += keyframesStr);
};

module.exports = {
  getCSS,
};

// const css = getCSS({ new: "top-[]" });
// console.log(css);
