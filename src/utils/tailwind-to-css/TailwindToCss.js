const { getDimension, getMinMax } = require("./sizing");
const { getText, getFont, getBreak, getWhiteSpace, getLeading, getTracking, getLine } = require("./typography");
const { getCursor, getResize, getScroll, getAccent } = require("./interactivity");
const { getFill, getStroke } = require("./svg");
const { getObjectCSS, getOverFlow, getTRBL } = require("./layout");
const { getBackground } = require("./background");
const { getBorder, getOutline, getRounded } = require("./borders");
const { getTransition, getDuration, getEase, getDelay } = require("./transition");
const { getScale, getRotate, getTranslate, getOrigin } = require("./transforms");
const { getMisc, getVar } = require("./misc");
const { getBoxSpacing } = require("./spacing");
const { getShadow, getBlur, getBrightness, getContrast, getGrayscale, getAnimate } = require("./effects");
const { getFlex, getBasis, getGrid, getCol, getRow, getGap, getJustify, getContent, getItems, getSelf, getPlace } = require("./flex-grid");

const breakpoints = ["sm", "md", "lg", "xl", "2xl"];
const states = ["hover", "active", "focus", "after", "before"];

const getClassType = (string) => {
  let typeObj = { breakpoint: "", state: "" };
  let arr = string.split(":");
  arr.splice(arr.length - 1, 1);
  arr.forEach((element) => {
    if (breakpoints.includes(element)) {
      typeObj.breakpoint = element;
    } else if (states.includes(element)) {
      typeObj.state = element;
    }
  });

  return typeObj;
};

const TailwindtoCSS = (tailwindStr) => {
  let classes;

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

  const css = classes
    .map((arr) => {
      let classObj = { breakpoint: "", state: "", css: "", keyframes: { id: "", string: "" } };
      if (arr[0].includes(":")) {
        const { breakpoint, state } = getClassType(arr[0]);

        classObj.breakpoint = breakpoint || "";
        classObj.state = state || "";
        arr[0] = arr[0].replace(/[a-z]{1,}:/g, "");
      }

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
      return classObj;
    })
    .filter((obj) => {
      // const bool = !!obj?.css;
      return obj.css;
    });

  //this will return an array of all the objects
  return { css };
};

module.exports = {
  TailwindtoCSS,
};

// const some = TailwindtoCSS("--spirit-halloween-[20rem]");
// console.log(some);
