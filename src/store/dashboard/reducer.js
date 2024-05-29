import {
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
  GET_NOA_DISTRIBUTION,
  GET_NOA_DISTRIBUTION_SUCCESS,
  GET_NOA_DISTRIBUTION_FAIL,
  GET_PERSONNEL_DISTRIBUTION,
  GET_PERSONNEL_DISTRIBUTION_SUCCESS,
  GET_PERSONNEL_DISTRIBUTION_FAIL,
  GET_AGE_DISTRIBUTION,
  GET_AGE_DISTRIBUTION_SUCCESS,
  GET_AGE_DISTRIBUTION_FAIL,
} from './actionTypes'

const INIT_STATE = {
  // chartsData: [],
  employeesCount: [],
  applicantsCount: [],
  approvedPrfCount: [],
  birthdayCelebrants: [],
  natureOfAppointmentDistribution: {},
  personnelDistributaion: {},
  ageBracketDistribution: {},
  loading: {
    loadingEmployeesCount: false,
    loadingApplicantsCount: false,
    loadingApprovedPrfCount: false,
    loadingBirthdayCelebrants: false,
    loadingNatureOfAppointmentDistribution: false,
    loadingPersonnelDistributaion: false,
    loadingAgeBracketDistribution: false,
  },
  error: {
    errorEmployeesCount: null,
    errorApplicantsCount: null,
    errorApprovedPrfCount: null,
    errorBirthdayCelebrants: null,
    errorNatureOfAppointmentDistribution: null,
    errorPersonnelDistributaion: null,
    errorAgeBracketDistribution: null,
  },
}

const Dashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    // case API_SUCCESS:
    //   switch (action.payload.actionType) {
    //     case GET_CHARTS_DATA:
    //       return {
    //         ...state,
    //         chartsData: action.payload.data,
    //       }
    //     default:
    //       return state
    //   }
    // case API_FAIL:
    //   switch (action.payload.actionType) {
    //     case GET_CHARTS_DATA:
    //       return {
    //         ...state,
    //         chartsDataError: action.payload.error,
    //       }

    //     default:
    //       return state
    //   }

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

    // nature of appointment
    case GET_NOA_DISTRIBUTION:
      return {
        ...state,
        natureOfAppointmentDistribution: {},
        loading: {
          loadingNatureOfAppointmentDistribution: true,
        },
        error: {
          errorNatureOfAppointmentDistribution: null,
        },
      }
    case GET_NOA_DISTRIBUTION_SUCCESS:
      return {
        ...state,
        natureOfAppointmentDistribution: action.payload,
        loading: {
          loadingNatureOfAppointmentDistribution: false,
        },
      }
    case GET_NOA_DISTRIBUTION_FAIL:
      return {
        ...state,
        loading: {
          loadingNatureOfAppointmentDistribution: false,
        },
        error: {
          errorNatureOfAppointmentDistribution: action.payload,
        },
      }

    // personnel distribution
    case GET_PERSONNEL_DISTRIBUTION:
      return {
        ...state,
        personnelDistributaion: {},
        loading: {
          loadingPersonnelDistributaion: true,
        },
        error: {
          errorPersonnelDistributaion: null,
        },
      }
    case GET_PERSONNEL_DISTRIBUTION_SUCCESS:
      return {
        ...state,
        personnelDistributaion: action.payload,
        loading: {
          loadingPersonnelDistributaion: false,
        },
      }
    case GET_PERSONNEL_DISTRIBUTION_FAIL:
      return {
        ...state,
        loading: {
          loadingPersonnelDistributaion: false,
        },
        error: {
          errorPersonnelDistributaion: action.payload,
        },
      }

    // age bracket distribution
    case GET_AGE_DISTRIBUTION:
      return {
        ...state,
        ageBracketDistribution: {},
        loading: {
          loadingAgeBracketDistribution: true,
        },
        error: {
          errorAgeBracketDistribution: null,
        },
      }
    case GET_AGE_DISTRIBUTION_SUCCESS:
      return {
        ...state,
        ageBracketDistribution: action.payload,
        loading: {
          loadingAgeBracketDistribution: false,
        },
      }
    case GET_AGE_DISTRIBUTION_FAIL:
      return {
        ...state,
        loading: {
          loadingAgeBracketDistribution: false,
        },
        error: {
          errorAgeBracketDistribution: action.payload,
        },
      }

    default:
      return state
  }
}

export default Dashboard
