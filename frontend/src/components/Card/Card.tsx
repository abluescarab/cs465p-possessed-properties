import "./Card.scss";
import React from "react";

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className = "", children = null }) => {
  return <article className={`card ${className}`}>{children}</article>;
};

export default Card;
