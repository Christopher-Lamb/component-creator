import React from "react";
import { ContentComponent, CloudinaryImage, ContentType, getCSS, IconTextComponent, Text, Textarea, Select, RadioGroup, CheckboxGroup } from "./";

interface FormFloatingProps {
  name: string;
  formArray: string;
  containerContentArray: string;
  wrapperContentArray: string;
  content: string;
  buttonText: string;
  buttonClass: string;
  img: string;
}

/**
 * FormFloating Component
 *
 * @param {FormFloatingProps} props - The props for the component.
 */

const testProps = {
  name: `Home`,
  containerClass: `bg-[#D9D9D9] relative py-20`,
  containerContentClass: "",
  containerContentArray: {
    objects: {
      content: { type: "content", content: "", containerClass: "", htmlContainerClass: "", h1Class: "", h2Class: "", h3Class: "", pClass: "", ulClass: "", liClass: "", aClass: "", strongClass: "" },
    },
    array: [],
  },
  wrapperClass: `relative max-w-[1200px] grid-cols-2 mx-auto z-2 bg-white py-23 pl-27 flex flex-row-reverse justify-between shadow-inset-[-240px_0_0_0_100] shadow-[#e7e7e7] shadow-inset-[-240px_0_0_0_100]`,
  wrapperContentClass: "col-span-1 text-white bg-[#3B3B3B] px-18 py-16 grid gap-8 w-full basis-2/6",
  wrapperContentArray: {
    objects: {
      content: { type: "content", content: "", containerClass: "", htmlContainerClass: "", h1Class: "", h2Class: "", h3Class: "", pClass: "", ulClass: "", liClass: "", aClass: "", strongClass: "" },
      iconText: { type: "iconText", containerClass: "", href: "", iconClass: "", svg: "", textClass: "", text: "" },
    },
    array: [
      {
        type: "content",
        content: "<h2>Info</h2>",
        containerClass: "",
        htmlContainerClass: "",
        h1Class: "",
        h2Class: "text-12 font-semibold leading-[1] mb-2",
        h3Class: "",
        pClass: "my-2 text-lg text-gray-500",
        ulClass: "",
        liClass: "",
        aClass: "",
        strongClass: "",
      },
      {
        type: "iconText",
        containerClass: "flex gap-8 font-semibold",
        href: "mailto:",
        iconClass: "fill-white",
        svg: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" /></svg>',
        textClass: "text-white text-small18 underline lowercase",
        text: "Christopher.j.lamb13@gmail.com",
      },
      {
        type: "iconText",
        containerClass: "flex gap-8 font-semibold",
        href: "",
        iconClass: "fill-white",
        svg: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" /></svg>',
        textClass: "text-white text-small18",
        text: "(856) 412-1845",
      },
      {
        type: "iconText",
        containerClass: "flex gap-8 font-semibold",
        href: "",
        iconClass: "fill-white",
        svg: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="10,0 20,20 0,20"/></svg>',
        textClass: "text-white text-small18",
        text: "South Jersey",
      },
    ],
  },
  inputClass: `relative mt-1 resize-none border-black peer w-full border-b-2 border-gray-400 focus:border-blue-500 bg-transparent outline-none text-lg px-1 pt-2 z-1`,
  labelClass: `absolute left-2 transition-all text-gray-500`,
  labelOnInputClass: "top-[-2px] left-[1px] text-sm text-stone-900 z-2",
  labelOffInputClass: "top-3 text-lg peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500",
  formClass: `grid grid-cols-1 gap-2 w-full basis-3/6`,
  formArray: {
    objects: {
      content: { type: "content", content: "", containerClass: "", htmlContainerClass: "", h1Class: "", h2Class: "", h3Class: "", pClass: "", ulClass: "", liClass: "", aClass: "", strongClass: "" },
      text: { type: "text", containerClass: "", label: "", placeholder: "", requiredBool: false },
      select: { type: "select", containerClass: "", label: "", selectClass: "", placeholder: "", options: "", requiredBool: false },
      radio: { type: "radio", containerClass: "", label: "", itemContainerClass: "", itemClass: "", items: "", requiredBool: false },
      checkbox: { type: "checkbox", containerClass: "", label: "", itemContainerClass: "", itemClass: "", items: "" },
      textarea: { type: "textarea", containerClass: "", textareaClass: "", labelClass: "", label: "", placeholder: "", requiredBool: false },
    },
    array: [
      {
        type: "content",
        content: "<h2>Contact Us</h2><p>This form will be sent directly to us, and we will get back to you promptly.</p>",
        containerClass: "",
        htmlContainerClass: "",
        h1Class: "",
        h2Class: "text-15 font-semibold ",
        h3Class: "",
        pClass: "text-lg leading-[1] text-gray-500",
        ulClass: "",
        liClass: "",
        aClass: "",
        strongClass: "",
      },
      { type: "text", containerClass: "grid", label: "Name", placeholder: "John", requiredBool: true },
      { type: "text", containerClass: "grid", label: "Phone", placeholder: "00000", requiredBool: true },
      { type: "text", containerClass: "grid", label: "Email", placeholder: "example@email.com", requiredBool: true },
      {
        type: "textarea",
        containerClass: "relative mt-2",
        textareaClass: "",
        labelClass: "",
        label: "Any Questions?",
        placeholder: "",
        requiredBool: true,
      },
    ],
  },
  buttonClass: `w-full mt-4 py-5 px-10 bg-black text-white text-lg`,
  buttonText: `Submit`,
  img: ``,
  imageClass: ``,
};

