const { getRGB } = require("./rgbColors");
const { getColor } = require("./colors");

const fromTemplate = (key) => {
  const hexcode = getColor(key);
  const rgb = getRGB(key);
  if (!hexcode || !rgb) return;
  const str = `--gradient-from: ${hexcode} var(--gradient-from-position);--gradient-to: rgb(${rgb} / 0) var(--gradient-to-position);--gradient-stops: var(--gradient-from), var(--gradient-to);`;
  return str;
};

const getFrom = (arr) => {
  arr.splice(0, 1);

  if (/%$/.test(arr[0]) && arr.length === 1) {
    const num = arr[0].replaceAll("%", "");
    if (!isNaN(parseInt(num))) {
      return `--gradient-from-position: ${parseInt(num)}%;`;
    }
  }

  const key = arr.join("-");
  const template = fromTemplate(key);
  if (template) return template;
};

const viaTemplate = (key) => {
  const hexcode = getColor(key);
  const rgb = getRGB(key);
  if (!hexcode || !rgb) return;

  const str = `--gradient-to: rgb(${rgb} / 0)  var(--gradient-to-position);--gradient-stops: var(--gradient-from), ${hexcode} var(--gradient-via-position), var(--gradient-to);`;
  return str;
};

const getVia = (arr) => {
  arr.splice(0, 1);
  if (/%$/.test(arr[0]) && arr.length === 1) {
    const num = arr[0].replaceAll("%", "");
    if (!isNaN(parseInt(num))) {
      return `--gradient-via-position: ${parseInt(num)}%;`;
    }
  }

  const key = arr.join("-");
  const template = viaTemplate(key);
  if (template) return template;
};

const toTemplate = (key) => {
  const hexcode = getColor(key);
  const rgb = getRGB(key);
  if (!hexcode || !rgb) return;
  const str = `--gradient-to: ${hexcode} var(--gradient-to-position);`;
  return str;
};

const getTo = (arr) => {
  arr.splice(0, 1);
  if (/%$/.test(arr[0]) && arr.length === 1) {
    const num = arr[0].replaceAll("%", "");
    if (!isNaN(parseInt(num))) {
      return `--gradient-to-position: ${parseInt(num)}%;`;
    }
  }
  const key = arr.join("-");
  const template = toTemplate(key);
  if (template) return template;
};

module.exports = {
  getFrom,
  getVia,
  getTo
};
