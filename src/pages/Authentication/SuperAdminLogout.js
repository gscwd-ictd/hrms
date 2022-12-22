import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"
import { logoutSuperUser } from "../../store/actions"

//redux
import { useDispatch } from "react-redux"

const SuperAdminLogout = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logoutSuperUser(props.history))
  }, [dispatch])

  return <></>
}

SuperAdminLogout.propTypes = {
  history: PropTypes.object,
}

export default withRouter(SuperAdminLogout)
