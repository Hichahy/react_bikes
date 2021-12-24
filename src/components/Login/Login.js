/* eslint-disable react/prop-types */
import './Login.scss'
import { NavLink, useHistory } from 'react-router-dom'
import React, { useEffect } from 'react'
import {
  currentUserLogin,
  errorsHandlerLogin,
  isLogged,
  loginForm,
  submitLogin
} from '../../accounts/duck/index'
import { AiOutlineRight } from 'react-icons/ai'
import { connect } from 'react-redux'

const Login = ({
  valueLogin,
  submitLogin,
  loginErrors,
  errorsHandlerLogin,
  loginForm,
  usersData,
  loginSubmit,
  isLogged,
  currentUserLogin
}) => {
  const findUser = usersData.filter((i) => i.email === valueLogin.email)
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    errorsHandlerLogin(validateInfo(valueLogin))
    submitLogin(true)
  }

  const validateInfo = () => {
    const loginErrors = {}

    if (!valueLogin.email) {
      loginErrors.email = 'Email required'
    } else if (!/\S+@\S+\.\S+/.test(valueLogin.email)) {
      loginErrors.email = 'Email address is invalid'
    } else if (
      usersData.find((i) => i.email === valueLogin.email) === undefined
    ) {
      loginErrors.email = 'There is no that user'
    }

    if (!valueLogin.bike) {
      loginErrors.bike = 'Bike name is required'
    } else if (valueLogin.bike.length < 6) {
      loginErrors.bike = 'Bike needs to be 6 characters or more'
    } else if (
      usersData.find((i) => i.bikeName === valueLogin.bike) === undefined
    ) {
      loginErrors.bike = 'inccorenct bike name'
    } else if (
      findUser.length > 0 &&
      valueLogin.bike !== findUser[0].bikeName
    ) {
      loginErrors.bike = 'inccorenct bike name'
    }

    return loginErrors
  }

  const handleInput = (e) => {
    loginForm({ ...valueLogin, [e.target.name]: e.target.value })
  }

  // const clearInput = () => {
  //   valueLogin.email = "";
  //   valueLogin.bike = "";
  // };

  useEffect(() => {
    const clearInput = () => {
      valueLogin.email = ''
      valueLogin.bike = ''
    }
    if (Object.keys(loginErrors).length === 0 && loginSubmit) {
      currentUserLogin()
      submitLogin(false)
      isLogged(true)
      history.push('/dashboard')
      clearInput()
    }
  }, [
    submitLogin,
    currentUserLogin,
    isLogged,
    loginErrors,
    loginSubmit,
    history,
    valueLogin
  ])

  return (
    <div className="login-containter">
      <div className="login-content">
        <div>
          <h1>Great to see You!</h1>
          <p>Login, have promotions and be notified on events!</p>
        </div>
      </div>
      <div className="login-panel">
        <form
          noValidate
          onSubmit={handleSubmit}
          type="submit"
          className="input-box"
        >
          <h1 className="title-login">Login</h1>
          <label>E-mail</label>
          {loginErrors.email && (
            <label className="error-login">{loginErrors.email}</label>
          )}
          <input type="email" name="email" onChange={handleInput} />
          <label>Bike name</label>
          {loginErrors.bike && (
            <label className="error-login">{loginErrors.bike}</label>
          )}
          <input type="text" name="bike" onChange={handleInput} />
          <div className="button-box">
            <button type="submit">
              Sign up <AiOutlineRight />
            </button>
            <NavLink className="link-login" to="/register">
              Don&apos;t have an account?
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default connect(
  (state) => ({
    valueLogin: state.accounts.valueLogin,
    loginSubmit: state.accounts.loginSubmit,
    loginErrors: state.accounts.loginErrors,
    usersData: state.accounts.usersData
  }),
  { loginForm, errorsHandlerLogin, submitLogin, currentUserLogin, isLogged }
)(Login)
