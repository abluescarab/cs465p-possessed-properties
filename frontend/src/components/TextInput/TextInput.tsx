import "./TextInput.scss";
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  ForwardedRef,
  forwardRef,
} from "react";
import ComponentBase, {
  ComponentBaseProps,
} from "@/components/ComponentBase.tsx";
import { getClasses } from "@/utils.ts";

interface TextInputProps extends ComponentBaseProps {
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  autoComplete?: "on" | "off";
  leftText?: string;
  rightText?: string;
  style?: "underline" | "none";
  required?: boolean;
  ref?: ForwardedRef<HTMLInputElement>;
  minLength?: number;
  maxLength?: number;
  min?: string | number;
  max?: string | number;
  accept?: string;
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
      onFocus = null,
      onBlur = null,
      autoComplete = "on",
      leftText = "",
      rightText = "",
      style = "underline",
      required = false,
      minLength = 0,
      maxLength = 255,
      min = null,
      max = null,
      accept = "",
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const limitMax = () => {
      if (type === "number") {
        return 1000000000; // limit to 1 billion to stay in postgres constraints
      } else {
        return max;
      }
    };

    return (
      <div className={"input-wrapper"}>
        {id && label && (
          <p className={`label-wrapper ${required ? "required" : ""}`}>
            <label htmlFor={id}>{label}</label>
          </p>
        )}
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
            onFocus={onFocus}
            onBlur={onBlur}
            autoComplete={autoComplete}
            required={required}
            ref={ref}
            minLength={minLength}
            maxLength={maxLength}
            min={min}
            max={limitMax()}
            accept={accept}
          />
          {rightText && <span className={"input-right"}>{rightText}</span>}
        </div>
      </div>
    );
  }
);

export default TextInput;
