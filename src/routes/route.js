import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

// Import Cookies
import Cookies from "universal-cookie"

const cookies = new Cookies()

const hasAccess = (props, Component, Layout, isAuthProtected) => {
  if (
    isAuthProtected &&
    (localStorage.getItem("userId") === null ||
      localStorage.getItem("userId") === "undefined" ||
      typeof cookies.get("isSuperUser") === "undefined")
  ) {
    localStorage.clear()
    return (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    )
  }

  return (
    <Layout>
      <Component {...props} />
    </Layout>
  )
}

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => hasAccess(props, Component, Layout, isAuthProtected)}
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware
