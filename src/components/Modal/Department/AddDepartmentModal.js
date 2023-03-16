import React, { useEffect } from "react"
import { Modal } from "react-bootstrap"
import {
  Col,
  Row,
  Label,
  Form,
  Input,
  FormGroup,
  FormFeedback,
  Alert,
  Button,
} from "reactstrap"
import PropTypes from "prop-types"
import { postDepartment, getDepartments, resetDepartment } from "store/actions"
import { useDispatch, useSelector } from "react-redux"
import ToastrNotification from "components/Notifications/ToastrNotification"
import { isEmpty } from "lodash"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

const AddDepartmentModal = props => {
  const { showAdd, handleCloseAdd } = props
  const dispatch = useDispatch()

  const { postDepartmentRes, isLoading, error } = useSelector(state => ({
    postDepartmentRes: state.departmentList.postDepartmentRes,
    isLoading: state.departmentList.isLoading,
    error: state.departmentList.error,
  }))

  const { offices } = useSelector(state => ({
    offices: state.officeList.offices,
  }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      code: "",
      description: "",
      officeId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter a department name"),
      code: Yup.string().required("Please enter a department code"),
      description: Yup.string().required(
        "Please enter a department description"
      ),
      officeId: Yup.string().required("Please select a parent office"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(postDepartment(values))
      resetForm()
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showAdd) {
      dispatch(resetDepartment())
    }
  }, [showAdd])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(postDepartmentRes)) {
      dispatch(getDepartments())
      dispatch(resetDepartment())
      handleCloseAdd()
    }
  }, [postDepartmentRes])

  return (
    <>
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Department Details</Modal.Title>
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

        {!isEmpty(postDepartmentRes) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"New Department Created"}
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
                    rows="5"
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
                  <Label for="office-select">Assigned Office</Label>
                  <Input
                    name="officeId"
                    type="select"
                    className="form-control"
                    id="office-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.officeId || ""}
                    invalid={
                      validation.touched.officeId && validation.errors.officeId
                        ? true
                        : false
                    }
                  >
                    <option value="">Choose...</option>
                    {offices.map(office => (
                      <option key={office._id} value={office._id}>
                        {office.code}
                        {" - "}
                        {office.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.officeId && validation.errors.officeId ? (
                    <FormFeedback type="invalid">
                      {validation.errors.officeId}
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

AddDepartmentModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
}

export default AddDepartmentModal
