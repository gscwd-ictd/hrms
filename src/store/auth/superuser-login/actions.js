import {
  SU_LOGIN_USER,
  SU_LOGIN_SUCCESS,
  SU_LOGOUT_USER,
  API_ERROR
} from "./actionTypes"

export const loginSuperUser = (user, history) => {
  return {
    type: SU_LOGIN_USER,
    payload: { user, history },
  }
}

export const loginSuperUserSuccess = loginVerificationResponse => {
  return {
    type: SU_LOGIN_SUCCESS,
    payload: loginVerificationResponse,
  }
}

export const logoutSuperUser = history => {
  return {
    type: SU_LOGOUT_USER,
    payload: { history },
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}
