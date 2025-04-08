import React from "react";
import { getCSS, toKebabCase } from "./";

interface RadioGroupProps {
  type: "radio";
  containerClass: string;
  label: string;
  itemContainerClass: string;
  itemClass: string;
  items: string;
  requiredBool: false;
  labelClassName: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, containerClass, items, itemClass, itemContainerClass, requiredBool, labelClassName }) => {
  const { cssString, css } = getCSS({ containerClass, itemClass, itemContainerClass });

  const name = toKebabCase(label);

  const itemsParsed = items.split(",").map((option) => option.trim());
  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <fieldset className={css["containerClass"]}>
        <legend className={labelClassName}>
          {label}
          {requiredBool && <span className="text-red-600"> *</span>}
        </legend>
        {itemsParsed.map((radio, i) => {
          const id = toKebabCase(radio);
          return (
            <div key={i} className={css["itemContainerClass"]}>
              <input id={id} value={radio} name={name} type="radio" required={requiredBool} />
              <label htmlFor={id} className={css["itemClass"]}>
                {radio}
              </label>
            </div>
          );
        })}
      </fieldset>
    </>
  );
};

export default RadioGroup;
