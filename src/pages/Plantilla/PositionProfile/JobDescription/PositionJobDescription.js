import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import {
  fetchJobDescription,
  fetchPlantillaPosition,
  getOffices,
  getDepartments,
  getDivisions,
  fetchSGListStepIncrement,
  updateJobDescription,
} from "store/actions"

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
} from "reactstrap"
import OutlinedBox from "components/OutlinedBox"
import Breadcrumbs from "components/Common/Breadcrumb"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"
import InputMask from "react-input-mask"

import { salaryGrades } from "constants/selectInputs"

const PositionJobDescription = props => {
  const dispatch = useDispatch()

  const [isEditable, setIsEditable] = useState(false)
  const [directAssignment, setDirectAssignment] = useState("")
  const [filteredStepIncrements, setFilteredStepIncrements] = useState([])
  const [filteredSG, setfilteredSG] = useState({})

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

    if (value === "office") {
      setDirectAssignment("office")
    } else if (value === "department") {
      setDirectAssignment("department")
    } else if (value === "division") {
      setDirectAssignment("division")
    }
  }

  // Edit position description
  const editSwitch = val => {
    setIsEditable(val.target.checked)
  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // for filtering the salary grade list and update authorized salary field
  const filterSG = event => {
    const value = event.target.value

    const sgCurrentStepIncrement = salaryGradeStepIncrement.filter(
      sg => sg.salaryGrade == value
    )

    setFilteredStepIncrements(sgCurrentStepIncrement)
  }

  // for filtering the salary grade list and update authorized salary field
  const filterSI = event => {
    const value = event.target.value
    const parsedValue = JSON.parse(value)

    setfilteredSG(parsedValue)
  }

  const updatePlantillaPosition = event => {
    event.preventDefault()

    const formData = {
      orgId: event.target.directAssignment.value,
      positionData: {
        itemNumber: event.target.itemNumber.value,
        positionTitle: event.target.positionTitle.value,
        salaryGrade: filteredSG._id,
        summary: event.target.positionSummary.value,
      },
    }
    dispatch(updateJobDescription(props.match.params.id, formData))
  }

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(fetchJobDescription(props.match.params.id))
      dispatch(fetchPlantillaPosition(props.match.params.id))
      dispatch(getOffices())
      dispatch(getDepartments())
      dispatch(getDivisions())
      dispatch(fetchSGListStepIncrement())
    }
  }, [dispatch])

  useEffect(() => {
    if (filteredSG.amount > 0) {
      document.getElementById("authsalary-input").value = filteredSG.amount
    }
  }, [filteredSG])

  useEffect(() => {
    if (!isEmpty(responseUpdateJobDescription)) {
      if (props.match.params.id) {
        dispatch(fetchJobDescription(props.match.params.id))
        dispatch(fetchPlantillaPosition(props.match.params.id))
        dispatch(getOffices())
        dispatch(getDepartments())
        dispatch(getDivisions())
        dispatch(fetchSGListStepIncrement())
      }
    }
  }, [responseUpdateJobDescription])

  return (
    <React.Fragment>
      <Can I="access" this="Plantilla">
        <div className="page-content">
          <div className="container-fluid">
            {/* Notifications */}
            {errorJobDescription ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorJobDescription}
              />
            ) : null}
            {pdError ? (
              <ToastrNotification toastType={"error"} notifMessage={pdError} />
            ) : null}
            {errorSalaryGradeStepIncrement ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorSalaryGradeStepIncrement}
              />
            ) : null}
            {errorOfc ? (
              <ToastrNotification toastType={"error"} notifMessage={errorOfc} />
            ) : null}
            {errorDept ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorDept}
              />
            ) : null}
            {errorDiv ? (
              <ToastrNotification toastType={"error"} notifMessage={errorDiv} />
            ) : null}

            {!isEmpty(responseUpdateJobDescription) ? (
              <ToastrNotification
                toastType={"success"}
                notifMessage={"Position job description successfully updated"}
              />
            ) : null}

            {pdIsLoading ? (
              <LoadingIndicator />
            ) : (
              <>
                <Breadcrumbs
                  title={positionDetails.itemNumber}
                  titleUrl={`/plantilla/${props.match.params.id}`}
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
                                display: "flex",
                                justifyContent: "flex-end",
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

                          {loadingJobDescription ? (
                            <LoadingIndicator />
                          ) : isEditable ? (
                            <Form onSubmit={updatePlantillaPosition}>
                              <Row>
                                {/* Item No */}
                                <Col sm={6}>
                                  <FormGroup>
                                    <Label for="formrow-itemnumber-Input">
                                      Item No
                                    </Label>
                                    {/* <Input
                                    type="text"
                                    className="form-control"
                                    name="itemNumber"
                                    id="formrow-itemnumber-Input"
                                    defaultValue={jobDescription.itemNumber}
                                    required
                                  /> */}

                                    <InputMask
                                      name="itemNumber"
                                      mask="aaa-aaa-999"
                                      defaultValue={jobDescription.itemNumber}
                                      className="form-control input-color"
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
                                <Col md={6}>
                                  <FormGroup>
                                    <legend className="col-form-label font-weight-bold col-sm-6">
                                      Assignment:
                                    </legend>
                                    <div className="custom-control custom-control-inline">
                                      <FormGroup check inline>
                                        <Label check>
                                          <Input
                                            type="radio"
                                            name="assignment"
                                            value="office"
                                            onChange={handleAssignment}
                                            required
                                          />{" "}
                                          Office
                                        </Label>
                                      </FormGroup>

                                      <FormGroup check inline>
                                        <Label check>
                                          <Input
                                            type="radio"
                                            name="assignment"
                                            value="department"
                                            onChange={handleAssignment}
                                            required
                                          />{" "}
                                          Department
                                        </Label>
                                      </FormGroup>

                                      <FormGroup check inline>
                                        <Label check>
                                          <Input
                                            type="radio"
                                            name="assignment"
                                            value="division"
                                            onChange={handleAssignment}
                                            required
                                          />{" "}
                                          Division
                                        </Label>
                                      </FormGroup>
                                    </div>
                                  </FormGroup>
                                </Col>

                                {/* Assigned To */}
                                <Col md={6}>
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
                                        id="formrow-assignedto"
                                        className="form-control"
                                        name="directAssignment"
                                        required
                                      >
                                        <option value="">Choose...</option>
                                        {directAssignment === "office"
                                          ? offices.map(office => (
                                              <option
                                                key={office._id}
                                                value={office._id}
                                              >
                                                {office.code}
                                                {" - "}
                                                {office.name}
                                              </option>
                                            ))
                                          : directAssignment === "department"
                                          ? departments.map((department, i) => (
                                              <option
                                                key={department._id}
                                                value={department._id}
                                              >
                                                {department.code}
                                                {" - "}
                                                {department.name}
                                              </option>
                                            ))
                                          : directAssignment === "division"
                                          ? divisions.map((division, i) => (
                                              <option
                                                key={division._id}
                                                value={division._id}
                                              >
                                                {division.code}
                                                {" - "}
                                                {division.name}
                                              </option>
                                            ))
                                          : null}
                                      </select>
                                    )}
                                    <FormText>
                                      <span className="text-danger">
                                        OFFICE:
                                      </span>{" "}
                                      {assignedTo.office} |{" "}
                                      <span className="text-danger">
                                        DEPARTMENT:
                                      </span>{" "}
                                      {assignedTo.department} |{" "}
                                      <span className="text-danger">
                                        DIVISION:
                                      </span>{" "}
                                      {assignedTo.division}
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
                                        onChange={filterSG}
                                        required
                                      >
                                        <option value="">Choose...</option>
                                        {salaryGrades.map(sg => {
                                          return (
                                            <option key={sg} value={sg}>
                                              {sg}
                                            </option>
                                          )
                                        })}
                                      </select>
                                    )}
                                    <FormText>
                                      Current Salary Grade is{" "}
                                      {jobDescription.salaryGrade}
                                    </FormText>
                                  </FormGroup>
                                </Col>

                                {/* Step Increment */}
                                <Col md={4}>
                                  <FormGroup>
                                    <Label for="formrow-stepincrement">
                                      Step Increment
                                    </Label>
                                    {loadingSalaryGradeStepIncrement ? (
                                      <Spinner
                                        className="mx-2 radio-select-spinner"
                                        color="secondary"
                                      />
                                    ) : (
                                      <select
                                        id="formrow-stepincrement"
                                        className="form-control"
                                        name="stepIncrement"
                                        onChange={filterSI}
                                        required
                                      >
                                        <option value="">Choose...</option>
                                        {filteredStepIncrements.map(sg => {
                                          let optionVal = {
                                            _id: sg._id,
                                            amount: sg.amount,
                                          }
                                          return (
                                            <option
                                              key={sg._id}
                                              value={JSON.stringify(optionVal)}
                                            >
                                              {sg.stepIncrement}
                                            </option>
                                          )
                                        })}
                                      </select>
                                    )}
                                    <FormText>
                                      Current Step Increment is{" "}
                                      {jobDescription.stepIncrement}
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
                                    />
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
                                      defaultValue={jobDescription.summary}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

                              <Row>
                                <Col
                                  sm={12}
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
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
                                  label={"Item No"}
                                  value={jobDescription.itemNumber || "N/A"}
                                />
                              </Col>

                              <Col sm={4}>
                                <OutlinedBox
                                  label={"Position Title"}
                                  value={jobDescription.positionTitle || "N/A"}
                                />
                              </Col>

                              <Col sm={2}>
                                <OutlinedBox
                                  label={"Salary Grade"}
                                  value={jobDescription.salaryGrade || "N/A"}
                                />
                              </Col>

                              <Col sm={2}>
                                <OutlinedBox
                                  label={"Step Increment"}
                                  value={jobDescription.stepIncrement || "N/A"}
                                />
                              </Col>

                              <Col sm={4} className="mt-4">
                                <OutlinedBox
                                  label={"Office"}
                                  value={assignedTo.office || "N/A"}
                                />
                              </Col>

                              <Col sm={4} className="mt-4">
                                <OutlinedBox
                                  label={"Department"}
                                  value={assignedTo.department || "N/A"}
                                />
                              </Col>

                              <Col sm={4} className="mt-4">
                                <OutlinedBox
                                  label={"Division"}
                                  value={assignedTo.division || "N/A"}
                                />
                              </Col>

                              <Col sm={4} className="mt-4">
                                <OutlinedBox
                                  label={"Reports To"}
                                  value={jobDescription.reportsTo || "N/A"}
                                />
                              </Col>

                              <Col sm={4} className="mt-4">
                                <OutlinedBox
                                  label={"Nature of Appointment"}
                                  value={
                                    capitalizeFirstLetter(
                                      jobDescription.natureOfAppointment
                                    ) || "N/A"
                                  }
                                />
                              </Col>

                              <Col sm={12} className="mt-4">
                                <OutlinedBox
                                  label={
                                    "Decribe briefly the general function of the position (Job Summary)"
                                  }
                                  value={jobDescription.summary || "N/A"}
                                />
                              </Col>

                              <Col sm={12} className="mt-4">
                                <OutlinedBox
                                  label={
                                    "Decribe briefly the general function of Office/Department/Division"
                                  }
                                  value={jobDescription.description || "N/A"}
                                />
                              </Col>
                            </Row>
                          )}
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </>
            )}
          </div>
        </div>
      </Can>

      <Can not I="access" this="Plantilla">
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </React.Fragment>
  )
}

PositionJobDescription.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
}

export default PositionJobDescription
