import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSalaryGradeList,
  fetchPreviousSalaryGradeList,
  fetchCurrentSalaryGradeList,
  resetSalaryGradeResponses,
} from 'store/actions'
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
  const {
    salaryGradeList,
    previousSalaryGradeList,
    currentSalaryGradeList,
    error,
  } = useSelector(state => ({
    salaryGradeList: state.salaryGrade.response.salaryGradeList,
    previousSalaryGradeList: state.salaryGrade.response.previousSalaryGradeList,
    currentSalaryGradeList: state.salaryGrade.response.currentSalaryGradeList,
    error: state.salaryGrade.error.errorSalaryGrade,
  }))

  useEffect(() => {
    dispatch(resetSalaryGradeResponses())
    dispatch(fetchSalaryGradeList())
    dispatch(fetchPreviousSalaryGradeList())
    dispatch(fetchCurrentSalaryGradeList())
  }, [dispatch])

  const [tabs, setTabs] = useState([])
  const [currentTab, setCurrentTab] = useState(1)

  useEffect(() => {
    setTabs([
      {
        content: previousSalaryGradeList,
      },
      {
        content: currentSalaryGradeList,
      },
    ])
  }, [previousSalaryGradeList, currentSalaryGradeList])

  // Upload salary grade file modal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

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
                      className={`btn btn-info waves-effect waves-light ${
                        currentTab === 0 ? 'active' : ''
                      }`}
                      onClick={() => setCurrentTab(0)} // Set currentTab to 0 when "Previous" is clicked
                    >
                      Previous
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={currentTab === 1}
                      className={`btn btn-info waves-effect waves-light ${
                        currentTab === 1 ? 'active' : ''
                      }`}
                      onClick={() => setCurrentTab(1)} // Set currentTab to 1 when "Current" is clicked
                    >
                      Current
                    </NavLink>
                  </NavItem>
                </Nav>
                <div>
                  <div className="form-group add-btn">
                    {currentTab === 1 && (
                      <button
                        onClick={handleShowAdd}
                        className="btn btn-info waves-effect waves-light"
                      >
                        <i className="fas fa-file-upload"></i> &nbsp;&nbsp;
                        Upload SG Document
                      </button>
                    )}
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
