import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"

import { useDispatch, useSelector } from "react-redux"
import {
  updatePublicationStatus,
  getPublications,
  resetPublicationResponses,
} from "store/actions"

import { Modal } from "react-bootstrap"
import {
  Button,
  Col,
  Row,
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

const Deadline = props => {
  const { showDeadline, modalData, handleCloseDeadline, prfId } = props
  const dispatch = useDispatch()

  const {
    responsePublicationDeadline,
    loadingPublicationDeadline,
    errorPublicationDeadline,
  } = useSelector(state => ({
    responsePublicationDeadline: state.publications.response.publicationStatus,
    loadingPublicationDeadline:
      state.publications.loading.loadingPublicationStatus,
    errorPublicationDeadline: state.publications.error.errorPublicationStatus,
  }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      postingDeadline: "", // yyyy-mm-dd
      postingStatus: "Open for application",
    },
    validationSchema: Yup.object({
      postingDeadline: Yup.date().required("Please enter a date"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(updatePublicationStatus(modalData.vppId, values))
      resetForm()
    },
  })

  useEffect(() => {
    if (!isEmpty(responsePublicationDeadline)) {
      dispatch(getPublications(prfId))
      handleCloseDeadline()
      dispatch(resetPublicationResponses())
    }
  }, [responsePublicationDeadline])

  return (
    <>
      <Modal
        show={showDeadline}
        onHide={handleCloseDeadline}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Set Deadline</Modal.Title>
        </Modal.Header>

        {loadingPublicationDeadline ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorPublicationDeadline ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorPublicationDeadline}
          />
        ) : null}

        {!isEmpty(responsePublicationDeadline) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Deadline Updated Successfully"}
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
              <Col md={12}>
                <FormGroup>
                  <Input
                    name="postingDeadline"
                    type="date"
                    className="form-control"
                    id="postingDeadline-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.postingDeadline || ""}
                    invalid={
                      validation.touched.postingDeadline &&
                      validation.errors.postingDeadline
                        ? true
                        : false
                    }
                  />
                  {validation.touched.postingDeadline &&
                  validation.errors.postingDeadline ? (
                    <FormFeedback type="invalid">
                      {validation.errors.postingDeadline}
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

Deadline.propTypes = {
  showDeadline: PropTypes.bool,
  handleCloseDeadline: PropTypes.func,
  modalData: PropTypes.object,
  prfId: PropTypes.string,
}

export default Deadline
