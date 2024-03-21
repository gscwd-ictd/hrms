import { call, put, takeEvery, all, fork } from "redux-saga/effects";

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
    yield put(getEmployeesCountFail(error))
  }
}

function* fetchApplicantsCount() {
  try {
    const response = yield call(getApplicantsCount)
    yield put(getApplicantsCountSuccess(response))
  } catch (error) {
    yield put(getApplicantsCountFail(error))
  }
}

function* fetchApprovedPrfCount() {
  try {
    const response = yield call(getApprovedPrfCount)
    yield put(getApprovedPrfCountSuccess(response))
  } catch (error) {
    yield put(getApprovedPrfCountFail(error))
  }
}

function* dashboardSaga() {
  yield all([fork(watchGetChartsData)])
  yield takeEvery(GET_EMPLOYEES_COUNT, fetchEmployeesCount)
  yield takeEvery(GET_APPLICANTS_COUNT, fetchApplicantsCount)
  yield takeEvery(GET_APPROVED_PRF_COUNT, fetchApprovedPrfCount)
}

export default dashboardSaga;
