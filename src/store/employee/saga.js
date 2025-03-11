import { call, put, takeEvery } from 'redux-saga/effects'
import {
  postRegisterPermanentEmployee,
  postRegisterCasJoCosEmployee,
  putEmployeeBasicInformation,
  getEmployees,
  getEmployeePds,
  getEmployeeDetailsReport,
  getEmployeeBasicInformation,
  getEmployeeHeaderInformation,
} from 'helpers/backend_helper'
import {
  addPermanentEmployeeSuccess,
  addPermanentEmployeeFailed,
  addCasJoCosEmployeeSuccess,
  addCasJoCosEmployeeFailed,
  updateEmpBasicInfoSuccess,
  updateEmpBasicInfoFail,
  fetchEmployeeListSuccess,
  fetchEmployeeListFailed,
  fetchEmployeePdsSuccess,
  fetchEmployeePdsFailed,
  fetchEmployeeDetailsReportFail,
  fetchEmployeeDetailsReportSuccess,
  fetchEmpBasicInfoSuccess,
  fetchEmpBasicInfoFail,
  fetchEmpHeaderInfoSuccess,
  fetchEmpHeaderInfoFail,
} from './actions'
import {
  REGISTER_PERMANENT_EMPLOYEE,
  REGISTER_CAS_JO_COS_EMPLOYEE,
  UPDATE_EMPLOYEE_BASIC_INFO,
  GET_EMPLOYEE_LIST,
  GET_EMPLOYEE_PDS,
  GET_EMPLOYEE_DETAILS_REPORT,
  GET_EMPLOYEE_BASIC_INFO,
  GET_EMPLOYEE_HEADER_INFO,
} from './actionTypes'

function* addPermanentEmployee({ payload: employeeData }) {
  try {
    const response = yield call(postRegisterPermanentEmployee, employeeData)

    yield put(addPermanentEmployeeSuccess(response))
  } catch (error) {
    yield put(addPermanentEmployeeFailed(error))
  }
}

function* addCasJoCosEmployee({ payload: employeeData }) {
  try {
    const response = yield call(postRegisterCasJoCosEmployee, employeeData)

    yield put(addCasJoCosEmployeeSuccess(response))
  } catch (error) {
    yield put(addCasJoCosEmployeeFailed(error))
  }
}

function* updateEmpBasicInfo({ payload: employeeBasicInfo }) {
  try {
    const response = yield call(putEmployeeBasicInformation, employeeBasicInfo)

    yield put(updateEmpBasicInfoSuccess(response))
  } catch (error) {
    let message
    if (error.response && error.response.status) {
      message = `Status Code: ${error.response.status}`
    } else {
      message = 'Network error. Unable to connect to server'
    }

    yield put(updateEmpBasicInfoFail(message))
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

function* fetchEmpBasicInfo({ payload: employeeId }) {
  try {
    const response = yield call(getEmployeeBasicInformation, employeeId)

    yield put(fetchEmpBasicInfoSuccess(response))
  } catch (error) {
    let message
    if (error.response && error.response.status) {
      message = `Status Code: ${error.response.status}`
    } else {
      message = 'Network error. Unable to connect to server'
    }

    yield put(fetchEmpBasicInfoFail(message))
  }
}

function* fetchEmpHeaderInfo({ payload: employeeId }) {
  try {
    const response = yield call(getEmployeeHeaderInformation, employeeId)

    yield put(fetchEmpHeaderInfoSuccess(response))
  } catch (error) {
    let message
    if (error.response && error.response.status) {
      message = `Status Code: ${error.response.status}`
    } else {
      message = 'Network error. Unable to connect to server'
    }

    yield put(fetchEmpHeaderInfoFail(message))
  }
}

function* employeeSaga() {
  yield takeEvery(REGISTER_PERMANENT_EMPLOYEE, addPermanentEmployee)
  yield takeEvery(REGISTER_CAS_JO_COS_EMPLOYEE, addCasJoCosEmployee)
  yield takeEvery(UPDATE_EMPLOYEE_BASIC_INFO, updateEmpBasicInfo)
  yield takeEvery(GET_EMPLOYEE_LIST, fetchEmployeeList)
  yield takeEvery(GET_EMPLOYEE_PDS, fetchEmployeePds)
  yield takeEvery(GET_EMPLOYEE_DETAILS_REPORT, fetchEmployeeDetailsReport)
  yield takeEvery(GET_EMPLOYEE_BASIC_INFO, fetchEmpBasicInfo)
  yield takeEvery(GET_EMPLOYEE_HEADER_INFO, fetchEmpHeaderInfo)
}

export default employeeSaga
