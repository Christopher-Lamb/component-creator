const { getDimension, getMinMax, getSizeCSS, getSize } = require("../css-functions/sizing");
const { getText, getFont, getBreak, getWhiteSpace, getLeading, getTracking, getLine } = require("../css-functions/typography");
const { getCursor, getResize, getScroll, getAccent } = require("../css-functions/interactivity");
const { getFill, getStroke } = require("../css-functions/svg");
const { getObjectCSS, getOverFlow, getTRBL } = require("../css-functions/layout");
const { getBackground } = require("../css-functions/background");
const { getBorder, getOutline, getRounded } = require("../css-functions/borders");
const { getTransition, getDuration, getEase, getDelay } = require("../css-functions/transition");
const { getScale, getRotate, getTranslate, getOrigin, getList } = require("../css-functions/transforms");
const { getMisc, getVar } = require("../css-functions/misc");
const { getBoxSpacing } = require("../css-functions/spacing");
const { getShadow, getBlur, getBrightness, getContrast, getGrayscale, getAnimate } = require("../css-functions/effects");
const { getFlex, getBasis, getGrid, getCol, getRow, getGap, getJustify, getContent, getItems, getSelf, getPlace } = require("../css-functions/flex-grid");
const { getFrom, getVia, getTo } = require("../css-functions/gradient");

const breakpoints = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
const pseudoClasses = ["hover", "active", "focus", "after", "before", "even", "odd", "first", "first-child", "last", "required", "disabled", "enabled", "checked", "default"];
const utilityClasses = [
  "peer-focus",
  "peer-placeholder-shown",
  "peer-checked",
  "peer-invalid",
  "peer-valid",
  "peer-disabled",
  "peer-readonly",
  "peer-hover",
  "peer-active",
  "peer-autofill",
  "peer-required",
  "peer-indeterminate",
  "peer-focus-visible",
  "group-hover",
  "group-focus",
  "group-active",
  "group-focus-visible",
  "group-invalid",
  "group-valid",
  "group-checked",
  "group-disabled",
  "group-readonly",
  "group-open",
  "group-indeterminate",
  "group-placeholder-shown",
];

const cssObjTemplate = { breakpoint: "", pseudoClass: "", utilityClass: "", css: "", keyframes: { id: "", string: "" }, junk: "" };

const getClassType = (string) => {
  let typeObj = { breakpoint: "", pseudoClass: "", utilityClass: "" };
  let arr = string.split(":");
  const cssStr = arr.splice(arr.length - 1, 1);
  // console.log("cssStr", cssStr);
  arr.forEach((element) => {
    // console.log("element:", element);
    if (breakpoints.includes(element)) {
      typeObj.breakpoint = element;
    } else if (pseudoClasses.includes(element)) {
      typeObj.pseudoClass = element;
    } else if (utilityClasses.includes(element)) {
      // console.log("utility check:", utilityClasses.includes(element));
      typeObj.utilityClass = element;
    }
  });

  return { ...typeObj, cssStr: cssStr[0] };
};

