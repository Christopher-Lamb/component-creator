const { TailwindtoCSS } = require("./TailwindToCss");
// const fs = require("fs");
//Function that takes a object of classNames and tailwindcss pair and turns it into a CSS file

const breakpointMap = {
  "2xs": "@media (min-width: 320px) {",
  xs: "@media (min-width: 480px) {",
  sm: "@media (min-width: 640px) {",
  md: "@media (min-width: 768px) {",
  lg: "@media (min-width: 1024px) {",
  xl: "@media (min-width: 1280px) {",
  "2xl": "@media (min-width: 1536px) {",
};

const getUtilityClass = ({ utilityClass, className }) => {
  const utilityClassMap = {
    "peer-focus": `.peer:focus + ${className}`,
    "peer-placeholder-shown": `.peer:placeholder-shown + ${className}`,
    "peer-checked": `.peer:checked + ${className}`,
    "peer-invalid": `.peer:invalid + ${className}`,
    "peer-valid": `.peer:valid + ${className}`,
    "peer-disabled": `.peer:disabled + ${className}`,
    "peer-readonly": `.peer:read-only + ${className}`,
    "peer-hover": `.peer:hover + ${className}`,
    "peer-active": `.peer:active + ${className}`,
    "peer-autofill": `.peer:autofill + ${className}`,
    "peer-required": `.peer:required + ${className}`,
    "peer-indeterminate": `.peer:indeterminate + ${className}`,
    "peer-focus-visible": `.peer:focus-visible + ${className}`,
    "group-hover": `.group:hover ${className}`,
    "group-focus": `.group:focus ${className}`,
    "group-active": `.group:active ${className}`,
    "group-focus-visible": `.group:focus-visible ${className}`,
    "group-invalid": `.group:has(input:invalid) ${className}`,
    "group-valid": `.group:has(input:valid) ${className}`,
    "group-checked": `.group:has(input:checked) ${className}`,
    "group-disabled": `.group:has(input:disabled) ${className}`,
    "group-readonly": `.group:has(input:read-only) ${className}`,
    "group-open": `.group[open] ${className}`, // For <details> elements
    "group-indeterminate": `.group:has(input:indeterminate) ${className}`,
    "group-placeholder-shown": `.group:has(input:placeholder-shown) ${className}`,
  };

  return utilityClassMap[utilityClass];
};

const getPseudoClass = ({ pseudoClass, className }) => {
  const pseudoClassMap = {
    hover: `${className}:hover`,
    active: `${className}:active`,
    focus: `${className}:focus`,
    after: `${className}::after`,
    before: `${className}::before`,
    odd: `${className}:nth-child(odd)`,
    even: `${className}:nth-child(even)`,
    first: `${className}:first`,
    "first-child": `${className}:first-child`,
    "last-child": `${className}:last-child`,
    required: `${className}:required`,
    disabled: `${className}:disabled`,
    enabled: `${className}:enabled`,
    checked: `${className}:checked`,
    default: `${className}:default`,
  };

  return pseudoClassMap[pseudoClass];
};

//This function blows
// Break it up into smaller function please :(

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

let lastTime = 0;
let counter = 0;
function generateUniqueId(string) {
  const now = Date.now();
  if (now !== lastTime) {
    counter = 0;
    lastTime = now;
  }
  const uniqueId = `${string}-${now}${(counter++).toString().padStart(3, "0")}${Math.random().toString(16).slice(2, 8)}`;
  return uniqueId;
}

const getIdentity = ({ className, pseudoClass, utilityClass }) => [utilityClass, pseudoClass, className].filter(Boolean).join("-");
const extractClassName = (identityString) => {
  if (!identityString) return ""; // Handle empty input safely
  return identityString.split("-").pop(); // Extract last segment (className)
};

