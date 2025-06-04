import React from "react";
import { useInView } from "react-intersection-observer";

interface AnimationComponentProps {
  animationClassName?: string;
  animationOffClassName?: string;
  className?: string;
  triggerOnce?: boolean;
  invisible?: boolean;
  children?: React.ReactNode;
  threshold?: number;
}

// Ex:
const obj = {
  animationSettingsArray: {
    objects: { threshold: { type: "threshold", value: "0.5" }, triggerOnce: { type: "triggerOnce", value: "true" }, invisible: { type: "invisible", value: "true" } },
    array: [],
  },
};

const AnimatedComponent: React.FC<AnimationComponentProps> = ({ animationClassName, animationOffClassName, className, threshold = 0.5, children, triggerOnce = true, invisible = true }) => {
  const { ref, inView } = useInView({
    triggerOnce: triggerOnce,
    threshold: threshold,
  });

  return (
    <div ref={ref} className={`${className || ""} ${inView ? animationClassName || "" : `${animationOffClassName || ""} ${invisible ? " invisible" : ""}`}`}>
      {children}
    </div>
  );
};

export default AnimatedComponent;
