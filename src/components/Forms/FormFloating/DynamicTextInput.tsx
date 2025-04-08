import React, { ChangeEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface DynamicTextInputProps {
  id: string;
  name: string;
  required: boolean;
  placeholder: string;
  className?: string;
  onChange?: (val: string) => void;
}

/**
 * DynamicTextInput Component
 *
 * -
 *
 * @param {DynamicTextInputProps} props - The props for the component.
 */

const DynamicTextInput: React.FC<DynamicTextInputProps> = ({ id, name, required, placeholder, className, onChange }) => {
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(e.target.value);
  };

  return <TextareaAutosize id={id} name={name} required={required} placeholder={placeholder} onChange={handleTextChange} className={className || ""} />;
};

export default DynamicTextInput;
