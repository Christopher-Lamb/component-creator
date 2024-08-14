const { getColor } = require("./colors");
const { getSize } = require("./sizing");

const textMap = {
  xs: "font-size: 0.75rem;line-height: 1rem;",
  sm: "font-size: 0.875rem;line-height: 1.25rem;",
  base: "font-size: 1rem;line-height: 1.5rem;",
  lg: "font-size: 1.125rem;line-height: 1.75rem;",
  xl: "font-size: 1.25rem;line-height: 1.75rem;",
  "2xl": "font-size: 1.5rem;line-height: 2rem;",
  "3xl": "font-size: 1.875rem;line-height: 2.25rem;",
  "4xl": "font-size: 2.25rem;line-height: 2.5rem;",
  "5xl": "font-size: 3rem;line-height: 1;",
  "6xl": "font-size: 3.75rem;line-height: 1;",
  "7xl": "font-size: 4.5rem;line-height: 1;",
  "8xl": "font-size: 6rem;line-height: 1;",
  "9xl": "font-size: 8rem;line-height: 1;",
  two: "font-size: 6.8537rem;line-height: 1;",
  one: "font-size: 4.2356rem;line-height: 1;",
  large: "font-size: 2.6181rem;line-height: 2.8799rem;",
  med: "font-size: 1.6175rem;line-height: 2.0704rem;",
  small18: "font-size: 1.125rem;line-height: 1.5rem;",
  small: "font-size: 1rem;line-height: 1.5rem;",
  xsmall: "font-size: 0.6181rem;line-height: 0.883rem;",
  left: "text-align: left;",
  center: "text-align: center;",
  right: "text-align: right;",
  justify: "text-align: justify;",
  start: "text-align: start;",
  end: "text-align: end;",
  wrap: "text-wrap: wrap;",
  nowrap: " text-wrap: nowrap;",
  balance: "text-wrap: balance;",
  pretty: "text-wrap: pretty;",
};

const getText = (arr) => {
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key in textMap) {
    return textMap[key];
  }
  const color = getColor(key);
  if (/(rem)|(px)/g.test(color)) {
    return `font-size: ${color};`;
  }

  if (color) {
    return `color: ${color};`;
  }
};

const fontMap = {
  sans: 'font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
  serif: 'font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;',
  mono: 'font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
  thin: "font-weight: 100;",
  extralight: "font-weight: 200;",
  light: "font-weight: 300;",
  normal: "font-weight: 400;",
  medium: "font-weight: 500;",
  semibold: "font-weight: 600;",
  bold: "font-weight: 700;",
  extrabold: "font-weight: 800;",
  black: "font-weight: 900;",
};

/**
 *
 * @param {Array} key
 */
const getFont = (arr) => {
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key in fontMap) {
    return fontMap[key];
  }
  if (!isNaN(parseInt(arr))) {
    return `font-family: var(--font-${arr});`;
  }
};

const breakMap = {
  normal: "overflow-wrap: normal; word-break: normal;",
  words: "overflow-wrap: break-word;",
  all: "word-break: break-all;",
  keep: "word-break: keep-all;",
};

/**
 *
 * @param {Array} arr
 */
const getBreak = (arr) => {
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key in breakMap) {
    return breakMap[key];
  }
};

const whitespaces = ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"];
const getWhiteSpace = (arr) => {
  arr.splice(0, 1);
  const key = arr.join("-");
  if (whitespaces.includes(key)) {
    return `white-space: ${key};`;
  }
};

const leadingMap = {
  none: "line-height: 1;",
  tight: "line-height: 1.25;",
  snug: "line-height: 1.375;",
  normal: "line-height: 1.5;",
  relaxed: "line-height: 1.625;",
  loose: "line-height: 2;",
};

const getLeading = (arr) => {
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key in leadingMap) {
    return leadingMap[key];
  }
  if (arr.length === 1) {
    const size = getSize(arr[0]);
    if (size) {
      return `line-height: ${size};`;
    }
  }
};

const trackingMap = {
  tighter: "letter-spacing: -0.05em;",
  tight: "letter-spacing: -0.025em;",
  normal: "letter-spacing: 0em;",
  wide: "letter-spacing: 0.025em;",
  wider: "letter-spacing: 0.05em;",
  widest: "letter-spacing: 0.1em;",
};

const getTracking = (arr) => {
  arr.splice();
  const key = arr.join("-");
  if (key in trackingMap) {
    return trackingMap[key];
  }
};

// const lineMap = {};

const getLine = (arr) => {
  arr.splice(0, 1);
  if (arr[0] === "clamp" && arr.length === 2) {
    const val = arr[1];
    if (val === "none") {
      return "overflow: visible;display: block;-webkit-box-orient: horizontal;-webkit-line-clamp: none;";
    }
    if (!isNaN(parseInt(val))) {
      return `overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: ${val};`;
    }
  }
};



module.exports = { getText, getFont, getBreak, getWhiteSpace, getLeading, getTracking, getLine };
