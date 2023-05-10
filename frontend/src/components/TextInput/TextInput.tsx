import "./TextInput.scss";
import React from "react";

interface TextInputProps {
  className?: string;
  id?: string;
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  className = "",
  id = "",
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
