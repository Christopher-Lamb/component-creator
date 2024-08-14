const { getSize } = require("./sizing");

const getScale = (arr) => {
  if (arr.length === 2) {
    const num = parseInt(arr[1]);
    if (!isNaN(num)) {
      return `transform: scale(${num / 100});`;
    }
  }
  if (arr.length === 3) {
    const letter = arr[1];
    const num = parseInt(arr[2]);
    if (!isNaN(num) && ["x", "y"].includes(letter)) {
      return `transform: scale${letter.toUpperCase()}(${num / 100});`;
    }
  }
};

const getRotate = (arr) => {
  const num = parseInt(arr[1]);

  if (!isNaN(num)) {
    return `transform: rotate(${num}deg);`;
  }
};

const getTranslate = (arr) => {
  const letter = arr[1];
  arr.splice(0, 2);
  const num = getSize(arr.join("-"));

  if (num && ["x", "y"].includes(letter)) {
    return `transform: translate${letter.toUpperCase()}(${num});`;
  }
};

const originMap = {
  center: "transform-origin: center;",
  top: "transform-origin: top;",
  "top-right": "transform-origin: top right;",
  right: "transform-origin: right;",
  "bottom-right": "transform-origin: bottom right;",
  bottom: "transform-origin: bottom;",
  "bottom-left": "transform-origin: bottom left;",
  left: "transform-origin: left;",
  "top-left": "transform-origin: top left;",
};
const getOrigin = (arr) => {
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key in originMap) {
    return originMap[key];
  }
};

module.exports = {
  getTranslate,
  getRotate,
  getScale,
  getOrigin,
};
