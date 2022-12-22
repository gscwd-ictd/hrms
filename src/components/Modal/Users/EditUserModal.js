import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchUserRoles,
  updateUserRoles,
  fetchUsers,
  resetUserResponse,
} from "store/actions"
import { isEmpty } from "lodash"

import { Modal } from "react-bootstrap"
import {
  Button,
  Col,
  Row,
  Label,
  Form,
  Input,
  FormGroup,
  Alert,
} from "reactstrap"
import ToastrNotification from "components/Notifications/ToastrNotification"

// Formik formik
import * as Yup from "yup"
import { useFormik } from "formik"

const EditUserModal = props => {
  const { showEdt, handleCloseEdt, modalData } = props
  const dispatch = useDispatch()

  // Redux state for user's roles and response on updating
  const {
    userRoles,
    loadingResponse,
    patchUpdateUserRoles,
    loadingResponseUpdate,
    errorResponse,
  } = useSelector(state => ({
    userRoles: state.users.response.getFetchUserRoles,
    loadingResponse: state.users.loading.loadingResponse,
    patchUpdateUserRoles: state.users.response.patchUpdateUserRoles,
    loadingResponseUpdate: state.users.response.loadingResponseUpdate,
    errorResponse: state.users.error.errorResponse,
  }))

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      modules: {
        // plantilla: userRoles.modules.plantilla || false,
        // employeeRegistrationSU:
        //   userRoles.modules.employeeRegistrationSU || false,
        // employees: userRoles.modules.employees || false,
        // organizationStructure: userRoles.modules.organizationStructure || false,
        // salaryGrade: userRoles.modules.salaryGrade || false,
        // qualificationStandards:
        //   userRoles.modules.qualificationStandards || false,
        // occupations: userRoles.modules.occupations || false,
        // dutiesResponsibilities:
        //   userRoles.modules.dutiesResponsibilities || false,
        // committees: userRoles.modules.committees || false,
        // competencyModels: userRoles.modules.competencyModels || false,
        // competencyAssignment: userRoles.modules.competencyAssignment || false,
        // positionRequest: userRoles.modules.positionRequest || false,
        // personnelSelection: userRoles.modules.personnelSelection || false,
        // resultsOfHiring: userRoles.modules.resultsOfHiring || false,
        // settings: userRoles.modules.settings || false,

        plantilla: userRoles.plantilla || false,
        employeeRegistrationSU: userRoles.employeeRegistrationSU || false,
        employees: userRoles.employees || false,
        organizationStructure: userRoles.organizationStructure || false,
        salaryGrade: userRoles.salaryGrade || false,
        qualificationStandards: userRoles.qualificationStandards || false,
        occupations: userRoles.occupations || false,
        dutiesResponsibilities: userRoles.dutiesResponsibilities || false,
        committees: userRoles.committees || false,
        competencyModels: userRoles.competencyModels || false,
        competencyAssignment: userRoles.competencyAssignment || false,
        positionRequest: userRoles.positionRequest || false,
        personnelSelection: userRoles.personnelSelection || false,
        resultsOfHiring: userRoles.resultsOfHiring || false,
        settings: userRoles.settings || false,
      },
    },
    validationSchema: Yup.object({}),
    onSubmit: values => {
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
      // dispatch(updateUserRoles(modalData.employeeId, values))
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (showEdt) {
      dispatch(fetchUserRoles(modalData.employeeId))
    } else {
      dispatch(resetUserResponse())
    }
  }, [showEdt])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(patchUpdateUserRoles)) {
      dispatch(fetchUsers())
      dispatch(resetUserResponse())
      handleCloseEdt()
      formik.resetForm()
    }
  }, [patchUpdateUserRoles])

  return (
    <>
      <Modal show={showEdt} onHide={handleCloseEdt} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Modules</Modal.Title>
        </Modal.Header>

        {/* Notifications */}
        {loadingResponseUpdate ? (
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

        {!isEmpty(patchUpdateUserRoles) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Update Successful"}
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
                <FormGroup row>
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
                  </Col>
                </FormGroup>
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

EditUserModal.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
}

export default EditUserModal
