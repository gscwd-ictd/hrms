import { call, put, takeEvery } from "redux-saga/effects"
import {
  getHrmsModules,
  postHrmsModule,
  delHrmsModule,
  patchHrmsModule,
} from "helpers/backend_helper"
import {
  fetchHrmsModulesSuccess,
  addModuleSuccess,
  removeModuleSuccess,
  updateModuleSuccess,
  moduleApiFail,
} from "./actions"
import {
  GET_HRMS_MODULES,
  POST_HRMS_MODULE,
  DELETE_HRMS_MODULE,
  PATCH_HRMS_MODULE,
} from "./actionTypes"

function* fetchHrmsModules() {
  try {
    const response = yield call(getHrmsModules)

    yield put(fetchHrmsModulesSuccess(response))
  } catch (error) {
    yield put(moduleApiFail(error))
  }
}

function* addHrmsModules({ payload: moduleDetails }) {
  try {
    const response = yield call(postHrmsModule, moduleDetails)

    yield put(addModuleSuccess(response))
  } catch (error) {
    yield put(moduleApiFail(error))
  }
}

function* removeHrmsModules({ payload: moduleId }) {
  try {
    const response = yield call(delHrmsModule, moduleId)

    yield put(removeModuleSuccess(response))
  } catch (error) {
    yield put(moduleApiFail(error))
  }
}

function* updateHrmsModules({ payload: { moduleId, updatedModuleDetails } }) {
  try {
    const response = yield call(patchHrmsModule, moduleId, updatedModuleDetails)

    yield put(updateModuleSuccess(response))
  } catch (error) {
    yield put(moduleApiFail(error))
  }
}

function* moduleSaga() {
  yield takeEvery(GET_HRMS_MODULES, fetchHrmsModules)
  yield takeEvery(POST_HRMS_MODULE, addHrmsModules)
  yield takeEvery(DELETE_HRMS_MODULE, removeHrmsModules)
  yield takeEvery(PATCH_HRMS_MODULE, updateHrmsModules)
}

export default moduleSaga
