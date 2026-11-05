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
import { Button } from 'reactstrap'
import * as XLSX from 'xlsx'

// Excel columns, in the same order as the PDF (a column is included only when it was selected)
const EXCEL_COLUMNS = [
  ['fullName', 'Name'],
  ['companyId', 'Employee No.'],
  ['natureOfAppointment', 'Nature of Appointment'],
  ['positionTitle', 'Position'],
  ['assignment', 'Direct Assignment'],
  ['office', 'Office'],
  ['department', 'Department'],
  ['division', 'Division'],
  ['dateHired', 'Date Hired'],
  ['sex', 'Sex'],
  ['birthDate', 'Birth Date'],
  ['age', 'Age'],
  ['birthPlace', 'Birth Place'],
  ['civilStatus', 'Civil Status'],
  ['email', 'Email'],
  ['height', 'Height (m)'],
  ['weight', 'Weight (kg)'],
  ['bloodType', 'Blood Type'],
  ['residentialAddress', 'Residential Address'],
  ['permanentAddress', 'Permanent Address'],
  ['gsis', 'GSIS'],
  ['pagibig', 'PAG-IBIG'],
  ['philhealth', 'PhilHealth'],
  ['sss', 'SSS'],
  ['tin', 'TIN'],
  ['primaryEducation', 'Elementary'],
  ['secondaryEducation', 'Secondary'],
  ['vocationalCourse', 'Vocational / Trade Course'],
  ['collegeEducation', 'College'],
  ['graduateStudies', 'Graduate Studies'],
  ['eligibility', 'Eligibility'],
  ['salaryGrade', 'Salary Grade & Step Increment'],
  ['salaryGradeAmount', 'Amount'],
]

const downloadExcel = (employeeDetails, asOf, natureOfAppointment) => {
  const rows = Array.isArray(employeeDetails) ? employeeDetails : []
  const columns = EXCEL_COLUMNS.filter(([key]) =>
    rows.some(row => Object.prototype.hasOwnProperty.call(row, key))
  )
  const aoa = [
    ['EMPLOYEE DETAILS REPORT'],
    [
      `Active roll as of ${asOf || ''}${
        natureOfAppointment && natureOfAppointment !== 'undefined'
          ? ` - ${natureOfAppointment}`
          : ''
      }`,
    ],
    [],
    ['No.', ...columns.map(([, label]) => label)],
    ...rows.map((row, index) => [
      index + 1,
      ...columns.map(([key]) => {
        const value = row[key]
        if (value === null || value === undefined) return ''
        if (key === 'salaryGradeAmount' && !isNaN(Number(value)))
          return Number(value)
        return value
      }),
    ]),
  ]
  const sheet = XLSX.utils.aoa_to_sheet(aoa)
  sheet['!cols'] = [
    { wch: 5 },
    ...columns.map(([key, label]) => ({
      wch: key.includes('Address') ? 50 : Math.max(12, label.length + 2),
    })),
  ]
  const book = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(book, sheet, 'Employees')
  XLSX.writeFile(book, `Employee Details Report ${asOf || ''}.xlsx`)
}

const ReportOnEmployeeInfo = () => {
  const [filterState, setFilterState] = useState({})

  const {
    as_of,
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
      as_of: as_of,
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
                          <>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginBottom: '0.75rem',
                              }}
                            >
                              <Button
                                color="success"
                                disabled={
                                  !Array.isArray(employeeDetails) ||
                                  employeeDetails.length === 0
                                }
                                onClick={() =>
                                  downloadExcel(
                                    employeeDetails,
                                    as_of,
                                    nature_of_appointment
                                  )
                                }
                              >
                                <i className="mdi mdi-microsoft-excel" />{' '}
                                Download Excel
                              </Button>
                            </div>
                            <PDFViewer width={'100%'} height={700} showToolbar>
                              <ReportOnEmployeeInfoPdf
                                employeeDetails={employeeDetails}
                                filterState={filterState}
                              />
                            </PDFViewer>
                          </>
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
