import {
  API_SUCCESS,
  API_FAIL,
  GET_CHARTS_DATA,
  GET_EMPLOYEES_COUNT,
  GET_EMPLOYEES_COUNT_SUCCESS,
  GET_EMPLOYEES_COUNT_FAIL,
  GET_APPLICANTS_COUNT,
  GET_APPLICANTS_COUNT_SUCCESS,
  GET_APPLICANTS_COUNT_FAIL,
  GET_APPROVED_PRF_COUNT,
  GET_APPROVED_PRF_COUNT_SUCCESS,
  GET_APPROVED_PRF_COUNT_FAIL,
  GET_BIRTHDAY_CELEBRANTS,
  GET_BIRTHDAY_CELEBRANTS_SUCCESS,
  GET_BIRTHDAY_CELEBRANTS_FAIL,
} from './actionTypes'

const INIT_STATE = {
  chartsData: [],
  employeesCount: [],
  applicantsCount: [],
  approvedPrfCount: [],
  birthdayCelebrants: [],
  loading: {
    loadingEmployeesCount: false,
    loadingApplicantsCount: false,
    loadingApprovedPrfCount: false,
    loadingBirthdayCelebrants: false,
  },
  error: {
    errorEmployeesCount: null,
    errorApplicantsCount: null,
    errorApprovedPrfCount: null,
    errorBirthdayCelebrants: null,
  },
}

const Dashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_SUCCESS:
      switch (action.payload.actionType) {
        case GET_CHARTS_DATA:
          return {
            ...state,
            chartsData: action.payload.data,
          }
        default:
          return state
      }
    case API_FAIL:
      switch (action.payload.actionType) {
        case GET_CHARTS_DATA:
          return {
            ...state,
            chartsDataError: action.payload.error,
          }

        default:
          return state
      }

    // get employees count
    case GET_EMPLOYEES_COUNT:
      return {
        ...state,
        employeesCount: [],
        loading: {
          ...state.loading,
          loadingEmployeesCount: true,
        },
        error: {
          ...state.error,
          errorEmployeesCount: null,
        },
      }
    case GET_EMPLOYEES_COUNT_SUCCESS:
      return {
        ...state,
        employeesCount: action.payload,
        loading: {
          ...state.loading,
          loadingEmployeesCount: false,
        },
        error: {
          ...state.error,
          errorEmployeesCount: null,
        },
      }
    case GET_EMPLOYEES_COUNT_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingEmployeesCount: false,
        },
        error: {
          ...state.error,
          errorEmployeesCount: action.payload,
        },
      }

    // get applicants count
    case GET_APPLICANTS_COUNT:
      return {
        ...state,
        applicantsCount: [],
        loading: {
          ...state.loading,
          loadingApplicantsCount: true,
        },
        error: {
          ...state.error,
          errorApplicantsCount: null,
        },
      }
    case GET_APPLICANTS_COUNT_SUCCESS:
      return {
        ...state,
        applicantsCount: action.payload,
        loading: {
          ...state.loading,
          loadingApplicantsCount: false,
        },
        error: {
          ...state.error,
          errorApplicantsCount: null,
        },
      }
    case GET_APPLICANTS_COUNT_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingApplicantsCount: false,
        },
        error: {
          ...state.error,
          errorApplicantsCount: action.payload,
        },
      }

    // get approved PRFs count
    case GET_APPROVED_PRF_COUNT:
      return {
        ...state,
        approvedPrfCount: [],
        loading: {
          ...state.loading,
          loadingApprovedPrfCount: true,
        },
        error: {
          ...state.error,
          errorApprovedPrfCount: null,
        },
      }
    case GET_APPROVED_PRF_COUNT_SUCCESS:
      return {
        ...state,
        approvedPrfCount: action.payload,
        loading: {
          ...state.loading,
          loadingApprovedPrfCount: false,
        },
        error: {
          ...state.error,
          errorApprovedPrfCount: null,
        },
      }
    case GET_APPROVED_PRF_COUNT_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingApprovedPrfCount: false,
        },
        error: {
          ...state.error,
          errorApprovedPrfCount: action.payload,
        },
      }

    // get birthday celebrants
    case GET_BIRTHDAY_CELEBRANTS:
      return {
        ...state,
        birthdayCelebrants: [],
        loading: {
          ...state.loading,
          loadingBirthdayCelebrants: true,
        },
        error: {
          ...state.error,
          errorBirthdayCelebrants: null,
        },
      }
    case GET_BIRTHDAY_CELEBRANTS_SUCCESS:
      return {
        ...state,
        birthdayCelebrants: action.payload,
        loading: {
          ...state.loading,
          loadingBirthdayCelebrants: false,
        },
      }
    case GET_BIRTHDAY_CELEBRANTS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingBirthdayCelebrants: false,
        },
        error: {
          ...state.error,
          errorBirthdayCelebrants: action.payload,
        },
      }

    default:
      return state
  }
}

export default Dashboard
