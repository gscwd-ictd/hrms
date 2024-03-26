import { call, put, takeEvery, all, fork } from 'redux-saga/effects'

// Crypto Redux States
import {
  GET_CHARTS_DATA,
  GET_EMPLOYEES_COUNT,
  GET_APPLICANTS_COUNT,
  GET_APPROVED_PRF_COUNT,
} from './actionTypes'
import {
  apiSuccess,
  apiFail,
  getEmployeesCountSuccess,
  getEmployeesCountFail,
  getApplicantsCountSuccess,
  getApplicantsCountFail,
  getApprovedPrfCountSuccess,
  getApprovedPrfCountFail,
} from './actions'

import {
  getEmployeesCount,
  getApplicantsCount,
  getApprovedPrfCount,
} from 'helpers/backend_helper'

//Include Both Helper File with needed methods
// import {
//     getWeeklyData,
//     getYearlyData,
//     getMonthlyData
// }
//     from "../../helpers/fakebackend_helper";

function* getChartsData({ payload: periodType }) {
  try {
    var response
    if (periodType == 'monthly') {
      response = yield call(getWeeklyData, periodType)
    }
    if (periodType == 'yearly') {
      response = yield call(getYearlyData, periodType)
    }
    if (periodType == 'weekly') {
      response = yield call(getMonthlyData, periodType)
    }

    yield put(apiSuccess(GET_CHARTS_DATA, response))
  } catch (error) {
    yield put(apiFail(GET_CHARTS_DATA, error))
  }
}

export function* watchGetChartsData() {
  yield takeEvery(GET_CHARTS_DATA, getChartsData)
}

function* fetchEmployeesCount() {
  try {
    const response = yield call(getEmployeesCount)
    yield put(getEmployeesCountSuccess(response))
  } catch (error) {
    let errorMessage
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 400:
          errorMessage = 'Error: Bad request. Try again later'
          break
        case 401:
          errorMessage = 'Error: Invalid credentials'
          break
        case 404:
          errorMessage = 'Error: Employee count not found'
          break
        case 408:
          errorMessage = 'Error: Request timeout. Try again later'
          break
        case 500:
          errorMessage = 'Error: Sorry! something went wrong'
          break
        default:
          errorMessage = 'Error: Invalid request'
          break
      }
    }
    yield put(getEmployeesCountFail(errorMessage))
  }
}

function* fetchApplicantsCount() {
  try {
    const response = yield call(getApplicantsCount)
    yield put(getApplicantsCountSuccess(response))
  } catch (error) {
    let errorMessage
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 400:
          errorMessage = 'Error: Bad request. Try again later'
          break
        case 401:
          errorMessage = 'Error: Invalid credentials'
          break
        case 404:
          errorMessage = 'Error: Applicant count not found'
          break
        case 408:
          errorMessage = 'Error: Request timeout. Try again later'
          break
        case 500:
          errorMessage = 'Error: Sorry! something went wrong'
          break
        default:
          errorMessage = 'Error: Invalid request'
          break
      }
    }
    yield put(getApplicantsCountFail(errorMessage))
  }
}

function* fetchApprovedPrfCount() {
  try {
    const response = yield call(getApprovedPrfCount)
    yield put(getApprovedPrfCountSuccess(response))
  } catch (error) {
    let errorMessage
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 400:
          errorMessage = 'Error: Bad request. Try again later'
          break
        case 401:
          errorMessage = 'Error: Invalid credentials'
          break
        case 404:
          errorMessage = 'Error: Approved PRF count not found'
          break
        case 408:
          errorMessage = 'Error: Request timeout. Try again later'
          break
        case 500:
          errorMessage = 'Error: Sorry! something went wrong'
          break
        default:
          errorMessage = 'Error: Invalid request'
          break
      }
    }
    yield put(getApprovedPrfCountFail(errorMessage))
  }
}

function* dashboardSaga() {
  yield all([fork(watchGetChartsData)])
  yield takeEvery(GET_EMPLOYEES_COUNT, fetchEmployeesCount)
  yield takeEvery(GET_APPLICANTS_COUNT, fetchApplicantsCount)
  yield takeEvery(GET_APPROVED_PRF_COUNT, fetchApprovedPrfCount)
}

export default dashboardSaga
