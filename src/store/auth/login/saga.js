import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { apiError, loginSuccess, logoutSuccess } from "./actions"

//Helper Files
import * as url from "helpers/url_helper"
import { postLogin, postLogout } from "helpers/auth_helper"

import Cookies from "universal-cookie"

const domainUrl = process.env.REACT_APP_HRISDOMAIN
const cookies = new Cookies()

function* loginUser({ payload: { user, history } }) {
  const loginDetails = {
    ...user,
    clientId: process.env.REACT_APP_CLIENTID,
    secret: process.env.REACT_APP_SECRET,
  }

  try {
    const response = yield call(
      postLogin,
      domainUrl + url.POST_LOGIN,
      loginDetails
    )

    yield put(loginSuccess(response))

    history.push("/dashboard")
    // window.location.reload()
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser() {
  console.log(domainUrl + url.POST_LOGOUT)
  try {
    const response = yield call(postLogout, domainUrl + url.POST_LOGOUT, {})
    yield put(logoutSuccess(response))

    cookies.remove("accessToken")
    localStorage.clear()
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
