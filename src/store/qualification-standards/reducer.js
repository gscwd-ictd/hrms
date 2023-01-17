import {
  GET_QUALIFICATION_STANDARDS_LIST,
  GET_QUALIFICATION_STANDARDS_LIST_SUCCESS,
  GET_QUALIFICATION_STANDARDS_LIST_FAIL,
  GET_POSITION_QUALIFICATION_STANDARDS,
  GET_POSITION_QUALIFICATION_STANDARDS_SUCCESS,
  GET_POSITION_QUALIFICATION_STANDARDS_FAIL,
  PUT_POSITION_QUALIFICATION_STANDARDS,
  PUT_POSITION_QUALIFICATION_STANDARDS_SUCCESS,
  PUT_POSITION_QUALIFICATION_STANDARDS_FAIL,
  RESET_QUALIFICATION_STANDARDS,
} from "./actionTypes"

const INIT_STATE = {
  qualificationStandardsList: [],
  position: {
    get: {},
    put: {},
    delete: {},
    post: {},
  },
  loading: {
    loadingQualificationStandardsList: false,
    loadingPositionQualificationStandards: false,
  },
  error: {
    errorQualificationStandardsList: null,
    errorPositionQualificationStandards: null,
  },
}

const qualificationStandards = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_QUALIFICATION_STANDARDS_LIST:
      return {
        ...state,
        qualificationStandardsList: [],
        loading: {
          ...state.loading,
          loadingQualificationStandardsList: true,
        },
        error: {
          ...state.error,
          errorQualificationStandardsList: null,
        },
      }
    case GET_QUALIFICATION_STANDARDS_LIST_SUCCESS:
      return {
        ...state,
        qualificationStandardsList: action.payload,
        loading: {
          ...state.loading,
          loadingQualificationStandardsList: false,
        },
      }
    case GET_QUALIFICATION_STANDARDS_LIST_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingQualificationStandardsList: false,
        },
        error: {
          ...state.error,
          errorQualificationStandardsList: action.payload,
        },
      }

    case GET_POSITION_QUALIFICATION_STANDARDS:
      return {
        ...state,
        position: {
          ...state.position,
          get: {},
        },
        loading: {
          ...state.loading,
          loadingPositionQualificationStandards: true,
        },
        error: {
          ...state.error,
          errorPositionQualificationStandards: null,
        },
      }
    case GET_POSITION_QUALIFICATION_STANDARDS_SUCCESS:
      return {
        ...state,
        position: {
          ...state.position,
          get: action.payload,
        },
        loading: {
          ...state.loading,
          loadingPositionQualificationStandards: false,
        },
      }
    case GET_POSITION_QUALIFICATION_STANDARDS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionQualificationStandards: false,
        },
        error: {
          ...state.error,
          errorPositionQualificationStandards: action.payload,
        },
      }

    case PUT_POSITION_QUALIFICATION_STANDARDS:
      return {
        ...state,
        position: {
          ...state.position,
          put: {},
        },
        loading: {
          ...state.loading,
          loadingPositionQualificationStandards: true,
        },
        error: {
          ...state.error,
          errorPositionQualificationStandards: null,
        },
      }
    case PUT_POSITION_QUALIFICATION_STANDARDS_SUCCESS:
      return {
        ...state,
        position: {
          ...state.position,
          put: action.payload,
        },
        loading: {
          ...state.loading,
          loadingPositionQualificationStandards: false,
        },
      }
    case PUT_POSITION_QUALIFICATION_STANDARDS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPositionQualificationStandards: false,
        },
        error: {
          ...state.error,
          errorPositionQualificationStandards: action.payload,
        },
      }

    case RESET_QUALIFICATION_STANDARDS:
      return {
        ...state,
        position: {
          ...state.position,
          get: {},
          put: {},
          delete: {},
          post: {},
        },
        error: {
          ...state.error,
          errorQualificationStandardsList: null,
          errorPositionQualificationStandards: null,
        },
      }
    default:
      return state
  }
}

export default qualificationStandards
