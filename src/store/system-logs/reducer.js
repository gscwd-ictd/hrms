import {
  GET_SYSTEM_LOGS,
  GET_SYSTEM_LOGS_SUCCESS,
  GET_SYSTEM_LOGS_FAIL,
  GET_SYSTEM_LOG,
  GET_SYSTEM_LOG_SUCCESS,
  GET_SYSTEM_LOG_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  systemLogList: [],
  response: {
    getSystemLog: {},
  },
  single: {},
  loading: {
    loadingList: false,
    loadingResponse: false,
  },
  error: {
    errorList: null,
    errorResponse: null,
  },
}

const systemLogs = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SYSTEM_LOGS:
      return {
        ...state,
        systemLogList: [],
        loading: {
          ...state.loading,
          loadingList: true,
        },
        error: {
          ...state.error,
          errorList: null,
        },
      }
    case GET_SYSTEM_LOGS_SUCCESS:
      return {
        ...state,
        systemLogList: action.payload,
        loading: {
          ...state.loading,
          loadingList: false,
        },
      }
    case GET_SYSTEM_LOGS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingList: false,
        },
        error: {
          ...state.error,
          errorList: action.payload,
        },
      }

    case GET_SYSTEM_LOG:
      return {
        ...state,
        response: {
          ...state.response,
          getSystemLog: {},
        },
        loading: {
          ...state.loading,
          loadingList: true,
        },
        error: {
          ...state.error,
          errorList: null,
        },
      }
    case GET_SYSTEM_LOG_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          getSystemLog: action.payload,
        },
        loading: {
          ...state.loading,
          loadingList: false,
        },
      }
    case GET_SYSTEM_LOG_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingList: false,
        },
        error: {
          ...state.error,
          errorList: action.payload,
        },
      }

    default:
      return state
  }
}

export default systemLogs
