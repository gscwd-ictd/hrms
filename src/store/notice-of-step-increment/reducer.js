import {
  GET_EMPLOYEES_FOR_NOSI,
  GET_EMPLOYEES_FOR_NOSI_SUCCESS,
  GET_EMPLOYEES_FOR_NOSI_FAIL,
  GET_NOSI_DETAILS,
  GET_NOSI_DETAILS_SUCCESS,
  GET_NOSI_DETAILS_FAIL,
  POST_NOSI_FOR_APPROVAL,
  POST_NOSI_FOR_APPROVAL_SUCCESS,
  POST_NOSI_FOR_APPROVAL_FAIL,
} from './actionTypes'

const INIT_STATE = {
  employeesForNosi: [],
  isLoading: false,
  error: null,
  response: {
    getNosiDetails: {},
    submitNosiForApproval: {},
    isLoading: false,
    error: null,
  },
}

const noticeOfStepIncrement = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_FOR_NOSI:
      state = {
        ...state,
        employeesForNosi: [],
        isLoading: true,
        error: null,
      }
      break
    case GET_EMPLOYEES_FOR_NOSI_SUCCESS:
      state = {
        ...state,
        employeesForNosi: action.payload,
        isLoading: false,
      }
      break
    case GET_EMPLOYEES_FOR_NOSI_FAIL:
      state = {
        ...state,
        isLoading: false,
        error: action.payload,
      }
      break

    case GET_NOSI_DETAILS:
      state = {
        ...state,
        response: {
          ...state.response,
          getNosiDetails: {},
          isLoading: true,
          error: null,
        },
      }
      break
    case GET_NOSI_DETAILS_SUCCESS:
      state = {
        ...state,
        response: {
          ...state.response,
          getNosiDetails: action.payload,
          isLoading: false,
        },
      }
      break
    case GET_NOSI_DETAILS_FAIL:
      state = {
        ...state,
        response: {
          ...state.response,
          isLoading: false,
          error: action.payload,
        },
      }
      break

    case POST_NOSI_FOR_APPROVAL:
      state = {
        ...state,
        response: {
          ...state.response,
          submitNosiForApproval: {},
          isLoading: true,
          error: null,
        },
      }
      break
    case POST_NOSI_FOR_APPROVAL_SUCCESS:
      state = {
        ...state,
        response: {
          ...state.response,
          submitNosiForApproval: action.payload,
          isLoading: false,
        },
      }
      break
    case POST_NOSI_FOR_APPROVAL_FAIL:
      state = {
        ...state,
        response: {
          ...state.response,
          isLoading: false,
          error: action.payload,
        },
      }
      break

    default:
      state = { ...state }
      break
  }
  return state
}

export default noticeOfStepIncrement
