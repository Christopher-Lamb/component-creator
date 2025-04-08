import React, { useState } from "react";
import { getCSS, toKebabCase } from "./";

interface TextProps {
  type: "text";
  containerClass: string;
  label: string;
  placeholder: string;
  requiredBool: boolean;
  inputClassName: string;
  labelClassName: string;
  labelOnInputClass: string;
  labelOffInputClass: string;
}

// activeLabelClass

const Text: React.FC<TextProps> = ({ containerClass, label, labelClassName, labelOnInputClass, labelOffInputClass, requiredBool, inputClassName }) => {
  const { cssString, css } = getCSS({ containerClass });
  const name = toKebabCase(label);

  // Track whether the input has content
  const [hasValue, setHasValue] = useState(false);

  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={`${css["containerClass"]} relative w-full`}>
        {/* Floating Label */}
        <label
          htmlFor={name || ""}
          className={`
            
            ${labelClassName}
            ${hasValue ? labelOnInputClass : labelOffInputClass}
          `}
        >
          {label}
          {requiredBool && <span className="text-red-600"> *</span>}
        </label>

        {/* Input Field */}
        <input id={name || ""} required={requiredBool} name={name || ""} type="text" placeholder=" " className={` ${inputClassName}`} onChange={(e) => setHasValue(e.target.value.trim() !== "")} />
      </div>
    </>
  );
};

export default Text;
