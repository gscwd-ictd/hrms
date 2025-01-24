import React, { useState } from 'react'
import {
  Card,
  CardBody,
  Col,
  Row,
  FormFeedback,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import Breadcrumbs from 'components/Common/Breadcrumb'
import { reports, natureOfAppointment } from 'constants/selectInputs'
import { reportNames } from 'constants/reports'
import { natureOfAppointments } from 'constants/natureOfAppointments'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Reports = () => {
  const [reportType, setReportType] = useState('')

  const initialValues = {
    company_id: false,
    nature_of_appointment: '',
    personal_details: false,
    date_hired: false,
    position_title: false,
    assignment: false,
    office: false,
    department: false,
    division: false,
    residential_address: false,
    permanent_address: false,
    gsis: false,
    pagibig: false,
    philhealth: false,
    sss: false,
    tin: false,
    primary_education: false,
    secondary_education: false,
    vocational_course: false,
    college_education: false,
    graduate_studies: false,
    eligibility: false,
    salary_grade: false,
    amount: false,
  }

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object({
      reportType: Yup.string().required('Please select a report type'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (values.reportType === reportNames.REPORT_ON_EMPLOYEE_INFORMATION) {
        // resetForm({ values: initialValues })
        const url = `${window.location}/${replaceSpaceToDash(
          values.reportType
        )}`

        const paramEmpInfo = `/${values.company_id}/${values.nature_of_appointment}/${values.personal_details}/${values.date_hired}/${values.position_title}/${values.assignment}/${values.office}/${values.department}/${values.division}/${values.residential_address}/${values.permanent_address}/${values.gsis}/${values.pagibig}/${values.philhealth}/${values.sss}/${values.tin}/${values.primary_education}/${values.secondary_education}/${values.vocational_course}/${values.college_education}/${values.graduate_studies}/${values.eligibility}/${values.salary_grade}/${values.amount}`

        window.open(url + paramEmpInfo, '_blank')
      }
    },
  })

  // Replace space with dash for URL on redirect
  const replaceSpaceToDash = reportName => {
    if (reportName != null && reportName.length > 0) {
      return reportName.replace(/ /g, '-')
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Dashboard"
            titleUrl="/"
            breadcrumbItem="Reports"
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody className="card-table">
                  <Row>
                    <Form
                      id="reportsForm"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for="reportType">Report Type</Label>
                            <Input
                              type="select"
                              name="reportType"
                              id="reportType"
                              value={validation.values.reportType || ''}
                              onChange={event => {
                                const newValue = event.target.value
                                validation.setFieldValue('reportType', newValue)
                                setReportType(newValue)
                              }}
                              invalid={
                                validation.touched.reportType &&
                                validation.errors.reportType
                                  ? true
                                  : false
                              }
                            >
                              <option value="">-</option>
                              {reports.map((report, index) => (
                                <option key={index} value={report.value}>
                                  {report.label}
                                </option>
                              ))}
                            </Input>
                            {validation.touched.reportType &&
                            validation.errors.reportType ? (
                              <FormFeedback type="invalid">
                                {validation.errors.reportType}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>

                        <Col>
                          <FormGroup>
                            <Label for="nature_of_appointment">
                              Nature of Appointment
                            </Label>
                            <Input
                              type="select"
                              id="nature_of_appointment"
                              value={
                                validation.values.nature_of_appointment || ''
                              }
                              onChange={validation.handleChange}
                              required
                            >
                              <option value="">Select...</option>
                              {natureOfAppointment.map((appointment, index) => (
                                <option key={index} value={appointment.value}>
                                  {appointment.label}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>

                      {/* Filter to REPORT ON EMPLOYEE INFORMATION */}
                      {reportType ===
                      reportNames.REPORT_ON_EMPLOYEE_INFORMATION ? (
                        <Row
                          style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                        >
                          {/* Column 1 */}
                          <Col>
                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="company_id"
                                    checked={
                                      validation.values.company_id || false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  Company ID
                                </Label>
                              </FormGroup>
                            </Row>

                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="personal_details"
                                    checked={
                                      validation.values.personal_details ||
                                      false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  Personal Details
                                </Label>
                              </FormGroup>
                            </Row>

                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="date_hired"
                                    checked={
                                      validation.values.date_hired || false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  Date Hired
                                </Label>
                              </FormGroup>
                            </Row>

                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="position_title"
                                    checked={
                                      validation.values.position_title || false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  Position
                                </Label>
                              </FormGroup>
                            </Row>

                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="assignment"
                                    checked={
                                      validation.values.assignment || false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  Direct Assignment
                                </Label>
                              </FormGroup>
                            </Row>
                          </Col>

                          {/* Column 2 */}
                          <Col>
                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="office"
                                    checked={validation.values.office || false}
                                    onChange={validation.handleChange}
                                  />
                                  Office
                                </Label>
                              </FormGroup>
                            </Row>

                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="department"
                                    checked={
                                      validation.values.department || false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  Department
                                </Label>
                              </FormGroup>
                            </Row>

                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="division"
                                    checked={
                                      validation.values.division || false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  Division
                                </Label>
                              </FormGroup>
                            </Row>

                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="residential_address"
                                    checked={
                                      validation.values.residential_address ||
                                      false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  Residential Address
                                </Label>
                              </FormGroup>
                            </Row>

                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="permanent_address"
                                    checked={
                                      validation.values.permanent_address ||
                                      false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  Permanent Address
                                </Label>
                              </FormGroup>
                            </Row>
                          </Col>

                          {/* Column 3 */}
                          <Col>
                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="gsis"
                                    checked={validation.values.gsis || false}
                                    onChange={validation.handleChange}
                                  />
                                  GSIS
                                </Label>
                              </FormGroup>
                            </Row>
                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="pagibig"
                                    checked={validation.values.pagibig || false}
                                    onChange={validation.handleChange}
                                  />
                                  PAGIBIG
                                </Label>
                              </FormGroup>
                            </Row>
                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="philhealth"
                                    checked={
                                      validation.values.philhealth || false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  PhilHealth
                                </Label>
                              </FormGroup>
                            </Row>
                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="sss"
                                    checked={validation.values.sss || false}
                                    onChange={validation.handleChange}
                                  />
                                  SSS
                                </Label>
                              </FormGroup>
                            </Row>
                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="tin"
                                    checked={validation.values.tin || false}
                                    onChange={validation.handleChange}
                                  />
                                  TIN
                                </Label>
                              </FormGroup>
                            </Row>
                          </Col>

                          {/* Column 4 */}
                          <Col>
                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="primary_education"
                                    checked={
                                      validation.values.primary_education ||
                                      false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  Elementary Education
                                </Label>
                              </FormGroup>
                            </Row>
                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="secondary_education"
                                    checked={
                                      validation.values.secondary_education ||
                                      false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  Secondary Education
                                </Label>
                              </FormGroup>
                            </Row>
                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="vocational_course"
                                    checked={
                                      validation.values.vocational_course ||
                                      false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  Vocational Trade Course
                                </Label>
                              </FormGroup>
                            </Row>
                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="college_education"
                                    checked={
                                      validation.values.college_education ||
                                      false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  College Education
                                </Label>
                              </FormGroup>
                            </Row>
                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="graduate_studies"
                                    checked={
                                      validation.values.graduate_studies ||
                                      false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  Graduate Studies
                                </Label>
                              </FormGroup>
                            </Row>
                          </Col>

                          {/* Column 5 */}
                          <Col>
                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="eligibility"
                                    checked={
                                      validation.values.eligibility || false
                                    }
                                    onChange={validation.handleChange}
                                  />
                                  Eligibility
                                </Label>
                              </FormGroup>
                            </Row>

                            {/* Allow option if value chosen are casual or permanent */}
                            {validation.values.nature_of_appointment ===
                              natureOfAppointments.CASUAL ||
                            validation.values.nature_of_appointment ===
                              natureOfAppointments.PERMANENT ? (
                              <Row>
                                <FormGroup check>
                                  <Label check>
                                    <Input
                                      type="checkbox"
                                      name="salary_grade"
                                      checked={
                                        validation.values.salary_grade || false
                                      }
                                      onChange={validation.handleChange}
                                    />
                                    Salary Grade
                                  </Label>
                                </FormGroup>
                              </Row>
                            ) : null}

                            <Row>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="amount"
                                    checked={validation.values.amount || false}
                                    onChange={validation.handleChange}
                                  />
                                  Amount
                                </Label>
                              </FormGroup>
                            </Row>
                          </Col>
                        </Row>
                      ) : null}

                      <Row style={{ justifyContent: 'flex-end' }}>
                        <Button
                          color="primary"
                          type="submit"
                          form="reportsForm"
                          style={{ width: 'fit-content' }}
                        >
                          Generate Report
                        </Button>
                      </Row>
                    </Form>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Reports
