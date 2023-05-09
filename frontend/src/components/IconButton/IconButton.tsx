import "./IconButton.scss";
import Button from "@/components/Button/Button.tsx";
import React, { MouseEventHandler } from "react";

interface IconButtonProps {
  color?: "primary" | "secondary";
  className?: string;
  icon: string;
  onClick?: MouseEventHandler;
}

const IconButton: React.FC<IconButtonProps> = ({
  color = "",
  className = "",
  icon,
  onClick = null,
}) => {
  return (
    <Button
      className={`icon-button material-symbols-rounded ${color} ${className}`}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};

export default IconButton;
