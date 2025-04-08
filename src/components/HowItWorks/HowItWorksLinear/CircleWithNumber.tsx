import React from "react";

interface CircleWithNumberProps {
  index: number;
  circleClass: string;
}

/**
 * CircleWithNumber Component
 *
 * Description
 *
 * Props:
 * -
 *
 * @param {CircleWithNumberProps} props - The props for the component.
 */

const CircleWithNumber: React.FC<CircleWithNumberProps> = ({ index, circleClass }) => {
  return <div className={circleClass}>{index}</div>;
};

export default CircleWithNumber;
