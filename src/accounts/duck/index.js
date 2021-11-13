import registerReducer from "./reducers";
export {
  SUBMIT_REGISTER,
  SIGNUP_FORM,
  AGREEMENT_REGISTER,
  VALIDATE_ERRORS_REGISTER,
  LOGIN_FORM,
  VALIDATE_ERRORS_LOGIN,
  SUBMIT_LOGIN,
  ADD_USER,
  USER_IS_LOGGED,
  CURRENT_USER,
  LOG_OUT,
  CURRENT_USER_LOGIN
} from "./types";
export {
  submitRegister,
  signUpForm,
  agreementRegister,
  errorsHandlerRegister,
  loginForm,
  errorsHandlerLogin,
  submitLogin,
  addUser,
  isLogged,
  currentUser,
  logOut,
  currentUserLogin
} from "./actions";
export default registerReducer;
