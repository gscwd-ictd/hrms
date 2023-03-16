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
import { postOffice, getOffices, resetOffice } from "store/actions"
import { useDispatch, useSelector } from "react-redux"
import ToastrNotification from "components/Notifications/ToastrNotification"
import { isEmpty } from "lodash"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

const AddOfficeModal = props => {
  const { showAdd, handleCloseAdd } = props
  const dispatch = useDispatch()

  const { postOfficeRes, isLoading, error } = useSelector(state => ({
    postOfficeRes: state.officeList.postOfficeRes,
    isLoading: state.officeList.isLoading,
    error: state.officeList.error,
  }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      code: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter an office name"),
      code: Yup.string().required("Please enter an office code"),
      description: Yup.string().required("Please enter an office description"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(postOffice(values))
      resetForm()
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showAdd) {
      dispatch(resetOffice())
    }
  }, [showAdd])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(postOfficeRes)) {
      dispatch(getOffices())
      dispatch(resetOffice())
      handleCloseAdd()
    }
  }, [postOfficeRes])

  return (
    <>
      <Modal show={showAdd} onHide={handleCloseAdd} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Office Details</Modal.Title>
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

        {!isEmpty(postOfficeRes) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"New Office Created"}
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
              <Col lg={12}>
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
                </Row>
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

AddOfficeModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
  history: PropTypes.object,
}

export default AddOfficeModal