//Creates a css string from a tailwind css map
const getCSS = (classNameObj, isClassName = true) => {
  const cssObject = {
    none: {},
  };
  let keyframesStr = "";
  const addedIds = new Set();

  Object.entries(classNameObj).forEach(([className, tailwindcss]) => {
    const { css } = TailwindtoCSS(tailwindcss);
    // console.log("==============================");
    // console.log("Css from tailwindToCss\t", css);

    css.forEach(({ breakpoint, pseudoClass, utilityClass, css, keyframes, junk }) => {
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

      const newIdentity = getIdentity({ className, pseudoClass, utilityClass });

      // Create new location key value in
      if (!(newIdentity in cssObject[breakpoint || "none"])) {
        cssObject[breakpoint || "none"][newIdentity] = { className, pseudoClass, utilityClass, css, keyframes, junk: "" };
      } else {
        cssObject[breakpoint || "none"][newIdentity].css += css;
      }

      if (junk) {
        //If junk we are going to store it in the array
        cssObject[breakpoint || "none"][newIdentity].junk += ` ${junk}`;
      }
    });
    //Working Junk
  });

  //from the cssObject create the css file string

  const breakpoints = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
  // Convert object to an array of [key, value] pairs
  const sortedEntries = Object.entries(cssObject).sort(([keyA], [keyB]) => {
    if (keyA === "none") return -1; // "none" always comes first
    if (keyB === "none") return 1;

    const indexA = breakpoints.indexOf(keyA);
    const indexB = breakpoints.indexOf(keyB);

    return indexA - indexB;
  });

  const cssMap = {};

  sortedEntries.forEach(([breakpoint, obj]) => {
    Object.entries(obj).forEach(([name, { className, junk }]) => {
      // console.log("==========>", name, className);

      const extractedClassName = extractClassName(name);

      //if name not in cssMap
      if (!(name in cssMap)) {
        //create a uid
        const uid = generateUniqueId(className);
        if (!(extractedClassName in cssMap)) {
          // create a new extracted obj bc theres no root object
          cssMap[extractedClassName] = { uid, junk };
          cssMap[name] = { uid, junk };
        } else {
          //extracted is already in there so we need to get the uid and make the new one
          cssMap[name] = { uid: cssMap[extractedClassName].uid, junk };
        }
      } else {
        // this one exists so we are just adding junk
        cssMap[name].junk += junk;
      }
    });
  });

  // console.log("\nsortedEnteries", sortedEntries, "\n");
  // console.log("Naming Map", JSON.stringify(cssMap,null, 2));
  //naming map here
  let cssString = "";

  //not sure if this will break the code if I remove this
  const selector = isClassName ? "." : "";

  sortedEntries.forEach(([breakpoint, obj]) => {
    //This is where we create the breakpoint
    if (breakpoint !== "none") {
      cssString += "\n" + breakpointMap[breakpoint];
    }

    //Loop through each key value pair and build each class
    Object.values(obj).forEach(({ className, pseudoClass, utilityClass, css }) => {
      if (!css) return;
      // console.log("\nHERE:", className, pseudoClass, utilityClass, css);
      // console.log("cssMapClassName", cssMap);
      // console.log("obj:", obj);

      const identity = getIdentity({ className, pseudoClass, utilityClass });
      // console.log("\nuid:", identity);

      const uniqueClassName = cssMap[identity].uid;
      let workingClassName = selector + uniqueClassName;
      // console.log("uniqueClassName:", uniqueClassName);
      // console.log("workingClassName", workingClassName);

      if (pseudoClass) {
        workingClassName = getPseudoClass({ pseudoClass, className: workingClassName });
      }
      // console.log("workingClassName", workingClassName);
      if (utilityClass) {
        workingClassName = getUtilityClass({ utilityClass, className: workingClassName });
      }

      const formatCss = css.replace(/;/g, `;\n  `);
      // console.log("___CSS___", css);
      cssString += `\n${workingClassName} {\n  ${formatCss}}\n`;
    });

    // close the breakpoint here
    if (breakpoint !== "none") {
      cssString += "}\n";
    }
  });

  let namingMap = {};
  Object.entries(cssMap).forEach(([className, obj]) => {
    namingMap[className] = obj.uid + obj.junk;
  });

  //Build a list of keyframes and add them to t
  return { cssString: (cssString += keyframesStr), css: namingMap };
};

module.exports = {
  getCSS,
};

// console.clear();
// console.log("tailwind-to-css git:(master)");
// const { cssString: css, css: cssObj } = getCSS({ testClass: "break-normal animate-icon-shake" });
// console.log("________________________________\ncssString");
// console.log(css);
// console.log("Css Obj:\n\t", cssObj);
// console.log("________________________________");