const FormFloating: React.FC<FormFloatingProps> = (props) => {
  const {} = props;
  const { name, formArray, containerContentArray, wrapperContentArray, img, buttonText, ...otherCSS } = testProps;

  const { cssString, css } = getCSS(otherCSS);

  const { array: formElements } = formArray as any;
  const { array: containerContent } = containerContentArray as any;
  const { array: wrapperContent } = wrapperContentArray as any;

  return (
    <div className={css["containerClass"]}>
      {img && (
        <div className="absolute w-full h-full z-[1]">
          <CloudinaryImage publicId={img} className={css["imageClass"]} />
        </div>
      )}
      {containerContent.length > 0 && (
        <div className={css["containerContentClass"]}>
          {containerContent.map((contentAttr: ContentType, i: number) => {
            return <ContentComponent {...contentAttr} />;
          })}
        </div>
      )}
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["wrapperClass"]}>
        {wrapperContent.length > 0 && (
          <div className={css["wrapperContentClass"]}>
            {wrapperContent.map((contentAttr: ContentType, i: number) => {
              const { type } = contentAttr;

              return type === "content" ? <ContentComponent {...contentAttr} /> : <IconTextComponent {...contentAttr} />;
            })}
          </div>
        )}
        <form className={css["formClass"]} data-netlify="true" method="POST" name={name || "default"}>
          <input type="hidden" name="form-name" value={name || "default"} />

          {formElements.map((obj: any, i: number) => {
            switch (obj.type) {
              case "content":
                return <ContentComponent {...obj} />;
              case "text":
                return (
                  <Text
                    key={i}
                    {...obj}
                    inputClassName={css["inputClass"]}
                    labelClassName={css["labelClass"]}
                    labelOnInputClass={css["labelOnInputClass"]}
                    labelOffInputClass={css["labelOffInputClass"]}
                  />
                );
              case "textarea":
                return (
                  <Textarea
                    key={i}
                    {...obj}
                    inputClassName={css["inputClass"]}
                    labelClassName={css["labelClass"]}
                    labelOnInputClass={css["labelOnInputClass"]}
                    labelOffInputClass={css["labelOffInputClass"]}
                  />
                );
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

export default FormFloating;
