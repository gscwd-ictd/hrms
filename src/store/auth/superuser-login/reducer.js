import {
  SU_LOGIN_USER,
  SU_LOGIN_SUCCESS,
  SU_LOGOUT_USER,
  API_ERROR,
} from "./actionTypes"

const initialState = {
  error: "",
  isLoading: false,
  response: [],
}

const superUserLogin = (state = initialState, action) => {
  switch (action.type) {
    case SU_LOGIN_USER:
      state = {
        ...state,
        isLoading: true,
        error: "",
      }
      break
    case SU_LOGIN_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        response: action.payload,
      }
      break
    case SU_LOGOUT_USER:
      state = { ...state }
      break
    case API_ERROR:
      state = {
        ...state,
        error: action.payload,
        isLoading: false,
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default superUserLogin
