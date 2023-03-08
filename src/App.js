import PropTypes from "prop-types"
import React from "react"
import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"
import { AbilityContext } from "casl/Can"
import ability from "casl/ability"

// Import Routes all
import {
  authProtectedRoutes,
  moduleDashboardRoutes,
  publicRoutes,
} from "./routes"

// Import all middleware
import Authmiddleware from "./routes/route"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"
import ModuleDashboardLayout from "components/ModuleDashboardLayout"

// Import scss
import "./assets/scss/theme.scss"
import "../src/styles/custom_gscwd/global.scss"

const App = props => {
  return (
    <React.Fragment>
      <AbilityContext.Provider value={ability}>
        <Router>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
                exact
              />
            ))}

            {authProtectedRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={VerticalLayout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                exact
              />
            ))}

            {moduleDashboardRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={ModuleDashboardLayout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                exact
              />
            ))}
          </Switch>
        </Router>
      </AbilityContext.Provider>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
