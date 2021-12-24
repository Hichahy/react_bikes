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

const INITIAL_STATE = {
  valueRegister: {
    userName: '',
    email: '',
    bike: '',
    confirmBike: ''
  },
  valueLogin: {
    email: '',
    bike: ''
  },
  agreement: false,
  registerSubmit: false,
  loginSubmit: false,
  registerErrors: {},
  loginErrors: {},
  usersData: [
    {
      email: 'admin@admin.com',
      bikeName: '123456',
      userName: 'admin'
    },
    {
      email: 'martynka@martynka.com',
      bikeName: 'karamba',
      userName: 'Martynka'
    }
  ],
  logged: false,
  currentUser: []
}

const accountsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_FORM:
      return {
        ...state,
        valueRegister: action.payload
      }

    case LOGIN_FORM:
      return {
        ...state,
        valueLogin: action.payload
      }

    case AGREEMENT_REGISTER:
      return {
        ...state,
        agreement: action.payload
      }

    case SUBMIT_REGISTER:
      return {
        ...state,
        registerSubmit: action.payload
      }

    case SUBMIT_LOGIN:
      return {
        ...state,
        loginSubmit: action.payload
      }

    case VALIDATE_ERRORS_REGISTER:
      return {
        ...state,
        registerErrors: action.payload
      }

    case VALIDATE_ERRORS_LOGIN:
      return {
        ...state,
        loginErrors: action.payload
      }

    case ADD_USER:
      return {
        ...state,
        usersData: action.payload.usersData
      }

    case USER_IS_LOGGED:
      return {
        ...state,
        logged: action.payload
      }

    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.currentUserData
      }

    case CURRENT_USER_LOGIN:
      return {
        ...state,
        currentUser: action.payload.currentUserData
      }

    case LOG_OUT:
      return {
        ...state,
        currentUser: action.payload.currentUser
      }

    default:
      return state
  }
}

export default accountsReducer
