/* eslint-disable react/prop-types */
import './Register.scss'
import { NavLink, useHistory } from 'react-router-dom'
import React, { useEffect } from 'react'
import {
  addUser,
  agreementRegister,
  currentUser,
  errorsHandlerRegister,
  isLogged,
  signUpForm,
  submitRegister
} from '../../accounts/duck/index'
import { AiOutlineRight } from 'react-icons/ai'
import { connect } from 'react-redux'

const Register = ({
  signUpForm,
  valueRegister,
  agreementRegister,
  agreement,
  submitRegister,
  registerSubmit,
  registerErrors,
  errorsHandlerRegister,
  addUser,
  usersData,
  isLogged,
  currentUser
}) => {
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    errorsHandlerRegister(validateInfo(valueRegister))
    submitRegister(true)
  }

  useEffect(() => {
    const clearInput = () => {
      valueRegister.email = ''
      valueRegister.bike = ''
      valueRegister.confirmBike = ''
      valueRegister.userName = ''
      agreementRegister(false)
    }

    if (Object.keys(registerErrors).length === 0 && registerSubmit) {
      addUser()
      submitRegister(false)
      clearInput()
      isLogged(true)
      history.push('/dashboard')
      currentUser()
    }
  }, [
    registerSubmit,
    registerErrors,
    agreementRegister,
    addUser,
    submitRegister,
    history,
    currentUser,
    isLogged,
    valueRegister
  ])

  // const clearInput = () => {
  //   valueRegister.email = "";
  //   valueRegister.bike = "";
  //   valueRegister.confirmBike = "";
  //   valueRegister.userName = "";
  //   agreementRegister(false);
  // };

  const validateInfo = () => {
    const errors = {}

    if (!valueRegister.userName.trim()) {
      errors.userName = 'Username required'
    } else if (!/^[A-Za-z]+/.test(valueRegister.userName.trim())) {
      errors.name = 'Enter a valid name'
    }

    if (!valueRegister.email) {
      errors.email = 'Email required'
    } else if (!/\S+@\S+\.\S+/.test(valueRegister.email)) {
      errors.email = 'Email address is invalid'
    } else if (usersData.find((i) => i.email === valueRegister.email)) {
      errors.email = 'sorry such user already exists'
    }

    if (!valueRegister.bike) {
      errors.bike = 'Name bike is required'
    } else if (valueRegister.bike.length < 6) {
      errors.bike = 'Name bike needs to be 6 characters or more'
    }

    if (!valueRegister.confirmBike) {
      errors.confirmBike = 'Confirm bike is required'
    } else if (valueRegister.confirmBike !== valueRegister.bike) {
      errors.confirmBike = 'Name bike do not match'
    }

    if (agreement === false) {
      errors.agreement = 'Accept the rules'
    }
    return errors
  }

  const handleInput = (e) => {
    signUpForm({ ...valueRegister, [e.target.name]: e.target.value })
  }

  return (
    <div className="register-containter">
      {/* <img
        className="background-img"
        src="Images/register-background.jpeg"
        alt="cyclist"
      /> */}
      <div className="register-content">
        <div>
          <h1>Don&apos;t have an account?</h1>
          <p>
            Sign up and enjoy all the benefits. Join us! Buy, borrow, fulfill
            your passion.
          </p>
        </div>
      </div>
      <div className="register-panel">
        <form
          noValidate
          onSubmit={handleSubmit}
          type="submit"
          className="input-box"
        >
          <h1 className="title-register">Sign up</h1>
          <label>User Name</label>{' '}
          {registerErrors.userName && (
            <label className="error-register">{registerErrors.userName}</label>
          )}
          <input
            type="text"
            name="userName"
            value={valueRegister.userName}
            onChange={handleInput}
          />
          <label>E-mail</label>
          {registerErrors.email && (
            <label className="error-register">{registerErrors.email}</label>
          )}
          <input
            type="email"
            name="email"
            value={valueRegister.email}
            onChange={handleInput}
          />
          <label>Name your bike</label>
          {registerErrors.bike && (
            <label className="error-register">{registerErrors.bike}</label>
          )}
          <input
            type="text"
            name="bike"
            value={valueRegister.bike}
            onChange={handleInput}
          />
          <label>Confirm name your bike </label>
          {registerErrors.confirmBike && (
            <label className="error-register">
              {registerErrors.confirmBike}
            </label>
          )}
          <input
            type="text"
            name="confirmBike"
            value={valueRegister.confirmBike}
            onChange={handleInput}
          />
          <div className="checkbox-box">
            <input
              type="checkbox"
              checked={agreement !== false}
              className="checkbox-register"
              onChange={() => agreementRegister(!agreement)}
            />
            <label>I agree for all</label>
          </div>
          {registerErrors.agreement && (
            <label className="error-register">{registerErrors.agreement}</label>
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
  )
}

export default connect(
  (state) => ({
    valueRegister: state.accounts.valueRegister,
    agreement: state.accounts.agreement,
    registerSubmit: state.accounts.registerSubmit,
    registerErrors: state.accounts.registerErrors,
    usersData: state.accounts.usersData,
    logged: state.accounts.logged
  }),
  {
    signUpForm,
    agreementRegister,
    submitRegister,
    errorsHandlerRegister,
    addUser,
    isLogged,
    currentUser
  }
)(Register)
