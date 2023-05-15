import { call, put, takeEvery } from 'redux-saga/effects'

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from './actionTypes'
import { apiError, loginSuccess, logoutSuccess } from './actions'

//Helper Files
import * as url from 'helpers/url_helper'
import { postLogin, postLogout } from 'helpers/auth_helper'

import Cookies from 'universal-cookie'

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

    const accessToken = response.accessToken
    cookies.set('accessToken', accessToken)

    const isSuperUser = response.userDetails.isSuperUser
    cookies.set('isSuperUser', isSuperUser)

    const userEmail = response.email
    localStorage.setItem('email', userEmail)

    const photoUrl = response.userDetails.photoUrl
    localStorage.setItem('photoUrl', photoUrl)

    const userAccess = response.userDetails.userAccess
    localStorage.setItem('userAccess', JSON.stringify(userAccess))

    const employeeId = response.userDetails._id
    const suId = response.userDetails.userId
    localStorage.setItem('userId', employeeId ? employeeId : suId)

    history('/module-dashboard')
    // window.location.reload()
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser() {
  try {
    const response = yield call(postLogout, domainUrl + url.POST_LOGOUT, {})
    yield put(logoutSuccess(response))

    cookies.remove('accessToken')
    cookies.remove('isSuperUser')
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
