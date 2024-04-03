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

export const apiSuccess = (actionType, data) => ({
  type: API_SUCCESS,
  payload: { actionType, data },
})

export const apiFail = (actionType, error) => ({
  type: API_FAIL,
  payload: { actionType, error },
})

// charts data
export const getChartsData = periodType => ({
  type: GET_CHARTS_DATA,
  payload: periodType,
})

// employees count
export const getEmployeesCount = () => ({
  type: GET_EMPLOYEES_COUNT,
})

export const getEmployeesCountSuccess = employeesCount => ({
  type: GET_EMPLOYEES_COUNT_SUCCESS,
  payload: employeesCount,
})

export const getEmployeesCountFail = error => ({
  type: GET_EMPLOYEES_COUNT_FAIL,
  payload: error,
})

// applicants count
export const getApplicantsCount = () => ({
  type: GET_APPLICANTS_COUNT,
})

export const getApplicantsCountSuccess = applicantsCount => ({
  type: GET_APPLICANTS_COUNT_SUCCESS,
  payload: applicantsCount,
})

export const getApplicantsCountFail = error => ({
  type: GET_APPLICANTS_COUNT_FAIL,
  payload: error,
})

// approved PRFs count
export const getApprovedPrfCount = () => ({
  type: GET_APPROVED_PRF_COUNT,
})

export const getApprovedPrfCountSuccess = approvedPrfCount => ({
  type: GET_APPROVED_PRF_COUNT_SUCCESS,
  payload: approvedPrfCount,
})

export const getApprovedPrfCountFail = error => ({
  type: GET_APPROVED_PRF_COUNT_FAIL,
  payload: error,
})

// birthday celebrants
export const fetchBirthdayCelebrants = () => ({
  type: GET_BIRTHDAY_CELEBRANTS,
})

export const fetchBirthdayCelebrantsSuccess = birthdayCelebrants => ({
  type: GET_BIRTHDAY_CELEBRANTS_SUCCESS,
  payload: birthdayCelebrants,
})

export const fetchBirthdayCelebrantsFail = error => ({
  type: GET_BIRTHDAY_CELEBRANTS_FAIL,
  payload: error,
})
