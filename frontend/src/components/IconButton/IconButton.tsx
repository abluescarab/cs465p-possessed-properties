import "./IconButton.scss";
import Button from "@/components/Button/Button.tsx";
import React, { MouseEventHandler } from "react";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";

interface IconButtonProps extends ComponentBaseProps {
  color?: "primary" | "secondary";
  icon: string;
  onClick?: MouseEventHandler;
}

const IconButton: ComponentBase<IconButtonProps> = ({
  id = "",
  className = "",
  color = "",
  icon,
  onClick = null,
}) => {
  return (
    <Button
      id={id}
      className={`icon-button material-symbols-rounded ${color} ${className}`}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};

export default IconButton;
