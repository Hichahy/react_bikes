import registerReducer from "./reducers";
export {
  SUBMIT_REGISTER,
  SIGNUP_FORM,
  AGREEMENT_REGISTER,
  VALIDATE_ERRORS_REGISTER,
  LOGIN_FORM,
  VALIDATE_ERRORS_LOGIN,
  SUBMIT_LOGIN,
} from "./types";
export {
  submitRegister,
  signUpForm,
  agreementRegister,
  errorsHandlerRegister,
  loginForm,
  errorsHandlerLogin,
  submitLogin,
} from "./actions";
export default registerReducer;
