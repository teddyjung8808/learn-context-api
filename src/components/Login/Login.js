import React, { useState, useEffect, useReducer, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.val, isValid: action.val.includes("@") };

    case "USER_ONBLUR":
      return { value: state.value, isValid: state.value.includes("@") };

    default:
      return { value: "", isValid: false };
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "PASSWORD_INPUT":
      return { value: action.val, isValid: action.val.trim().length > 6 };

    case "PASSWORD_ONBLUR":
      return { value: state.value, isValid: state.value.trim().length > 6 };

    default:
      return { value: "", isValid: false };
  }
};

const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "PASSWORD_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "USER_ONBLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASSWORD_ONBLUR" });
  };

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      props.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else if (!passwordIsValid) {
      passwordInputRef.current.focus();
    } else {
      emailInputRef.current.focus();
    }
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type="email"
          id="email"
          label="E-Mail"
          value={emailState.value}
          onChangeHandler={emailChangeHandler}
          onBlurHandler={validateEmailHandler}
          isValid={emailState.isValid}
        />
        <Input
          ref={passwordInputRef}
          type="password"
          id="password"
          label="Password"
          value={passwordState.value}
          onChangeHandler={passwordChangeHandler}
          onBlurHandler={validatePasswordHandler}
          isValid={passwordState.isValid}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
