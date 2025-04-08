import React from "react";
import { getCSS, toKebabCase } from "./";

interface SelectProps {
  type: "select";
  containerClass: string;
  label: string;
  selectClass: string;
  placeholder: string;
  options: string;
  requiredBool: false;
  inputClassName: string;
  labelClassName: string;
}

const Select: React.FC<SelectProps> = ({ containerClass, label, requiredBool, placeholder, inputClassName, options, selectClass, labelClassName }) => {
  const { cssString, css } = getCSS({ containerClass, selectClass });

  const name = toKebabCase(label);

  const optionsParsed = options.split(",").map((option) => option.trim());

  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["containerClass"]}>
        <label htmlFor={name} className={labelClassName}>
          {label}
          <span>{requiredBool && <span className="text-red-600"> *</span>}</span>
        </label>
        <select id={name} className={selectClass ? css["selectClass"] : inputClassName} name={name} required={requiredBool}>
          {placeholder && (
            <option value="" disabled={requiredBool} selected>
              {placeholder}
            </option>
          )}
          {optionsParsed.map((option, i) => {
            return (
              <option key={i} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default Select;
