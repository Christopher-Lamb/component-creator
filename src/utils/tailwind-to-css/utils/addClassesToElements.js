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

/**
 * Takes a string of html and adds custom className based on CSS map
 * 
 * @param {string} html
 * @param {object} classMap
 * @param {string} listStyleImage => the css url() format
 * @returns
 */
function addClassesToElements(html, classMap, listStyleImage = null) {
  if (typeof html !== "string") return ""; // Ensure valid HTML input

  let newHTML = html; // Work with a copy of the HTML

  // Supported elements
  const elements = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "li", "ul", "strong", "i", "a"];

  // Convert { h1Class: "className" } → { h1: "className" }
  const processedClassMap = {};
  Object.entries(classMap).forEach(([key, value]) => {
    const element = key.replace(/Class$/, ""); // Remove "Class" suffix if present
    if (elements.includes(element)) {
      processedClassMap[element] = value;
    }
  });

  // Iterate over each tag in classMap and apply classes
  Object.entries(processedClassMap).forEach(([tag, className]) => {
    const regex = new RegExp(`(<${tag}[^>]*)(class=["'][^"']*["'])?`, "gi");

    newHTML = newHTML.replace(regex, (match, p1, p2) => {
      if (p2) {
        return `${p1}${p2.replace(/["']$/, ` ${className}"`)}`;
      } else {
        return `${p1} class="${className}"`;
      }
    });
  });
  // If listStyleImage is provided, inject a <style> tag and add a class to applicable <li> elements
  if (listStyleImage) {
    const beforeClass = generateUniqueId("custom-list-style"); // Class to apply the ::before styles

    // Inject <style> tag with ::before pseudo-element styling
    const styleTag = `
      <style>
        .${beforeClass} {
          position: relative;
        }
        .${beforeClass}::before {
          content: "";
          position: absolute;
          left: 0;
          background-image: ${listStyleImage};
          background-size: contain;
          background-repeat: no-repeat;
        }
      </style>
    `;

    // Add the style tag at the beginning of <body> or <head>
    // newHTML = `${match}\n${styleTag}` + newHTML;

    // New regex: Ensures we properly capture existing classes or add a new one if none exist
    const liRegex = /<li[^>]*(\bclass\s*=\s*["']([^"']*)["'])?[^>]*>/gi;

    newHTML = newHTML.replace(liRegex, (match) => {
      const css = match.match(/class=["']([^"']+)["']/);

      if (css) {
        // Append new class to existing classes (only if it’s not already present)
        return `<li class="${css[1]} ${beforeClass}">`;
      } else {
        // If no class attribute exists, add it properly
        return `<li class="${beforeClass}">`;
      }
    });
    newHTML = styleTag + newHTML;
  }

  return newHTML;
}

module.exports = { addClassesToElements };
