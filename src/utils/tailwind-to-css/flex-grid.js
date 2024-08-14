const { getSize } = require("./sizing");

const flexMap = {
  1: "flex: 1 1 0%;",
  auto: "flex: 1 1 auto;",
  initial: "flex: 0 1 auto;",
  none: "flex: none;",
  row: "flex-direction: row;",
  "row-reverse": "flex-direction: row-reverse;",
  col: "flex-direction: column;",
  "col-reverse": "flex-direction: column-reverse;",
  wrap: "flex-wrap: wrap;",
  "wrap-reverse": "flex-wrap: wrap-reverse;",
  nowrap: "flex-wrap: nowrap;",
};

const getFlex = (arr) => {
  if (arr.length === 1) return "display: flex;";
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key in flexMap) {
    return flexMap[key];
  }
};

const getBasis = (arr) => {
  const size = getSize(arr[1]);
  if (size) return `flex-basis: ${size};`;
};

const gridMap = {
  "cols-none": "grid-template-columns: none;",
  "cols-subgrid": "grid-template-columns: subgrid;",
  "rows-none": "grid-template-rows: none;",
  "rows-subgrid": "grid-template-rows: subgrid;",
  "flow-row": "grid-auto-flow: row;",
  "flow-col": "grid-auto-flow: column;",
  "flow-dense": "grid-auto-flow: dense;",
  "flow-row-dense": "grid-auto-flow: row dense;",
  "flow-col-dense": "grid-auto-flow: column dense;",
};

const getGrid = (arr) => {
  if (arr.length === 1) return "display: grid;";
  arr.splice(0, 1);
  if (arr[0] === "cols" && arr.length === 2 && !isNaN(parseInt(arr[1]))) {
    return `grid-template-columns: repeat(${arr[1]}, minmax(0, 1fr));`;
  }
  if (arr[0] === "rows" && arr.length === 2 && !isNaN(parseInt(arr[1]))) {
    return `grid-template-rows: repeat(${arr[1]}, minmax(0, 1fr));`;
  }
  const key = arr.join("-");
  if (key in gridMap) {
    return gridMap[key];
  }
};

const colMap = {
  auto: "grid-column: auto;",
  "span-full": "grid-column: 1 / -1;",
  "start-auto": "grid-column-start: auto;",
  "end-auto": "grid-column-end: auto;",
};

const getCol = (arr) => {
  //span start end
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key in colMap) {
    return colMap[key];
  }

  if (arr.length === 2 && arr[0] === "span" && !isNaN(parseInt(arr[1]))) {
    return `grid-column: span ${arr[1]} / span ${arr[1]};`;
  }
  if (arr.length === 2 && ["start", "end"].includes(arr[0]) && !isNaN(parseInt(arr[1]))) {
    return `grid-column-${arr[0]}: ${arr[1]};`;
  }
};
const rowMap = {
  auto: "grid-row: auto;",
  "span-full": "grid-row: 1 / -1;",
  "start-auto": "grid-row-start: auto;",
  "end-auto": "grid-row-end: auto;",
};

const getRow = (arr) => {
  //span start end
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key in rowMap) {
    return rowMap[key];
  }

  if (arr.length === 2 && arr[0] === "span" && !isNaN(parseInt(arr[1]))) {
    return `grid-row: span ${arr[1]} / span ${arr[1]};`;
  }
  if (arr.length === 2 && ["start", "end"].includes(arr[0]) && !isNaN(parseInt(arr[1]))) {
    return `grid-row-${arr[0]}: ${arr[1]};`;
  }
};

const gapMap = {
  x: "column-",
  y: "row-",
};

const getGap = (arr) => {
  arr.splice(0, 1);
  if (arr.length === 1) {
    const size = getSize(arr[0]);
    if (size) {
      return `gap: ${size};`;
    }
  } else if (arr.length === 2) {
    if (arr[0] in gapMap) {
      const size = getSize(arr[1]);
      if (size) {
        return `${gapMap[0]}gap: ${size};`;
      }
    }
  }
};

const justifyMap = {
  normal: "justify-content: normal;",
  start: "justify-content: flex-start;",
  end: "justify-content: flex-end;",
  center: "justify-content: center;",
  between: "justify-content: space-between;",
  around: "justify-content: space-around;",
  evenly: "justify-content: space-evenly;",
  stretch: "justify-content: stretch;",
  "items-start": "justify-items: start;",
  "items-end": "justify-items: end;",
  "items-center": "justify-items: center;",
  "items-stretch": "justify-items: stretch;",
  "self-auto": "justify-self: auto;",
  "self-start": "justify-self: start;",
  "self-end": "justify-self: end;",
  "self-center": "justify-self: center;",
  "self-stretch": "justify-self: stretch;",
};

const getJustify = (arr) => {
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key && key in justifyMap) {
    return justifyMap[key];
  }
};

const contentMap = {
  normal: "align-content: normal;",
  center: "align-content: center;",
  start: "align-content: flex-start;",
  end: "align-content: flex-end;",
  between: "align-content: space-between;",
  around: "align-content: space-around;",
  evenly: "align-content: space-evenly;",
  baseline: "align-content: baseline;",
  stretch: "align-content: stretch;",
  none: "content: none;",
};

const getContent = (arr) => {
  if (arr.length === 1) {
    return 'content: "";';
  }

  arr.splice(0, 1);
  const key = arr.join("-");
  if (key && key in contentMap) {
    return contentMap[key];
  }
  if (/^\[.*?\]$/.test(key)) {
    const newKey = key.replace(/(\[)|(\])/g, "");
    return `content: "${newKey}";`;
  }
};

const itemsMap = {
  start: "align-items: flex-start;",
  end: "align-items: flex-end;",
  center: "align-items: center;",
  baseline: "align-items: baseline;",
  stretch: "align-items: stretch;",
};

const getItems = (arr) => {
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key && key in itemsMap) {
    return itemsMap[key];
  }
};

const selfMap = {
  auto: "align-self: auto;",
  start: "align-self: flex-start;",
  end: "align-self: flex-end;",
  center: "align-self: center;",
  stretch: "align-self: stretch;",
  baseline: "align-self: baseline;",
};
const getSelf = (arr) => {
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key && key in selfMap) {
    return selfMap[key];
  }
};

const placeMap = {
  "content-center": "place-content: center;",
  "content-start": "place-content: start;",
  "content-end": "place-content: end;",
  "content-between": "place-content: space-between;",
  "content-around": "place-content: space-around;",
  "content-evenly": "place-content: space-evenly;",
  "content-baseline": "place-content: baseline;",
  "content-stretch": "place-content: stretch;",
  "items-start": "place-items: start;",
  "items-end": "place-items: end;",
  "items-center": "place-items: center;",
  "items-baseline": "place-items: baseline;",
  "items-stretch": "place-items: stretch;",
  "self-auto": "place-self: auto;",
  "self-start": "place-self: start;",
  "self-end": "place-self: end;",
  "self-center": "place-self: center;",
  "self-stretch": "place-self: stretch;",
};

const getPlace = (arr) => {
  arr.splice(0, 1);
  const key = arr.join("-");
  if (key && key in placeMap) {
    return placeMap[key];
  }
};
module.exports = {
  getFlex,
  getBasis,
  getGrid,
  getCol,
  getRow,
  getGap,
  getJustify,
  getContent,
  getItems,
  getSelf,
  getPlace,
};
