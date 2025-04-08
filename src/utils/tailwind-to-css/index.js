const { getCSS } = require("./utils/constructor");
const { addClassesToElements } = require("./utils/addClassesToElements");
let lastTime = 0;
let counter = 0;

function generateUniqueId(string) {
  const now = Date.now();
  if (now !== lastTime) {
    counter = 0;
    lastTime = now;
  }
  const uniqueId = `${string}-${now}${(counter++).toString().padStart(3, "0")}${Math.random().toString(16).slice(2, 8)}`;
  return uniqueId;
}

const generateCSSMaps = (cssMap) => {
  let newCSSMap = {};
  let namingMap = {};
  let cssString = "";

  Object.entries(cssMap).forEach(([key, value]) => {
    const newName = generateUniqueId(key);
    namingMap[key] = newName;

    newCSSMap[newName] = value;
  });

  cssString = getCSS(newCSSMap);

  return { newCSSMap, namingMap, cssString };
};

module.exports = {
  getCSS,
  generateCSSMaps,
  addClassesToElements,
};
