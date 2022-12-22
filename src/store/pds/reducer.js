import {
  GET_PDS_LIST,
  GET_PDS_LIST_SUCCESS,
  GET_PDS_LIST_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  pdsList: [],
  isLoading: false,
  error: null,
}

const pds = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PDS_LIST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case GET_PDS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pdslist: action.payload,
      }

    case GET_PDS_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default pds
