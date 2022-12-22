import React, { useEffect } from "react"
import { isEmpty } from "lodash"
import { useHistory } from "react-router-dom"

//redux
import { useSelector, useDispatch } from "react-redux"
import { logoutUser, resetLogin } from "store/actions"

const Logout = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { logoutResponse, loadingVerifyCredentials, error } = useSelector(
    state => ({
      logoutResponse: state.Login.logoutResponse,
      loadingVerifyCredentials: state.Login.loadingVerifyCredentials,
      error: state.Login.error,
    })
  )

  useEffect(() => {
    // dispatch(logoutUser(props.history))
    dispatch(logoutUser())
  }, [dispatch])

  useEffect(() => {
    if (!isEmpty(logoutResponse)) {
      dispatch(resetLogin())
      history.push("/login")
    }
  }, [logoutResponse])

  return <></>
}

export default Logout
