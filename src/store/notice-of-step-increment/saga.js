import { call, put, takeEvery } from 'redux-saga/effects'
import {
  getEmployeesForNosi,
  getNosiDetails,
  postNosiForApproval,
} from 'helpers/backend_helper'
import {
  fetchEmployeesForNosiSuccess,
  fetchEmployeesForNosiFail,
  fetchNosiDetailsSuccess,
  fetchNosiDetailsFail,
  submitNosiForApprovalSuccess,
  submitNosiForApprovalFail,
} from './actions'
import {
  GET_EMPLOYEES_FOR_NOSI,
  GET_NOSI_DETAILS,
  POST_NOSI_FOR_APPROVAL,
} from './actionTypes'

function* fetchEmployeesForNosi({ payload: monthYear }) {
  try {
    const response = yield call(getEmployeesForNosi, monthYear)

    yield put(fetchEmployeesForNosiSuccess(response))
  } catch (error) {
    let message
    if (error.response && error.response.status) {
      message = `Status Code: ${error.response.status}`
    } else {
      message = 'Network error. Unable to connect to server'
    }

    yield put(fetchEmployeesForNosiFail(message))
  }
}

function* fetchNosiDetails({ payload: nosiId }) {
  try {
    const response = yield call(getNosiDetails, nosiId)

    yield put(fetchNosiDetailsSuccess(response))
  } catch (error) {
    let message
    if (error.response && error.response.status) {
      message = `Status Code: ${error.response.status}`
    } else {
      message = 'Network error. Unable to connect to server'
    }

    yield put(fetchNosiDetailsFail(message))
  }
}

function* submitNosiForApproval({ payload: data }) {
  try {
    const response = yield call(postNosiForApproval, data)

    yield put(submitNosiForApprovalSuccess(response))
  } catch (error) {
    let message
    if (error.response && error.response.status) {
      message = `Status Code: ${error.response.status}`
    } else {
      message = 'Network error. Unable to connect to server'
    }

    yield put(submitNosiForApprovalFail(message))
  }
}

function* noticeOfStepIncrementSaga() {
  yield takeEvery(GET_EMPLOYEES_FOR_NOSI, fetchEmployeesForNosi)
  yield takeEvery(GET_NOSI_DETAILS, fetchNosiDetails)
  yield takeEvery(POST_NOSI_FOR_APPROVAL, submitNosiForApproval)
}

export default noticeOfStepIncrementSaga
