import React, { MouseEventHandler } from "react";
import Popup from "@/components/Popup/Popup.tsx";

export const okPopup = (
  title: string,
  text: string,
  onClick: MouseEventHandler
) => (
  <Popup title={title} primaryButton={"OK"} onPrimaryClick={onClick}>
    {text}
  </Popup>
);

export const confirmPopup = (
  title: string,
  text: string,
  onPrimaryClick: MouseEventHandler,
  onSecondaryClick: MouseEventHandler
) => (
  <Popup
    title={title}
    primaryButton={"Yes"}
    secondaryButton={"No"}
    onPrimaryClick={onPrimaryClick}
    onSecondaryClick={onSecondaryClick}
  >
    {text}
  </Popup>
);

export const errorPopup = (onClick: MouseEventHandler) =>
  okPopup("Error", "An error has occurred. Please try again later.", onClick);
