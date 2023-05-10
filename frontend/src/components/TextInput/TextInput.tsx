import "./TextInput.scss";
import React from "react";

interface TextInputProps {
  className?: string;
  id?: string;
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  style?: "shadow" | "hover-shadow" | "underline" | "none";
}

const TextInput: React.FC<TextInputProps> = ({
  className = "",
  id = "",
  type = "text",
  name,
  label = "",
  placeholder = "",
  style = "shadow",
}) => {
  const getClasses = () => {
    const classes = [];

    if (className) {
      classes.push(className);
    }

    if (style === "shadow") {
      classes.push("box-shadow");
    } else if (style === "hover-shadow") {
      classes.push("box-shadow-hover");
    } else if (style === "underline") {
      classes.push("underline");
    }

    return classes.join(" ");
  };

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
        className={getClasses()}
        name={name}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextInput;
