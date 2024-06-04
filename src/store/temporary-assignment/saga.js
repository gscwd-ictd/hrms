import { call, put, takeEvery } from 'redux-saga/effects'
import {
  getTemporaryAssignmentList,
  getAssignableEmployees,
  getTemporaryAssignmentDetails,
  postTemporaryAssignment,
  patchTemporaryAssignment,
  delTemporaryAssignment,
  getAllOrganizations,
} from 'helpers/backend_helper'
import {
  fetchEmployeeTemporaryAssignmentListSuccess,
  fetchEmployeeTemporaryAssignmentListFail,
  fetchAssignableEmployeeListSuccess,
  fetchAssignableEmployeeListFail,
  fetchEmployeeTemporaryAssignmentDetailsSuccess,
  fetchEmployeeTemporaryAssignmentDetailsFail,
  addEmployeeForTemporaryAssignmentSuccess,
  addEmployeeForTemporaryAssignmentFail,
  updateEmployeeForTemporaryAssignmentSuccess,
  updateEmployeeForTemporaryAssignmentFail,
  removeEmployeeForTemporaryAssignmentSuccess,
  removeEmployeeForTemporaryAssignmentFail,
  fetchAllOrganizationsSuccess,
  fetchAllOrganizationsFail,
} from './actions'
import {
  GET_ALL_EMPLOYEE_TEMPORARY_ASSIGNMENT,
  GET_ASSIGNABLE_EMPLOYEES,
  GET_EMPLOYEE_TEMPORARY_ASSIGNMENT_DETAILS,
  POST_EMPLOYEE_TEMPORARY_ASSIGNMENT,
  PATCH_EMPLOYEE_TEMPORARY_ASSIGNMENT,
  DELETE_EMPLOYEE_TEMPORARY_ASSIGNMENT,
  GET_ALL_ORGANIZATIONS,
} from './actionTypes'

function* fetchEmployeeTemporaryAssignmentList() {
  try {
    const response = yield call(getTemporaryAssignmentList)
    yield put(fetchEmployeeTemporaryAssignmentListSuccess(response))
  } catch (error) {
    yield put(fetchEmployeeTemporaryAssignmentListFail(error))
  }
}

function* fetchAssignableEmployeeList() {
  try {
    const response = yield call(getAssignableEmployees)

    yield put(fetchAssignableEmployeeListSuccess(response))
  } catch (error) {
    yield put(fetchAssignableEmployeeListFail(error))
  }
}

function* fetchEmployeeTemporaryAssignmentDetails() {
  try {
    const response = yield call(getTemporaryAssignmentDetails)
    yield put(fetchEmployeeTemporaryAssignmentDetailsSuccess(response))
  } catch (error) {
    yield put(fetchEmployeeTemporaryAssignmentDetailsFail(error))
  }
}

function* fetchAllOrganizations() {
  try {
    const response = yield call(getAllOrganizations)

    yield put(fetchAllOrganizationsSuccess(response))
  } catch (error) {
    yield put(fetchAllOrganizationsFail(error))
  }
}

function* addEmployeeForTemporaryAssignment({
  payload: employeeAssignmentDetails,
}) {
  try {
    const response = yield call(
      postTemporaryAssignment,
      employeeAssignmentDetails
    )
    yield put(addEmployeeForTemporaryAssignmentSuccess(response))
  } catch (error) {
    let errorMessage
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 400:
          errorMessage = 'Bad request. Try again later'
          break
        case 409:
          errorMessage = 'Test error for 409'
          break
        case 500:
          errorMessage = 'Sorry! something went wrong'
          break
        case 408:
          errorMessage = 'Request timeout. Try again later.'
          break
        default:
          errorMessage = 'Invalid request.'
          break
      }
    }
    yield put(addEmployeeForTemporaryAssignmentFail(errorMessage))
  }
}

function* updateEmployeeForTemporaryAssignment({
  payload: { employeeAssignmentId, employeeAssignmentDetails },
}) {
  try {
    const response = yield call(
      patchTemporaryAssignment,
      employeeAssignmentId,
      employeeAssignmentDetails
    )

    yield put(updateEmployeeForTemporaryAssignmentSuccess(response))
  } catch (error) {
    yield put(updateEmployeeForTemporaryAssignmentFail(error))
  }
}

function* removeEmployeeForTemporaryAssignment({
  payload: employeeAssignmentId,
}) {
  try {
    const response = yield call(delTemporaryAssignment, employeeAssignmentId)

    yield put(removeEmployeeForTemporaryAssignmentSuccess(response))
  } catch (error) {
    yield put(removeEmployeeForTemporaryAssignmentFail(error))
  }
}

function* temporaryAssignmentSaga() {
  yield takeEvery(
    GET_ALL_EMPLOYEE_TEMPORARY_ASSIGNMENT,
    fetchEmployeeTemporaryAssignmentList
  )
  yield takeEvery(GET_ASSIGNABLE_EMPLOYEES, fetchAssignableEmployeeList)
  yield takeEvery(
    GET_EMPLOYEE_TEMPORARY_ASSIGNMENT_DETAILS,
    fetchEmployeeTemporaryAssignmentDetails
  )
  yield takeEvery(GET_ALL_ORGANIZATIONS, fetchAllOrganizations)
  yield takeEvery(
    POST_EMPLOYEE_TEMPORARY_ASSIGNMENT,
    addEmployeeForTemporaryAssignment
  )
  yield takeEvery(
    PATCH_EMPLOYEE_TEMPORARY_ASSIGNMENT,
    updateEmployeeForTemporaryAssignment
  )
  yield takeEvery(
    DELETE_EMPLOYEE_TEMPORARY_ASSIGNMENT,
    removeEmployeeForTemporaryAssignment
  )
}

export default temporaryAssignmentSaga
