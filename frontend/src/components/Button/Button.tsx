import "./Button.scss";
import React, { MouseEventHandler } from "react";

export interface ButtonProps {
  children?: React.ReactNode;
  color?: "primary" | "secondary";
  className?: string;
  onClick?: MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({
  color = "",
  children = null,
  className = "",
  onClick = null,
}) => {
  return (
    <button onClick={onClick} className={`${color} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
