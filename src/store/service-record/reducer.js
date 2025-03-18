import {
  GET_SERVICE_RECORDS,
  GET_SERVICE_RECORDS_SUCCESS,
  GET_SERVICE_RECORDS_FAIL,
  RESET_SERVICE_RECORD_ERROR_LOG,
  POST_EMPLOYEE_SEPARATION,
  POST_EMPLOYEE_SEPARATION_SUCCESS,
  POST_EMPLOYEE_SEPARATION_FAIL,
} from './actionTypes'

const INIT_STATE = {
  serviceRecords: [],
  isLoading: false,
  error: null,
  response: {
    submitEmployeeSeparation: {},
    isLoading: false,
    error: null,
  },
}

const serviceRecord = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SERVICE_RECORDS:
      state = {
        ...state,
        serviceRecords: [],
        isLoading: true,
        error: null,
      }
      break
    case GET_SERVICE_RECORDS_SUCCESS:
      state = {
        ...state,
        serviceRecords: action.payload,
        isLoading: false,
      }
      break
    case GET_SERVICE_RECORDS_FAIL:
      state = {
        ...state,
        isLoading: false,
        error: action.payload,
      }
      break

    case RESET_SERVICE_RECORD_ERROR_LOG:
      state = {
        ...state,
        error: null,
        response: {
          ...state.response,
          submitEmployeeSeparation: {},
          error: null,
        },
      }
      break

    case POST_EMPLOYEE_SEPARATION:
      state = {
        ...state,
        response: {
          ...state.response,
          submitEmployeeSeparation: {},
          isLoading: true,
          error: null,
        },
      }
      break
    case POST_EMPLOYEE_SEPARATION_SUCCESS:
      state = {
        ...state,
        response: {
          ...state.response,
          submitEmployeeSeparation: action.payload,
          isLoading: false,
        },
      }
      break
    case POST_EMPLOYEE_SEPARATION_FAIL:
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

export default serviceRecord
