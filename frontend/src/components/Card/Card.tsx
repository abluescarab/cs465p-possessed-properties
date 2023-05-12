import "./Card.scss";
import React from "react";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";
import { getClasses } from "@/utils.tsx";

interface CardProps extends ComponentBaseProps {
  shadow?: "none" | "normal" | "hover";
}

const Card: ComponentBase<CardProps> = ({
  id = "",
  className = "",
  children = null,
  shadow = "normal",
}) => {
  return (
    <section
      id={id}
      className={`card ${className} ${getClasses(className, {
        prop: shadow,
        mappings: [
          { value: "normal", cssClass: "box-shadow" },
          { value: "hover", cssClass: "box-shadow-hover" },
        ],
      })}`}
    >
      {children}
    </section>
  );
};

export default Card;
