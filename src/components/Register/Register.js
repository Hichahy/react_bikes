import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { connect } from "react-redux";
import {
  signUpForm,
  agreementRegister,
  submitRegister,
  errorsHandlerRegister,
} from "../../accounts/duck/index";
import "./Register.scss";

const Register = ({
  signUpForm,
  valueRegister,
  agreementRegister,
  agreement,
  submitRegister,
  registerSubmit,
  registerErrors,
  errorsHandlerRegister,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    errorsHandlerRegister(validateInfo(valueRegister));
    submitRegister(true);
  };
  useEffect(
    (callback) => {
      if (Object.keys(registerErrors).length === 0 && registerSubmit) {
        callback();
      }
    },
    [registerErrors, registerSubmit]
  );

  const validateInfo = () => {
    let errors = {};

    if (!valueRegister.userName.trim()) {
      errors.userName = "Username required";
    } else if (!/^[A-Za-z]+/.test(valueRegister.userName.trim())) {
      errors.name = "Enter a valid name";
    }

    if (!valueRegister.email) {
      errors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(valueRegister.email)) {
      errors.email = "Email address is invalid";
    }
    if (!valueRegister.password) {
      errors.password = "Password is required";
    } else if (valueRegister.password.length < 6) {
      errors.password = "Password needs to be 6 characters or more";
    }

    if (!valueRegister.confirmPassword) {
      errors.confirmPassword = "Password is required";
    } else if (valueRegister.confirmPassword !== valueRegister.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (agreement === false) {
      errors.agreement = "Accept the rules";
    }
    return errors;
  };

  const handleInput = (e) => {
    signUpForm({ ...valueRegister, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-containter">
      <img
        className="background-img"
        src="Images/register-background.jpeg"
        alt="cyclist"
      />
      <div className="register-content">
        <div>
          <h1>Don't have an account?</h1>
          <p>
            Sign up and enjoy all the benefits. Join us! Buy, borrow, fulfill
            your passion.
          </p>
        </div>
      </div>
      <div className="register-panel animate__animated animate__slideInRight">
        <form
          noValidate
          onSubmit={handleSubmit}
          type="submit"
          className="input-box"
        >
          <h1 className="title-register">Sign up</h1>
          <label>User Name</label>{" "}
          {registerErrors.userName && (
            <label className="error_register">{registerErrors.userName}</label>
          )}
          <input type="text" name="userName" onChange={handleInput} />
          <label>E-mail</label>
          {registerErrors.email && (
            <label className="error_register">{registerErrors.email}</label>
          )}
          <input type="email" name="email" onChange={handleInput} />
          <label>Passowrd</label>
          {registerErrors.password && (
            <label className="error_register">{registerErrors.password}</label>
          )}
          <input type="password" name="password" onChange={handleInput} />
          <label>Confirm passowrd </label>
          {registerErrors.confirmPassword && (
            <label className="error_register">
              {registerErrors.confirmPassword}
            </label>
          )}
          <input
            type="password"
            name="confirmPassword"
            onChange={handleInput}
          />
          <div className="checkbox-box">
            <input
              type="checkbox"
              className="checkbox-register"
              onClick={() => agreementRegister(!agreement)}
            />
            <label>I agree for all</label>
          </div>
          {registerErrors.agreement && (
            <label className="error_register">{registerErrors.agreement}</label>
          )}
          <div className="button-box">
            <button type="submit">
              Sign up <AiOutlineRight />
            </button>
            <NavLink className="link-register" to="/login">
              Have an account?
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    valueRegister: state.accounts.valueRegister,
    agreement: state.accounts.agreement,
    registerSubmit: state.accounts.registerSubmit,
    registerErrors: state.accounts.registerErrors,
  }),
  { signUpForm, agreementRegister, submitRegister, errorsHandlerRegister }
)(Register);
