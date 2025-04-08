const transitionMap = {
  none: "transition-property: none;",
  all: "transition-property: all;transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);transition-duration: 150ms;",
  colors: "transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);transition-duration: 150ms;",
  opacity: "transition-property: opacity;transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);transition-duration: 150ms;",
  shadow: "transition-property: box-shadow;transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);transition-duration: 150ms;",
  transform: "transition-property: transform;transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);transition-duration: 150ms;",
};

const getTransition = (arr) => {
  if (arr.length === 1)
    return "transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);transition-duration: 150ms;";
  if (arr[1] in transitionMap) {
    return transitionMap[arr[1]];
  }
};

const getDuration = (arr) => {
  const milliseconds = parseInt(arr[1]);

  if (!isNaN(milliseconds)) {
    return `transition-duration: ${milliseconds}ms;`;
  }
};

const getDelay = (arr) => {
  const milliseconds = parseInt(arr[1]);

  if (!isNaN(milliseconds)) {
    return `transition-delay: ${milliseconds}ms;`;
  }
};

const easeMap = {
  linear: "transition-timing-function: linear;",
  in: "transition-timing-function: cubic-bezier(0.4, 0, 1, 1);",
  out: "transition-timing-function: cubic-bezier(0, 0, 0.2, 1);",
  "in-out": "transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);",
};

const getEase = (arr) => {
  arr.splice(0, 1);
  const ease = arr.join("-");
  if (ease in easeMap) {
    return easeMap[ease];
  }
};

module.exports = {
  getTransition,
  getDuration,
  getEase,
  getDelay,
};
