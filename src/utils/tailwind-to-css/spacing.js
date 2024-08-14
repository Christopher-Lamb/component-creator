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
    const size = getSize(arr[1]);
    if (size && size !== "auto") {
      return boxSpacingMap[arr[0]](size);
    }
    if (arr[0].startsWith("m") && arr[1] === "auto") {

      return boxSpacingMap[arr[0]]("auto");
    }
  }
};

module.exports = {
  getBoxSpacing,
};
