import { useRef, useState, useEffect, RefObject } from "react";

interface UseAnimatedDropdownReturn {
  ref: RefObject<HTMLDivElement>;
  toggle: () => void;
  isOpen: boolean;
  updateHeight: () => void;
  close: () => void;
  open: () => void;
  isTransitioning: boolean;
}

export const useAnimatedDropdown = (time: string): UseAnimatedDropdownReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const close = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsOpen(true);
  };

  const updateHeight = () => {
    if (ref.current) {
      const element = ref.current;
      element.style.height = "auto";
      element.style.transition = `height 0s ease`;
    }
  };

  useEffect(() => {
    const element = ref.current;

    const handleTransitionEnd = () => {
      if (isOpen && element) {
        element.style.height = "auto";
        setIsTransitioning(false);
      }
    };

    if (element) {
      element.addEventListener("transitionend", handleTransitionEnd);

      element.style.transition = `height ${time} ease`;

      if (isOpen) {
        element.style.height = "auto";
        const height = element.scrollHeight + "px";
        element.style.height = "0px";

        requestAnimationFrame(() => {
          element.style.height = height;
          setIsTransitioning(true);
        });
      } else {
        element.style.height = "0px";
        setIsTransitioning(false);
      }
    }

    return () => {
      if (element) {
        element.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
  }, [isOpen, time]);

  return { ref, toggle, isOpen, updateHeight, close, open, isTransitioning };
};

export default useAnimatedDropdown;
