import "./Popup.scss";
import Card, { CardContent, CardTitle } from "@/components/Card/Card.tsx";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";
import React, { MouseEventHandler, useEffect, useRef } from "react";
import Button from "@/components/Button/Button.tsx";

interface PopupProps extends ComponentBaseProps {
  title?: string;
  primaryButton?: string;
  onPrimaryClick?: MouseEventHandler;
  secondaryButton?: string;
  onSecondaryClick?: MouseEventHandler;
}

const Popup: ComponentBase<PopupProps> = ({
  id = "",
  className = "",
  title = "",
  children = null,
  primaryButton = "",
  onPrimaryClick = null,
  secondaryButton = "",
  onSecondaryClick = null,
}) => {
  const container = useRef<HTMLDivElement>(null);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onPrimaryClick(e);
    } else if (e.key === "Escape") {
      onSecondaryClick(e);
    }
  };

  useEffect(() => {
    container.current.focus();
  }, []);

  return (
    <div
      id={id}
      className={`popup-container ${className}`}
      onKeyDown={onKeyDown}
      tabIndex={0}
      ref={container}
    >
      <Card className={"popup"}>
        <CardTitle className={"capitalize"}>{title}</CardTitle>
        <CardContent>
          {children}
          {(primaryButton || secondaryButton) && (
            <div className={"popup-buttons"}>
              {primaryButton && (
                <Button
                  className={"action-button"}
                  color={"primary"}
                  onClick={onPrimaryClick}
                >
                  {primaryButton}
                </Button>
              )}
              {secondaryButton && (
                <Button
                  className={"action-button"}
                  color={"secondary"}
                  onClick={onSecondaryClick}
                >
                  {secondaryButton}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Popup;
