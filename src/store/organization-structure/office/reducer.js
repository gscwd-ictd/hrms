import {
  GET_OFFICES,
  GET_OFFICES_SUCCESS,
  POST_OFFICE,
  POST_OFFICE_SUCCESS,
  OFFICE_API_ERROR,
  RESET_OFFICE,
  DELETE_OFFICE,
  DELETE_OFFICE_SUCCESS,
  PUT_OFFICE,
  PUT_OFFICE_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  offices: [],
  postOfficeRes: [],
  putOfficeRes: [],
  delOfficeRes: [],
  isLoading: false,
  error: null,
}

const officeList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_OFFICES:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case GET_OFFICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        offices: action.payload,
      }

    case POST_OFFICE:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case POST_OFFICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        postOfficeRes: action.payload,
      }

    case PUT_OFFICE:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case PUT_OFFICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        putOfficeRes: action.payload,
      }

    case DELETE_OFFICE:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case DELETE_OFFICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        delOfficeRes: action.payload,
      }

    case RESET_OFFICE:
      return {
        ...state,
        postOfficeRes: [],
        putOfficeRes: [],
        delOfficeRes: [],
        error: null,
      }
    case OFFICE_API_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default officeList
