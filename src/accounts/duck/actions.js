import {
  SUBMIT_REGISTER,
  SIGNUP_FORM,
  AGREEMENT_REGISTER,
  VALIDATE_ERRORS_REGISTER,
  LOGIN_FORM,
  VALIDATE_ERRORS_LOGIN,
  SUBMIT_LOGIN,
} from "./types";

export const signUpForm = (value) => (dispatch) => {
  try {
    dispatch({
      type: SIGNUP_FORM,
      payload: value,
    });
  } catch (err) {
    console.log(`err`, err);
  }
};
export const loginForm = (value) => (dispatch) => {
  try {
    dispatch({
      type: LOGIN_FORM,
      payload: value,
    });
  } catch (err) {
    console.log(`err`, err);
  }
};
export const agreementRegister = (value) => (dispatch) => {
  try {
    dispatch({
      type: AGREEMENT_REGISTER,
      payload: value,
    });
  } catch (err) {
    console.log(`err`, err);
  }
};

export const submitRegister = (registerSubmit) => (dispatch) => {
  try {
    dispatch({
      type: SUBMIT_REGISTER,
      payload: registerSubmit,
    });
  } catch (err) {
    console.log(`err`, err);
  }
};

export const submitLogin = (loginSubmit) => (dispatch) => {
  try {
    dispatch({
      type: SUBMIT_LOGIN,
      payload: loginSubmit,
    });
  } catch (err) {
    console.log(`err`, err);
  }
};

export const errorsHandlerRegister = (errors) => (dispatch) => {
  try {
    dispatch({
      type: VALIDATE_ERRORS_REGISTER,
      payload: errors,
    });
  } catch (err) {
    console.log(`err`, err);
  }
};

export const errorsHandlerLogin = (errors) => (dispatch) => {
  try {
    dispatch({
      type: VALIDATE_ERRORS_LOGIN,
      payload: errors,
    });
  } catch (err) {
    console.log(`err`, err);
  }
};
