const sizesMap = {
  five: "75.9988rem",
  four: " 46.9706rem",
  three: "29.03rem",
  two: "17.9419rem",
  one: "11.0887rem",
  large: "6.8537rem",
  med: "4.2356rem",
  small: "2.6181rem",
  xsmall: "1.6175rem",
  "2xsmall": "1rem",
  "3xsmall": "0.6181rem",
  px: "1px",
  auto: "auto",
  full: "100%",
  screen: "100vw",
  svw: "100svw",
  lvw: "100lvw",
  svh: "100svh",
  lvh: "100lvh",
  dvw: "100dvw",
  min: "min-content",
  max: "max-content",
  fit: "fit-content",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
};

/**
 *
 * @param {string} key
 */
const getSize = (key) => {
  if (key in sizesMap) {
    return sizesMap[key];
  }
  //handle a fraction
  else if (key.includes("/") && !isNaN(parseFloat(key))) {
    const [numerator, denominator] = key.split("/");
    const value = (numerator / denominator) * 100;
    return `${value}%`;
  }

  //handle a number
  else if (!isNaN(parseFloat(key))) {
    const value = parseFloat(key) / 4;
    return `${value}rem`;
  }

  //Handle dynamic css values
  else if (/^\[.*?\]/.test(key)) {
    const value = key.replace(/(\[)|(\])/g, "");
    return value;
  }
};

const dimensionMap = {
  h: "height",
  w: "width",
};
const getDimension = (arr) => {
  if (arr.length !== 2) return;
  const size = getSize(arr[1]);
  if (size && arr[0] in dimensionMap) {
    return `${dimensionMap[arr[0]]}: ${size};`;
  }
};

const getMinMax = (arr) => {
  if (arr.length !== 3) return;
  const size = getSize(arr[2]);
  if (size && arr[1] in dimensionMap) {
    return `${arr[0]}-${dimensionMap[arr[1]]}: ${size};`;
  }
};

const getSizeCSS = (arr) => {
  arr.splice(0, 1);

  const size = getSize(arr.join("-"));
  if (size) {
    return `width: ${size};height: ${size};`;
  }
};

module.exports = {
  getSize,
  getSizeCSS,
  getDimension,
  getMinMax,
};
