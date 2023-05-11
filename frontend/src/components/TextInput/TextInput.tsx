import "./TextInput.scss";
import React from "react";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";

interface TextInputProps extends ComponentBaseProps {
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
}

const TextInput: ComponentBase<TextInputProps> = ({
  id = "",
  className = "",
  type = "text",
  name,
  label = "",
  placeholder = "",
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
      />
    </>
  );
};

export default TextInput;
