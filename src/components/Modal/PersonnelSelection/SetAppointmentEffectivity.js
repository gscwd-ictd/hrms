import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import {
  updateAppointmentEffectivityDate,
  getApprovedPublicationPositions,
  resetPublicationResponses,
} from 'store/actions'

import {
  Col,
  Row,
  Input,
  Alert,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const SetAppointmentEffectivity = props => {
  const {
    showSetAppointmentEffectivity,
    handleCloseSetAppointmentEffectivity,
    modalData,
    yearFilter,
  } = props
  const dispatch = useDispatch()

  const [effectivityDate, setEffectivityDate] = useState(new Date())

  // redux state for response
  const { response, loading, error } = useSelector(state => ({
    response: state.publications.response.appointmentEffectivity,
    loading: state.publications.loading.loadingAppointmentEffectivity,
    error: state.publications.error.errorAppointmentEffectivity,
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

  // refresh list of publications
  useEffect(() => {
    if (!isEmpty(response)) {
      dispatch(getApprovedPublicationPositions(yearFilter))
      handleCloseSetAppointmentEffectivity()
      dispatch(resetPublicationResponses())
    }
  }, [response])

  return (
    <>
      <Modal
        isOpen={showSetAppointmentEffectivity}
        toggle={handleCloseSetAppointmentEffectivity}
        size="md"
        centered
      >
        <ModalHeader toggle={handleCloseSetAppointmentEffectivity}>
          Effectivity Date of Appointment
        </ModalHeader>

        {/* Error Notif */}
        {error ? (
          <ToastrNotification toastType={'error'} notifMessage={error} />
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
            toastType={'success'}
            notifMessage={
              'Effectivity date of appointment has been sucesfully set'
            }
          />
        ) : null}

        <ModalBody>
          <Form id="appointmentEffectivityForm" onSubmit={handleSubmit}>
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
            </Row>{' '}
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button color="info" form="appointmentEffectivityForm" type="submit">
            Send
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

SetAppointmentEffectivity.propTypes = {
  showSetAppointmentEffectivity: PropTypes.bool,
  handleCloseSetAppointmentEffectivity: PropTypes.func,
  modalData: PropTypes.object,
  yearFilter: PropTypes.string,
}

export default SetAppointmentEffectivity
