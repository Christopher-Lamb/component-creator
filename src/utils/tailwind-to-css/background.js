const { getColor } = require("./colors");

const backgroundMap = {
  auto: "background-size: auto;",
  cover: "background-size: cover;",
  contain: "background-size: contain;",
};

const getBackground = (arr) => {
  arr.splice(0, 1);
  const key = arr[0];
  if (key in backgroundMap) {
    return backgroundMap[key];
  }
  const color = getColor(arr.join("-"));
  if (color) {
    return `background-color: ${color};`;
  }
};

module.exports = {
  getBackground,
};
