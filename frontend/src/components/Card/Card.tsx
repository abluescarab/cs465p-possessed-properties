import "./Card.scss";
import React from "react";

// TODO: add className
interface CardProps {
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children = null }) => {
  return <article className={"card"}>{children}</article>;
};

export default Card;
