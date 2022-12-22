import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_NON_HRMS_USERS,
  GET_NON_HRMS_USERS_SUCCESS,
  GET_NON_HRMS_USERS_FAIL,
  GET_USER_ROLES,
  GET_USER_ROLES_SUCCESS,
  POST_USER,
  POST_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  PATCH_USER_ROLES,
  PATCH_USER_ROLES_SUCCESS,
  RESET_USER_RESPONSE,
  USER_API_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  userList: [],
  nonUserList: [],
  response: {
    postAddUser: {},
    deleteRemoveUser: {},
    getFetchUserRoles: {},
    patchUpdateUserRoles: {},
  },
  loading: {
    loadingUserList: false,
    loadingNonUserList: false,
    loadingResponse: false,
    loadingResponseUpdate: false,
  },
  error: {
    errorUserList: null,
    errorNonUserList: null,
    errorResponse: null,
  },
}

const users = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        userList: [],
        loading: {
          ...state.loading,
          loadingUserList: true,
        },
        error: {
          ...state.error,
          errorUserList: null,
        },
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        userList: action.payload,
        loading: {
          ...state.loading,
          loadingUserList: false,
        },
      }
    case GET_USERS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingUserList: false,
        },
        error: {
          ...state.error,
          errorUserList: action.payload,
        },
      }

    case GET_NON_HRMS_USERS:
      return {
        ...state,
        nonUserList: [],
        loading: {
          ...state.loading,
          loadingNonUserList: true,
        },
        error: {
          ...state.error,
          errorNonUserList: null,
        },
      }
    case GET_NON_HRMS_USERS_SUCCESS:
      return {
        ...state,
        nonUserList: action.payload,
        loading: {
          ...state.loading,
          loadingNonUserList: false,
        },
      }
    case GET_NON_HRMS_USERS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingNonUserList: false,
        },
        error: {
          ...state.error,
          errorNonUserList: action.payload,
        },
      }

    case POST_USER:
      return {
        ...state,
        response: {
          ...state.response,
          postAddUser: {},
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
    case POST_USER_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          postAddUser: action.payload,
        },
        loading: {
          ...state.loading,
          loadingResponse: false,
        },
      }

    case DELETE_USER:
      return {
        ...state,
        response: {
          ...state.response,
          deleteRemoveUser: {},
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
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          deleteRemoveUser: action.payload,
        },
        loading: {
          ...state.loading,
          loadingResponse: false,
        },
      }

    case GET_USER_ROLES:
      return {
        ...state,
        response: {
          ...state.response,
          getFetchUserRoles: {},
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
    case GET_USER_ROLES_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          getFetchUserRoles: action.payload,
        },
        loading: {
          ...state.loading,
          loadingResponse: false,
        },
      }

    case PATCH_USER_ROLES:
      return {
        ...state,
        response: {
          ...state.response,
          patchUpdateUserRoles: {},
        },
        loading: {
          ...state.loading,
          loadingResponseUpdate: true,
        },
        error: {
          ...state.error,
          errorResponse: null,
        },
      }
    case PATCH_USER_ROLES_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          patchUpdateUserRoles: action.payload,
        },
        loading: {
          ...state.loading,
          loadingResponseUpdate: false,
        },
      }

    case RESET_USER_RESPONSE:
      return {
        ...state,
        response: {
          ...state.response,
          postAddUser: {},
          deleteRemoveUser: {},
          getFetchUserRoles: {},
          patchUpdateUserRoles: {},
        },
        error: {
          ...state.error,
          errorNonUserList: null,
          errorResponse: null,
        },
      }

    case USER_API_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingResponse: false,
          loadingResponseUpdate: false,
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

export default users
