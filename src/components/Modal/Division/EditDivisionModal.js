import React, { useEffect } from "react"
import { Modal } from "react-bootstrap"
import {
  Button,
  Col,
  Row,
  Label,
  Form,
  Input,
  FormGroup,
  FormFeedback,
  Alert,
} from "reactstrap"
import PropTypes from "prop-types"
import { updateDivision, getDivisions, resetDivision } from "store/actions"
import { useDispatch, useSelector } from "react-redux"
import ToastrNotification from "components/Notifications/ToastrNotification"
import { isEmpty } from "lodash"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

const EditDivisionModal = props => {
  const { showEdt, handleCloseEdt, modalData } = props
  const dispatch = useDispatch()

  const { putDivisionRes, isLoading, error } = useSelector(state => ({
    putDivisionRes: state.divisionList.putDivisionRes,
    isLoading: state.divisionList.isLoading,
    error: state.divisionList.error,
  }))

  const { departments } = useSelector(state => ({
    departments: state.departmentList.departments,
  }))

  const defValDepartment = defaultVal => {
    var filteredDeptId

    departments.some(department => {
      if (department.code === defaultVal) {
        filteredDeptId = department._id
        return true
      }
    })
    return filteredDeptId
  }

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: modalData.name || "",
      code: modalData.code || "",
      description: modalData.description || "",
      departmentId: defValDepartment(modalData.departmentCode) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter A Division Name"),
      code: Yup.string().required("Please Enter A Division Code"),
      description: Yup.string().required("Please Enter A Division Description"),
      departmentId: Yup.string().required("Please Select A Parent Department"),
    }),
    onSubmit: values => {
      dispatch(updateDivision(modalData._id, values))
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showEdt) {
      dispatch(resetDivision())
    }
  }, [showEdt])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(putDivisionRes)) {
      dispatch(getDivisions())
      dispatch(resetDivision())
      handleCloseEdt()
      validation.resetForm()
    }
  }, [putDivisionRes])

  return (
    <>
      <Modal show={showEdt} onHide={handleCloseEdt} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        {isLoading ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {error ? (
          <ToastrNotification toastType={"error"} notifMessage={error} />
        ) : null}

        {!isEmpty(putDivisionRes) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Update Successful"}
          />
        ) : null}

        <Form
          onSubmit={e => {
            e.preventDefault()
            validation.handleSubmit()
            return false
          }}
        >
          <Modal.Body>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="name-Input">Name</Label>
                  <Input
                    name="name"
                    type="text"
                    className="form-control"
                    id="name-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
                    invalid={
                      validation.touched.name && validation.errors.name
                        ? true
                        : false
                    }
                  />
                  {validation.touched.name && validation.errors.name ? (
                    <FormFeedback type="invalid">
                      {validation.errors.name}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="code-Input">Code</Label>
                  <Input
                    name="code"
                    type="text"
                    className="form-control"
                    id="code-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.code || ""}
                    invalid={
                      validation.touched.code && validation.errors.code
                        ? true
                        : false
                    }
                  />
                  {validation.touched.code && validation.errors.code ? (
                    <FormFeedback type="invalid">
                      {validation.errors.code}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="desc-Input">Description</Label>
                  <Input
                    name="description"
                    type="textarea"
                    className="form-control"
                    id="desc-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ""}
                    invalid={
                      validation.touched.description &&
                      validation.errors.description
                        ? true
                        : false
                    }
                  />
                  {validation.touched.description &&
                  validation.errors.description ? (
                    <FormFeedback type="invalid">
                      {validation.errors.description}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="department-select">Assigned Department</Label>
                  <Input
                    name="departmentId"
                    type="select"
                    className="form-control"
                    id="department-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.departmentId || ""}
                    invalid={
                      validation.touched.departmentId &&
                      validation.errors.departmentId
                        ? true
                        : false
                    }
                  >
                    <option value="">Choose...</option>
                    {departments.map(department => (
                      <option key={department._id} value={department._id}>
                        {department.code}
                        {" - "}
                        {department.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.departmentId &&
                  validation.errors.departmentId ? (
                    <FormFeedback type="invalid">
                      {validation.errors.departmentId}
                    </FormFeedback>
                  ) : null}
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

EditDivisionModal.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
}

export default EditDivisionModal