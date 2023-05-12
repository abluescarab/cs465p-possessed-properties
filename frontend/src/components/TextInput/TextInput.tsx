import "./TextInput.scss";
import React, { ChangeEventHandler } from "react";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";

interface TextInputProps extends ComponentBaseProps {
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  autoComplete?: "on" | "off";
}

const TextInput: ComponentBase<TextInputProps> = ({
  id = "",
  className = "",
  type = "text",
  name,
  label = "",
  placeholder = "",
  onChange = null,
  autoComplete = "on",
}) => {
  return (
    <>
      {id && label ? (
        <p>
          <label htmlFor={id}>{label}</label>
        </p>
      ) : null}
      <input
        type={type}
        id={id}
        className={className}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </>
  );
};

export default TextInput;
