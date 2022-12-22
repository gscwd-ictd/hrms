import {call, put, takeEvery } from "redux-saga/effects"
import * as mockData from "../../../common/data/index"
import {
  getDepartmentList,
  postDepartment,
  putDepartment,
  delDepartment,
} from "helpers/backend_helper"
import {
  departmentApiFail,
  getDepartmentsSuccess,
  postDepartmentSuccess,
  updateDepartmentSuccess,
  deleteDepartmentSuccess,
} from "./actions"
import {
  GET_DEPARTMENTS,
  POST_DEPARTMENT,
  PUT_DEPARTMENT,
  DELETE_DEPARTMENT,
} from "./actionTypes"

function* fetchDepartmentList() {
  try {
    const response = yield call(getDepartmentList)
    yield put(getDepartmentsSuccess(response))

    // yield put(getDepartmentsSuccess(mockData.departments))
  } catch (error) {
    yield put(departmentApiFail(error))
  }
}

function* addDepartment({ payload: departmentData }) {
  try {
    const response = yield call(postDepartment, departmentData)
    yield put(postDepartmentSuccess(response))
  } catch (error) {
    yield put(departmentApiFail(error))
  }
}

function* updateDepartment({ payload: { departmentId, departmentData } }) {
  try {
    const response = yield call(putDepartment, departmentId, departmentData)
    yield put(updateDepartmentSuccess(response))
  } catch (error) {
    yield put(departmentApiFail(error))
  }
}

function* deleteDepartment({ payload: departmentId }) {
  try {
    const response = yield call(delDepartment, departmentId)
    yield put(deleteDepartmentSuccess(response))
  } catch (error) {
    yield put(departmentApiFail(error))
  }
}

function* departmentsSaga() {
  yield takeEvery(GET_DEPARTMENTS, fetchDepartmentList)
  yield takeEvery(POST_DEPARTMENT, addDepartment)
  yield takeEvery(PUT_DEPARTMENT, updateDepartment)
  yield takeEvery(DELETE_DEPARTMENT, deleteDepartment)
}

export default departmentsSaga
