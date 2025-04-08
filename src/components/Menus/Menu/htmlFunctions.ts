export type FoodItem = {
  name: string;
  description: string;
  price: string;
  serves: string;
};

export function parseFoodItemsFromUl(htmlString: string): FoodItem[] {
  // Regex to match <li ...>...</li> (case-insensitive, capturing groups)
  // We'll capture the attributes in group 1, and the inner content in group 2.
  // 's' or 'dotall' might be needed depending on the environment.
  const liRegex = /<li([^>]*)>([\s\S]*?)<\/li>/gi;

  const result = [];
  let currentItem = null;
  let currentIndentStep = 0;

  let match;
  while ((match = liRegex.exec(htmlString)) !== null) {
    const liAttrs = match[1]; // e.g., ' class="ql-indent-1"'
    const liContent = match[2].trim(); // what's inside the li

    // Check if there's 'ql-indent-1' in the attributes
    // We look for a word boundary around ql-indent-1
    const isIndented = /\bql-indent-1\b/.test(liAttrs);

    // Remove any nested tags inside the content, if any, then trim
    const text = liContent.replace(/<[^>]*>/g, "").trim();

    if (!isIndented) {
      // This is a new top-level food item

      // If we had a previous item, push it into result
      if (currentItem) {
        result.push({ ...currentItem });
      }

      // Create a new item
      currentItem = {
        name: text,
        description: "",
        price: "",
        serves: "",
      };

      // Reset the indent step
      currentIndentStep = 0;
    } else {
      // This li is indented
      // Only set fields if we have a currentItem
      if (!currentItem) {
        // If we find an indented li before a top-level item, ignore
        continue;
      }

      currentIndentStep++;
      switch (currentIndentStep) {
        case 1:
          currentItem.description = text;
          break;
        case 2:
          currentItem.price = text;
          break;
        case 3:
          currentItem.serves = text;
          break;
        default:
          // If we have more than 3 indented lines, ignore or handle as needed
          break;
      }
    }
  }

  // Push the last item if exists
  if (currentItem) {
    result.push(currentItem);
  }

  return result;
}

export type ParsedContent = {
  element: "h1" | "h2" | "h3" | "ul"; // Restrict element to these specific tags
  content: string; // The content inside the tag
};

export function parseHeadingsAndLists(htmlString: string): ParsedContent[] {
  const results: ParsedContent[] = []; // Explicitly type the array

  // Regex captures one of h1/h2/h3/ul into group 1, any attributes in group 2,
  // and the content in group 3, until the matching closing tag.
  // The 's' (dotall) flag allows '.' to match newline.
  // The 'g' flag allows multiple matches.
  // We'll parse out <(h[1-3]|ul)([^>]*)>some stuff</\1>

  const re = /<(h[1-3]|ul)([^>]*)>([\s\S]*?)<\/\1>/gi;
  let match;

  while ((match = re.exec(htmlString)) !== null) {
    const elementName = match[1] as "h1" | "h2" | "h3" | "ul"; // Cast as one of the allowed types
    const innerContent = match[3].trim();

    // Push our object into results
    results.push({
      element: elementName,
      content: innerContent,
    });
  }

  return results;
}
