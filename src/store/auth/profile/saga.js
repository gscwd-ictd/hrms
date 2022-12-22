import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { EDIT_PROFILE } from "./actionTypes"
import { profileSuccess, profileError } from "./actions"

//Helper Files 
import * as url from "helpers/url_helper"
import { postProfileUpdate } from "helpers/auth_helper"

const domainUrl = process.env.REACT_APP_HRISDOMAIN

function* editProfile({ payload: { user } }) {
  try {
   
      const response = yield call(
        postProfileUpdate, 
        domainUrl + url.POST_PROFILE_UPDATE, 
        {
          username: user.username,
          idx: user.idx,
        }
      )
      yield put(profileSuccess(response))
   
  } catch (error) {
    yield put(profileError(error))
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
