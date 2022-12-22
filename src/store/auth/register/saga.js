import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"

//Helper Files
import * as url from "helpers/url_helper"
import { postRegister } from "helpers/auth_helper"

const domainUrl = process.env.REACT_APP_HRISDOMAIN

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {
    
    const response = yield call(
      postRegister, 
      domainUrl + url.POST_REGISTER, 
      user
    )
    yield put(registerUserSuccessful(response))
    
  } catch (error) {
    yield put(registerUserFailed(error))
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
