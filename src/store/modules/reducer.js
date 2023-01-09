import {
  GET_HRMS_MODULES,
  GET_HRMS_MODULES_SUCCESS,
  POST_HRMS_MODULE,
  POST_HRMS_MODULE_SUCCESS,
  DELETE_HRMS_MODULE,
  DELETE_HRMS_MODULE_SUCCESS,
  PATCH_HRMS_MODULE,
  PATCH_HRMS_MODULE_SUCCESS,
  HRMS_MODULE_API_FAIL,
  RESET_HRMS_MODULE_RESPONSE,
} from "./actionTypes"

const INIT_STATE = {
  modulesList: [],
  response: {
    postAddModule: {},
    deleteRemoveModule: {},
    patchUpdateModule: {},
  },
  loading: {
    loadingModuleList: false,
    loadingResponse: false,
  },
  error: {
    errorResponse: null,
  },
}

const modules = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_HRMS_MODULES:
      return {
        ...state,
        modulesList: [],
        loading: {
          ...state.loading,
          loadingModuleList: true,
        },
        error: {
          ...state.error,
          errorResponse: null,
        },
      }
    case GET_HRMS_MODULES_SUCCESS:
      return {
        ...state,
        modulesList: action.payload,
        loading: {
          ...state.loading,
          loadingModuleList: false,
        },
      }

    case POST_HRMS_MODULE:
      return {
        ...state,
        response: {
          ...state.response,
          postAddModule: {},
        },
        loading: {
          ...state.loading,
          loadingResponse: true,
        },
        error: {
          ...state.error,
          errorResponse: null,
        },
      }
    case POST_HRMS_MODULE_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          postAddModule: action.payload,
        },
        loading: {
          ...state.loading,
          loadingResponse: false,
        },
      }

    case DELETE_HRMS_MODULE:
      return {
        ...state,
        response: {
          ...state.response,
          deleteRemoveModule: {},
        },
        loading: {
          ...state.loading,
          loadingResponse: true,
        },
        error: {
          ...state.error,
          errorResponse: null,
        },
      }
    case DELETE_HRMS_MODULE_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          deleteRemoveModule: action.payload,
        },
        loading: {
          ...state.loading,
          loadingResponse: false,
        },
      }

    case PATCH_HRMS_MODULE:
      return {
        ...state,
        response: {
          ...state.response,
          patchUpdateModule: {},
        },
        loading: {
          ...state.loading,
          loadingResponse: true,
        },
        error: {
          ...state.error,
          errorResponse: null,
        },
      }
    case PATCH_HRMS_MODULE_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          patchUpdateModule: action.payload,
        },
        loading: {
          ...state.loading,
          loadingResponse: false,
        },
      }

    case RESET_HRMS_MODULE_RESPONSE:
      return {
        ...state,
        response: {
          ...state.response,
          postAddModule: {},
          deleteRemoveModule: {},
          patchUpdateModule: {},
        },
      }

    case HRMS_MODULE_API_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingModuleList: false,
          loadingResponse: false,
        },
        error: {
          ...state.error,
          errorResponse: action.payload,
        },
      }

    default:
      return state
  }
}

export default modules
