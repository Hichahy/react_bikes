import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { connect } from "react-redux";
import "./Login.scss";
import {
  loginForm,
  errorsHandlerLogin,
  submitLogin,
} from "../../accounts/duck/index";

const Login = ({
  valueLogin,
  submitLogin,
  loginErrors,
  errorsHandlerLogin,
  loginForm,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    errorsHandlerLogin(validateInfo(valueLogin));
    submitLogin(true);
  };

  const validateInfo = () => {
    let loginErrors = {};

    if (!valueLogin.email) {
      loginErrors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(valueLogin.email)) {
      loginErrors.email = "Email address is invalid";
    }
    if (!valueLogin.password) {
      loginErrors.password = "Password is required";
    } else if (valueLogin.password.length < 6) {
      loginErrors.password = "Password needs to be 6 characters or more";
    }
    return loginErrors;
  };

  const handleInput = (e) => {
    loginForm({ ...valueLogin, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-containter">
      <img
        className="background-img-login"
        src="Images/login-background.jpg"
        alt="cyclist"
      />
      <div className="login-content">
        <div>
          <h1>Great to see You!</h1>
          <p>Login, have promotions and be notified on events!</p>
        </div>
      </div>
      <div className="login-panel animate__animated animate__slideInRight">
        <form
          noValidate
          onSubmit={handleSubmit}
          type="submit"
          className="input-box"
        >
          <h1 className="title-login">Login</h1>
          <label>E-mail</label>
          {loginErrors.email && (
            <label className="error_login">{loginErrors.email}</label>
          )}
          <input type="email" name="email" onChange={handleInput} />
          <label>Passowrd</label>
          {loginErrors.password && (
            <label className="error_login">{loginErrors.password}</label>
          )}
          <input type="password" name="password" onChange={handleInput} />
          <div className="button-box">
            <button type="submit">
              Sign up <AiOutlineRight />
            </button>
            <NavLink className="link-login" to="/register">
              Don't have an account?
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    valueLogin: state.accounts.valueLogin,
    loginSubmit: state.accounts.loginSubmit,
    loginErrors: state.accounts.loginErrors,
  }),
  { loginForm, errorsHandlerLogin, submitLogin }
)(Login);
