import "./Card.scss";
import React from "react";
import ComponentBase from "@/components/ComponentBase.tsx";

const CardContent: ComponentBase = ({
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

export default CardContent;
