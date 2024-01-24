import {
  GET_SALARY_GRADE_LIST,
  GET_SALARY_GRADE_LIST_SUCCESS,
  GET_PREVIOUS_SALARY_GRADE_LIST,
  GET_PREVIOUS_SALARY_GRADE_LIST_SUCCESS,
  GET_CURRENT_SALARY_GRADE_LIST,
  GET_CURRENT_SALARY_GRADE_LIST_SUCCESS,
  POST_SALARY_GRADE_LIST,
  POST_SALARY_GRADE_LIST_SUCCESS,
  PUT_SALARY_GRADE_LIST,
  PUT_SALARY_GRADE_LIST_SUCCESS,
  SALARY_GRADE_API_FAIL,
  PREVIOUS_SALARY_GRADE_API_FAIL,
  CURRENT_SALARY_GRADE_API_FAIL,
  GET_SALARY_GRADE_LIST_STEP_INCREMENT,
  GET_SALARY_GRADE_LIST_STEP_INCREMENT_SUCCESS,
  GET_SALARY_GRADE_LIST_STEP_INCREMENT_FAIL,
  GET_SALARY_GRADE_LIST_STEP_INCREMENT_ONE,
  GET_SALARY_GRADE_LIST_STEP_INCREMENT_ONE_SUCCESS,
  GET_SALARY_GRADE_LIST_STEP_INCREMENT_ONE_FAIL,
  RESET_SALARY_GRADE_RESPONSES,
} from './actionTypes'

const INIT_STATE = {
  response: {
    salaryGradeList: [],
    previousSalaryGradeList: [],
    currentSalaryGradeList: [],
    salaryGradeStepIncrement: [],
    salaryGradeStepIncrementOne: [],
    salaryGrade: {
      post: {},
      put: {},
    },
  },
  loading: {
    loadingSalaryGradeStepIncrementOne: false,
    loadingSalaryGrade: false,
    loadingPreviousSalaryGrade: false,
    loadingCurrentSalaryGrade: false,
    loadingSalaryGradeStepIncrement: false,
  },
  error: {
    errorSalaryGradeStepIncrementOne: null,
    errorSalaryGrade: null,
    errorPreviousSalaryGrade: null,
    errorCurrentSalaryGrade: null,
    errorSalaryGradeStepIncrement: null,
  },
}

