import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { Can } from 'casl/Can'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchJobDescription,
  fetchPlantillaPosition,
  getOffices,
  getDepartments,
  getDivisions,
  fetchSGListStepIncrement,
  updateJobDescription,
} from 'store/actions'
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  FormText,
} from 'reactstrap'
import OutlinedBox from 'components/OutlinedBox'
import Breadcrumbs from 'components/Common/Breadcrumb'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import InputMask from 'react-input-mask'
import { salaryGrades } from 'constants/selectInputs'

const PositionJobDescription = () => {
  const dispatch = useDispatch()
  const { plantillaId } = useParams()

  const [isEditable, setIsEditable] = useState(false)
  const [directAssignment, setDirectAssignment] = useState('')

  const [filteredSG, setfilteredSG] = useState({})

  // checker state for selected radio button
  const [isOfficeDefault, setIsOfficeDefault] = useState(false)
  const [isDepartmentDefault, setIsDepartmentDefault] = useState(false)
  const [isDivisionDefault, setIsDivisionDefault] = useState(false)

  // Redux state for organization structure
  const {
    offices,
    isLoadingOfc,
    errorOfc,

    departments,
    isLoadingDept,
    errorDept,

    divisions,
    isLoadingDiv,
    errorDiv,
  } = useSelector(state => ({
    offices: state.officeList.offices,
    isLoadingOfc: state.officeList.isLoading,
    errorOfc: state.officeList.error,

    departments: state.departmentList.departments,
    isLoadingDept: state.departmentList.isLoading,
    errorDept: state.departmentList.error,

    divisions: state.divisionList.divisions,
    isLoadingDiv: state.divisionList.isLoading,
    errorDiv: state.divisionList.error,
  }))

  // Redux state for salary grade
  const {
    salaryGradeStepIncrement,
    loadingSalaryGradeStepIncrement,
    errorSalaryGradeStepIncrement,
  } = useSelector(state => ({
    salaryGradeStepIncrement:
      state.salaryGrade.response.salaryGradeStepIncrement,
    loadingSalaryGradeStepIncrement:
      state.salaryGrade.loading.loadingSalaryGradeStepIncrement,
    errorSalaryGradeStepIncrement:
      state.salaryGrade.error.errorSalaryGradeStepIncrement,
  }))

  // Redux state for position job description
  const {
    jobDescription,
    assignedTo,
    responseUpdateJobDescription,
    loadingJobDescription,
    errorJobDescription,
  } = useSelector(state => ({
    jobDescription: state.jobDescription.response.get,
    assignedTo: state.jobDescription.response.get.assignedTo,
    responseUpdateJobDescription: state.jobDescription.response.patch,
    loadingJobDescription: state.jobDescription.loading.loadingJobDescription,
    errorJobDescription: state.jobDescription.error.errorJobDescription,
  }))

  // Redux state for position details
  const { positionDetails, pdIsLoading, pdError } = useSelector(state => ({
    positionDetails: state.plantilla.plantillaPosition,
    pdIsLoading: state.plantilla.isLoading,
    pdError: state.plantilla.error,
  }))

  // Set dropdown values depending on the org structure level
  const handleAssignment = event => {
    const value = event.target.value

    if (value === 'office') {
      setDirectAssignment('office')
    } else if (value === 'department') {
      setDirectAssignment('department')
    } else if (value === 'division') {
      setDirectAssignment('division')
    }
  }

  // Edit position description
  const editSwitch = val => {
    setIsEditable(val.target.checked)
  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // Step 1 of a salary grade in the latest salary grade table (the step increment of a position is always 1;
  // salary-grade/step-increment returns the latest effectivity year only)
  const stepOneOf = salaryGrade =>
    (salaryGradeStepIncrement || []).find(
      sg => sg.salaryGrade == salaryGrade && sg.stepIncrement == 1
    ) || {}

  // salary grade changed: authorized salary = step 1 of that grade
  const filterSG = value => {
    setfilteredSG(stepOneOf(value))
  }

  // Submit updated job description
  const updatePlantillaPosition = event => {
    event.preventDefault()

    if (!filteredSG._id || !event.target.directAssignment.value) return

    const formData = {
      orgId: event.target.directAssignment.value,
      positionData: {
        itemNumber: event.target.itemNumber.value.toUpperCase(),
        positionTitle: event.target.positionTitle.value,
        salaryGrade: filteredSG._id,
        summary: event.target.positionSummary.value,
      },
    }
    dispatch(updateJobDescription(plantillaId, formData))
  }

  // Assign default value to "Assigned To" input
  const setAssignedToDefaultValue = () => {
    let assignedToValue = ''

    // the current office / department / division, only while that assignment type is selected
    if (isOfficeDefault && directAssignment === 'office') {
      assignedToValue = jobDescription.assignedTo.office.id
    } else if (isDepartmentDefault && directAssignment === 'department') {
      assignedToValue = jobDescription.assignedTo.department.id
    } else if (isDivisionDefault && directAssignment === 'division') {
      assignedToValue = jobDescription.assignedTo.division.id
    }
    return assignedToValue
  }

  // Initial pull of required data
  useEffect(() => {
    if (plantillaId) {
      dispatch(fetchJobDescription(plantillaId))
      dispatch(fetchPlantillaPosition(plantillaId))
      dispatch(getOffices())
      dispatch(getDepartments())
      dispatch(getDivisions())
      dispatch(fetchSGListStepIncrement())
    }
  }, [])

  // Set initial data for form
  useEffect(() => {
    // Set initial states for default values of "Assignment" radio input and "Assigned to" select input
    if (jobDescription) {
      if (!isEmpty(jobDescription.assignedTo.division.id)) {
        setIsDivisionDefault(true)
        setIsDepartmentDefault(false)
        setIsOfficeDefault(false)
        setDirectAssignment('division')
      } else if (!isEmpty(jobDescription.assignedTo.department.id)) {
        setIsDepartmentDefault(true)
        setIsDivisionDefault(false)
        setIsOfficeDefault(false)
        setDirectAssignment('department')
      } else if (!isEmpty(jobDescription.assignedTo.office.id)) {
        setIsOfficeDefault(true)
        setIsDepartmentDefault(false)
        setIsDivisionDefault(false)
        setDirectAssignment('office')
      }
    } else {
      setDirectAssignment('')
      setIsOfficeDefault(false)
      setIsDepartmentDefault(false)
      setIsDivisionDefault(false)
    }
  }, [jobDescription])

  // If succesful response, reload pull of required page data
  useEffect(() => {
    if (!isEmpty(responseUpdateJobDescription)) {
      if (plantillaId) {
        dispatch(fetchJobDescription(plantillaId))
        dispatch(fetchPlantillaPosition(plantillaId))
        dispatch(getOffices())
        dispatch(getDepartments())
        dispatch(getDivisions())
        dispatch(fetchSGListStepIncrement())
      }
    }
  }, [responseUpdateJobDescription])

  useEffect(() => {
    // Initial salary: step 1 of the position's salary grade in the latest salary grade table
    if (jobDescription.salary.salaryGrade && salaryGradeStepIncrement) {
      setfilteredSG(stepOneOf(jobDescription.salary.salaryGrade))
    }
  }, [salaryGradeStepIncrement, jobDescription.salary])

  return (
    <React.Fragment>
      <Can I="access" this="Plantilla">
        <div className="page-content">
          <div className="container-fluid">
            {/* Notifications */}
            {errorJobDescription ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorJobDescription}
              />
            ) : null}
            {pdError ? (
              <ToastrNotification toastType={'error'} notifMessage={pdError} />
            ) : null}
            {errorSalaryGradeStepIncrement ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorSalaryGradeStepIncrement}
              />
            ) : null}
            {errorOfc ? (
              <ToastrNotification toastType={'error'} notifMessage={errorOfc} />
            ) : null}
            {errorDept ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorDept}
              />
            ) : null}
            {errorDiv ? (
              <ToastrNotification toastType={'error'} notifMessage={errorDiv} />
            ) : null}

            {!isEmpty(responseUpdateJobDescription) ? (
              <ToastrNotification
                toastType={'success'}
                notifMessage={'Position job description successfully updated'}
              />
            ) : null}

            <Breadcrumbs
              title={positionDetails.itemNumber}
              titleUrl={`/plantilla/permanent/${plantillaId}`}
              breadcrumbItem="Job Description"
              positionTitle={positionDetails.positionTitle}
            />
            <Container fluid={true}>
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <div className="form-check form-switch form-switch-lg mb-3">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="editSwitch"
                              onClick={e => editSwitch(e)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="editSwitch"
                            >
                              Edit
                            </label>
                          </div>
                        </Col>
                      </Row>

                      {pdIsLoading || loadingJobDescription ? (
                        <LoadingIndicator />
                      ) : (
                        <>
                          {isEditable ? (
                            <Form onSubmit={updatePlantillaPosition}>
                              <Row>
                                {/* Item No */}
                                <Col sm={6}>
                                  <FormGroup>
                                    <Label for="formrow-itemnumber-Input">
                                      Item No
                                    </Label>

                                    <InputMask
                                      name="itemNumber"
                                      mask="aaa-aaa-999"
                                      defaultValue={jobDescription.itemNumber}
                                      className="form-control text-uppercase"
                                      required
                                    ></InputMask>
                                  </FormGroup>
                                </Col>

                                {/* Position Title */}
                                <Col sm={6}>
                                  <FormGroup>
                                    <Label for="formrow-jobtitle-Input">
                                      Position Title
                                    </Label>

                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="formrow-jobtitle-Input"
                                      name="positionTitle"
                                      defaultValue={
                                        jobDescription.positionTitle
                                      }
                                    />
                                  </FormGroup>
                                </Col>

                                {/* Assignment */}
                                <Col md={4}>
                                  <FormGroup>
                                    <legend className="col-form-label font-weight-bold col-sm-6">
                                      Assignment:
                                    </legend>
                                    <div className="custom-control custom-control-inline">
                                      <FormGroup check inline>
                                        <Input
                                          type="radio"
                                          name="assignment"
                                          value="office"
                                          onChange={handleAssignment}
                                          required
                                          checked={
                                            directAssignment === 'office'
                                              ? true
                                              : false
                                          }
                                        />
                                        <Label check> Office</Label>
                                      </FormGroup>

                                      <FormGroup check inline>
                                        <Input
                                          type="radio"
                                          name="assignment"
                                          value="department"
                                          onChange={handleAssignment}
                                          required
                                          checked={
                                            directAssignment === 'department'
                                              ? true
                                              : false
                                          }
                                        />
                                        <Label check>Department</Label>
                                      </FormGroup>

                                      <FormGroup check inline>
                                        <Input
                                          type="radio"
                                          name="assignment"
                                          value="division"
                                          onChange={handleAssignment}
                                          required
                                          checked={
                                            directAssignment === 'division'
                                              ? true
                                              : false
                                          }
                                        />
                                        <Label check> Division</Label>
                                      </FormGroup>
                                    </div>
                                  </FormGroup>
                                </Col>

                                {/* Assigned To */}
                                <Col md={8}>
                                  <FormGroup>
                                    <Label for="formrow-assignedto">
                                      Assigned to
                                    </Label>
                                    {isLoadingOfc &&
                                    isLoadingDept &&
                                    isLoadingDiv ? (
                                      <Spinner
                                        className="mx-2 radio-select-spinner"
                                        color="secondary"
                                      />
                                    ) : (
                                      <select
                                        key={directAssignment}
                                        id="formrow-assignedto"
                                        className="form-control"
                                        name="directAssignment"
                                        required
                                        defaultValue={setAssignedToDefaultValue()}
                                      >
                                        <option value="" disabled>
                                          Select {directAssignment}
                                        </option>
                                        {/* Set option list */}
                                        {directAssignment === 'office'
                                          ? offices.map(office => (
                                              <option
                                                key={office._id}
                                                value={office._id}
                                              >
                                                {office.code}
                                                {' - '}
                                                {office.name}
                                              </option>
                                            ))
                                          : directAssignment === 'department'
                                          ? departments.map(department => (
                                              <option
                                                key={department._id}
                                                value={department._id}
                                              >
                                                {department.code}
                                                {' - '}
                                                {department.name}
                                              </option>
                                            ))
                                          : directAssignment === 'division'
                                          ? divisions.map(division => (
                                              <option
                                                key={division._id}
                                                value={division._id}
                                              >
                                                {division.code}
                                                {' - '}
                                                {division.name}
                                              </option>
                                            ))
                                          : null}
                                      </select>
                                    )}
                                    <FormText>
                                      <span className="text-danger">
                                        OFFICE:
                                      </span>{' '}
                                      {assignedTo.office.name
                                        ? assignedTo.office.name
                                        : 'N/A'}{' '}
                                      <br></br>
                                      <span className="text-danger">
                                        DEPARTMENT:
                                      </span>{' '}
                                      {assignedTo.department.name
                                        ? assignedTo.department.name
                                        : 'N/A'}{' '}
                                      <br></br>
                                      <span className="text-danger">
                                        DIVISION:
                                      </span>{' '}
                                      {assignedTo.division.name
                                        ? assignedTo.division.name
                                        : 'N/A'}
                                    </FormText>
                                  </FormGroup>
                                </Col>

                                {/* Salary Grade */}
                                <Col md={4}>
                                  <FormGroup>
                                    <Label for="formrow-salarygrade">
                                      Salary Grade
                                    </Label>
                                    {loadingSalaryGradeStepIncrement ? (
                                      <Spinner
                                        className="mx-2 radio-select-spinner"
                                        color="secondary"
                                      />
                                    ) : (
                                      <select
                                        id="formrow-salarygrade"
                                        className="form-control"
                                        name="salaryGrade"
                                        onChange={event =>
                                          filterSG(event.target.value)
                                        }
                                        required
                                        defaultValue={
                                          jobDescription.salary.salaryGrade
                                        }
                                      >
                                        {salaryGrades.map(sg => {
                                          return (
                                            <option key={sg} value={sg}>
                                              {sg}
                                            </option>
                                          )
                                        })}
                                      </select>
                                    )}
                                  </FormGroup>
                                </Col>

                                {/* Step Increment */}
                                <Col md={4}>
                                  <FormGroup>
                                    <Label for="formrow-stepincrement">
                                      Step Increment
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="formrow-stepincrement"
                                      value="1"
                                      readOnly
                                    />
                                    <FormText>
                                      A position always starts at step 1
                                    </FormText>
                                  </FormGroup>
                                </Col>

                                {/* Authorized Salary */}
                                <Col md={4}>
                                  <FormGroup>
                                    <Label for="authsalary-input">
                                      Authorized Salary
                                    </Label>
                                    <Input
                                      type="number"
                                      className="form-control"
                                      name="authSalary"
                                      id="authsalary-input"
                                      required
                                      readOnly
                                      value={filteredSG.amount ?? ''}
                                    />
                                    <FormText>
                                      Step 1 of the latest salary grade table
                                    </FormText>
                                  </FormGroup>
                                </Col>

                                {/* Job Summary */}
                                <Col sm={12}>
                                  <FormGroup>
                                    <Label for="formrow-desc-Input">
                                      Decribe briefly the general function of
                                      the position (Job Summary)
                                    </Label>
                                    <Input
                                      type="textarea"
                                      className="form-control"
                                      id="formrow-desc-Input"
                                      name="positionSummary"
                                      rows="10"
                                      defaultValue={jobDescription.summary}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

                              <Row>
                                <Col
                                  sm={12}
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                  }}
                                >
                                  <button
                                    type="submit"
                                    className="btn btn-primary w-md"
                                  >
                                    Submit
                                  </button>
                                </Col>
                              </Row>
                            </Form>
                          ) : (
                            <Row>
                              <Col sm={4}>
                                <OutlinedBox
                                  label={'Item No'}
                                  value={jobDescription.itemNumber || 'N/A'}
                                />
                              </Col>

                              <Col sm={4}>
                                <OutlinedBox
                                  label={'Position Title'}
                                  value={jobDescription.positionTitle || 'N/A'}
                                />
                              </Col>

                              <Col sm={2}>
                                <OutlinedBox
                                  label={'Salary Grade'}
                                  value={
                                    jobDescription.salary.salaryGrade || 'N/A'
                                  }
                                />
                              </Col>

                              <Col sm={2}>
                                <OutlinedBox
                                  label={'Step Increment'}
                                  value={
                                    jobDescription.salary.stepIncrement || 'N/A'
                                  }
                                />
                              </Col>

                              <Col sm={4} className="mt-4">
                                <OutlinedBox
                                  label={'Office'}
                                  value={assignedTo.office.name || 'N/A'}
                                />
                              </Col>

                              <Col sm={4} className="mt-4">
                                <OutlinedBox
                                  label={'Department'}
                                  value={assignedTo.department.name || 'N/A'}
                                />
                              </Col>

                              <Col sm={4} className="mt-4">
                                <OutlinedBox
                                  label={'Division'}
                                  value={assignedTo.division.name || 'N/A'}
                                />
                              </Col>

                              <Col sm={4} className="mt-4">
                                <OutlinedBox
                                  label={'Reports To'}
                                  value={jobDescription.reportsTo || 'N/A'}
                                />
                              </Col>

                              <Col sm={4} className="mt-4">
                                <OutlinedBox
                                  label={'Nature of Appointment'}
                                  value={
                                    capitalizeFirstLetter(
                                      jobDescription.natureOfAppointment
                                    ) || 'N/A'
                                  }
                                />
                              </Col>

                              <Col sm={12} className="mt-4">
                                <OutlinedBox
                                  label={
                                    'Decribe briefly the general function of the position (Job Summary)'
                                  }
                                  value={jobDescription.summary || 'N/A'}
                                />
                              </Col>

                              <Col sm={12} className="mt-4">
                                <OutlinedBox
                                  label={
                                    'Decribe briefly the general function of Office/Department/Division'
                                  }
                                  value={jobDescription.description || 'N/A'}
                                />
                              </Col>
                            </Row>
                          )}
                        </>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Can>

      <Can not I="access" this="Plantilla">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default PositionJobDescription