const TailwindtoCSS = (tailwindStr) => {
  let classes;
  // console.log("\n________________________________\nTailwindToCSS\n-----------------\n");

  try {
    classes = tailwindStr
      .split(" ")
      .filter((i) => i)
      .map((item) => {
        return item.split("-");
      });
  } catch (err) {
    classes = [];
  }
  // // console.log(
  //   "\n==========================================================================================================\nClasses:\n",
  //   classes,
  //   "\n__________________________________________________________________________________________________________"
  // );
  let currentStr = "";
  const css = classes.map((arr, i) => {
    currentStr = arr.join("-");
    let classObj = { ...cssObjTemplate };
    // console.log("currentStr:", currentStr);
    if (currentStr.includes(":")) {
      const { breakpoint, pseudoClass, utilityClass, cssStr } = getClassType(currentStr);

      classObj.breakpoint = breakpoint || "";
      classObj.pseudoClass = pseudoClass || "";
      classObj.utilityClass = utilityClass || "";
      arr = cssStr.split("-");
    }
    // // console.log("\narr:\n", arr, "\n__________________________________________________________________________________________________________");
    switch (arr[0]) {
      case "":
        classObj.css = getVar(arr);
        break;
      case "bg":
        classObj.css = getBackground(arr);
        break;
      case "h":
      case "w":
        classObj.css = getDimension(arr);
        break;
      case "min":
      case "max":
        classObj.css = getMinMax(arr);
        break;
      case "top":
      case "right":
      case "left":
      case "bottom":
      case "inset":
      case "start":
      case "end":
        classObj.css = getTRBL(arr);
        break;
      case "z":
        const z = arr[1];
        if (!z) {
          classObj.css = "";
          break;
        }
        classObj.css = `z-index: ${z};`;
        break;
      case "p":
      case "px":
      case "py":
      case "ps":
      case "pe":
      case "pt":
      case "pr":
      case "pb":
      case "pl":
      case "m":
      case "mx":
      case "my":
      case "ms":
      case "me":
      case "mt":
      case "mr":
      case "mb":
      case "ml":
        classObj.css = getBoxSpacing(arr);
        break;
      case "object":
        classObj.css = getObjectCSS(arr);
        break;
      case "overflow":
        classObj.css = getOverFlow(arr);
        break;
      case "font":
        classObj.css = getFont(arr);
        break;
      case "text":
        classObj.css = getText(arr);
        break;
      case "leading":
        classObj.css = getLeading(arr);
        break;
      case "tracking":
        classObj.css = getTracking(arr);
        break;
      case "line":
        classObj.css = getLine(arr);
        break;
      case "whitespace":
        classObj.css = getWhiteSpace(arr);
        break;
      case "break":
        classObj.css = getBreak(arr);
        break;
      case "list":
        classObj.css = getList(arr);
        break;
      case "rounded":
        classObj.css = getRounded(arr);
        break;
      case "border":
        classObj.css = getBorder(arr);
        break;
      case "outline":
        classObj.css = getOutline(arr);
        break;
      case "shadow":
        classObj.css = getShadow(arr);
        break;
      case "opacity":
        if (!isNaN(parseInt(arr[1]))) classObj.css = `opacity: ${arr[1] / 100};`;
        break;
      case "blur":
        classObj.css = getBlur(arr);
        break;
      case "brightness":
        classObj.css = getBrightness(arr);
        break;
      case "contrast":
        classObj.css = getContrast(arr);
        break;
      case "grayscale":
        classObj.css = getGrayscale(arr);
        break;
      case "transition":
        classObj.css = getTransition(arr);
        break;
      case "duration":
        classObj.css = getDuration(arr);
        break;
      case "ease":
        classObj.css = getEase(arr);
        break;
      case "delay":
        classObj.css = getDelay(arr);
        break;
      case "scale":
        classObj.css = getScale(arr);
        break;
      case "rotate":
        classObj.css = getRotate(arr);
        break;
      case "translate":
        classObj.css = getTranslate(arr);
        break;
      case "origin":
        classObj.css = getOrigin(arr);
        break;
      case "cursor":
        classObj.css = getCursor(arr);
        break;
      case "resize":
        classObj.css = getResize(arr);
        break;
      case "scroll":
        classObj.css = getScroll(arr);
        break;
      case "accent":
        classObj.css = getAccent(arr);
        break;
      case "size":
        classObj.css = getSizeCSS(arr);
        break;
      case "select":
        if (arr.length === 2) {
          classObj.css = `user-select: ${arr[1]};`;
          break;
        }
        classObj.css = "";
        break;
      case "fill":
        classObj.css = getFill(arr);
        break;
      case "stroke":
        classObj.css = getStroke(arr);
        break;
      case "flex":
        classObj.css = getFlex(arr);
        break;
      case "basis":
        classObj.css = getBasis(arr);
        break;
      case "grid":
        classObj.css = getGrid(arr);
        break;
      case "col":
        classObj.css = getCol(arr);
        break;
      case "row":
        classObj.css = getRow(arr);
        break;
      case "gap":
        classObj.css = getGap(arr);
        break;
      case "justify":
        classObj.css = getJustify(arr);
        break;
      case "content":
        classObj.css = getContent(arr);
        break;
      case "items":
        classObj.css = getItems(arr);
        break;
      case "self":
        classObj.css = getSelf(arr);
        break;
      case "place":
        classObj.css = getPlace(arr);
        break;
      case "from":
        classObj.css = getFrom(arr);
        break;
      case "via":
        classObj.css = getVia(arr);
        break;
      case "to":
        classObj.css = getTo(arr);
        break;
      case "animate":
        const { id, css, string } = getAnimate(arr);
        if (id) {
          classObj.css = css;
          classObj.keyframes.id = id;
          classObj.keyframes.string = string;
        }
        break;
      default:
        classObj.css = getMisc(arr);
        break;
    }
    // Bandaid and maybe a symptom bad code
    if (!classObj.css) {
      // console.log("Junk:", currentStr);
      classObj = { ...cssObjTemplate, junk: currentStr };
    }

    return classObj;
  });
  // .map((obj) => {
  //   // const bool = !!obj?.css;
  //   // // console.log(classes, obj);
  //   if (typeof obj.css === undefined) {
  //     // console.log("here");
  //     return { ...obj, pseudoClasses: "", breakpoints: "", css: "" };
  //   }
  //   return obj;
  // });

  //this will return an array of all the objects
  return { css };
};

module.exports = {
  TailwindtoCSS,
};


