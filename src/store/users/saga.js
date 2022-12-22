import { call, put, takeEvery } from "redux-saga/effects"
import {
  getUserList,
  getNonUserList,
  getUserRoles,
  postUser,
  delUser,
  patchUserRoles,
} from "helpers/backend_helper"
import {
  fetchUsersSuccess,
  fetchUsersFail,
  fetchNonUsersSuccess,
  fetchNonUsersFail,
  addUserSuccess,
  removeUserSuccess,
  fetchUserRolesSuccess,
  updateUserRolesSuccess,
  userApiFail,
} from "./actions"
import {
  GET_USERS,
  GET_NON_HRMS_USERS,
  POST_USER,
  DELETE_USER,
  GET_USER_ROLES,
  PATCH_USER_ROLES,
} from "./actionTypes"

function* fetchUsers() {
  try {
    const response = yield call(getUserList)

    yield put(fetchUsersSuccess(response))
  } catch (error) {
    yield put(fetchUsersFail(error))
  }
}

function* fetchNonUsers() {
  try {
    const response = yield call(getNonUserList)

    yield put(fetchNonUsersSuccess(response))
  } catch (error) {
    yield put(fetchNonUsersFail(error))
  }
}

function* addUser({ payload: userDetails }) {
  try {
    const response = yield call(postUser, userDetails)

    yield put(addUserSuccess(response))
  } catch (error) {
    yield put(userApiFail(error))
  }
}

function* removeUser({ payload: employeeId }) {
  try {
    const response = yield call(delUser, employeeId)

    yield put(removeUserSuccess(response))
  } catch (error) {
    yield put(userApiFail(error))
  }
}

function* fetchUserRoles({ payload: employeeId }) {
  try {
    const response = yield call(getUserRoles, employeeId)

    yield put(fetchUserRolesSuccess(response))
  } catch (error) {
    yield put(userApiFail(error))
  }
}

function* updateUserRoles({ payload: { employeeId, updatedUserRoles } }) {
  try {
    const response = yield call(patchUserRoles, employeeId, updatedUserRoles)

    yield put(updateUserRolesSuccess(response))
  } catch (error) {
    yield put(userApiFail(error))
  }
}

function* userSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(GET_NON_HRMS_USERS, fetchNonUsers)
  yield takeEvery(POST_USER, addUser)
  yield takeEvery(DELETE_USER, removeUser)
  yield takeEvery(GET_USER_ROLES, fetchUserRoles)
  yield takeEvery(PATCH_USER_ROLES, updateUserRoles)
}

export default userSaga
