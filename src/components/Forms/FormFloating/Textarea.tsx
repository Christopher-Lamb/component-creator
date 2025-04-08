import React, { useState } from "react";
import { getCSS, toKebabCase, DynamicTextInput } from "./";

interface TextareaProps {
  type: "textarea";
  containerClass: "";
  labelClass: "";
  label: "";
  placeholder: "";
  requiredBool: false;
  textareaClass: string;
  inputClassName: string;
  labelClassName: string;
  labelOnInputClass: string;
  labelOffInputClass: string;
}

const Textarea: React.FC<TextareaProps> = ({ containerClass, label, placeholder, requiredBool, inputClassName, labelClassName, labelOnInputClass, labelOffInputClass, textareaClass, labelClass }) => {
  const { cssString, css } = getCSS({ containerClass, textareaClass, labelClass });
  const [hasValue, setHasValue] = useState(false);

  const name = toKebabCase(label);

  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["containerClass"]}>
        <label htmlFor={name || ""} className={` ${labelClass ? css["labelClass"] : `${labelClassName} ${hasValue ? labelOnInputClass : labelOffInputClass}`}`}>
          {label}
          {requiredBool && <span className="text-red-600"> *</span>}
        </label>
        <DynamicTextInput
          id={name}
          name={name}
          required={requiredBool}
          placeholder={placeholder || ""}
          className={textareaClass ? css["textareaClass"] : inputClassName}
          onChange={(val) => setHasValue(val.trim() !== "")}
        />
      </div>
    </>
  );
};

export default Textarea;
