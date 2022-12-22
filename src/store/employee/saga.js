import { call, put, takeEvery } from "redux-saga/effects"
import {
  postEmployeeAssignment,
  getEmployees,
  getEmployeePds,
} from "helpers/backend_helper"
import {
  submitEmpAssgnFailed,
  submitEmpAssgnSuccess,
  fetchEmployeeListSuccess,
  fetchEmployeeListFailed,
  fetchEmployeePdsSuccess,
  fetchEmployeePdsFailed,
} from "./actions"
import {
  SUBMIT_EMPLOYEE_ASSIGN,
  GET_EMPLOYEE_LIST,
  GET_EMPLOYEE_PDS,
} from "./actionTypes"

function* submitEmpAssignmentData({ payload: empassgndata }) {
  try {
    const response = yield call(postEmployeeAssignment, empassgndata)

    yield put(submitEmpAssgnSuccess(response))
  } catch (error) {
    yield put(submitEmpAssgnFailed(error))
  }
}

function* fetchEmployeeList() {
  try {
    const response = yield call(getEmployees)

    yield put(fetchEmployeeListSuccess(response))
  } catch (error) {
    yield put(fetchEmployeeListFailed(error))
  }
}

function* fetchEmployeePds({ payload: employeeId }) {
  try {
    const response = yield call(getEmployeePds, employeeId)

    yield put(fetchEmployeePdsSuccess(response))
  } catch (error) {
    let message
    if (error.response && error.response.status) {
      message = `Status Code: ${error.response.status}`
    } else {
      message = "Network error. Unable to connect to server"
    }

    yield put(fetchEmployeePdsFailed(message))
  }
}

function* employeeSaga() {
  yield takeEvery(SUBMIT_EMPLOYEE_ASSIGN, submitEmpAssignmentData)
  yield takeEvery(GET_EMPLOYEE_LIST, fetchEmployeeList)
  yield takeEvery(GET_EMPLOYEE_PDS, fetchEmployeePds)
}

export default employeeSaga
