import "./TextInput.scss";
import React, { ChangeEventHandler } from "react";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";
import { getClasses } from "@/utils.tsx";

interface TextInputProps extends ComponentBaseProps {
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  autoComplete?: "on" | "off";
  leftText?: string;
  rightText?: string;
  style?: "underline" | "none";
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
  leftText = "",
  rightText = "",
  style = "underline",
}) => {
  return (
    <div className={"input-wrapper"}>
      {id && label ? (
        <p className={"label-wrapper"}>
          <label htmlFor={id}>{label}</label>
        </p>
      ) : null}
      <div className={"input-box-wrapper"}>
        {leftText && <span className={"input-left"}>{leftText}</span>}
        <input
          type={type}
          id={id}
          className={getClasses(className, {
            prop: style,
            mappings: [
              {
                value: "underline",
                cssClass: "underline",
              },
            ],
          })}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={autoComplete}
        />
        {rightText && <span className={"input-right"}>{rightText}</span>}
      </div>
    </div>
  );
};

export default TextInput;
