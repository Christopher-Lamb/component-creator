const { getCSS } = require("./contructor");
const { addClassesToElements } = require("./addClassesToElements");
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
  Object.entries(cssMap).forEach(([key, value]) => {
    const newName = generateUniqueId(key);
    namingMap[key] = newName;
    newCSSMap[newName] = value;
  });
  return { newCSSMap, namingMap };
};

module.exports = {
  getCSS,
  generateCSSMaps,
  addClassesToElements,
};
