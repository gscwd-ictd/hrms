import React, { useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Can } from 'casl/Can'

//Import Scrollbar
import SimpleBar from 'simplebar-react'

// MetisMenu
import MetisMenu from 'metismenujs'
import withRouter from 'components/Common/withRouter'
import { Link, useLocation } from 'react-router-dom'

const SidebarContent = props => {
  const ref = useRef()

  const activateParentDropdown = useCallback(item => {
    item.classList.add('active')
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]

    if (parent2El && parent2El.id !== 'side-menu') {
      parent2El.classList.add('mm-show')
    }

    if (parent) {
      parent.classList.add('mm-active')
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add('mm-show') // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add('mm-active') // li
          parent3.childNodes[0].classList.add('mm-active') //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add('mm-show') // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add('mm-show') // li
              parent5.childNodes[0].classList.add('mm-active') // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }, [])

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i]
      const parent = items[i].parentElement

      if (item && item.classList.contains('active')) {
        item.classList.remove('active')
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null
        if (parent2El && parent2El.id !== 'side-menu') {
          parent2El.classList.remove('mm-show')
        }

        parent.classList.remove('mm-active')
        const parent2 = parent.parentElement

        if (parent2) {
          parent2.classList.remove('mm-show')

          const parent3 = parent2.parentElement
          if (parent3) {
            parent3.classList.remove('mm-active') // li
            parent3.childNodes[0].classList.remove('mm-active')

            const parent4 = parent3.parentElement // ul
            if (parent4) {
              parent4.classList.remove('mm-show') // ul
              const parent5 = parent4.parentElement
              if (parent5) {
                parent5.classList.remove('mm-show') // li
                parent5.childNodes[0].classList.remove('mm-active') // a tag
              }
            }
          }
        }
      }
    }
  }

  const path = useLocation()
  const activeMenu = useCallback(() => {
    const pathName = path.pathname
    let matchingMenuItem = null
    const ul = document.getElementById('side-menu')
    const items = ul.getElementsByTagName('a')
    removeActivation(items)

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  }, [path.pathname, activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  }, [])

  useEffect(() => {
    new MetisMenu('#side-menu')
    activeMenu()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    activeMenu()
  }, [activeMenu])

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/#" className="">
                <i className="bx bx-home-circle"></i>
                {/* <span className="badge rounded-pill bg-info float-end">04</span> */}
                <span>{'Dashboards'}</span>
              </Link>
            </li>

            <li className="menu-title">{'Personnel'}</li>
            <Can I="access" this="Plantilla">
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="bx bx-list-ul"></i>
                  <span>{'Plantilla'}</span>
                </Link>

                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/plantilla/permanent" className=" waves-effect">
                      <i className="bx bx-list-ul"></i>
                      <span>{'Permanent'}</span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/plantilla/casual" className=" waves-effect">
                      <i className="bx bx-list-ul"></i>
                      <span>{"Casual"}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/plantilla/job-order" className=" waves-effect">
                      <i className="bx bx-list-ul"></i>
                      <span>{"Job Order"}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/plantilla/contract-of-service"
                      className=" waves-effect"
                    >
                      <i className="bx bx-list-ul"></i>
                      <span>{"Contract of Service"}</span>
                    </Link>
                  </li> */}
                </ul>
              </li>
            </Can>
            <Can I="access" this="Employee_registration">
              <li>
                <Link to="/employee-registration" className=" waves-effect">
                  <i className="bx bxs-user-plus"></i>
                  <span>{'Employee Registration'}</span>
                </Link>
              </li>
            </Can>
            <Can I="access" this="Employees">
              <li>
                <Link to="/employees" className=" waves-effect">
                  <i className="bx bxs-user-circle"></i>
                  <span>{'Employees'}</span>
                </Link>
              </li>
            </Can>

            <li className="menu-title">Base Data</li>
            <Can I="access" this="Organization_structure">
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="bx bx-sitemap"></i>
                  <span>{'Org. Structure'}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/office" className="waves-effect">
                      <i className="fas fa-dice-one"></i>
                      <span>{'Office'}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/department" className="waves-effect">
                      <i className="fas fa-dice-two"></i>
                      <span>{'Department'}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/division" className="waves-effect">
                      <i className="fas fa-dice-three"></i>
                      <span>{'Division'}</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </Can>
            <Can I="access" this="Salary_grade">
              <li>
                <Link to="/salary-grade" className="waves-effect">
                  <i className="bx bx-money"></i>
                  <span>{'Salary Grade'}</span>
                </Link>
              </li>
            </Can>
            <Can I="access" this="Qualification_standards">
              <li>
                <Link to="/qualification-standards" className="waves-effect">
                  <i className="bx bx-list-check"></i>
                  <span>{'Qualification Standards'}</span>
                </Link>
              </li>
            </Can>
            <Can I="access" this="Occupations">
              <li>
                <Link to="/occupations" className="waves-effect">
                  <i className="bx bxs-group"></i>
                  <span>{'Occupations'}</span>
                </Link>
              </li>
            </Can>
            <Can I="access" this="Duties_responsibilities">
              <li>
                <Link to="/duties-responsibilities" className="waves-effect">
                  <i className="bx bx-list-ol"></i>
                  <span>{'Duties & Responsibilities'}</span>
                </Link>
              </li>
            </Can>
            <Can I="access" this="Committees">
              <li>
                <Link to="/committees" className="waves-effect">
                  <i className="bx bxs-group"></i>
                  <span>{'Committees'}</span>
                </Link>
              </li>
            </Can>

            <li className="menu-title">Competency</li>
            <Can I="access" this="Competency_models">
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="bx bx-list-ul"></i>
                  <span>{'Domains'}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/core-models" className="waves-effect">
                      <i className="bx bx-list-ul"></i>
                      <span>{'Core'}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/functional-models" className="waves-effect">
                      <i className="bx bx-list-ul"></i>
                      <span>{'Functional'}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/cross-cutting-models" className="waves-effect">
                      <i className="bx bx-list-ul"></i>
                      <span>{'Cross-cutting'}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/managerial-models" className="waves-effect">
                      <i className="bx bx-list-ul"></i>
                      <span>{'Managerial'}</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </Can>
            <Can I="access" this="Competency">
              <li>
                <Link to="/competency" className="waves-effect">
                  <i className="bx bx-list-plus"></i>
                  <span>{'Assignment'}</span>
                </Link>
              </li>
            </Can>

            <li className="menu-title">Recruitment</li>
            <Can I="access" this="Prf_list">
              <li>
                <Link to="/prf-list" className="waves-effect">
                  <i className="bx bx-edit"></i>
                  <span>{'Position Request List'}</span>
                </Link>
              </li>
            </Can>
            <Can I="access" this="Personnel_selection">
              <li>
                <Link to="/personnel-selection" className="waves-effect">
                  <i className="bx bx-select-multiple"></i>
                  <span>{'Personnel Selection'}</span>
                </Link>
              </li>
            </Can>

            <li className="menu-title">Placement</li>
            <Can I="access" this="Results_of_hiring">
              <li>
                <Link to="/hiring-results" className="waves-effect">
                  <i className="bx bx-user-check"></i>
                  <span>{'Results of Hiring'}</span>
                </Link>
              </li>
            </Can>

            <li className="menu-title">Settings</li>
            <Can I="access" this="Settings">
              <li>
                <Link to="/settings/users" className="waves-effect">
                  <i className="bx bxs-user-account"></i>
                  <span>{'Users'}</span>
                </Link>
              </li>

              <li>
                <Link to="/settings/officer-in-charge" className="waves-effect">
                  <i className="bx bxs-user-badge"></i>
                  <span>{'Officer In Charge'}</span>
                </Link>
              </li>
              <li>
                <Link to="/settings/modules" className="waves-effect">
                  <i className="bx bx-package"></i>
                  <span>{'Modules'}</span>
                </Link>
              </li>
              <li>
                <Link to="/settings/system-logs" className="waves-effect">
                  <i className="bx bx-detail"></i>
                  <span>{'System Logs'}</span>
                </Link>
              </li>
            </Can>
          </ul>
        </div>
      </SimpleBar>
      *
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(SidebarContent)
