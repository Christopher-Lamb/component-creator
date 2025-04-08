const { getColor } = require("./colors");

const backgroundMap = {
  auto: "background-size: auto;",
  cover: "background-size: cover;",
  contain: "background-size: contain;",
  none: "background-image: none;",
  "gradient-to-t":
    "background-image: linear-gradient(to top, var(--tw-gradient-stops));",
  "gradient-to-tr":
    "background-image: linear-gradient(to top right, var(--tw-gradient-stops));",
  "gradient-to-r":
    "background-image: linear-gradient(to right, var(--tw-gradient-stops));",
  "gradient-to-br":
    "background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));",
  "gradient-to-b":
    "background-image: linear-gradient(to bottom, var(--tw-gradient-stops));",
  "gradient-to-bl":
    "background-image: linear-gradient(to bottom left, var(--tw-gradient-stops));",
  "gradient-to-l":
    "background-image: linear-gradient(to left, var(--tw-gradient-stops));",
  "gradient-to-tl":
    "background-image: linear-gradient(to top left, var(--tw-gradient-stops));",
};

const getBackground = (arr) => {
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key in backgroundMap) {
    return backgroundMap[key];
  }
  const color = getColor(arr.join("-"));
  if (color) {
    return `background: ${color};`;
  }
};


module.exports = {
  getBackground,
};
