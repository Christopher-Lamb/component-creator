import { useEffect, useRef } from "react";

// Define the hook with a callback function as a parameter
function useOutsideClick(callback: () => void) {
  // Create a ref for the element we want to monitor
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Function to call on click
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Add event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]); // Include callback in dependencies array

  return ref; // Return the ref
}

export default useOutsideClick;
