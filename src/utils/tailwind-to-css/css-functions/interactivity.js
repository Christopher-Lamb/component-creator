const { getColor } = require("./colors");

const cursorMap = {
  auto: "cursor: auto;",
  default: "cursor: default;",
  pointer: "cursor: pointer;",
  wait: "cursor: wait;",
  text: "cursor: text;",
  move: "cursor: move;",
  help: "cursor: help;",
  "not-allowed": "cursor: not-allowed;",
  none: "cursor: none;",
  "context-menu": "cursor: context-menu;",
  progress: "cursor: progress;",
  cell: "cursor: cell;",
  crosshair: "cursor: crosshair;",
  "vertical-text": "cursor: vertical-text;",
  alias: "cursor: alias;",
  copy: "cursor: copy;",
  "no-drop": "cursor: no-drop;",
  grab: "cursor: grab;",
  grabbing: "cursor: grabbing;",
  "all-scroll": "cursor: all-scroll;",
  "col-resize": "cursor: col-resize;",
  "row-resize": "cursor: row-resize;",
  "n-resize": "cursor: n-resize;",
  "e-resize": "cursor: e-resize;",
  "s-resize": "cursor: s-resize;",
  "w-resize": "cursor: w-resize;",
  "ne-resize": "cursor: ne-resize;",
  "nw-resize": "cursor: nw-resize;",
  "se-resize": "cursor: se-resize;",
  "sw-resize": "cursor: sw-resize;",
  "ew-resize": "cursor: ew-resize;",
  "ns-resize": "cursor: ns-resize;",
  "nesw-resize": "cursor: nesw-resize;",
  "nwse-resize": "cursor: nwse-resize;",
  "zoom-in": "cursor: zoom-in;",
  "zoom-out": "cursor: zoom-out;",
};

const getCursor = (arr) => {
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key in cursorMap) {
    return cursorMap[key];
  }
};

const resizeMap = {
  none: "resize: none;",
  y: "resize: vertical;",
  x: "resize: horizontal;",
};

const getResize = (arr) => {
  if (arr.length === 1) return "resize: both;";
  if (arr[1] in resizeMap) {
    return resizeMap[arr[1]];
  }
};

const getScroll = (arr) => {
  if (arr[1] === "smooth") {
    return `scroll-behavior: smooth;`;
  } else if (arr[1] === "auto") {
    return `scroll-behavior: auto;`;
  }
};

const getAccent = (arr) => {
  arr.splice(0, 1);
  const val = arr.join("-");

  const color = getColor(val);
  if (color) {
    return `accent-color: ${color};`;
  }
};

module.exports = {
  getCursor,
  getScroll,
  getResize,
  getAccent,
};
