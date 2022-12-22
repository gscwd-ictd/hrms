import {
  GET_DIVISIONS,
  GET_DIVISIONS_SUCCESS,
  POST_DIVISION,
  POST_DIVISION_SUCCESS,
  PUT_DIVISION,
  PUT_DIVISION_SUCCESS,
  DELETE_DIVISION,
  DELETE_DIVISION_SUCCESS,
  RESET_DIVISION,
  DIVISION_API_ERROR,
} from "./actionTypes"

const INIT_STATE = {
  divisions: [],
  postDivisionRes: [],
  putDivisionRes: [],
  delDivisionRes: [],
  isLoading: false,
  error: null,
}

const divisionList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DIVISIONS:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case GET_DIVISIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        divisions: action.payload,
      }
    case POST_DIVISION:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case POST_DIVISION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        postDivisionRes: action.payload,
      }
    case PUT_DIVISION:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case PUT_DIVISION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        putDivisionRes: action.payload,
      }
    case DELETE_DIVISION:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case DELETE_DIVISION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        delDivisionRes: action.payload,
      }
    case RESET_DIVISION:
      return {
        ...state,
        postDivisionRes: [],
        putDivisionRes: [],
        delDivisionRes: [],
        error: null,
      }
    case DIVISION_API_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default divisionList
