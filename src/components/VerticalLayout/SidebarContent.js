import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

const SidebarContent = props => {
  const ref = useRef()

  // Use ComponentDidMount and ComponentDidUpdate method simultaneously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{"Menu"} </li>
            <li>
              <Link to="/#" className="">
                <i className="bx bx-home-circle"></i>
                <span className="badge rounded-pill bg-info float-end">04</span>
                <span>{"Dashboard"}</span>
              </Link>
            </li>

            <li className="menu-title">Personnel</li>
            <li>
              <Link to="/plantilla" className=" waves-effect">
                <i className="bx bx-list-ul"></i>
                <span>{"Plantilla"}</span>
              </Link>
            </li>
            <li>
              <Link to="/employee-registration" className=" waves-effect">
                <i className="bx bxs-user-plus"></i>
                <span>{"Employee Registration"}</span>
              </Link>
            </li>
            <li>
              <Link to="/employees" className=" waves-effect">
                <i className="bx bxs-user-circle"></i>
                <span>{"Employees"}</span>
              </Link>
            </li>

            <li className="menu-title"></li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-sitemap"></i>
                <span>{"Org. Structure"}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/office" className="waves-effect">
                    <i className="fas fa-dice-one"></i>
                    <span>{"Office"}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/department" className="waves-effect">
                    <i className="fas fa-dice-two"></i>
                    <span>{"Department"}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/division" className="waves-effect">
                    <i className="fas fa-dice-three"></i>
                    <span>{"Division"}</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/salary-grade" className="waves-effect">
                <i className="bx bx-money"></i>
                <span>{"Salary Grade"}</span>
              </Link>
            </li>
            <li>
              <Link to="/qualification-standards" className="waves-effect">
                <i className="bx bx-list-check"></i>
                <span>{"Qualification Standards"}</span>
              </Link>
            </li>
            <li>
              <Link to="/occupations" className="waves-effect">
                <i className="bx bxs-group"></i>
                <span>{"Occupations"}</span>
              </Link>
            </li>
            <li>
              <Link to="/duties-responsibilities" className="waves-effect">
                <i className="bx bx-list-ol"></i>
                <span>{"Duties & Responsibilities"}</span>
              </Link>
            </li>
            <li>
              <Link to="/committees" className="waves-effect">
                <i className="bx bxs-group"></i>
                <span>{"Committees"}</span>
              </Link>
            </li>

            <li className="menu-title">Competency</li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-list-ul"></i>
                <span>{"Domains"}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/core-models" className="waves-effect">
                    <i className="bx bx-list-ul"></i>
                    <span>{"Core"}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/functional-models" className="waves-effect">
                    <i className="bx bx-list-ul"></i>
                    <span>{"Functional"}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/cross-cutting-models" className="waves-effect">
                    <i className="bx bx-list-ul"></i>
                    <span>{"Cross-cutting"}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/managerial-models" className="waves-effect">
                    <i className="bx bx-list-ul"></i>
                    <span>{"Managerial"}</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/competency" className="waves-effect">
                <i className="bx bx-list-plus"></i>
                <span>{"Assignment"}</span>
              </Link>
            </li>

            <li className="menu-title">Recruitment</li>
            <li>
              <Link to="/prf-list" className="waves-effect">
                <i className="bx bx-edit"></i>
                <span>{"Position Request List"}</span>
              </Link>
            </li>
            <li>
              <Link to="/personnel-selection" className="waves-effect">
                <i className="bx bx-select-multiple"></i>
                <span>{"Personnel Selection"}</span>
              </Link>
            </li>

            <li className="menu-title">Placement</li>
            <li>
              <Link to="/hiring-results" className="waves-effect">
                <i className="bx bx-user-check"></i>
                <span>{"Results of Hiring"}</span>
              </Link>
            </li>

            <li className="menu-title">Settings</li>
            <li>
              <Link to="/settings/users" className="waves-effect">
                <i className="bx bxs-user-account"></i>
                <span>{"Users"}</span>
              </Link>
            </li>
            <li>
              <Link to="/settings/officer-in-charge" className="waves-effect">
                <i className="bx bxs-user-badge"></i>
                <span>{"Officer In Charge"}</span>
              </Link>
            </li>
            <li>
              <Link to="/settings/modules" className="waves-effect">
                <i className="bx bx-package"></i>
                <span>{"Modules"}</span>
              </Link>
            </li>
            <li>
              <Link to="/settings/system-logs" className="waves-effect">
                <i className="bx bx-detail"></i>
                <span>{"System Logs"}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(SidebarContent)
