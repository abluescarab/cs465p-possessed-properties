import "./Carousel.scss";
import React from "react";

interface CarouselProps {
  children?: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children = null }) => {
  return <div className={"carousel"}>{children}</div>;
};

export default Carousel;
