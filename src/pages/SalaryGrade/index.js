import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSalaryGradeList, resetSalaryGradeResponses } from "store/actions"
import { Can } from "casl/Can"
import { Navigate } from "react-router-dom"

import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Table,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  CardText,
  Button,
  TabContent,
} from 'reactstrap'
import UploadSalaryGradeListModal from 'components/Modal/SalaryGrade/UploadSalaryGradeListModal'
import Breadcrumbs from 'components/Common/Breadcrumb'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// style
import 'styles/custom_gscwd/components/table.scss'

const SalaryGrade = () => {
  const dispatch = useDispatch()

  // redux state for salary grade table
  const { salaryGradeList, isLoading, error } = useSelector(state => ({
    salaryGradeList: state.salaryGrade.response.salaryGradeList,
    isLoading: state.salaryGrade.loading.loadingSalaryGrade,
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

  // previousSalaryGradeList object
  // effectivityDate
  // salaryGradeList

  // currentSalaryGradeList object
  // effectivityDate
  // salaryGradeList

  const [tabs, setTabs] = useState([
    {
      content: '2022 content',
      startdate: new Date('2022-01-01'),
      enddate: new Date('2022-12-31'),
    },
    {
      content: (
        <>
          <div>
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <div className="table-responsive pt-3">
                <Table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th></th>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                      <th>4</th>
                      <th>5</th>
                      <th>6</th>
                      <th>7</th>
                      <th>8</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaryGradeList.map((sGRow, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{sGRow[0]}</th>
                          <td>{sGRow[1] || '-'}</td>
                          <td>{sGRow[2] || '-'}</td>
                          <td>{sGRow[3] || '-'}</td>
                          <td>{sGRow[4] || '-'}</td>
                          <td>{sGRow[5] || '-'}</td>
                          <td>{sGRow[6] || '-'}</td>
                          <td>{sGRow[7] || '-'}</td>
                          <td>{sGRow[8] || '-'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </>
      ),
      startdate: new Date('2023-01-01'),
      enddate: new Date('2023-12-31'),
    },
    {
      content: '2024 content',
      startdate: new Date('2024-01-01'),
      enddate: new Date('2024-12-31'),
    },
    {
      content: '2025 content',
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

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="card-table">
                    <UploadSalaryGradeListModal
                      showAdd={showAdd}
                      handleCloseAdd={handleCloseAdd}
                    />
                    {/* <div>
                      <div
                        className="flex-container"
                        style={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Nav justified pills>
                          <NavItem>
                            <NavLink
                              href="#"
                              onClick={() => toggleTab('1')}
                              active={activeTab === '1'}
                            >
                              Previous
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              href="#"
                              onClick={() => toggleTab('2')}
                              active={activeTab === '2'}
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
                              <i className="fas fa-file-upload"></i>{' '}
                              &nbsp;&nbsp; Upload SG Document
                            </button>
                          </div>
                        </div>
                      </div>
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                          <Row>
                            <Col sm="12">
                              <h4>Previous Content</h4>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="2">
                          <div>
                            {isLoading ? (
                              <LoadingIndicator />
                            ) : (
                              <div className="table-responsive pt-3">
                                <Table className="table table-bordered mb-0">
                                  <thead>
                                    <tr>
                                      <th></th>
                                      <th>1</th>
                                      <th>2</th>
                                      <th>3</th>
                                      <th>4</th>
                                      <th>5</th>
                                      <th>6</th>
                                      <th>7</th>
                                      <th>8</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {salaryGradeList.map((sGRow, index) => {
                                      return (
                                        <tr key={index}>
                                          <th scope="row">{sGRow[0]}</th>
                                          <td>{sGRow[1] || '-'}</td>
                                          <td>{sGRow[2] || '-'}</td>
                                          <td>{sGRow[3] || '-'}</td>
                                          <td>{sGRow[4] || '-'}</td>
                                          <td>{sGRow[5] || '-'}</td>
                                          <td>{sGRow[6] || '-'}</td>
                                          <td>{sGRow[7] || '-'}</td>
                                          <td>{sGRow[8] || '-'}</td>
                                        </tr>
                                      )
                                    })}
                                  </tbody>
                                </Table>
                              </div>
                            )}
                          </div>
                        </TabPane>
                      </TabContent>
                    </div> */}
                    <div>
                      <div
                        className="flex-container"
                        style={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Nav justified pills style={{ gap: '0.5rem' }}>
                          <NavItem>
                            <NavLink
                              href="#"
                              active={currentTab === 0}
                              onClick={() => handleTabClick(0)}
                              className={`btn btn-info ${
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
                              className={`btn btn-info ${
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
                              <i className="fas fa-file-upload"></i>{' '}
                              &nbsp;&nbsp; Upload SG Document
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="tab-content">
                        {tabs[currentTab].content}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
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
