import React from "react";

interface BasicHeaderProps {
  name: string;
  containerClass: string;
  headingClass: string;
}

/**
 * BasicHeader Component
 *
 * Props:
 * -
 *
 * @param {BasicHeaderProps} props - The props for the component.
 */

const BasicHeader: React.FC<BasicHeaderProps> = ({ name, containerClass, headingClass }) => {
  return (
    <header className={containerClass}>
      <h1 className={headingClass}>{name}</h1>
    </header>
  );
};

export default BasicHeader;
