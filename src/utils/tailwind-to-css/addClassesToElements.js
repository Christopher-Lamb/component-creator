function addClassesToElements(html, classMap) {
  // Parse the HTML string into a DOM document
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Iterate over the entries in the classMap object
  Object.entries(classMap).forEach(([tag, className]) => {
    // Select all elements of the current tag
    const elements = doc.querySelectorAll(tag);
    // Add the specified class to each element
    elements.forEach((element) => {
      element.classList.add(className);
    });
  });

  // Serialize the DOM back into a string
  return doc.body.innerHTML;
}

module.exports = {
  addClassesToElements,
};
