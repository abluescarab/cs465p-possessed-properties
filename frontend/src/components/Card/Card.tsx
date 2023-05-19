import "./Card.scss";
import React, { MouseEventHandler } from "react";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";
import { getClasses } from "@/utils.tsx";

interface CardProps extends ComponentBaseProps {
  shadow?: "none" | "normal" | "hover";
  onClick?: MouseEventHandler;
}

interface CardImageProps extends ComponentBaseProps {
  src: string;
  alt: string;
}

const Card: ComponentBase<CardProps> = ({
  id = "",
  className = "",
  children = null,
  shadow = "normal",
  onClick = null,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`card ${className} ${onClick ? "pointer" : ""} ${getClasses(
        className,
        {
          prop: shadow,
          mappings: [
            { value: "normal", cssClass: "box-shadow" },
            { value: "hover", cssClass: "box-shadow-hover" },
          ],
        }
      )}`}
    >
      {children}
    </div>
  );
};

export const CardTitle: ComponentBase = ({
  id = "",
  className = "",
  children = null,
}) => {
  return (
    <div id={id} className={`card-title ${className}`}>
      {children}
    </div>
  );
};

export const CardSubtitle: ComponentBase = ({
  id = "",
  className = "",
  children = null,
}) => {
  return (
    <div id={id} className={`card-subtitle ${className}`}>
      {children}
    </div>
  );
};

export const CardImage: ComponentBase<CardImageProps> = ({
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

export const CardContent: ComponentBase = ({
  id = "",
  className = "",
  children = null,
}) => {
  return (
    <div id={id} className={`card-content ${className}`}>
      {children}
    </div>
  );
};

export default Card;
