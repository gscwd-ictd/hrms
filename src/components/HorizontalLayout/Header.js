import React, { useState } from "react";
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import { Link } from "react-router-dom";

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions";
// reactstrap
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import megamenuImg from "../../assets/images/megamenu-img.png";
import logo from "../../assets/images/logo-wd-white.png";
import logoLight from "../../assets/images/logo-wd-white.png";
import logoLightSvg from "../../assets/images/logo-wd-light.png";
import logoDark from "../../assets/images/logo-dark.png";

const Header = props => {
  const [menu, setMenu] = useState(false);

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="17" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLightSvg} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="19" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 d-lg-none header-item"
              data-toggle="collapse"
              onClick={() => {
                props.toggleLeftmenu(!props.leftMenu);
              }}
              data-target="#topnav-menu-content"
            >
              <i className="fa fa-fw fa-bars" />
            </button>

            {/* <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <span className="bx bx-search-alt" />
              </div>
            </form> */}

            <Dropdown
              className="dropdown-mega d-none d-lg-block ms-2"
              isOpen={menu}
              toggle={() => setMenu(!menu)}
            >
              <DropdownToggle
                className="btn header-item "
                caret
                tag="button"
              >
                {props.t("Mega Menu")} <i className="mdi mdi-chevron-down" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-megamenu">
                <Row>
                  <Col sm={8}>
                    <Row>
                      <Col md={4}>
                        <h5 className="font-size-14 mt-0">
                          {props.t("UI Components")}
                        </h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="#">{props.t("Lightbox")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Range Slider")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Sweet Alert")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Rating")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Forms")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Tables")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Charts")}</Link>
                          </li>
                        </ul>
                      </Col>

                      <Col md={4}>
                        <h5 className="font-size-14 mt-0">
                          {props.t("Applications")}
                        </h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="#">{props.t("Ecommerce")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Calendar")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Email")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Projects")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Tasks")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Contacts")}</Link>
                          </li>
                        </ul>
                      </Col>

                      <Col md={4}>
                        <h5 className="font-size-14 mt-0">
                          {props.t("Extra Pages")}
                        </h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="#">{props.t("Light Sidebar")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Compact Sidebar")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Horizontal layout")}</Link>
                          </li>
                          <li>
                            <Link to="#"> {props.t("Maintenance")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Coming Soon")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Timeline")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("FAQs")}</Link>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={4}>
                    <Row>
                      <Col sm={6}>
                        <h5 className="font-size-14 mt-0">
                          {props.t("UI Components")}
                        </h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="#">{props.t("Lightbox")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Range Slider")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Sweet Alert")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Rating")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Forms")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Tables")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("Charts")}</Link>
                          </li>
                        </ul>
                      </Col>

                      <Col sm={5}>
                        <div>
                          <img
                            src={megamenuImg}
                            alt=""
                            className="img-fluid mx-auto d-block"
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="d-flex">

            <NotificationDropdown />

            <ProfileMenu />

            <div className="dropdown d-inline-block">
              <button
                onClick={() => {
                  props.showRightSidebarAction(!props.showRightSidebar);
                }}
                type="button"
                className="btn header-item noti-icon right-bar-toggle "
              >
                <i className="bx bx-cog bx-spin" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  leftMenu: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
})(Header);
