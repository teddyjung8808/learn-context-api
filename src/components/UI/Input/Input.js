import React, { useImperativeHandle, useRef } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const { type, id, value, onChangeHandler, onBlurHandler, isValid, label } =
    props;

  const inputRef = useRef();

  const focusHandler = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => ({
    focus: focusHandler,
  }));

  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={id || "text"}>{label}</label>
      <input
        ref={inputRef}
        type={type || "text"}
        id={id}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    </div>
  );
});

export default Input;
