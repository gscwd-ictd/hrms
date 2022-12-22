import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_SUCCESS,
  API_ERROR,
  RESET_LOGIN,
} from "./actionTypes"

const initialState = {
  loginVerificationResponse: [],
  logoutResponse: [],
  error: "",
  loadingVerifyCredentials: false,
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginVerificationResponse: [],
        loadingVerifyCredentials: true,
        error: "",
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        loadingVerifyCredentials: false,
        loginVerificationResponse: action.payload,
      }

    case LOGOUT_USER:
      return {
        ...state,
        logoutResponse: [],
        loadingVerifyCredentials: true,
        error: "",
      }

    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutResponse: action.payload,
        loadingVerifyCredentials: false,
      }

    case API_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingVerifyCredentials: false,
      }
    case RESET_LOGIN:
      return {
        ...state,
        loginVerificationResponse: [],
        logoutResponse: [],
      }
    default:
      return state
  }
}

export default login
