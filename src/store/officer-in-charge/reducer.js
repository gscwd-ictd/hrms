import {
  GET_ALL_OIC,
  GET_ALL_OIC_SUCCESS,
  GET_ALL_OIC_FAIL,
  GET_SG20_UP_EMPLOYEES,
  GET_SG20_UP_EMPLOYEES_SUCCESS,
  GET_SG20_UP_EMPLOYEES_FAIL,
  GET_VACANT_MANAGERIAL_POSITIONS,
  GET_VACANT_MANAGERIAL_POSITIONS_SUCCESS,
  GET_VACANT_MANAGERIAL_POSITIONS_FAIL,
  POST_ASSIGN_OIC,
  POST_ASSIGN_OIC_SUCCESS,
  POST_ASSIGN_OIC_FAIL,
  DELETE_UNASSIGN_OIC,
  DELETE_UNASSIGN_OIC_SUCCESS,
  DELETE_UNASSIGN_OIC_FAIL,
  RESET_OIC_RESPONSE,
} from "./actionTypes"

const INIT_STATE = {
  oicList: [],
  sg20UpEmployees: [],
  sg24UpVacantPositions: [],
  response: {
    postAssignOIC: {},
    delUnassignOIC: {},
  },
  loading: {
    loadingOicList: false,
    loadingSg20UpEmployees: false,
    loadingSg24UpVacantPositions: false,
    loadingPostAssignOIC: false,
    loadingDelUnassignOIC: false,
  },
  error: {
    errorOicList: null,
    errorSg20UpEmployees: null,
    errorSg24UpVacantPositions: null,
    errorPostAssignOIC: null,
    errorDelUnassignOIC: null,
  },
}

const officerInCharge = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_OIC:
      return {
        ...state,
        oicList: [],
        loading: {
          ...state.loading,
          loadingOicList: true,
        },
        error: {
          ...state.error,
          errorOicList: null,
        },
      }
    case GET_ALL_OIC_SUCCESS:
      return {
        ...state,
        oicList: action.payload,
        loading: {
          ...state.loading,
          loadingOicList: false,
        },
      }
    case GET_ALL_OIC_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingOicList: false,
        },
        error: {
          ...state.error,
          errorOicList: action.payload,
        },
      }

    case GET_SG20_UP_EMPLOYEES:
      return {
        ...state,
        sg20UpEmployees: [],
        loading: {
          ...state.loading,
          loadingSg20UpEmployees: true,
        },
        error: {
          ...state.error,
          errorSg20UpEmployees: null,
        },
      }
    case GET_SG20_UP_EMPLOYEES_SUCCESS:
      return {
        ...state,
        sg20UpEmployees: action.payload,
        loading: {
          ...state.loading,
          loadingSg20UpEmployees: false,
        },
      }
    case GET_SG20_UP_EMPLOYEES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingSg20UpEmployees: false,
        },
        error: {
          ...state.error,
          errorSg20UpEmployees: action.payload,
        },
      }

    case GET_VACANT_MANAGERIAL_POSITIONS:
      return {
        ...state,
        sg24UpVacantPositions: [],
        loading: {
          ...state.loading,
          loadingSg24UpVacantPositions: true,
        },
        error: {
          ...state.error,
          errorSg24UpVacantPositions: null,
        },
      }
    case GET_VACANT_MANAGERIAL_POSITIONS_SUCCESS:
      return {
        ...state,
        sg24UpVacantPositions: action.payload,
        loading: {
          ...state.loading,
          loadingSg24UpVacantPositions: false,
        },
      }
    case GET_VACANT_MANAGERIAL_POSITIONS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingSg24UpVacantPositions: false,
        },
        error: {
          ...state.error,
          errorSg24UpVacantPositions: action.payload,
        },
      }

    case POST_ASSIGN_OIC:
      return {
        ...state,
        response: {
          ...state.response,
          postAssignOIC: {},
        },
        loading: {
          ...state.loading,
          loadingPostAssignOIC: true,
        },
        error: {
          ...state.error,
          errorPostAssignOIC: null,
        },
      }
    case POST_ASSIGN_OIC_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          postAssignOIC: action.payload,
        },
        loading: {
          ...state.loading,
          loadingPostAssignOIC: false,
        },
      }
    case POST_ASSIGN_OIC_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPostAssignOIC: false,
        },
        error: {
          ...state.error,
          errorPostAssignOIC: action.payload,
        },
      }

    case DELETE_UNASSIGN_OIC:
      return {
        ...state,
        response: {
          ...state.response,
          delUnassignOIC: {},
        },
        loading: {
          ...state.loading,
          loadingDelUnassignOIC: true,
        },
        error: {
          ...state.error,
          errorDelUnassignOIC: null,
        },
      }
    case DELETE_UNASSIGN_OIC_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          delUnassignOIC: action.payload,
        },
        loading: {
          ...state.loading,
          loadingDelUnassignOIC: false,
        },
      }
    case DELETE_UNASSIGN_OIC_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingDelUnassignOIC: false,
        },
        error: {
          ...state.error,
          errorDelUnassignOIC: action.payload,
        },
      }

    case RESET_OIC_RESPONSE:
      return {
        ...state,
        response: {
          ...state.response,
          postAssignOIC: {},
          delUnassignOIC: {},
        },
      }

    default:
      return state
  }
}

export default officerInCharge
