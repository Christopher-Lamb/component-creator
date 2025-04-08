import React from "react";
import { getCSS, toKebabCase } from "./";

interface CheckboxGroupProps {
  type: "checkbox";
  containerClass: string;
  label: string;
  itemContainerClass: string;
  itemClass: string;
  items: string;
  labelClassName: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, containerClass, items, itemClass, itemContainerClass, labelClassName }) => {
  const { cssString, css } = getCSS({ containerClass, itemClass, itemContainerClass });

  const name = toKebabCase(label);

  const itemsParsed = items.split(",").map((option) => option.trim());
  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <fieldset className={css["containerClass"]}>
        <legend className={labelClassName}>{label}</legend>
        {itemsParsed.map((checkbox, i) => {
          const id = toKebabCase(checkbox);
          return (
            <div key={i} className={css["itemContainerClass"]}>
              <input id={id} value={checkbox} name={name} type="checkbox" />
              <label htmlFor={id} className={css["itemClass"]}>
                {checkbox}
              </label>
            </div>
          );
        })}
      </fieldset>
    </>
  );
};

export default CheckboxGroup;
