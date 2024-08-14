const { getSize } = require("./sizing");

const objectMap = {
  contain: "object-fit: contain;",
  cover: "object-fit: cover;",
  fill: "object-fit: fill;",
  none: "object-fit: none;",
  "scale-down": "object-fit: scale-down;",
  bottom: "object-position: bottom;",
  center: "object-position: center;",
  left: "object-position: left;",
  "left-bottom": "object-position: left bottom;",
  "left-top": "object-position: left top;",
  right: "object-position: right;",
  "right-bottom": "object-position: right bottom;",
  "right-top": "object-position: right top;",
  top: "object-position: top;",
};

const getObjectCSS = (arr) => {
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key in objectMap) {
    return objectMap[key];
  }
};

const overflowMap = {
  auto: "overflow: auto;",
  hidden: "overflow: hidden;",
  clip: "overflow: clip;",
  visible: "overflow: visible;",
  scroll: "overflow: scroll;",
};

const getOverFlow = (arr) => {
  if (arr.length === 2) {
    if (arr[1] in overflowMap) {
      return overflowMap[arr[1]];
    }
  } else if (arr.length === 3) {
    if (["x", "y"].includes(arr[1]) && arr[2] in overflowMap) {
      return `overflow-${arr[1]}: ${arr[2]};`;
    }
  }
};

const TRBLMap = {
  top: "top",
  left: "left",
  right: "right",
  bottom: "bottom",
  start: "inset-inline-start",
  end: "inset-inline-end",
  inset: "inset",
};

const getTRBL = (arr) => {
  const direction = arr[0];
  arr.splice(0, 1);

  const newArr = arr.join("-").split(/-(?![^[\]]*\])/);

  if (newArr.length === 1) {
    const size = getSize(newArr[0]);
    if (size && direction in TRBLMap) return `${TRBLMap[direction]}: ${size};`;
  } else if (newArr.length === 2) {
    const size = getSize(newArr[1]);

    //Backwards and tricky
    if (direction !== "inset" || !size) return;

    if (newArr[0] === "x") {
      return `left: ${size}; right: ${size};`;
    } else if (newArr[0] === "y") {
      return `top: ${size}; bottom: ${size};`;
    }
  }
};

module.exports = {
  getObjectCSS,
  getOverFlow,
  getTRBL,
};
