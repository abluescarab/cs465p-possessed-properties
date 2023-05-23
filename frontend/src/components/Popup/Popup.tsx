import "./Popup.scss";
import Card, { CardContent, CardTitle } from "@/components/Card/Card.tsx";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";
import React, { MouseEventHandler } from "react";
import Button from "@/components/Button/Button.tsx";

interface PopupProps extends ComponentBaseProps {
  title?: string;
  primaryButton?: string;
  primaryButtonOnClick?: MouseEventHandler;
  secondaryButton?: string;
  secondaryButtonOnClick?: MouseEventHandler;
}

const Popup: ComponentBase<PopupProps> = ({
  id = "",
  className = "",
  title = "",
  children = null,
  primaryButton = "",
  primaryButtonOnClick = null,
  secondaryButton = "",
  secondaryButtonOnClick = null,
}) => {
  return (
    <div id={id} className={`popup-container ${className}`}>
      <Card className={"popup"}>
        <CardTitle>{title}</CardTitle>
        <CardContent>
          {children}
          {(primaryButton || secondaryButton) && (
            <div className={"popup-buttons"}>
              <Button
                className={"action-button"}
                color={"primary"}
                onClick={primaryButtonOnClick}
              >
                {primaryButton}
              </Button>
              <Button
                className={"action-button"}
                color={"secondary"}
                onClick={secondaryButtonOnClick}
              >
                {secondaryButton}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Popup;
