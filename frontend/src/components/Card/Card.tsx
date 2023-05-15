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

export default Card;
