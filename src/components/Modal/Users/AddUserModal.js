import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchNonUsers,
  fetchUsers,
  addUser,
  resetUserResponse,
  fetchHrmsModules,
} from "store/actions"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"

import { Modal } from "react-bootstrap"
import {
  Col,
  Row,
  Label,
  Form,
  FormGroup,
  FormFeedback,
  Alert,
  Button,
  Input,
} from "reactstrap"
import ToastrNotification from "components/Notifications/ToastrNotification"
import Select from "react-select"

// Formik formik
import * as Yup from "yup"
import { useFormik } from "formik"

const AddUserModal = props => {
  const { showAdd, handleCloseAdd } = props
  const dispatch = useDispatch()
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  // Redux state list of employees that are not HRMS users
  const { nonUserList, loadingNonUserList, errorNonUserList } = useSelector(
    state => ({
      nonUserList: state.users.nonUserList,
      loadingNonUserList: state.users.loading.loadingNonUserList,
      errorNonUserList: state.users.error.errorNonUserList,
    })
  )

  // Redux state for list of HRMS modules
  const { modulesList, loadingModulesList, errorModulesList } = useSelector(
    state => ({
      modulesList: state.modules.modulesList,
      loadingModulesList: state.modules.loading.loadingModulesList,
      errorModulesList: state.modules.error.errorModulesList,
    })
  )

  // Redux state for response on assigning an employee as HRMS user
  const { postAddUser, loadingResponse, errorResponse } = useSelector(
    state => ({
      postAddUser: state.users.response.postAddUser,
      loadingResponse: state.users.loading.loadingResponse,
      errorResponse: state.users.error.errorResponse,
    })
  )

  // Formik value and validation
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      employeeId: "",

      // userRoles: [
      //   { moduleId: "", hasAccess: false }, //plantilla
      //   { moduleId: "", hasAccess: false },
      // ],

      modules: {
        plantilla: false,
        employeeRegistrationSU: false,
        employees: false,
        organizationStructure: false,
        salaryGrade: false,
        qualificationStandards: false,
        occupations: false,
        dutiesResponsibilities: false,
        committees: false,
        competencyModels: false,
        competencyAssignment: false,
        positionRequest: false,
        personnelSelection: false,
        resultsOfHiring: false,
        settings: false,
      },
    },
    validationSchema: Yup.object({
      employeeId: Yup.string().required("Please select an employee"),
    }),
    onSubmit: values => {
      // dispatch(addUser(values.employeeId, values.userRoles))

      document.getElementById("plantilla-checkbox").checked = false
      document.getElementById("employeeRegistrationSU-checkbox").checked = false
      document.getElementById("employees-checkbox").checked = false
      document.getElementById("organizationStructure-checkbox").checked = false
      document.getElementById("salaryGrade-checkbox").checked = false
      document.getElementById("qualificationStandards-checkbox").checked = false
      document.getElementById("occupations-checkbox").checked = false
      document.getElementById("dutiesResponsibilities-checkbox").checked = false
      document.getElementById("committees-checkbox").checked = false
      document.getElementById("competencyModels-checkbox").checked = false
      document.getElementById("competencyAssignment-checkbox").checked = false
      document.getElementById("positionRequest-checkbox").checked = false
      document.getElementById("personnelSelection-checkbox").checked = false
      document.getElementById("resultsOfHiring-checkbox").checked = false
      document.getElementById("settings-checkbox").checked = false

      console.log(values)
    },
  })

  // selected employee from select-input
  const handleSelectEmployee = selectedOption => {
    setSelectedEmployee(selectedOption)
  }

  // remove spaces
  const removeSpaces = str => {
    return str.replace(/\s/g, "")
  }

  // Initial fetch of data for select fields on employees(SG20 up) and vacant positions(SG24)
  // Initial fetch of data for modules in HRMS
  useEffect(() => {
    if (showAdd) {
      dispatch(fetchNonUsers())
      dispatch(fetchHrmsModules())
    } else {
      dispatch(resetUserResponse())
    }
  }, [showAdd])

  // Reload background table and close modal
  useEffect(() => {
    if (!isEmpty(postAddUser)) {
      formik.resetForm()
      dispatch(fetchUsers())
      dispatch(resetUserResponse())
      handleCloseAdd()
    }
  }, [postAddUser])

  return (
    <>
      <Modal
        show={showAdd}
        onHide={handleCloseAdd}
        size="lg"
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign HRMS User</Modal.Title>
        </Modal.Header>

        {/* Notifications */}
        {loadingResponse ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorResponse ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorResponse}
          />
        ) : null}
        {errorNonUserList ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorNonUserList}
          />
        ) : null}

        {!isEmpty(postAddUser) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Employee assigned successfully as HRMS user"}
          />
        ) : null}

        <Form
          onSubmit={e => {
            e.preventDefault()
            formik.handleSubmit()
            return false
          }}
        >
          <Modal.Body>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="name-Input">Employee</Label>
                  {loadingNonUserList ? (
                    <i className="mdi mdi-loading mdi-spin ms-2 "></i>
                  ) : null}

                  <Select
                    name="employeeId"
                    id="employee-selection"
                    onChange={selectedOption => {
                      formik.handleChange("employeeId")(
                        selectedOption.value.employeeId
                      )
                      handleSelectEmployee(selectedOption)
                    }}
                    onBlur={formik.handleBlur}
                    value={selectedEmployee || ""}
                    options={nonUserList}
                    getOptionLabel={option =>
                      `${option.value.fullName} | ${option.value.positionTitle}`
                    }
                    styles={{
                      control: styles => ({
                        ...styles,
                        borderColor:
                          formik.errors.employeeId && formik.touched.employeeId
                            ? "red"
                            : styles.borderColor,
                        "&:hover": {
                          borderColor:
                            formik.errors.employeeId &&
                            formik.touched.employeeId
                              ? "red"
                              : styles["&:hover"].borderColor,
                        },
                      }),
                    }}
                    isDisabled={loadingNonUserList ? true : false}
                  />

                  <FormFeedback
                    style={{
                      display:
                        formik.errors.employeeId && formik.touched.employeeId
                          ? "block"
                          : "none",
                    }}
                  >
                    {formik.errors.employeeId}
                  </FormFeedback>
                </FormGroup>

                <FormGroup row>
                  <Label for="checkbox2" sm={2}>
                    Modules
                  </Label>
                  <Col>
                    {loadingModulesList ? (
                      <i className="mdi mdi-loading mdi-spin "></i>
                    ) : (
                      modulesList.map(module => {
                        return (
                          <FormGroup check key={module._id}>
                            <Input
                              name="modules.plantilla"
                              id={removeSpaces(module.module) + "-checkbox"}
                              type="checkbox"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.modules.plantilla}
                            />
                            <Label
                              for={removeSpaces(module.module) + "-checkbox"}
                              check
                            >
                              {module.module}
                            </Label>
                          </FormGroup>
                        )
                      })
                    )}
                  </Col>

                  {/* 
                  <Col>
                    <FormGroup check>
                      <Input
                        name="modules.plantilla"
                        id="plantilla-checkbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.modules.plantilla}
                      />
                      <Label check>Plantilla</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Input
                        name="modules.employeeRegistrationSU"
                        id="employeeRegistrationSU-checkbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.modules.employeeRegistrationSU}
                      />
                      <Label check>Employee Registration(SU)</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Input
                        name="modules.employees"
                        id="employees-checkbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.modules.employees}
                      />
                      <Label check>Employees</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Input
                        name="modules.organizationStructure"
                        id="organizationStructure-checkbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.modules.organizationStructure}
                      />
                      <Label check>Organization Structure</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Input
                        name="modules.salaryGrade"
                        id="salaryGrade-checkbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.modules.salaryGrade}
                      />
                      <Label check>Salary Grade</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Input
                        name="modules.qualificationStandards"
                        id="qualificationStandards-checkbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.modules.qualificationStandards}
                      />
                      <Label check>Qualification Standards</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Input
                        name="modules.occupations"
                        id="occupations-checkbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.modules.occupations}
                      />
                      <Label check>Occupations</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Input
                        name="modules.dutiesResponsibilities"
                        id="dutiesResponsibilities-checkbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.modules.dutiesResponsibilities}
                      />
                      <Label check>Duties & Responsibilities</Label>
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup check>
                      <Input
                        name="modules.committees"
                        id="committees-checkbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.modules.committees}
                      />
                      <Label check>Committees</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Input
                        name="modules.competencyModels"
                        id="competencyModels-checkbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.modules.competencyModels}
                      />
                      <Label check>Competency Models</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Input
                        name="modules.competencyAssignment"
                        id="competencyAssignment-checkbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.modules.competencyAssignment}
                      />
                      <Label check>Competency Assignment</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Input
                        name="modules.positionRequest"
                        id="positionRequest-checkbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.modules.positionRequest}
                      />
                      <Label check>Position Request</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Input
                        name="modules.personnelSelection"
                        id="personnelSelection-checkbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.modules.personnelSelection}
                      />
                      <Label check>Personnel Selection</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Input
                        name="modules.resultsOfHiring"
                        id="resultsOfHiring-checkbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.modules.resultsOfHiring}
                      />
                      <Label check>Results of Hiring</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Input
                        name="modules.settings"
                        id="settings-checkbox"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.modules.settings}
                      />
                      <Label check>HRMS Settings</Label>
                    </FormGroup>
                  </Col> */}
                </FormGroup>

                {/* <FormGroup>
                  <Label for="name-Input">Plantilla</Label>
                  <Input
                    name="name"
                    type="text"
                    className="form-control"
                    id="name-Input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name || ""}
                    invalid={
                      formik.touched.name && formik.errors.name ? true : false
                    }
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <FormFeedback type="invalid">
                      {formik.errors.name}
                    </FormFeedback>
                  ) : null}
                </FormGroup> */}
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" color="info">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

AddUserModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
  history: PropTypes.object,
}

export default AddUserModal
