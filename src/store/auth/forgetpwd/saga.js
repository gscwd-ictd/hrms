import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { FORGET_PASSWORD } from "./actionTypes"
import { userForgetPasswordSuccess, userForgetPasswordError } from "./actions"

//Helper Files
import * as url from "helpers/url_helper"
import { postForgetPwd } from "helpers/auth_helper"

const domainUrl = process.env.REACT_APP_HRISDOMAIN

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history } }) {
  try {
    const response = yield call(
      postForgetPwd, 
      domainUrl + url.POST_FORGET_PASSWORD, 
      {
        email: user.email,
      }
    )
    if (response) {
      yield put(
        userForgetPasswordSuccess(
          "Reset link are sended to your mailbox, check there first"
        )
      )
    }
  } catch (error) {
    yield put(userForgetPasswordError(error))
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)])
}

export default forgetPasswordSaga
