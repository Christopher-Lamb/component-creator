const { getSize } = require("./sizing");

const boxSpacingMap = {
  p: (amt) => `padding: ${amt};`,
  px: (amt) => `padding-left: ${amt}; padding-right: ${amt};`,
  py: (amt) => `padding-top: ${amt}; padding-bottom: ${amt};`,
  ps: (amt) => `padding-inline-start: ${amt};`,
  pe: (amt) => `padding-inline-end: ${amt};`,
  pt: (amt) => `padding-top: ${amt};`,
  pr: (amt) => `padding-right: ${amt};`,
  pb: (amt) => `padding-bottom: ${amt};`,
  pl: (amt) => `padding-left: ${amt};`,
  m: (amt) => `margin: ${amt};`,
  mx: (amt) => `margin-left: ${amt}; margin-right: ${amt};`,
  my: (amt) => `margin-top: ${amt}; margin-bottom: ${amt};`,
  ms: (amt) => `margin-inline-start: ${amt};`,
  me: (amt) => `margin-inline-end: ${amt};`,
  mt: (amt) => `margin-top: ${amt};`,
  mr: (amt) => `margin-right: ${amt};`,
  mb: (amt) => `margin-bottom: ${amt};`,
  ml: (amt) => `margin-left: ${amt};`,
};

const getBoxSpacing = (arr) => {
  if (arr[0] in boxSpacingMap && arr.length === 2) {
    console.log("runnit");
    const size = getSize(arr[1]);
    if (size && size !== "auto") {
      return boxSpacingMap[arr[0]](size);
    }
    if (arr[0].startsWith("m") && arr[1] === "auto") {
      return boxSpacingMap[arr[0]]("auto");
    }
  }

  const val = arr.splice(0, 1);
  const brackets = arr.join("-");

  if (brackets.startsWith("[") && brackets.endsWith("]")) {
    const size = getSize(brackets);
    if (size) {
      return boxSpacingMap[val](size);
    }
  }
};

module.exports = {
  getBoxSpacing,
};
