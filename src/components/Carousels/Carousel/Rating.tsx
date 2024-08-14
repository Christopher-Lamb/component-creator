import { FaStar, FaStarHalf } from "react-icons/fa";

import React from "react";

interface RatingProps {
  rating: number;
  className?: string;
  size?: string;
}

/**
 * Rating Component
 *
 * @param {RatingProps} props - The props for the component.
 */

const Rating: React.FC<RatingProps> = ({ rating, className, size }) => {
  const isHalfStar = !!(rating % 2);
  const numFullStars = Math.floor(rating / 2);
  return (
    <div className={`flex ${className}`}>
      {Array.from(Array(numFullStars).keys()).map((num) => {
        return <FaStar size={size} />;
      })}
      {isHalfStar && <FaStarHalf size={size} />}
    </div>
  );
};

export default Rating;
