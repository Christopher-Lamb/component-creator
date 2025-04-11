type GenericObject = Record<string, any>;

/**
 * Save an object to localStorage under a specific key.
 */
export function setLocalObject(key: string, obj: GenericObject): void {
  try {
    const existing = JSON.parse(localStorage.getItem("creator-comp") || "{}");
    existing[key] = obj;
    localStorage.setItem("creator-comp", JSON.stringify(existing));
  } catch (err) {
    console.error("Failed to set object in localStorage:", err);
  }
}

/**
 * Get an object from localStorage by key. If it doesn't exist, create it with the provided default.
 */
export function getLocalObject<T extends GenericObject>(key: string, defaultValue: T): T {
  try {
    const stored = JSON.parse(localStorage.getItem("creator-comp") || "{}");
    if (!stored[key]) {
      stored[key] = defaultValue;
      localStorage.setItem("creator-comp", JSON.stringify(stored));
    }
    return stored[key];
  } catch (err) {
    console.error("Failed to get object from localStorage:", err);
    return defaultValue;
  }
}
