import {
  GET_COUNTRIES,
  GET_COUNTRIES_FAIL,
  GET_COUNTRIES_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  list: [],
  isLoading: false,
  error: null,
}

const countries = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      }

    case GET_COUNTRIES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default countries
