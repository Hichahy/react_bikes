import {
  ADD_USER,
  AGREEMENT_REGISTER,
  CURRENT_USER,
  CURRENT_USER_LOGIN,
  LOGIN_FORM,
  LOG_OUT,
  SIGNUP_FORM,
  SUBMIT_LOGIN,
  SUBMIT_REGISTER,
  USER_IS_LOGGED,
  VALIDATE_ERRORS_LOGIN,
  VALIDATE_ERRORS_REGISTER
} from './types'

export const signUpForm = (value) => (dispatch) => {
  try {
    dispatch({
      type: SIGNUP_FORM,
      payload: value
    })
  } catch (err) {
    console.log('err', err)
  }
}
export const loginForm = (value) => (dispatch) => {
  try {
    dispatch({
      type: LOGIN_FORM,
      payload: value
    })
  } catch (err) {
    console.log('err', err)
  }
}
export const agreementRegister = (value) => (dispatch) => {
  try {
    dispatch({
      type: AGREEMENT_REGISTER,
      payload: value
    })
  } catch (err) {
    console.log('err', err)
  }
}

export const submitRegister = (registerSubmit) => (dispatch) => {
  try {
    dispatch({
      type: SUBMIT_REGISTER,
      payload: registerSubmit
    })
  } catch (err) {
    console.log('err', err)
  }
}

export const submitLogin = (loginSubmit) => (dispatch) => {
  try {
    dispatch({
      type: SUBMIT_LOGIN,
      payload: loginSubmit
    })
  } catch (err) {
    console.log('err', err)
  }
}

export const errorsHandlerRegister = (errors) => (dispatch) => {
  try {
    dispatch({
      type: VALIDATE_ERRORS_REGISTER,
      payload: errors
    })
  } catch (err) {
    console.log('err', err)
  }
}

export const errorsHandlerLogin = (errors) => (dispatch) => {
  try {
    dispatch({
      type: VALIDATE_ERRORS_LOGIN,
      payload: errors
    })
  } catch (err) {
    console.log('err', err)
  }
}

export const addUser = () => (dispatch, getState) => {
  const email = getState().accounts.valueRegister.email
  const bike = getState().accounts.valueRegister.bike
  const userName = getState().accounts.valueRegister.userName
  const userObject = {
    email: email,
    bikeName: bike,
    userName: userName
  }
  const usersData = getState().accounts.usersData
  usersData.push(userObject)
  dispatch({
    type: ADD_USER,
    payload: { usersData }
  })
  // localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const isLogged = (logged) => (dispatch) => {
  try {
    dispatch({
      type: USER_IS_LOGGED,
      payload: logged
    })
  } catch (err) {
    console.log('err', err)
  }
}

export const currentUser = () => (dispatch, getState) => {
  const lastIndex = getState().accounts.usersData.length - 1
  const userName = getState().accounts.usersData[lastIndex].userName
  const email = getState().accounts.usersData[lastIndex].email

  const currentUserData = {
    currentUserName: userName,
    currentUserEmail: email
  }
  // const currentUser = getState().accounts.currentUser;
  // currentUser.push(currentUserData);

  try {
    dispatch({
      type: CURRENT_USER,
      payload: { currentUserData }
    })
  } catch (err) {
    console.log('err', err)
  }
}

export const currentUserLogin = () => (dispatch, getState) => {
  const usersData = getState().accounts.usersData
  const email = getState().accounts.valueLogin.email
  const findUser = usersData.filter((i) => i.email === email)

  const currentUserData = {
    currentUserName: findUser[0].userName,
    currentUserEmail: findUser[0].email
  }

  // currentUser.push(currentUserData) ;

  try {
    dispatch({
      type: CURRENT_USER_LOGIN,
      payload: { currentUserData }
    })
  } catch (err) {
    console.log('err', err)
    console.log('object', currentUserData)
  }
}

export const logOut = () => (dispatch, getState) => {
  const currentUser = (getState().accounts.currentUser = [])

  try {
    dispatch({
      type: LOG_OUT,
      payload: { currentUser }
    })
  } catch (err) {
    console.log('err', err)
  }
}
