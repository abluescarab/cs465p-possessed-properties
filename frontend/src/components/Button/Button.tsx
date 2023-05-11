import "./Button.scss";
import React, { MouseEventHandler } from "react";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";

export interface ButtonProps extends ComponentBaseProps {
  color?: "primary" | "secondary";
  onClick?: MouseEventHandler;
  type?: "button" | "submit" | "reset";
}

const Button: ComponentBase<ButtonProps> = ({
  id = "",
  className = "",
  color = "",
  children = null,
  onClick = null,
  type = "button",
}) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`${color} ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
