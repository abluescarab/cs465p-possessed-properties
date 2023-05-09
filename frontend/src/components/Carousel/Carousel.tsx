import "./Carousel.scss";
import React, { Children, useEffect, useState } from "react";
import IconButton from "@/components/IconButton/IconButton.tsx";

interface CarouselProps {
  children?: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children = null }) => {
  const [left, setLeft] = useState(0);
  const [buttonsVisible, setButtonsVisible] = useState(true);

  const style = {
    left: `calc((var(--listing-width) + var(--listing-margin) * 2) * 3 * ${left})`,
  };

  useEffect(() => {
    console.log("use");
    if (Children.count(children) > 3) {
      setButtonsVisible(true);
    } else {
      setButtonsVisible(false);
    }
  }, [children]);

  const moveLeft = () => {
    if (left < 0) {
      setLeft(left + 1);
    }
  };

  const moveRight = () => {
    const pageCount = Math.ceil(Children.count(children) / 3);

    if (left > -pageCount + 1) {
      setLeft(left - 1);
    }
  };

  return (
    <div className={"carousel-container"}>
      {buttonsVisible ? (
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
      ) : null}
      <div className={"carousel"} style={style}>
        {children}
      </div>
    </div>
  );
};

export default Carousel;
