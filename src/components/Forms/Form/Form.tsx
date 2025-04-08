import React from "react";
import CloudinaryImage from "../../CloudinaryImage";
const { getCSS, generateCSSMaps, addClassesToElements } = require("../../../utils/tailwind-to-css/index.js");

function toKebabCase(str: string): string {
  return str
    .trim() // Remove leading and trailing spaces
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s]/g, "") // Remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
}

interface FormProps {
  name: string;
  formArray: string;
  preContentArray: string;
  formContentArray: string;
  content: string;
  buttonText: string;
  buttonClass: string;
  img: string;
}

/**
 * Form Component
 *
 * @param {FormProps} props - The props for the component.
 */

interface ContentType {
  content: string;
  containerClass: string;
  wrapperClass: string;
  h1Class: string;
  h2Class: string;
  h3Class: string;
  pClass: string;
  aClass: string;
  ulClass: string;
  liClass: string;
  strongClass: string;
}

const testProps = {
  name: `Home"`,
  containerClass: `bg-gray-50 relative mt-24"`,
  wrapperClass: `max-w-xl md:max-w-3xl mx-auto z-2 relative py-20 px-4"`,
  preContentArray: {
    objects: { content: { content: "", containerClass: "", wrapperClass: "", h1Class: "", h2Class: "", h3Class: "", pClass: "", ulClass: "", liClass: "", aClass: "", strongClass: "" } },
    array: [],
  },
  formClass: `grid grid-cols-1 lg:grid-cols-2 gap-2"`,
  formContentArray: {
    objects: { content: { content: "", containerClass: "", wrapperClass: "", h1Class: "", h2Class: "", h3Class: "", pClass: "", ulClass: "", liClass: "", aClass: "", strongClass: "" } },
    array: [
      {
        content: "<h2>Contact Us</h2><p>This form will be sent directly to us, and we will get back to you promptly.</p>",
        containerClass: "",
        wrapperClass: "",
        h1Class: "",
        h2Class: "text-2xl font-semibold my-2",
        h3Class: "",
        pClass: "my-2 text-lg text-gray-500",
        ulClass: "",
        liClass: "",
        aClass: "",
        strongClass: "",
      },
    ],
  },
  inputClass: `mt-1 px-3 py-2 border border-1 border-black"`,
  labelClass: `"`,
  formArray: {
    objects: {
      text: { type: "text", containerClass: "", label: "", placeholder: "", requiredBool: false },
      select: { type: "select", containerClass: "", label: "", selectClass: "", placeholder: "", options: "", requiredBool: false },
      radio: { type: "radio", containerClass: "", label: "", itemContainerClass: "", itemClass: "", items: "", requiredBool: false },
      checkbox: { type: "checkbox", containerClass: "", label: "", itemContainerClass: "", itemClass: "", items: "" },
      textarea: { type: "textarea", containerClass: "", textareaClass: "", label: "", placeholder: "", requiredBool: false },
    },
    array: [
      { type: "text", containerClass: "grid", label: "First Name", placeholder: "John", requiredBool: true },
      { type: "text", containerClass: "grid", label: "Last Name", placeholder: "Doe", requiredBool: true },
      { type: "text", containerClass: "grid", label: "Email", placeholder: "example@email.com", requiredBool: true },
      { type: "text", containerClass: "grid", label: "Zip Code", placeholder: "00000", requiredBool: true },
      {
        type: "textarea",
        containerClass: "grid lg:col-span-2 mt-2",
        textareaClass: "resize-none h-48 mt-1 px-3 py-2 border border-1 border-black",
        label: "Any Questions?",
        placeholder: "Enter your message here...",
        requiredBool: false,
      },
    ],
  },
  buttonClass: `w-full py-5 px-10 bg-black text-white text-lg bg-blue-400"`,
  buttonText: `Submit"`,
  img: ``,
  imageClass: `"`,
};

