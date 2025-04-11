const { getSize } = require("./sizing");


// Not tolerant of spaces in brackets
// Ex: scale-[1, 2] 
const getScale = (arr) => {
  // Pop off leading "scale" string
  arr.splice(0, 1);
  let letter = ""; // To track 'x' or 'y'
  let num = ""; // To store the numeric value

  // Check if the scale specifies x or y
  if (["x", "y"].includes(arr[0])) {
    letter = arr[0];
    arr.splice(0, 1);
  }

  const key = arr.join("-");
  // Check if we are using a custom value (e.g., scale-x-[1.5])
  if (/^\[.*?\]$/.test(key)) {
    // Remove the brackets and get the custom value
    num = key.slice(1, -1);
  } else {
    // Simplify the Tailwind strings by dividing by 100
    // e.g., scale-100 => scale(1)
    num = parseInt(key, 10) / 100;
  }

  if (num) {
    return `transform: scale${letter ? letter.toUpperCase() : ""}(${num});`;
  }
  return null; // Return null if no valid transformation
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

const listMap = {
  inside: "list-style-position: inside;",
  outside: "list-style-position: outside;",
  "image-none": "list-style-image: none;",
  none: "list-style-type: none;",
  disc: "list-style-type: disc;",
  decimal: "list-style-type: decimal;",
};

const getList = (arr) => {
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key in listMap) {
    return listMap[key];
  }
  //Handle dynamic css values
  if (arr.length === 1) {
    if (/^\[.*?\]/.test(key)) {
      // list-style-image: url('/static/your-image.png');
      const value = key.replace(/(\[)|(\])/g, "");

      return `list-style-type: ${value};`;
    }
  } else if (arr[0] === "image") {
    arr.splice(0, 1);
    const key = arr.join("-");
    if (/^\[.*?\]/.test(key)) {
      // list-style-image: url('/static/your-image.png');
      const value = key.replace(/(\[)|(\])/g, "");

      return `list-style-image: url('${value}');`;
    }
  }
};

module.exports = {
  getTranslate,
  getRotate,
  getScale,
  getOrigin,
  getList,
};
