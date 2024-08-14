import React from "react";

interface ImagesProps {}

/**
 * Images Component
 *
 * @param {ImagesProps} props - The props for the component.
 */

const Images: React.FC<ImagesProps> = (props) => {
  // const {imagesArray}
  return (
    <div className="containerClass">
      <div className="wrapperClass">{/* images */}</div>
    </div>
  );
};

export default Images;
