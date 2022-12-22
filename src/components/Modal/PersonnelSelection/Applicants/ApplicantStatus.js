import React, { useEffect } from "react"
import PropTypes from "prop-types"
import {
  fetchApplicants,
  updateApplicantApplicationStatus,
  resetApplicantsResponses,
} from "store/actions"
import { useDispatch, useSelector } from "react-redux"
import { applicantStatuses } from "constants/selectInputs"

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
import { constant, isEmpty } from "lodash"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

const ApplicantStatus = props => {
  const { showEdt, handleCloseEdt, modalData, publicationId } = props
  const dispatch = useDispatch()

  const {
    patchApplicantApplicationStatus,
    loadingResponseApplicantApplicationStatus,
    errorApplicantApplicationStatus,
  } = useSelector(state => ({
    patchApplicantApplicationStatus:
      state.applicants.response.patchApplicantApplicationStatus,
    loadingResponseApplicantApplicationStatus:
      state.applicants.loading.loadingResponseApplicantApplicationStatus,
    errorApplicantApplicationStatus:
      state.applicants.error.errorApplicantApplicationStatus,
  }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      applicantStatus: modalData.applicantStatus || "",
    },
    validationSchema: Yup.object({
      applicantStatus: Yup.string().required(
        "Please select a applicant status"
      ),
    }),
    onSubmit: values => {
      dispatch(updateApplicantApplicationStatus(modalData._id, values)) // positingApplicantId, applicantStatus
    },
  })

  useEffect(() => {
    if (!isEmpty(patchApplicantApplicationStatus)) {
      handleCloseEdt()
      dispatch(fetchApplicants(publicationId))
      dispatch(resetApplicantsResponses())
    }
  }, [patchApplicantApplicationStatus])

  return (
    <>
      <Modal show={showEdt} onHide={handleCloseEdt} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Status</Modal.Title>
        </Modal.Header>

        {loadingResponseApplicantApplicationStatus ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorApplicantApplicationStatus ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorApplicantApplicationStatus}
          />
        ) : null}

        {!isEmpty(patchApplicantApplicationStatus) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Application Status Updated"}
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
                    name="applicantStatus"
                    type="select"
                    className="form-control"
                    id="applicantStatus-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.applicantStatus || ""}
                    invalid={
                      validation.touched.applicantStatus &&
                      validation.errors.applicantStatus
                        ? true
                        : false
                    }
                  >
                    <option value="">Choose...</option>
                    {applicantStatuses.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.applicantStatus &&
                  validation.errors.applicantStatus ? (
                    <FormFeedback type="invalid">
                      {validation.errors.applicantStatus}
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

ApplicantStatus.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
  publicationId: PropTypes.string,
}

export default ApplicantStatus
