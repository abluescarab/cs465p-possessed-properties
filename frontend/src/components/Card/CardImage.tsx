import "./Card.scss";
import React from "react";

interface CardImageProps {
  className?: string;
  src: string;
  alt: string;
}

const CardImage: React.FC<CardImageProps> = ({ src, alt, className = "" }) => {
  return (
    <div className={`card-image`}>
      <img src={src} className={className} alt={alt} />
    </div>
  );
};

export default CardImage;
