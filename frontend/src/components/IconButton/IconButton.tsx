import "./IconButton.scss";
import Button from "@/components/Button/Button.tsx";
import React from "react";

interface IconButtonProps {
  color?: "primary" | "secondary";
  className?: string;
  icon: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  color = "",
  className = "",
  icon,
}) => {
  return (
    <Button
      className={`icon-button material-symbols-rounded ${color} ${className}`}
    >
      {icon}
    </Button>
  );
};

export default IconButton;
