import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_SUCCESS,
  API_ERROR,
  RESET_LOGIN,
} from "./actionTypes"

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  }
}

export const loginSuccess = loginVerificationResponse => {
  return {
    type: LOGIN_SUCCESS,
    payload: loginVerificationResponse,
  }
}

// export const logoutUser = history => {
//   return {
//     type: LOGOUT_USER,
//     payload: { history },
//   }
// }

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  }
}

export const logoutSuccess = resposnse => {
  return {
    type: LOGOUT_SUCCESS,
    payload: resposnse,
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

export const resetLogin = () => {
  return {
    type: RESET_LOGIN,
  }
}
