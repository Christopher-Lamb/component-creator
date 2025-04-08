const { getColor } = require("./colors");

const getFill = (arr) => {
  arr.splice(0, 1);
  if (arr.length === 1 && arr[0] === "none") {
    return `fill: none;`;
  }
  const color = getColor(arr.join("-"));
  if (color) {
    return `fill: ${color};`;
  }
};

const getStroke = (arr) => {
  arr.splice(0, 1);
  if (arr.length === 1 && arr[0] === "none") {
    return `stroke: none;`;
  }
  const color = getColor(arr.join("-"));
  if (color) {
    return `stroke: ${color};`;
  }
  if (arr.length === 1 && !isNaN(parseFloat(arr[0]))) {
    return `stroke-width: ${arr[0]};`;
  }
};


module.exports = {
  getFill,
  getStroke,
};
