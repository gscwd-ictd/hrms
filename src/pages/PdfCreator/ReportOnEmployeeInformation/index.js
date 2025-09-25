/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react'
import { Can } from 'casl/Can'
import { Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'reactstrap'
import { PDFViewer } from '@react-pdf/renderer'
import ReportOnEmployeeInfoPdf from './EmployeeDetailsDocument'
import { fetchEmployeeDetailsReport } from 'store/actions'
import { useDispatch } from 'react-redux'
import { Card, CardBody, Col, Row } from 'reactstrap'
import Breadcrumbs from 'components/Common/Breadcrumb'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const ReportOnEmployeeInfo = () => {
  const [filterState, setFilterState] = useState({})

  const {
    company_id,
    nature_of_appointment,
    personal_details,
    date_hired,
    position_title,
    assignment,
    office,
    department,
    division,
    residential_address,
    permanent_address,
    gsis,
    pagibig,
    philhealth,
    sss,
    tin,
    primary_education,
    secondary_education,
    vocational_course,
    college_education,
    graduate_studies,
    eligibility,
    salary_grade,
    amount,
  } = useParams()

  const dispatch = useDispatch()
  const { employeeDetails, loadingEmployeeDetails, errorEmployeeDetails } =
    useSelector(state => ({
      employeeDetails: state.employee.employeeDetails,
      loadingEmployeeDetails: state.employee.isLoading,
      errorEmployeeDetails: state.employee.error,
    }))

  useEffect(() => {
    const filters = {
      company_id: company_id,
      nature_of_appointment: nature_of_appointment,
      personal_details: personal_details,
      date_hired: date_hired,
      position_title: position_title,
      assignment: assignment,
      office: office,
      department: department,
      division: division,
      residential_address: residential_address,
      permanent_address: permanent_address,
      gsis: gsis,
      pagibig: pagibig,
      philhealth: philhealth,
      sss: sss,
      tin: tin,
      primary_education: primary_education,
      secondary_education: secondary_education,
      vocational_course: vocational_course,
      college_education: college_education,
      graduate_studies: graduate_studies,
      eligibility: eligibility,
      salary_grade: salary_grade,
      amount: amount,
    }

    setFilterState(filters)
    dispatch(fetchEmployeeDetailsReport(filters))
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Reports"
            titleUrl="/reports"
            breadcrumbItem="Report On Employee Information"
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody className="card-table">
                  <Can I="access" this="Reports">
                    <div className="page-content">
                      <Container fluid={true}>
                        {/* Notifications */}
                        {errorEmployeeDetails ? (
                          <ToastrNotification
                            toastType={'error'}
                            notifMessage={errorEmployeeDetails}
                          />
                        ) : null}

                        {loadingEmployeeDetails ? (
                          <LoadingIndicator />
                        ) : (
                          <PDFViewer width={'100%'} height={700} showToolbar>
                            <ReportOnEmployeeInfoPdf
                              employeeDetails={employeeDetails}
                              filterState={filterState}
                            />
                          </PDFViewer>
                        )}
                      </Container>
                    </div>
                  </Can>

                  <Can not I="access" this="Reports">
                    <Navigate to="/page-404" />
                  </Can>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ReportOnEmployeeInfo
