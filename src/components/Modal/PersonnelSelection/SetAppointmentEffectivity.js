import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"

import { useDispatch, useSelector } from "react-redux"
import { updateAppointmentEffectivityDate } from "store/actions"

import { Modal } from "react-bootstrap"
import { Col, Row, Input, Alert, Form, Button } from "reactstrap"
import ToastrNotification from "components/Notifications/ToastrNotification"

import { examInterviewVenues } from "constants/selectInputs"

const SetAppointmentEffectivity = props => {
  const {
    showSetAppointmentEffectivity,
    handleCloseSetAppointmentEffectivity,
    modalData,
  } = props
  const dispatch = useDispatch()

  const [effectivityDate, setEffectivityDate] = useState(new Date())

  // redux state for response
  const { response, loading, error } = useSelector(state => ({
    response: state.publications.response.appointmentEffectivity,
    loading: state.publications.loading.loadingPublicationExamInterviewSchedule,
    error: state.publications.error.errorPublicationExamInterviewSchedule,
  }))

  const handleSubmit = event => {
    event.preventDefault()

    const effectivityDateDetails = {
      effectivityDate: effectivityDate,
    }
    dispatch(
      updateAppointmentEffectivityDate(modalData.vppId, effectivityDateDetails)
    )
  }

  return (
    <>
      <Modal
        show={showSetAppointmentEffectivity}
        onHide={handleCloseSetAppointmentEffectivity}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Effectivity Date of Appointment</Modal.Title>
        </Modal.Header>

        {/* Error Notif */}
        {error ? (
          <ToastrNotification toastType={"error"} notifMessage={error} />
        ) : null}

        {/* Loading Notif */}
        {loading ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {/* Success Notif */}
        {!isEmpty(response) ? (
          <ToastrNotification
            toastType={"success"}
            notifMessage={"Examination scheduled"}
          />
        ) : null}

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Col>
                <Input
                  name="date"
                  type="date"
                  className="form-control"
                  id="date-input"
                  onChange={e => setEffectivityDate(e.target.value)}
                  required
                />
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button color="info" type="submit">
              Send
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

SetAppointmentEffectivity.propTypes = {
  showSetAppointmentEffectivity: PropTypes.bool,
  handleCloseSetAppointmentEffectivity: PropTypes.func,
  modalData: PropTypes.object,
}

export default SetAppointmentEffectivity
