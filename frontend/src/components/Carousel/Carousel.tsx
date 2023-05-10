import "./Carousel.scss";
import React, { Children, useState } from "react";
import IconButton from "@/components/IconButton/IconButton.tsx";

interface CarouselProps {
  children?: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children = null }) => {
  const [left, setLeft] = useState(0);

  const style = {
    left: `calc((var(--listing-width) + var(--listing-margin) * 2) * ${left})`,
  };

  const moveLeft = () => {
    if (left < 0) {
      setLeft(left + 1);
    }
  };

  const moveRight = () => {
    if (left > -Children.count(children) + 1) {
      setLeft(left - 1);
    }
  };

  return (
    <div className={"carousel-container"}>
      <div className={"carousel-controls"}>
        <IconButton
          className={"left-button"}
          icon={"chevron_left"}
          onClick={() => moveLeft()}
        />
        <IconButton
          className={"right-button"}
          icon={"chevron_right"}
          onClick={() => moveRight()}
        />
      </div>
      <div className={"carousel"} style={style}>
        {children}
      </div>
    </div>
  );
};

export default Carousel;
