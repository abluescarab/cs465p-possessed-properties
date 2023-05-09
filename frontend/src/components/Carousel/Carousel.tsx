import "./Carousel.scss";
import React from "react";

interface CarouselProps {
  children?: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children = null }) => {
  return (
    <div className={"carousel-container"}>
      <div className={"carousel-controls"}>
        <button className={"material-symbols-rounded left-button icon"}>
          chevron_left
        </button>
        <button className={"material-symbols-rounded right-button icon"}>
          chevron_right
        </button>
      </div>
      <div className={"carousel"}>{children}</div>
    </div>
  );
};

export default Carousel;
