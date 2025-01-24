import { call, put, takeEvery } from 'redux-saga/effects'
import {
  postEmployeeAssignment,
  getEmployees,
  getEmployeePds,
  getEmployeeDetailsReport,
} from 'helpers/backend_helper'
import {
  submitEmpAssgnFailed,
  submitEmpAssgnSuccess,
  fetchEmployeeListSuccess,
  fetchEmployeeListFailed,
  fetchEmployeePdsSuccess,
  fetchEmployeePdsFailed,
  fetchEmployeeDetailsReportFail,
  fetchEmployeeDetailsReportSuccess,
} from './actions'
import {
  SUBMIT_EMPLOYEE_ASSIGN,
  GET_EMPLOYEE_LIST,
  GET_EMPLOYEE_PDS,
  GET_EMPLOYEE_DETAILS_REPORT,
} from './actionTypes'

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
      message = 'Network error. Unable to connect to server'
    }

    yield put(fetchEmployeePdsFailed(message))
  }
}

function* fetchEmployeeDetailsReport({ payload }) {
  const {
    company_id,
    nature_of_appointment,
    personal_details,
    date_hired,
    position_title,
    assignment,
    office,
    department,
    division,
    gsis,
    pagibig,
    philhealth,
    sss,
    tin,
    residential_address,
    permanent_address,
    primary_education,
    secondary_education,
    vocational_course,
    college_education,
    graduate_studies,
    eligibility,
    salary_grade,
    amount,
  } = payload
  try {
    const response = yield call(
      getEmployeeDetailsReport,
      company_id,
      nature_of_appointment,
      personal_details,
      date_hired,
      position_title,
      assignment,
      office,
      department,
      division,
      gsis,
      pagibig,
      philhealth,
      sss,
      tin,
      residential_address,
      permanent_address,
      primary_education,
      secondary_education,
      vocational_course,
      college_education,
      graduate_studies,
      eligibility,
      salary_grade,
      amount
    )
    yield put(fetchEmployeeDetailsReportSuccess(response))
  } catch (error) {
    let message
    if (error.response && error.response.status) {
      message = `Status Code: ${error.response.status}`
    } else {
      message = 'Network error. Unable to connect to server'
    }
    yield put(fetchEmployeeDetailsReportFail(message))
  }
}

function* employeeSaga() {
  yield takeEvery(SUBMIT_EMPLOYEE_ASSIGN, submitEmpAssignmentData)
  yield takeEvery(GET_EMPLOYEE_LIST, fetchEmployeeList)
  yield takeEvery(GET_EMPLOYEE_PDS, fetchEmployeePds)
  yield takeEvery(GET_EMPLOYEE_DETAILS_REPORT, fetchEmployeeDetailsReport)
}

export default employeeSaga
