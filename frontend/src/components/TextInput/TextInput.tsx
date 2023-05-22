import "./TextInput.scss";
import React, { ChangeEventHandler, ForwardedRef, forwardRef } from "react";
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
  required?: boolean;
  ref?: ForwardedRef<HTMLInputElement>;
  minLength?: number;
}

const TextInput: ComponentBase<TextInputProps> = forwardRef(
  (
    {
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
      required = false,
      minLength = 0,
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={"input-wrapper"}>
        {id && label ? (
          <p className={`label-wrapper ${required ? "required" : ""}`}>
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
            required={required}
            ref={ref}
            minLength={minLength}
          />
          {rightText && <span className={"input-right"}>{rightText}</span>}
        </div>
      </div>
    );
  }
);

export default TextInput;
