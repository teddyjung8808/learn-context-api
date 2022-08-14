import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const { type, id, value, onChangeHandler, onBlurHandler, isValid, label } =
    props;
  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={id || "text"}>{label}</label>
      <input
        type={type || "text"}
        id={id}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    </div>
  );
};

export default Input;
