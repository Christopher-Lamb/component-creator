import React from "react";
import { useInView } from "react-intersection-observer";

interface AnimationComponentProps {
  animationClassName?: string;
  className?: string;
  triggerOnce?: boolean;
  invisible?: boolean;
  children?: React.ReactNode;
  threshold?: number;
  htmlContent?: string; // New prop for dangerously setting inner HTML
}

const AnimatedComponent: React.FC<AnimationComponentProps> = ({
  animationClassName,
  className,
  threshold = 0.5,
  children,
  triggerOnce = true,
  invisible = true,
  htmlContent, // Check if HTML content is provided
}) => {
  const { ref, inView } = useInView({
    triggerOnce: triggerOnce,
    threshold: threshold,
  });

  return (
    <div
      ref={ref}
      className={`${className || ""} ${inView ? animationClassName || "" : invisible ? "invisible" : ""}`}
      {...(htmlContent ? { dangerouslySetInnerHTML: { __html: htmlContent } } : {})} // Use dangerouslySetInnerHTML if htmlContent is provided
    >
      {!htmlContent && children} {/* Render children only if htmlContent is not provided */}
    </div>
  );
};

export default AnimatedComponent;
