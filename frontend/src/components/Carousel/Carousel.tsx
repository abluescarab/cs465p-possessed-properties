import "./Carousel.scss";
import React from "react";
import IconButton from "@/components/IconButton/IconButton.tsx";

interface CarouselProps {
  children?: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children = null }) => {
  return (
    <div className={"carousel-container"}>
      <div className={"carousel-controls"}>
        <IconButton className={"left-button"} icon={"chevron_left"} />
        <IconButton className={"right-button"} icon={"chevron_right"} />
      </div>
      <div className={"carousel"}>{children}</div>
    </div>
  );
};

export default Carousel;
