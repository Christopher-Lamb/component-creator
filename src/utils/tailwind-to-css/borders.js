const { getColor } = require("./colors");

const borderMap = {
  solid: "border-style: solid;",
  dashed: "border-style: dashed;",
  dotted: "border-style: dotted;",
  double: "border-style: double;",
  hidden: "border-style: hidden;",
  none: "border-style: none;",
};

const borderTypeMap = {
  b: "bottom",
  t: "top",
  r: "right",
  l: "left",
  s: "inline-start",
  e: "inline-end",
};

const getBorder = (arr) => {
  if (arr.length === 1) {
    return "border-width: 1px;";
  }
  arr.splice(0, 1);
  if (arr[1] in borderMap) {
    return `border-style: ${borderMap[arr[1]]};`;
  }

  //border-{any}
  if (arr.length === 1) {
    //border-{color}
    const borderColor = getColor(arr[0]);
    if (borderColor) return `border-color: ${borderColor};`;
    if (!isNaN(parseInt(arr[0]))) {
      //border-{number}
      return `border-width: ${arr[0]}px;`;
    }
    //border-{letter}
    else if (arr[0] === "x") return `border-left-width: 1px; border-right-width: 1px;`;
    else if (arr[0] === "y") return `border-top-width: 1px; border-bottom-width: 1px;`;
    else if (arr[0] in borderTypeMap) return `border-${borderTypeMap[arr[0]]}-width: 1px;`;
  }
  //border-{any}-{any}
  else if (arr.length === 2) {
    //border-{color}-{color}
    const borderColor = getColor(arr.join("-"));
    if (borderColor) return `border-color: ${borderColor};`;
    // border-{letter}-{number}
    else if (!isNaN(parseInt(arr[1]))) {
      if (arr[0] === "x") return `border-left-width: ${arr[1]}px; border-right-width: ${arr[1]}px;`;
      else if (arr[0] === "y") return `border-top-width: ${arr[1]}px; border-bottom-width: ${arr[1]}px;`;
      else if (arr[0] in borderTypeMap) return `border-${borderTypeMap[arr[0]]}-width: ${arr[1]}px;`;
    }
    //border-{letter}-{color}
    else {
      const color = getColor(arr[1]);
      if (!color) return;
      else if (arr[0] === "x") return `border-left-color: ${color}; border-right-color: ${color};`;
      else if (arr[0] === "y") return `border-top-color: ${color}; border-bottom-color: ${color};`;
      else if (arr[0] in borderTypeMap) return `border-${borderTypeMap[arr[0]]}-color: ${color};`;
    }
  }
  // border-{letter}-{color}-{color}
  else if (arr.length === 3) {
    const letter = arr.splice(0, 1)[0];

    const color = getColor(arr.join("-"));
    if (!color) return;
    else if (letter === "x") return `border-left-color: ${color}; border-right-color: ${color};`;
    else if (letter === "y") return `border-top-color: ${color}; border-bottom-color: ${color};`;
    else if (letter in borderTypeMap) return `border-${borderTypeMap[letter]}-color: ${color};`;
  }
};

const outlineMap = {
  none: "outline: 2px solid transparent; outline-offset: 2px;",
  dashed: "outline-style: dashed;",
  dotted: "outline-style: dotted;",
  double: "outline-style: double;",
};

const getOutline = (arr) => {
  if (arr.length === 1) {
    return `outline-style: solid`;
  }
  arr.splice(0, 1);
  //outline-{map}
  if (arr[0] in outlineMap) {
    return outlineMap[arr[0]];
  }
  // outline-{color}-{color}
  const outlineColor = getColor(arr.join("-"));
  if (outlineColor) return `outline-color: ${outlineColor};`;

  // outline-{any}-{number}
  if (arr[0] === "offset") {
    return `outline-offset: ${arr[1]}px;`;
  }
  if (arr.length === 1 && !isNaN(parseInt(arr[0]))) {
    return `outline-width: ${arr[0]}px;`;
  }
};

const sizeMap = {
  none: "0px",
  sm: "0.125rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  full: "9999px",
};

const funcMap = {
  s: (amt) => `border-start-start-radius: ${amt};border-end-start-radius: ${amt};`,
  e: (amt) => `border-start-end-radius: ${amt};border-end-end-radius: ${amt};`,
  t: (amt) => `border-top-left-radius: ${amt};border-top-right-radius: ${amt};`,
  r: (amt) => `border-top-right-radius: ${amt};border-bottom-right-radius: ${amt};`,
  b: (amt) => `border-bottom-right-radius: ${amt};border-bottom-left-radius: ${amt};`,
  l: (amt) => `border-top-left-radius: ${amt};border-bottom-left-radius: ${amt};`,
  ss: (amt) => `border-start-start-radius: ${amt};`,
  se: (amt) => `border-start-end-radius: ${amt};`,
  ee: (amt) => `border-end-end-radius: ${amt};`,
  es: (amt) => `border-end-start-radius: ${amt};`,
  tl: (amt) => `border-top-left-radius: ${amt};`,
  tr: (amt) => `border-top-right-radius: ${amt};`,
  br: (amt) => `border-bottom-right-radius: ${amt};`,
  bl: (amt) => `border-bottom-left-radius: ${amt};`,
};

const getRounded = (arr) => {
  if (arr.length === 1) return `border-radius: 0.25rem;`;

  if (arr.length === 2) {
    if (arr[1] in funcMap) {
      const func = funcMap[arr[1]];
      return func("0.25rem");
    } else if (arr[1] in sizeMap) {
      return `border-radius: ${sizeMap[arr[1]]};`;
    } else if (/^\[.*?\]/.test(arr[1])) {
      const value = arr[1].replace(/(\[)|(\])/g, "");
      return `border-radius: ${value};`;
    }
  }

  if (arr.length === 3 && arr[1] in funcMap) {
    const func = funcMap[arr[1]];
    if (arr[2] in sizeMap) {
      return func(sizeMap[arr[2]]);
    } else if (/^\[.*?\]/.test(arr[2])) {
      const value = arr[2].replace(/(\[)|(\])/g, "");
      return func(value);
    }
  }
};

module.exports = { getBorder, getOutline, getRounded };
