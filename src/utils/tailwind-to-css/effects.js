const { getRGB } = require("./rgbColors");

const shadowMap = {
  sm: "box-shadow: 0 1px 2px 0 rgb(var(--shadow-color) / 0.05);",
  md: "box-shadow: 0 4px 6px -1px rgb(var(--shadow-color) / 0.1), 0 2px 4px -2px rgb(var(--shadow-color) / 0.1);",
  lg: "box-shadow: 0 10px 15px -3px rgb(var(--shadow-color) / 0.1), 0 4px 6px -4px rgb(var(--shadow-color) / 0.1);",
  xl: "box-shadow: 0 20px 25px -5px rgb(var(--shadow-color) / 0.1), 0 8px 10px -6px rgb(var(--shadow-color) / 0.1);",
  "2xl": "box-shadow: 0 25px 50px -12px rgb(var(--shadow-color) / 0.25);",
  inner: "box-shadow: inset 0 2px 4px 0 rgb(var(--shadow-color) / 0.05);",
  none: "box-shadow: 0 0 #0000;",
};

const getShadow = (arr) => {
  if (arr.length === 1) return "box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);";
  if (arr[1] in shadowMap) {
    return shadowMap[arr[1]];
  }
  arr.splice(0, 1);
  const val = arr.join("-");
  const color = getRGB(val);
  if (color) {
    return `--shadow-color: ${color};`;
  }
};

const blurMap = {
  none: "filter: blur(0);",
  sm: "filter: blur(4px);",
  blur: "filter: blur(8px);",
  md: "filter: blur(12px);",
  lg: "filter: blur(16px);",
  xl: "filter: blur(24px);",
  "2xl": "filter: blur(40px);",
  "3xl": "filter: blur(64px);",
};

const getBlur = (arr) => {
  if (arr.length === 1) {
    return `filter: blur(8px);`;
  }
  if (arr[1] in blurMap) {
    return blurMap[arr[1]];
  }
};

const getBrightness = (arr) => {
  const brightness = parseInt(arr[1]);
  if (!isNaN(brightness) && arr.length === 2) {
    if (brightness >= 0 && brightness <= 200) return `filter: brightness(${brightness / 100});`;
  }
};

const getContrast = (arr) => {
  const contrast = parseInt(arr[1]);
  if (!isNaN(contrast) && arr.length === 2) {
    if (contrast >= 0 && contrast <= 200) return `filter: contrast(${contrast / 100});`;
  }
};

const getGrayscale = (arr) => {
  if (arr.length === 1) return `filter: grayscale(100%);`;
  if (arr[1] === "0") return `filter: grayscale(0);`;
};

const animateMap = {
  none: ["animation: none;", ""],
  spin: ["animation: spin 1s linear infinite;", "@keyframes spin {  from {    transform: rotate(0deg);  }  to {    transform: rotate(360deg);  }}"],
  ping: ["animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;", "@keyframes ping {  75%, 100% {    transform: scale(2);    opacity: 0;  }}"],
  pulse: ["animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;", "@keyframes pulse {  0%, 100% {    opacity: 1;  }  50% {    opacity: .5;  }}"],
  bounce: [
    "animation: bounce 1s infinite;",
    "@keyframes bounce {  0%, 100% {    transform: translateY(-25%);    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);  }  50% {    transform: translateY(0);    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);  }}",
  ],
  "fun-bounce": [
    "animation: funBounce 2s infinite;",
    "@keyframes funBounce {  0%, 20%, 50%, 80%, 100% {    transform: translateY(0) rotate(0deg);  }  40% {    transform: translateY(-30px) rotate(-10deg);  }  60% {    transform: translateY(-15px) rotate(10deg);  }}",
  ],
};

const getAnimate = (arr) => {
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key in animateMap) {
    return { css: animateMap[key][0], id: key, string: animateMap[key][1] };
  }
  return { id: "", css: "", string: "" };
};

module.exports = {
  getShadow,
  getBlur,
  getBrightness,
  getContrast,
  getGrayscale,
  getAnimate,
};
