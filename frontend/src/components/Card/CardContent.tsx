import "./index.scss";
import React from "react";

interface CardContentProps {
  className?: string;
  children?: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({
  className = "",
  children = null,
}) => {
  return <div className={`card-content ${className}`}>{children}</div>;
};

export default CardContent;