const Form: React.FC<FormProps> = (props) => {
  const {} = props;
  const { name, formArray, preContentArray, formContentArray, img, buttonText, ...otherCSS } = testProps;

  const { cssString, css } = getCSS(otherCSS);

  const { array: formElements } = formArray as any;
  const { array: preContent } = preContentArray as any;
  const { array: formContent } = formContentArray as any;

  return (
    <div className={css["containerClass"]}>
      {img && (
        <div className="absolute w-full h-full z-[1]">
          <CloudinaryImage publicId={img} className={css["imageClass"]} />
        </div>
      )}
      {preContent.length > 0 &&
        preContent.map((contentAttr: ContentType, i: number) => {
          const { content, ...otherCSS } = contentAttr;

          const { cssString, css } = getCSS(otherCSS);
          const html = addClassesToElements(content, {
            h1: css["h1Class"],
            h2: css["h2Class"],
            h3: css["h3Class"],
            p: css["pClass"],
            a: css["aClass"],
            ul: css["ulClass"],
            li: css["liClass"],
            strong: css["strongClass"],
          });

          return (
            <React.Fragment key={i}>
              <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString }} />
              <div className={css["containerClass"]}>
                <div className={css["wrapperClass"]} dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </React.Fragment>
          );
        })}
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["wrapperClass"]}>
        {formContent.length > 0 &&
          formContent.map((contentAttr: ContentType, i: number) => {
            const { content, ...otherCSS } = contentAttr;

            const { cssString, css } = getCSS(otherCSS);
            const html = addClassesToElements(content, {
              h1: css["h1Class"],
              h2: css["h2Class"],
              h3: css["h3Class"],
              p: css["pClass"],
              a: css["aClass"],
              ul: css["ulClass"],
              li: css["liClass"],
              strong: css["strongClass"],
            });

            return (
              <React.Fragment key={i}>
                <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString }} />
                <div className={css["containerClass"]}>
                  <div className={css["wrapperClass"]} dangerouslySetInnerHTML={{ __html: html }} />
                </div>
              </React.Fragment>
            );
          })}
        <form className={css["formClass"]} data-netlify="true" method="POST" name={name || "default"}>
          <input type="hidden" name="form-name" value={name || "default"} />

          {formElements.map((obj: any, i: number) => {
            switch (obj.type) {
              case "text":
                return <Text key={i} {...obj} inputClassName={css["inputClass"]} labelClassName={css["labelClass"]} />;
              case "textarea":
                return <Textarea key={i} {...obj} inputClassName={css["inputClass"]} labelClassName={css["labelClass"]} />;
              case "select":
                return <Select key={i} {...obj} inputClassName={css["inputClass"]} labelClassName={css["labelClass"]} />;
              case "radio":
                return <RadioGroup key={i} {...obj} labelClassName={css["labelClass"]} />;
              case "checkbox":
                return <CheckboxGroup key={i} {...obj} labelClassName={css["labelClass"]} />;
            }
          })}
          <button className={css["buttonClass"]}>{buttonText}</button>
        </form>
      </div>
    </div>
  );
};

interface TextProps {
  type: "text";
  containerClass: string;
  label: string;
  placeholder: string;
  requiredBool: boolean;
  inputClassName: string;
  labelClassName: string;
}
const Text: React.FC<TextProps> = ({ containerClass, label, labelClassName, placeholder, requiredBool, inputClassName }) => {
  const { cssString, css } = getCSS({ containerClass });

  const name = toKebabCase(label);

  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["containerClass"]}>
        <label htmlFor={name || ""} className={labelClassName}>
          {label}
          <span>{requiredBool && <span className="text-red-600"> *</span>}</span>
        </label>
        <input id={name || ""} required={requiredBool} name={name || ""} type={"text"} placeholder={placeholder || ""} className={inputClassName} />
      </div>
    </>
  );
};

interface TextareaProps {
  type: "textarea";
  containerClass: "";
  label: "";
  placeholder: "";
  requiredBool: false;
  textareaClass: string;
  inputClassName: string;
  labelClassName: string;
}

const Textarea: React.FC<TextareaProps> = ({ containerClass, label, placeholder, requiredBool, inputClassName, labelClassName, textareaClass }) => {
  const { cssString, css } = getCSS({ containerClass, textareaClass });

  const name = toKebabCase(label);

  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["containerClass"]}>
        <label htmlFor={name} className={labelClassName}>
          {label}
          <span>{requiredBool && <span className="text-red-600"> *</span>}</span>
        </label>
        <textarea id={name} name={name} required={requiredBool} placeholder={placeholder || ""} className={textareaClass ? css["textareaClass"] : inputClassName} />
      </div>
    </>
  );
};

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

export default Form;
