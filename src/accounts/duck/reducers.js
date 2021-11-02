import {
  SIGNUP_FORM,
  SUBMIT_REGISTER,
  AGREEMENT_REGISTER,
  VALIDATE_ERRORS_REGISTER,
  LOGIN_FORM,
  VALIDATE_ERRORS_LOGIN,
  SUBMIT_LOGIN,
} from "./types";

const INITIAL_STATE = {
  valueRegister: {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  valueLogin: {
    email: "",
    password: "",
  },
  agreement: false,
  registerSubmit: false,
  loginSubmit: false,
  registerErrors: {},
  loginErrors: {},
};

const accountsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_FORM:
      return {
        ...state,
        valueRegister: action.payload,
      };

    case LOGIN_FORM:
      return {
        ...state,
        valueLogin: action.payload,
      };

    case AGREEMENT_REGISTER:
      return {
        ...state,
        agreement: action.payload,
      };

    case SUBMIT_REGISTER:
      return {
        ...state,
        registerSubmit: action.payload,
      };

    case SUBMIT_LOGIN:
      return {
        ...state,
        loginSubmit: action.payload,
      };

    case VALIDATE_ERRORS_REGISTER:
      return {
        ...state,
        registerErrors: action.payload,
      };

    case VALIDATE_ERRORS_LOGIN:
      return {
        ...state,
        loginErrors: action.payload,
      };

    default:
      return state;
  }
};

export default accountsReducer;
