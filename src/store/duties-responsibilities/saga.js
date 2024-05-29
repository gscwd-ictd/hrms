import { call, put, takeEvery } from 'redux-saga/effects'
import {
  getDutyResponsibilities,
  postDutyResponsibility,
  putDutyResponsibility,
  delDutyResponsibility,
  getPositionDutiesAndResponsibilities,
  getOccupationDuties,
  postOccupationDuties,
  deleteOccupationDuties,
  getAvailableDutiesForOccupation,
  postOccupationalDutyResponsibility,
  deleteOccupationalDutyResponsibility,
} from 'helpers/backend_helper'
import {
  addDutyResponsibilitySuccess,
  updateDutyResponsibilitySuccess,
  removeDutyResponsibilitySuccess,
  fetchDutyResponsibilitiesSuccess,
  dutyResponsibilityApiFail,
  fetchOccupationDutiesSuccess,
  fetchOccupationDutiesFail,
  addAssignOccupationDutiesSuccess,
  addAssignOccupationDutiesFail,
  removeUnassignOccupationDutiesSuccess,
  removeUnassignOccupationDutiesFail,
  fetchAvailableDutiesSuccess,
  fetchAvailableDutiesFail,
  fetchPositionSuccess,
  fetchPositionFail,
  addOccupationalDutyResponsibilitySuccess,
  addOccupationalDutyResponsibilityFail,
  removeOccupationalDutyResponsibilitySuccess,
  removeOccupationalDutyResponsibilityFail,
} from './actions'
import {
  POST_DUTY,
  PUT_DUTY,
  DELETE_DUTY,
  GET_DUTIES,
  GET_OCCUPATION_DUTIES,
  ASSIGN_OCCUPATION_DUTIES,
  UNASSIGN_OCCUPATION_DUTIES,
  GET_AVAILABLE_DUTIES,
  GET_POSITION_DUTIES,
  POST_OCCUPATIONAL_DUTY_RESPONSIBILITY,
  DELETE_OCCUPATIONAL_DUTY_RESPONSIBILITY,
} from './actionTypes'

function* addDutyResponsibility({ payload: dutyResponsibilityData }) {
  try {
    const response = yield call(postDutyResponsibility, dutyResponsibilityData)
    yield put(addDutyResponsibilitySuccess(response))
  } catch (error) {
    yield put(dutyResponsibilityApiFail(error))
  }
}

function* updateDutyResponsibility({
  payload: { dutyResponsibilityId, dutyResponsibilityData },
}) {
  try {
    const response = yield call(
      putDutyResponsibility,
      dutyResponsibilityId,
      dutyResponsibilityData
    )
    yield put(updateDutyResponsibilitySuccess(response))
  } catch (error) {
    yield put(dutyResponsibilityApiFail(error))
  }
}

function* deleteDutyResponsibility({ payload: dutyResponsibilityId }) {
  try {
    const response = yield call(delDutyResponsibility, dutyResponsibilityId)
    yield put(removeDutyResponsibilitySuccess(response))
  } catch (error) {
    yield put(dutyResponsibilityApiFail(error))
  }
}

function* fetchDutyResponsibilities() {
  try {
    const response = yield call(getDutyResponsibilities)
    yield put(fetchDutyResponsibilitiesSuccess(response))
  } catch (error) {
    yield put(dutyResponsibilityApiFail(error))
  }
}

function* fetchOccupationDuties({ payload: occupationId }) {
  try {
    const response = yield call(getOccupationDuties, occupationId)
    yield put(fetchOccupationDutiesSuccess(response))
  } catch (error) {
    yield put(fetchOccupationDutiesFail(error))
  }
}

function* addOccupationDuties({
  payload: { occupationId, assignedDutyResponsibilities },
}) {
  try {
    const response = yield call(
      postOccupationDuties,
      occupationId,
      assignedDutyResponsibilities
    )
    yield put(addAssignOccupationDutiesSuccess(response))
  } catch (error) {
    yield put(addAssignOccupationDutiesFail(error))
  }
}

function* removeOccupationDuties({ payload: unassignedDutyResponsibilities }) {
  try {
    const response = yield call(deleteOccupationDuties, {
      data: unassignedDutyResponsibilities,
    })
    yield put(removeUnassignOccupationDutiesSuccess(response))
  } catch (error) {
    yield put(removeUnassignOccupationDutiesFail(error))
  }
}

function* fetchAvailableDuties({ payload: occupationId }) {
  try {
    const response = yield call(getAvailableDutiesForOccupation, occupationId)
    yield put(fetchAvailableDutiesSuccess(response))
  } catch (error) {
    yield put(fetchAvailableDutiesFail(error))
  }
}

function* fetchPositionDuties({ payload: positionId }) {
  try {
    const response = yield call(
      getPositionDutiesAndResponsibilities,
      positionId
    )
    yield put(fetchPositionSuccess(response))
  } catch (error) {
    yield put(fetchPositionFail(error))
  }
}

function* addOccupationalDutyResponsibility({
  payload: { occupationId, dutyResponsibilityData },
}) {
  try {
    const response = yield call(
      postOccupationalDutyResponsibility,
      occupationId,
      dutyResponsibilityData
    )
    yield put(addOccupationalDutyResponsibilitySuccess(response))
  } catch (error) {
    yield put(addOccupationalDutyResponsibilityFail(error))
  }
}

function* removeOccupationalDutyResponsibility({
  payload: { occupationId, drId, odrId },
}) {
  try {
    const response = yield call(
      deleteOccupationalDutyResponsibility,
      occupationId,
      drId,
      odrId
    )
    yield put(removeOccupationalDutyResponsibilitySuccess(response))
  } catch (error) {
    let errorMessage
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 400:
          errorMessage =
            'Bad request. Try again later'
          break
        case 409:
          errorMessage =
            'Duty is already assigned in position. Please unassign it first.'
          break
        case 500:
          errorMessage = 'Sorry! something went wrong'
          break
        case 408:
          errorMessage =
            'Request timeout. Try again later.'
          break
        default:
          errorMessage = 'Invalid request.'
          break
      }
    }
    yield put(removeOccupationalDutyResponsibilityFail(errorMessage))
  }
}



function* dutiesResponsibilitiesSaga() {
  yield takeEvery(POST_DUTY, addDutyResponsibility)
  yield takeEvery(PUT_DUTY, updateDutyResponsibility)
  yield takeEvery(DELETE_DUTY, deleteDutyResponsibility)
  yield takeEvery(GET_DUTIES, fetchDutyResponsibilities)

  yield takeEvery(GET_OCCUPATION_DUTIES, fetchOccupationDuties)
  yield takeEvery(ASSIGN_OCCUPATION_DUTIES, addOccupationDuties)
  yield takeEvery(UNASSIGN_OCCUPATION_DUTIES, removeOccupationDuties)
  yield takeEvery(GET_AVAILABLE_DUTIES, fetchAvailableDuties)

  yield takeEvery(GET_POSITION_DUTIES, fetchPositionDuties)

  yield takeEvery(
    POST_OCCUPATIONAL_DUTY_RESPONSIBILITY,
    addOccupationalDutyResponsibility
  )
  yield takeEvery(
    DELETE_OCCUPATIONAL_DUTY_RESPONSIBILITY,
    removeOccupationalDutyResponsibility
  )
}

export default dutiesResponsibilitiesSaga
