import "./Card.scss";
import React from "react";

interface CardContentProps {
  children?: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ children = null }) => {
  return <div className={"card-content"}>{children}</div>;
};

export default CardContent;
