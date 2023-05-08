import "./index.scss";
import React from "react";

// TODO: add className
interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className = "", children = null }) => {
  return <article className={`card ${className}`}>{children}</article>;
};

export default Card;
