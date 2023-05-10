import "./Button.scss";
import React, { MouseEventHandler } from "react";

export interface ButtonProps {
  children?: React.ReactNode;
  color?: "primary" | "secondary";
  className?: string;
  onClick?: MouseEventHandler;
  type: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  color = "",
  children = null,
  className = "",
  onClick = null,
  type = "button",
}) => {
  return (
    <button onClick={onClick} className={`${color} ${className}`} type={type}>
      {children}
    </button>
  );
};

export default Button;
