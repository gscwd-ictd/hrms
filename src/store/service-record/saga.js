import { call, put, takeEvery } from 'redux-saga/effects'
import {
  getServiceRecords,
  postEmployeeSeparation,
} from 'helpers/backend_helper'
import {
  fetchServiceRecordsSuccess,
  fetchServiceRecordsFail,
  submitEmployeeSeparationSuccess,
  submitEmployeeSeparationFail,
} from './actions'
import { GET_SERVICE_RECORDS, POST_EMPLOYEE_SEPARATION } from './actionTypes'

function* fetchServiceRecords({ payload: employeeId }) {
  try {
    const response = yield call(getServiceRecords, employeeId)

    yield put(fetchServiceRecordsSuccess(response))
  } catch (error) {
    let message
    if (error.response && error.response.status) {
      message = `Status Code: ${error.response.status}`
    } else {
      message = 'Network error. Unable to connect to server'
    }

    yield put(fetchServiceRecordsFail(message))
  }
}

function* submitEmployeeSeparation({ payload: data }) {
  try {
    const response = yield call(postEmployeeSeparation, data)

    yield put(submitEmployeeSeparationSuccess(response))
  } catch (error) {
    let message
    if (error.response && error.response.status) {
      message = `Status Code: ${error.response.status}`
    } else {
      message = 'Network error. Unable to connect to server'
    }

    yield put(submitEmployeeSeparationFail(message))
  }
}

function* serviceRecordSaga() {
  yield takeEvery(GET_SERVICE_RECORDS, fetchServiceRecords)
  yield takeEvery(POST_EMPLOYEE_SEPARATION, submitEmployeeSeparation)
}

export default serviceRecordSaga
