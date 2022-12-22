import { call, put, takeEvery } from "redux-saga/effects"
import {
  getOfficerInChargeList,
  getSG20UpEmployees,
  getVacantManagerialPositions,
  postAssignOfficerInCharge,
  delUnassignOfficerInCharge,
} from "helpers/backend_helper"
import {
  fetchOICListSuccess,
  fetchOICListFail,
  fetchSG20UpEmployeesSuccess,
  fetchSG20UpEmployeesFail,
  fetchVacantManagerialPositionsSuccess,
  fetchVacantManagerialPositionsFail,
  addAssignOICSuccess,
  addAssignOICFail,
  removeUnassignOICSuccess,
  removeUnassignOICFail,
} from "./actions"
import {
  GET_ALL_OIC,
  GET_SG20_UP_EMPLOYEES,
  GET_VACANT_MANAGERIAL_POSITIONS,
  POST_ASSIGN_OIC,
  DELETE_UNASSIGN_OIC,
} from "./actionTypes"

function* fetchOICList() {
  try {
    const response = yield call(getOfficerInChargeList)

    yield put(fetchOICListSuccess(response))
  } catch (error) {
    yield put(fetchOICListFail(error))
  }
}

function* fetchSG20UpEmployees() {
  try {
    const response = yield call(getSG20UpEmployees)

    yield put(fetchSG20UpEmployeesSuccess(response))
  } catch (error) {
    yield put(fetchSG20UpEmployeesFail(error))
  }
}

function* fetchVacantManagerialPositions() {
  try {
    const response = yield call(getVacantManagerialPositions)

    yield put(fetchVacantManagerialPositionsSuccess(response))
  } catch (error) {
    yield put(fetchVacantManagerialPositionsFail(error))
  }
}

function* addAssignOIC({ payload: assignmentDetails }) {
  try {
    const response = yield call(postAssignOfficerInCharge, assignmentDetails)

    yield put(addAssignOICSuccess(response))
  } catch (error) {
    yield put(addAssignOICFail(error))
  }
}

function* removeUnassignOIC({ payload: oicId }) {
  try {
    const response = yield call(delUnassignOfficerInCharge, oicId)

    yield put(removeUnassignOICSuccess(response))
  } catch (error) {
    yield put(removeUnassignOICFail(error))
  }
}

function* officerInChargeSaga() {
  yield takeEvery(GET_ALL_OIC, fetchOICList)
  yield takeEvery(GET_SG20_UP_EMPLOYEES, fetchSG20UpEmployees)
  yield takeEvery(
    GET_VACANT_MANAGERIAL_POSITIONS,
    fetchVacantManagerialPositions
  )
  yield takeEvery(POST_ASSIGN_OIC, addAssignOIC)
  yield takeEvery(DELETE_UNASSIGN_OIC, removeUnassignOIC)
}

export default officerInChargeSaga
