import React, { useEffect } from "react"
import { updateOffice, getOffices, resetOffice } from "store/actions"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
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
  FormFeedback,
  Alert,
} from "reactstrap"
import ToastrNotification from "components/Notifications/ToastrNotification"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

const EditOfficeModal = props => {
  const { showEdt, handleCloseEdt, modalData } = props
  const dispatch = useDispatch()

  const { putOfficeRes, isLoading, error } = useSelector(state => ({
    putOfficeRes: state.officeList.putOfficeRes,
    isLoading: state.officeList.isLoading,
    error: state.officeList.error,
  }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: modalData.name || "",
      code: modalData.code || "",
      description: modalData.description || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter A Office Name"),
      code: Yup.string().required("Please Enter A Office Code"),
      description: Yup.string().required("Please Enter A Office Description"),
    }),
    onSubmit: values => {
      dispatch(updateOffice(modalData._id, values))
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showEdt) {
      dispatch(resetOffice())
    }
  }, [showEdt])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(putOfficeRes)) {
      handleCloseEdt()
      dispatch(getOffices())
      dispatch(resetOffice())
      validation.resetForm()
    }
  }, [putOfficeRes])

  return (
    <>
      <Modal show={showEdt} onHide={handleCloseEdt} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>

        {/* Notifications */}
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

        {!isEmpty(putOfficeRes) ? (
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
              <Col lg={12}>
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
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" color="info">
              Update
            </Button>
            <Button color="danger" onClick={handleCloseEdt}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

EditOfficeModal.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
}

export default EditOfficeModal
