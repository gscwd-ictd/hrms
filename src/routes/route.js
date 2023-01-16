import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

// Import Cookies
import Cookies from "universal-cookie"

const cookies = new Cookies()
const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (
        isAuthProtected &&
        !cookies.get("accessToken") &&
        !cookies.get("ssid_hrms") &&
        props.location.pathname === "/login"
      ) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }

      if (
        isAuthProtected &&
        !cookies.get("isSuperUser") &&
        props.location.pathname === "/admin-login"
      ) {
        return (
          <Redirect
            to={{ pathname: "/admin-login", state: { from: props.location } }}
          />
        )
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware
