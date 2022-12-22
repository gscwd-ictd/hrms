import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import {
  Button,
  Col,
  FormGroup,
  Row,
  Alert,
  Form,
  Label,
  Input,
  FormText,
  FormFeedback,
} from "reactstrap"
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"

// actions
import {
  submitEmpAssgn,
  fetchPlantillaPositionsSelect,
  resetEmpAssgnResponse,
  fetchEmployeeList,
} from "store/actions"

// Extra components
import ToastrNotification from "components/Notifications/ToastrNotification"

// import scss
import "styles/custom_gscwd/pages/employeeassignment.scss"

// Formik formik
import * as Yup from "yup"
import { useFormik } from "formik"

const PortalRegistrationModal = props => {
  const { showAdd, handleCloseAdd } = props
  const dispatch = useDispatch()
  const [selectedPosition, setSelectedPosition] = useState(null)

  // form submission to submitEmpAssgn()
  const { empAssignmentRes, isLoading, error } = useSelector(state => ({
    isLoading: state.employee.isLoading,
    error: state.employee.error,
    empAssignmentRes: state.employee.empAssignmentRes,
  }))

  // redux state for list of plantilla positions
  const { positionsOptions, positionsLoading, positionsError } = useSelector(
    state => ({
      positionsOptions: state.plantilla.plantillaPositions,
      positionsLoading: state.plantilla.isLoading,
      positionsError: state.plantilla.error,
    })
  )

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      nameExtension: "",
      positionId: "",
      email: "",
      salaryGrade: 0,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Please Enter First Name"),
      lastName: Yup.string().required("Please Enter Last Name"),
      positionId: Yup.string().required("Please Select A Position"),
      email: Yup.string().required("Please Enter An Email"),
      salaryGrade: Yup.number(),
    }),
    onSubmit: values => {
      dispatch(submitEmpAssgn(values))
      // console.log(values)
    },
  })

  const handleChangeSelect = selectedOption => {
    setSelectedPosition(selectedOption)
    formik.values.salaryGrade = selectedOption.value.salaryGrade
  }

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showAdd) {
      dispatch(resetEmpAssgnResponse())
    }
  }, [showAdd])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(empAssignmentRes)) {
      dispatch(fetchPlantillaPositionsSelect())
      dispatch(resetEmpAssgnResponse())
      dispatch(fetchEmployeeList())

      formik.resetForm()
      setSelectedPosition(null)
    }
  }, [empAssignmentRes])

  return (
    <>
      <Modal show={showAdd} onHide={handleCloseAdd} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Portal Registration</Modal.Title>
        </Modal.Header>

        <Form
          onSubmit={e => {
            e.preventDefault()
            formik.handleSubmit()
            return false
          }}
        >
          <Modal.Body>
            {/* Info Alert with Spinner */}
            {isLoading ? (
              <Alert
                color="info"
                className="alert-dismissible fade show"
                role="alert"
              >
                <i className="mdi mdi-loading mdi-spin me-2"></i> Sending
                Request
              </Alert>
            ) : null}

            {/* Error Alert */}
            {error ? (
              <ToastrNotification toastType={"error"} notifMessage={error} />
            ) : null}

            {positionsError ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={"Error: Failed to retrieve plantilla positions"}
              />
            ) : null}

            {/* Success Alert */}
            {!isEmpty(empAssignmentRes) ? (
              <ToastrNotification
                toastType={"success"}
                notifMessage={"Employee Successfully Assigned"}
              />
            ) : null}

            <div className="outer">
              <div data-repeater-item className="outer">
                <Row>
                  <Col sm={4}>
                    <FormGroup>
                      <Label for="formrow-fName-Input">First Name</Label>
                      <Input
                        name="firstName"
                        type="text"
                        id="formrow-fName-Input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName || ""}
                        invalid={
                          formik.touched.firstName && formik.errors.firstName
                            ? true
                            : false
                        }
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.firstName}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  <Col sm={4}>
                    <FormGroup>
                      <Label for="formrow-lName-Input">Last Name</Label>
                      <Input
                        name="lastName"
                        type="text"
                        id="formrow-lName-Input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName || ""}
                        invalid={
                          formik.touched.lastName && formik.errors.lastName
                            ? true
                            : false
                        }
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.lastName}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  <Col sm={4}>
                    <FormGroup>
                      <Label for="formrow-mName-Input">Middle Name</Label>
                      <Input
                        name="middleName"
                        type="text"
                        id="formrow-mName-Input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.middleName || ""}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col sm={2}>
                    <FormGroup>
                      <Label for="formrow-nameExtension-Input">
                        Name Extension
                      </Label>
                      <Input
                        name="nameExtension"
                        type="text"
                        id="formrow-nameExtension-Input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nameExtension || ""}
                      />
                      <FormText color="muted">(Jr, Sr, II)</FormText>
                    </FormGroup>
                  </Col>

                  <Col sm={5}>
                    <FormGroup>
                      <Label for="position-selection">Position Title</Label>
                      {positionsLoading ? (
                        <i className="mdi mdi-loading mdi-spin ms-2 "></i>
                      ) : null}

                      <Select
                        name="positionId"
                        id="position-selection"
                        onChange={selectedOption => {
                          formik.handleChange("positionId")(
                            selectedOption.value.positionId
                          )
                          handleChangeSelect(selectedOption)
                        }}
                        onBlur={formik.handleBlur}
                        value={selectedPosition || ""}
                        options={positionsOptions}
                        styles={{
                          control: styles => ({
                            ...styles,
                            borderColor:
                              formik.errors.positionId &&
                              formik.touched.positionId
                                ? "red"
                                : styles.borderColor,
                            "&:hover": {
                              borderColor:
                                formik.errors.positionId &&
                                formik.touched.positionId
                                  ? "red"
                                  : styles["&:hover"].borderColor,
                            },
                          }),
                        }}
                        isDisabled={positionsLoading ? true : false}
                      />

                      <FormFeedback
                        style={{
                          display:
                            formik.errors.positionId &&
                            formik.touched.positionId
                              ? "block"
                              : "none",
                        }}
                      >
                        {formik.errors.positionId}
                      </FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col sm={5}>
                    <FormGroup>
                      <Label for="formrow-email-Input">Email</Label>
                      <Input
                        name="email"
                        type="email"
                        id="formrow-email-Input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email || ""}
                        invalid={
                          formik.touched.email && formik.errors.email
                            ? true
                            : false
                        }
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <FormFeedback type="invalid">
                          {formik.errors.email}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  <Input
                    name="salaryGrade"
                    type="hidden"
                    id="formrow-salaryGrade-Input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.salaryGrade || ""}
                  />
                </Row>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" color="info">
              Register
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

PortalRegistrationModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
}

export default PortalRegistrationModal
