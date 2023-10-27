import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { layoutTypes } from './constants/layout'
// Import Routes all
import {
  authProtectedRoutes,
  publicRoutes,
  moduleDashboardRoutes,
} from './routes'

// Import all middleware
import Authmiddleware from './routes/route'

// layouts Format
import VerticalLayout from './components/VerticalLayout/'
import NonAuthLayout from './components/NonAuthLayout'
import ModuleDashboardLayout from 'components/ModuleDashboardLayout'

import { AbilityContext } from 'casl/Can'
import ability from 'casl/ability'

// Import scss
import './assets/scss/theme.scss'
import '../src/styles/custom_gscwd/global.scss'

const getLayout = layoutType => {
  let Layout = VerticalLayout
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout
      break
    default:
      break
  }
  return Layout
}

const App = () => {
  const { layoutType } = useSelector(state => ({
    layoutType: state.Layout.layoutType,
  }))

  const Layout = getLayout(layoutType)

  return (
    <React.Fragment>
      <AbilityContext.Provider value={ability}>
        <Routes>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              key={idx}
              exact={true}
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <Authmiddleware>
                  <Layout>{route.component}</Layout>
                </Authmiddleware>
              }
              key={idx}
              exact={true}
            />
          ))}

          {moduleDashboardRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <Authmiddleware>
                  <ModuleDashboardLayout>
                    {route.component}
                  </ModuleDashboardLayout>
                </Authmiddleware>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Routes>
      </AbilityContext.Provider>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

export default App
