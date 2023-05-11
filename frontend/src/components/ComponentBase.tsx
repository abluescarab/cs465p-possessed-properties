import React from "react";

export interface ComponentBaseProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

type ComponentBase<P extends ComponentBaseProps = ComponentBaseProps> =
  React.FC<P>;

export default ComponentBase;
