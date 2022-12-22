import { all, call, fork, put, takeEvery } from "redux-saga/effects"
import { postSendOtp, postVerifyOtp } from "../../../helpers/otp_service_helper"
import * as url from "../../../helpers/url_helper"
import { sendOtpSuccess, sendOtpFail, verifyOtpSuccess, verifyOtpFail } from "./actions"
import { POST_SEND_OTP, POST_VERIFY_OTP } from "./actionTypes"

const domainUrl = process.env.REACT_APP_AUTHDOMAIN

function* requestOtp({payload}) {
  // console.log(payload)
  try {
    const response = yield call(postSendOtp, domainUrl + url.POST_SEND_OTP, payload)
    yield put(sendOtpSuccess(response))
    // console.log(response)
  } catch (error) {
    yield put(sendOtpFail(error))
  }
}

function* verifyOtp({payload}){
  try {
    const response = yield call(postVerifyOtp, domainUrl + url.POST_VERIFY_OTP, payload)
    yield put(verifyOtpSuccess(response))
    // console.log(response)
  } catch (error) {
    yield put(verifyOtpFail(error))
  }
}

function* otpServiceSaga() {
  yield takeEvery(POST_SEND_OTP, requestOtp)
  yield takeEvery(POST_VERIFY_OTP, verifyOtp)
}

export default otpServiceSaga
