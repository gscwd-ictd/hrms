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
      // if (isAuthProtected && !localStorage.getItem("email")) {
      if (
        isAuthProtected &&
        !cookies.get("accessToken") &&
        !cookies.get("ssid_hrms")
      ) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
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
