import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import SidebarContent from "./SidebarContent"

// logos
import logoOnly from "../../assets/images/worker_200x200.png"
import logoFull from "../../assets/images/hrms_logo.png"

const Sidebar = props => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/module-dashboard" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoOnly} alt="" height="30" />
            </span>
            <span className="logo-lg">
              <img src={logoFull} alt="" height="33" />
            </span>
          </Link>

          <Link to="/module-dashboard" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoOnly} alt="" height="30" />
            </span>
            <span className="logo-lg">
              <img src={logoFull} alt="" height="32" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(mapStatetoProps, {})(withRouter(Sidebar))
