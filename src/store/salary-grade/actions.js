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

// Salary grade list
export const fetchSalaryGradeList = () => ({
  type: GET_SALARY_GRADE_LIST,
})
export const fetchSalaryGradeListSuccess = salaryGradeList => ({
  type: GET_SALARY_GRADE_LIST_SUCCESS,
  payload: salaryGradeList,
})

// Previous salary grade list
export const fetchPreviousSalaryGradeList = () => ({
  type: GET_PREVIOUS_SALARY_GRADE_LIST,
})
export const fetchPreviousSalaryGradeListSuccess = previousSalaryGradeList => ({
  type: GET_PREVIOUS_SALARY_GRADE_LIST_SUCCESS,
  payload: previousSalaryGradeList,
})

// Current salary grade list
export const fetchCurrentSalaryGradeList = () => ({
  type: GET_CURRENT_SALARY_GRADE_LIST,
})
export const fetchCurrentSalaryGradeListSuccess = currentSalaryGradeList => ({
  type: GET_CURRENT_SALARY_GRADE_LIST_SUCCESS,
  payload: currentSalaryGradeList,
})

// Uploading of salary grade document
export const updateSalaryGradeList = updatedSalaryGradeList => ({
  type: PUT_SALARY_GRADE_LIST,
  payload: updatedSalaryGradeList,
})
export const updateSalaryGradeListSuccess = updatedSalaryGradeListResponse => ({
  type: PUT_SALARY_GRADE_LIST_SUCCESS,
  payload: updatedSalaryGradeListResponse,
})

export const addSalaryGradeList = addedSalaryGradeList => ({
  type: POST_SALARY_GRADE_LIST,
  payload: addedSalaryGradeList,
})

export const addSalaryGradeListSuccess = addedSalaryGradeListResponse => ({
  type: POST_SALARY_GRADE_LIST_SUCCESS,
  payload: addedSalaryGradeListResponse,
})

// API call fails
export const salaryGradeApiFail = error => ({
  type: SALARY_GRADE_API_FAIL,
  payload: error,
})

export const previousSalaryGradeApiFail = error => ({
  type: PREVIOUS_SALARY_GRADE_API_FAIL,
  payload: error,
})

export const currentSalaryGradeApiFail = error => ({
  type: CURRENT_SALARY_GRADE_API_FAIL,
  payload: error,
})

// Salary grade list with all step increment
export const fetchSGListStepIncrement = () => ({
  type: GET_SALARY_GRADE_LIST_STEP_INCREMENT,
})
export const fetchSGListStepIncrementSuccess =
  salaryGradeListWithStepIncrement => ({
    type: GET_SALARY_GRADE_LIST_STEP_INCREMENT_SUCCESS,
    payload: salaryGradeListWithStepIncrement,
  })
export const fetchSGListStepIncrementFail = error => ({
  type: GET_SALARY_GRADE_LIST_STEP_INCREMENT_FAIL,
  payload: error,
})

// Salary grade list with step increment one
export const fetchSGListStepIncreOne = () => ({
  type: GET_SALARY_GRADE_LIST_STEP_INCREMENT_ONE,
})
export const fetchSGListStepIncreOneSuccess =
  salaryGradeListWithStepIncrementOne => ({
    type: GET_SALARY_GRADE_LIST_STEP_INCREMENT_ONE_SUCCESS,
    payload: salaryGradeListWithStepIncrementOne,
  })
export const fetchSGListStepIncreOneFail = error => ({
  type: GET_SALARY_GRADE_LIST_STEP_INCREMENT_ONE_FAIL,
  payload: error,
})

export const resetSalaryGradeResponses = () => {
  return {
    type: RESET_SALARY_GRADE_RESPONSES,
  }
}
