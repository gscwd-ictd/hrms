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

// Salary grade list
export const fetchSalaryGradeList = () => ({
  type: GET_SALARY_GRADE_LIST,
})
export const fetchSalaryGradeListSuccess = salaryGradeList => ({
  type: GET_SALARY_GRADE_LIST_SUCCESS,
  payload: salaryGradeList,
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

// API call fails
export const salaryGradeApiFail = error => ({
  type: SALARY_GRADE_API_FAIL,
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
