import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import {
  Alert,
  Col,
  Row,
  Label,
  Form,
  Input,
  FormGroup,
  Spinner,
} from "reactstrap"
import {
  getOffices,
  resetOffice,
  getDepartments,
  resetDepartment,
  getDivisions,
  resetDivision,
  fetchSGListStepIncreOne,
  resetSalaryGradeResponses,
  submitPosition,
} from "store/actions"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"

// extra components
import ToastrNotification from "components/Notifications/ToastrNotification"

// styles
import "toastr/build/toastr.min.css"
import "styles/custom_gscwd/components/loadingindicator.scss"

const AddPositionModal = props => {
  const { showAdd, handleCloseAdd } = props

  const dispatch = useDispatch()
  const [directAssignment, setDirectAssignment] = useState("")
  const [salaryGradeInputValue, setSalaryGradeInputValue] = useState({})
  // const [ filteredSGByStep, setFilteredSGByStep ] = useState([])

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
  const { salaryGradeList, loadingSGList, errorSGList } = useSelector(
    state => ({
      salaryGradeList: state.salaryGrade.response.salaryGradeStepIncrementOne,
      loadingSGList:
        state.salaryGrade.loading.loadingSalaryGradeStepIncrementOne,
      errorSGList: state.salaryGrade.error.errorSalaryGradeStepIncrementOne,
    })
  )

  // Redux state for post status (submission of new plantilla position)
  const {
    positionDataResponse,
    errorPositionDataResponse,
    loadingPositionDataResponse,
  } = useSelector(state => ({
    positionDataResponse: state.plantilla.positionData,
    errorPositionDataResponse: state.plantilla.error,
    loadingPositionDataResponse: state.plantilla.isLoading,
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

  const addPlantillaPosition = event => {
    event.preventDefault()

    const formData = {
      orgId: event.target.directAssignment.value,
      positionData: {
        itemNumber: event.target.itemNumber.value,
        positionTitle: event.target.positionTitle.value,
        salaryGrade: salaryGradeInputValue._id,
        summary: event.target.positionSummary.value,
      },
    }

    dispatch(submitPosition(formData))
  }

  // for filtering the salary grade list and update authorized salary field
  const filterSG = event => {
    const value = event.target.value
    const parsedValue = JSON.parse(value)

    setSalaryGradeInputValue(parsedValue)
  }

  // Initial dispatch of values needed for adding a new position
  useEffect(() => {
    if (showAdd) {
      dispatch(getOffices())
      dispatch(getDepartments())
      dispatch(getDivisions())
      dispatch(fetchSGListStepIncreOne())
    } else {
      dispatch(resetOffice())
      dispatch(resetDepartment())
      dispatch(resetDivision())
      dispatch(resetSalaryGradeResponses())
    }
  }, [showAdd])

  useEffect(() => {
    if (!isEmpty(salaryGradeInputValue)) {
      document.getElementById("authsalary-input").value =
        salaryGradeInputValue.amount
    }
  }, [salaryGradeInputValue])

  return (
    <>
      {/* Error Notif */}
      {errorSGList ? ( // error in pulling salary grade list
        <ToastrNotification toastType={"error"} notifMessage={errorSGList} />
      ) : null}

      {errorOfc ? ( // error in pulling offices
        <ToastrNotification toastType={"error"} notifMessage={errorOfc} />
      ) : null}
      {errorDept ? ( // error in pulling departments
        <ToastrNotification toastType={"error"} notifMessage={errorDept} />
      ) : null}
      {errorDiv ? ( // error in pulling divisions
        <ToastrNotification toastType={"error"} notifMessage={errorDiv} />
      ) : null}

      {errorPositionDataResponse ? ( // error adding new positions
        <ToastrNotification toastType={"error"} notifMessage={errorDiv} />
      ) : null}

      {/* Success Notif */}
      {!isEmpty(positionDataResponse) ? ( // error in pulling divisions
        <ToastrNotification
          toastType={"success"}
          notifMessage={"Position successfully created"}
        />
      ) : null}

      <Modal show={showAdd} onHide={handleCloseAdd} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Position Details</Modal.Title>
        </Modal.Header>

        {loadingPositionDataResponse ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}
        <Form onSubmit={addPlantillaPosition}>
          <Modal.Body>
            <Row>
              <Col lg={12}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="itemno-Input">Item No</Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="itemNumber"
                        id="itemno-Input"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="postitle-Input">Position Title</Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="positionTitle"
                        id="postitle-Input"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
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

                  <Col md={6}>
                    <FormGroup>
                      <Label for="formrow-assignedto">Assigned to</Label>
                      {isLoadingOfc && isLoadingDept && isLoadingDiv ? (
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
                                <option key={office._id} value={office._id}>
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
                                <option key={division._id} value={division._id}>
                                  {division.code}
                                  {" - "}
                                  {division.name}
                                </option>
                              ))
                            : null}
                        </select>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="formrow-salarygrade">Salary Grade</Label>
                      {loadingSGList ? (
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
                          {salaryGradeList.map(sg => {
                            let optionVal = { _id: sg._id, amount: sg.amount }
                            return (
                              <option
                                key={sg._id}
                                value={JSON.stringify(optionVal)}
                              >
                                {sg.salaryGrade}
                              </option>
                            )
                          })}
                        </select>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label for="authsalary-input">Authorized Salary</Label>
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
                </Row>

                <Row>
                  <FormGroup>
                    <Label for="description-input">
                      Brief decription of general function of the position
                    </Label>
                    <Input
                      type="textarea"
                      className="form-control"
                      name="positionSummary"
                      id="position-description-input"
                      required
                    />
                  </FormGroup>
                </Row>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <button type="submit" className="btn btn-primary w-md">
              Submit
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

AddPositionModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
}

export default AddPositionModal
