const miscMap = {
  static: "position: static;",
  fixed: "position: fixed;",
  absolute: "position: absolute;",
  relative: "position: relative;",
  sticky: "position: sticky;",
  visible: "visibility: visible;",
  invisible: "visibility: hidden;",
  collapse: "visibility: collapse;",
  italic: "font-style: italic;",
  "not-italic": "font-style: normal;",
  underline: "text-decoration-line: underline;",
  overline: "text-decoration-line: overline;",
  "line-through": "text-decoration-line: line-through;",
  "no-underline": "text-decoration-line: none;",
  uppercase: "text-transform: uppercase;",
  lowercase: "text-transform: lowercase;",
  capitalize: "text-transform: capitalize;",
  "normal-case": "text-transform: none;",
  grow: "flex-grow: 1;",
  "grow-0": "flex-grow: 0;",
  shrink: "flex-shrink: 1;",
  "shrink-0": "flex-shrink: 0;",
  "normal-nums": "font-variant-numeric: normal;",
  ordinal: "font-variant-numeric: ordinal;",
  "slashed-zero": "font-variant-numeric: slashed-zero;",
  "lining-nums": "font-variant-numeric: lining-nums;",
  "oldstyle-nums": "font-variant-numeric: oldstyle-nums;",
  "proportional-nums": "font-variant-numeric: proportional-nums;",
  "tabular-nums": "font-variant-numeric: tabular-nums;",
  "diagonal-fractions": "font-variant-numeric: diagonal-fractions;",
  "stacked-fractions": "font-variant-numeric: stacked-fractions;",
  block: "display: block;",
  "inline-block": "display: inline-block;",
  inline: "display: inline;",
  "inline-flex": "display: inline-flex;",
  table: "display: table;",
  "inline-table": "display: inline-table;",
  "table-caption": "display: table-caption;",
  "table-cell": "display: table-cell;",
  "table-column": "display: table-column;",
  "table-column-group": "display: table-column-group;",
  "table-footer-group": "display: table-footer-group;",
  "table-header-group": "display: table-header-group;",
  "table-row-group": "display: table-row-group;",
  "table-row": "display: table-row;",
  "flow-root": "display: flow-root;",
  "inline-grid": "display: inline-grid;",
  contents: "display: contents;",
  "list-item": "display: list-item;",
  hidden: "display: none;",
  overlay: "content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1;",
};

const getMisc = (arr) => {
  const key = arr.join("-");
  if (key in miscMap) {
    return miscMap[key];
  }
};

const getVar = (arr) => {
  const [key, value] = arr.join("-").split(/(?=\[.*?\])/);
  if (value && key) {
    const formattedValue = value.replace(/(\[)|(\])/g, "");
    const formattedKey = key.slice(0, -1);
    return `${formattedKey}: ${formattedValue};`;
  }
};

module.exports = {
  getMisc,
  getVar,
};
