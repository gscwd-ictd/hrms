import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

// Import Cookies
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const Authmiddleware = props => {
  if (
    localStorage.getItem('userId') === null ||
    localStorage.getItem('userId') === 'undefined' ||
    typeof cookies.get('isSuperUser') === 'undefined'
  ) {
    localStorage.clear()
    return (
      <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
    )
  }
  return <React.Fragment>{props.children}</React.Fragment>
}

Authmiddleware.propTypes = {
  location: PropTypes.object,
  children: PropTypes.any,
}

export default Authmiddleware
