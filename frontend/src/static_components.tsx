import React, { MouseEventHandler } from "react";
import Popup from "@/components/Popup/Popup.tsx";

export const errorPopup = (onClick: MouseEventHandler) => (
  <Popup title={"Error"} primaryButton={"OK"} onPrimaryClick={onClick}>
    <p>An error has occurred. Please try again later.</p>
  </Popup>
);
