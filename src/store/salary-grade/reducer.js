import {
  GET_SALARY_GRADE_LIST,
  GET_SALARY_GRADE_LIST_SUCCESS,
  PUT_SALARY_GRADE_LIST,
  PUT_SALARY_GRADE_LIST_SUCCESS,
  SALARY_GRADE_API_FAIL,
  GET_SALARY_GRADE_LIST_STEP_INCREMENT,
  GET_SALARY_GRADE_LIST_STEP_INCREMENT_SUCCESS,
  GET_SALARY_GRADE_LIST_STEP_INCREMENT_FAIL,
  GET_SALARY_GRADE_LIST_STEP_INCREMENT_ONE,
  GET_SALARY_GRADE_LIST_STEP_INCREMENT_ONE_SUCCESS,
  GET_SALARY_GRADE_LIST_STEP_INCREMENT_ONE_FAIL,
  RESET_SALARY_GRADE_RESPONSES,
} from "./actionTypes"

const INIT_STATE = {
  response: {
    salaryGradeList: [],
    salaryGradeStepIncrement: [],
    salaryGradeStepIncrementOne: [],
    salaryGrade: {
      put: {},
    },
  },
  loading: {
    loadingSalaryGradeStepIncrementOne: false,
    loadingSalaryGrade: false,
    loadingSalaryGradeStepIncrement: false,
  },
  error: {
    errorSalaryGradeStepIncrementOne: null,
    errorSalaryGrade: null,
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
          errorSalaryGradeStepIncrement: null,
        },
      }
    default:
      return state
  }
}

export default salaryGrade
