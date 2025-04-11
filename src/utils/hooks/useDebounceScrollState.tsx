import { useEffect, useState } from "react";

interface ScrollState {
  scrollHeight: string;
  preScrollHeight: string;
}

const STORAGE_KEY = "creator-comp";
const INNER_KEY = "settings";
const DEBOUNCE_DELAY = 2000; // ms

export const useDebouncedScrollState = () => {
  const [scrollState, setScrollState] = useState<ScrollState>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return saved[INNER_KEY] || { scrollHeight: 0, preScrollHeight: 0 };
    } catch {
      return { scrollHeight: 0, preScrollHeight: 0 };
    }
  });

  const [isActiveState, setIsActiveState] = useState({ isPreScroll: false, isScroll: false, isEditingPre: false, isEditingPost: false });

  const toggle = (scrollName: "pre" | "post" | "editing-pre" | "editing-post") => {
    switch (scrollName) {
      case "pre":
        setIsActiveState((prev) => ({ ...prev, isPreScroll: !prev.isPreScroll }));
        break;
      case "post":
        setIsActiveState((prev) => ({ ...prev, isScroll: !prev.isScroll }));
        break;
      case "editing-pre":
        setIsActiveState((prev) => ({ ...prev, isEditingPre: !prev.isEditingPre }));
        break;
      case "editing-post":
        setIsActiveState((prev) => ({ ...prev, isEditingPost: !prev.isEditingPost }));
        break;
      default:
        break;
    }
  };

  // Debounced save to localStorage
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        const updated = {
          ...current,
          [INNER_KEY]: scrollState,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        // console.log("💾 Saved scrollState:", updated);
      } catch (err) {
        console.error("Failed to save scrollState:", err);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [scrollState]);

  // Instant updater for typing responsiveness
  const handleChange = (updates: Partial<ScrollState>) => {
    setScrollState((prev) => ({ ...prev, ...updates }));
  };

  return {
    scrollHeight: scrollState.scrollHeight,
    preScrollHeight: scrollState.preScrollHeight,
    onChange: handleChange,
    toggle,
    ...isActiveState,
  };
};
