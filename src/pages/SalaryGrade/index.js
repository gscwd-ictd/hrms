import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSalaryGradeList, resetSalaryGradeResponses } from 'store/actions'
import { Can } from 'casl/Can'
import { Navigate } from 'react-router-dom'

import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import UploadSalaryGradeListModal from 'components/Modal/SalaryGrade/UploadSalaryGradeListModal'
import Breadcrumbs from 'components/Common/Breadcrumb'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// style
import 'styles/custom_gscwd/components/table.scss'
import TableSalaryGrade from 'components/Table/TableSalaryGrade'

const SalaryGrade = () => {
  const dispatch = useDispatch()

  // redux state for salary grade table
  const { salaryGradeList, error } = useSelector(state => ({
    salaryGradeList: state.salaryGrade.response.salaryGradeList,
    error: state.salaryGrade.error.errorSalaryGrade,
  }))

  useEffect(() => {
    dispatch(resetSalaryGradeResponses())
    dispatch(fetchSalaryGradeList())
  }, [dispatch])

  // Upload salary grade file modal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  // Set example date
  // const [today, setToday] = useState(new Date('2025-01-02'))
  const [today, setToday] = useState(new Date())
  const [currentTab, setCurrentTab] = useState(1)

  // set to current year
  // const dynamicYear = 2025
  const dynamicYear = new Date().getFullYear()

  const staticSalaryGrade = [
    [1, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000],
    [2, 13305, 13406, 13509, 13613, 13718, 13823, 13929, 14035],
    [3, 14125, 14234, 14343, 14454, 14565, 14676, 14790, 14903],
    [4, 14993, 15109, 15224, 15341, 15459, 15577, 15698, 15818],
    [5, 15909, 16032, 16155, 16279, 16404, 16530, 16657, 16784],
    [6, 16877, 17007, 17137, 17269, 17402, 17535, 17670, 17806],
    [7, 17899, 18037, 18176, 18315, 18455, 18598, 18740, 18884],
    [8, 18998, 19170, 19343, 19518, 19694, 19872, 20052, 20233],
    [9, 20402, 20572, 20745, 20918, 21093, 21269, 21447, 21626],
    [10, 22190, 22376, 22563, 22752, 22942, 23134, 23327, 23522],
  ]

  const [tabs, setTabs] = useState([
    {
      content: staticSalaryGrade,
      startdate: new Date('2022-01-01'),
      enddate: new Date('2022-12-31'),
    },
    {
      content: salaryGradeList,
      startdate: new Date('2023-01-01'),
      enddate: new Date('2023-12-31'),
    },
    {
      content: staticSalaryGrade,
      startdate: new Date('2024-01-01'),
      enddate: new Date('2024-12-31'),
    },
    {
      content: staticSalaryGrade,
      startdate: new Date('2025-01-01'),
      enddate: new Date('2025-12-31'),
    },
  ])

  useEffect(() => {
    const newContent = findContentForYear(dynamicYear)

    if (newContent) {
      const tabIndex =
        newContent.startdate.getFullYear() === today.getFullYear() ? 1 : 0

      setTabs(prevTabs => {
        const updatedTabs = [...prevTabs]
        updatedTabs[tabIndex] = newContent
        updatedTabs[1 - tabIndex] = getPreviousContent(
          newContent.startdate.getFullYear()
        )
        return updatedTabs
      })
      setCurrentTab(tabIndex)
    }
  }, [today, dynamicYear])

  const findContentForYear = year => {
    return tabs.find(
      tab =>
        today >= tab.startdate &&
        today <= tab.enddate &&
        tab.startdate.getFullYear() === year
    )
  }

  const getPreviousContent = currentYear => {
    const previousYear = currentYear - 1
    return tabs.find(tab => tab.startdate.getFullYear() === previousYear)
  }

  const handleTabClick = tabIndex => {
    setCurrentTab(tabIndex)
  }

  return (
    <>
      <Can I="access" this="Salary_grade">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              title="Dashboard"
              titleUrl="/"
              breadcrumbItem="Salary Grade"
            />

            {error ? (
              <ToastrNotification toastType={'error'} notifMessage={error} />
            ) : null}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Nav justified pills style={{ gap: '0.5rem' }}>
                  <NavItem>
                    <NavLink
                      active={currentTab === 0}
                      onClick={() => handleTabClick(0)}
                      className={`btn btn-info waves-effect waves-light ${
                        currentTab === 0 ? 'active' : ''
                      }`}
                    >
                      Previous
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={currentTab === 1}
                      onClick={() => handleTabClick(1)}
                      className={`btn btn-info waves-effect waves-light ${
                        currentTab === 1 ? 'active' : ''
                      }`}
                    >
                      Current
                    </NavLink>
                  </NavItem>
                </Nav>
                <div>
                  <div className="form-group add-btn">
                    <button
                      onClick={handleShowAdd}
                      className="btn btn-info waves-effect waves-light"
                    >
                      <i className="fas fa-file-upload"></i> &nbsp;&nbsp; Upload
                      SG Document
                    </button>
                  </div>
                </div>
              </div>
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody className="card-table">
                      <UploadSalaryGradeListModal
                        showAdd={showAdd}
                        handleCloseAdd={handleCloseAdd}
                        handleShowAdd={handleShowAdd}
                      />
                      <TableSalaryGrade tabs={tabs} currentTab={currentTab} />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Salary_grade">
        <Navigate to="/page-404" />
      </Can>
    </>
  )
}

export default SalaryGrade
