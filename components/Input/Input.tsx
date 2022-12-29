import React, { ChangeEvent, useRef } from "react";
import {
  InputWrapper,
  InputStyled,
  InputStartIcon,
  InputEndIcon,
  TextareaStyled,
} from "./Input.styled";

export type InputProps = {
  id: string;
  type?: string;
  className?: string;
  startIconClassName?: string;
  endIconClassName?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  register?: any;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: any;
  validate?: (value: any) => void;
  rows?: number;
  autoResizeTextArea?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onChange?: (value: any, name?: string) => void;
  onBlur?: () => void;
  defaultValue?: string | number;
  value?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  autocomplete?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onStartIconClick?: () => void;
  onEndIconClick?: () => void;
};

export enum INPUT_TYPE {
  TEXT = "text",
  NUMBER = "number",
  TEXTAREA = "textarea",
  EMAIL = "email",
  PASSWORD = "password",
}

export enum ERROR_TYPE {
  REQUIRED = "required",
  VALIDATE = "validate",
  PATTERN = "pattern",
  MAX_LENGTH = "maxLength",
  MIN_LENGTH = "minLength",
}

const Input = ({
  id,
  type = INPUT_TYPE.TEXT,
  className = "",
  startIconClassName,
  endIconClassName,
  name,
  label,
  placeholder,
  register,
  required = false,
  maxLength,
  minLength,
  pattern,
  validate,
  rows = 1,
  autoResizeTextArea = false,
  onClick,
  onChange,
  onFocus,
  onBlur,
  defaultValue,
  value,
  min,
  max,
  step,
  disabled = false,
  autoFocus,
  autocomplete = "off",
  startIcon,
  endIcon,
  onStartIconClick,
  onEndIconClick,
}: InputProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onTextAreaChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    if (autoResizeTextArea && textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${
        textAreaRef.current.scrollHeight + 8
      }px`;
    }

    if (onChange) onChange(event);
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const { value: val, name: inputName } = event.target;
    if (onChange) onChange(val, inputName);
  };

  const textInput = (
    <>
      <label>{label}</label>
      <InputStyled
        id={id}
        type={type}
        className={`${className} ${
          INPUT_TYPE.NUMBER === type ? "input-number" : ""
        }`}
        name={name || id}
        placeholder={placeholder}
        onClick={onClick}
        onChange={onChangeInput}
        onFocus={onFocus}
        onBlur={onBlur}
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        autoFocus={autoFocus}
        autocomplete={autocomplete || "off"}
        isStartIcon={!!startIcon}
        isEndIcon={!!endIcon}
        {...(register &&
          register(name || label, {
            required,
            maxLength,
            minLength,
            pattern,
            validate,
          }))}
      />
    </>
  );

  const textareaInput = (
    <TextareaStyled
      id={id}
      ref={textAreaRef}
      name={name || id}
      rows={rows}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onTextAreaChangeHandler}
      onClick={onClick}
      isStartIcon={!!startIcon}
      isEndIcon={!!endIcon}
      autoFocus={autoFocus}
    />
  );

  const renderInputType = () => {
    switch (type) {
      case INPUT_TYPE.TEXTAREA:
        return textareaInput;
      case INPUT_TYPE.TEXT:
      case INPUT_TYPE.NUMBER:
      default:
        return textInput;
    }
  };

  return (
    <InputWrapper isStartIcon={!!startIcon} isEndIcon={!!endIcon}>
      {startIcon && (
        <InputStartIcon
          id={`${id}__start-icon`}
          className={startIconClassName}
          isStartIcon={!!startIcon}
          isEndIcon={!!onStartIconClick}
          isClickable={!!onStartIconClick}
          onClick={onStartIconClick}
        >
          {startIcon}
        </InputStartIcon>
      )}

      {renderInputType()}

      {endIcon && (
        <InputEndIcon
          id={`${id}__end-icon`}
          className={endIconClassName}
          isStartIcon={!!startIcon}
          isEndIcon={!!endIcon}
          isClickable={!!onEndIconClick}
          onClick={onEndIconClick}
        >
          {endIcon}
        </InputEndIcon>
      )}
    </InputWrapper>
  );
};

export default Input;
