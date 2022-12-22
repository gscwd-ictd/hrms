import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { postDivision, getDivisions, resetDivision } from "store/actions"
import { isEmpty } from "lodash"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

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
import ToastrNotification from "components/Notifications/ToastrNotification"

const AddDivisionModal = props => {
  const { showAdd, handleCloseAdd } = props
  const dispatch = useDispatch()

  const { postDivisionRes, isLoading, error } = useSelector(state => ({
    postDivisionRes: state.divisionList.postDivisionRes,
    isLoading: state.divisionList.isLoading,
    error: state.divisionList.error,
  }))

  const { departments } = useSelector(state => ({
    departments: state.departmentList.departments,
  }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      code: "",
      description: "",
      departmentId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter A Division Name"),
      code: Yup.string().required("Please Enter A Division Code"),
      description: Yup.string().required("Please Enter A Division Description"),
      departmentId: Yup.string().required("Please Select A Parent Department"),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values)
      dispatch(postDivision(values))
      resetForm()
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showAdd) {
      dispatch(resetDivision())
    }
  }, [showAdd])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(postDivisionRes)) {
      dispatch(getDivisions())
      dispatch(resetDivision())
      handleCloseAdd()
    }
  }, [postDivisionRes])

  return (
    <>
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Division Details</Modal.Title>
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

        {!isEmpty(postDivisionRes) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"New Division Created"}
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

AddDivisionModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
}

export default AddDivisionModal
