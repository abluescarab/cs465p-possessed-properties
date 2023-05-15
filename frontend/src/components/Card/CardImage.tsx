import "./Card.scss";
import React from "react";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";

interface CardImageProps extends ComponentBaseProps {
  src: string;
  alt: string;
}

const CardImage: ComponentBase<CardImageProps> = ({
  id = "",
  className = "",
  src,
  alt,
}) => {
  return (
    <div id={id} className={`card-image ${className}`}>
      <img src={src} className={className} alt={alt} />
    </div>
  );
};

export default CardImage;