const salaryGrade = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SALARY_GRADE_LIST:
      return {
        ...state,
        response: {
          ...state.response,
          salaryGradeList: [],
        },
        loading: {
          ...state.loading,
          loadingSalaryGrade: true,
        },
        error: {
          ...state.error,
          errorSalaryGrade: null,
        },
      }
    case GET_SALARY_GRADE_LIST_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          salaryGradeList: action.payload,
        },
        loading: {
          ...state.loading,
          loadingSalaryGrade: false,
        },
      }

    // previous salary grade
    case GET_PREVIOUS_SALARY_GRADE_LIST:
      return {
        ...state,
        response: {
          ...state.response,
          previousSalaryGradeList: [],
        },
        loading: {
          ...state.loading,
          loadingPreviousSalaryGrade: true,
        },
        error: {
          ...state.error,
          errorPreviousSalaryGrade: null,
        },
      }
    case GET_PREVIOUS_SALARY_GRADE_LIST_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          previousSalaryGradeList: action.payload,
        },
        loading: {
          ...state.loading,
          loadingPreviousSalaryGrade: false,
        },
      }

    // current salary grade
    case GET_CURRENT_SALARY_GRADE_LIST:
      return {
        ...state,
        response: {
          ...state.response,
          currentSalaryGradeList: [],
        },
        loading: {
          ...state.loading,
          loadingCurrentSalaryGrade: true,
        },
        error: {
          ...state.error,
          errorCurrentSalaryGrade: null,
        },
      }
    case GET_CURRENT_SALARY_GRADE_LIST_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          currentSalaryGradeList: action.payload,
        },
        loading: {
          ...state.loading,
          loadingCurrentSalaryGrade: false,
        },
      }

    case PUT_SALARY_GRADE_LIST:
      return {
        ...state,
        response: {
          ...state.response,
          salaryGrade: {
            ...state.response.salaryGrade,
            put: {},
          },
        },
        loading: {
          ...state.loading,
          loadingSalaryGrade: true,
        },
        error: {
          ...state.error,
          errorSalaryGrade: null,
        },
      }
    case PUT_SALARY_GRADE_LIST_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          salaryGrade: {
            ...state.response.salaryGrade,
            put: action.payload,
          },
        },
        loading: {
          ...state.loading,
          loadingSalaryGrade: false,
        },
      }

    case POST_SALARY_GRADE_LIST:
      return {
        ...state,
        response: {
          ...state.response,
          salaryGrade: {
            ...state.response.salaryGrade,
            post: {},
          },
        },
        loading: {
          ...state.loading,
          loadingSalaryGrade: true,
        },
        error: {
          ...state.error,
          errorSalaryGrade: null,
        },
      }

    case POST_SALARY_GRADE_LIST_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          salaryGrade: {
            ...state.response.salaryGrade,
            post: action.payload,
          },
        },
        loading: {
          ...state.loading,
          loadingSalaryGrade: false,
        },
      }

    case SALARY_GRADE_API_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingSalaryGrade: false,
        },
        error: {
          ...state.error,
          errorSalaryGrade: action.payload,
        },
      }

    case PREVIOUS_SALARY_GRADE_API_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPreviousSalaryGrade: false,
        },
        error: {
          ...state.error,
          errorPreviousSalaryGrade: action.payload,
        },
      }

    case CURRENT_SALARY_GRADE_API_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingCurrentSalaryGrade: false,
        },
        error: {
          ...state.error,
          errorCurrentSalaryGrade: action.payload,
        },
      }

    case GET_SALARY_GRADE_LIST_STEP_INCREMENT:
      return {
        ...state,
        response: {
          ...state.response,
          salaryGradeStepIncrement: [],
        },
        loading: {
          ...state.loading,
          loadingSalaryGradeStepIncrement: true,
        },
        error: {
          ...state.error,
          errorSalaryGradeStepIncrement: null,
        },
      }
    case GET_SALARY_GRADE_LIST_STEP_INCREMENT_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          salaryGradeStepIncrement: action.payload,
        },
        loading: {
          ...state.loading,
          loadingSalaryGradeStepIncrement: false,
        },
      }
    case GET_SALARY_GRADE_LIST_STEP_INCREMENT_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingSalaryGradeStepIncrement: false,
        },
        error: {
          ...state.error,
          errorSalaryGradeStepIncrement: action.payload,
        },
      }

    case GET_SALARY_GRADE_LIST_STEP_INCREMENT_ONE:
      return {
        ...state,
        response: {
          ...state.response,
          salaryGradeStepIncrementOne: [],
        },
        loading: {
          ...state.loading,
          loadingSalaryGradeStepIncrementOne: true,
        },
        error: {
          ...state.error,
          errorSalaryGradeStepIncrementOne: null,
        },
      }
    case GET_SALARY_GRADE_LIST_STEP_INCREMENT_ONE_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          salaryGradeStepIncrementOne: action.payload,
        },
        loading: {
          ...state.loading,
          loadingSalaryGradeStepIncrementOne: false,
        },
      }
    case GET_SALARY_GRADE_LIST_STEP_INCREMENT_ONE_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingSalaryGradeStepIncrementOne: false,
        },
        error: {
          ...state.error,
          errorSalaryGradeStepIncrementOne: action.payload,
        },
      }

    case RESET_SALARY_GRADE_RESPONSES:
      return {
        ...state,
        response: {
          ...state.response,
          salaryGrade: {
            ...state.response.salaryGrade,
            put: {},
          },
        },
        error: {
          ...state.error,
          errorSalaryGradeStepIncrementOne: null,
          errorSalaryGrade: null,
          errorPreviousSalaryGrade: null,
          errorCurrentSalaryGrade: null,
          errorSalaryGradeStepIncrement: null,
        },
      }
    default:
      return state
  }
}

export default salaryGrade
