import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import {
  addExamInterviewSchedule,
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

import { examInterviewVenues } from 'constants/selectInputs'

const ScheduleExam = props => {
  const { showScheduleExam, handleCloseScheduleExam, modalData, yearFilter } =
    props
  const dispatch = useDispatch()

  const [scheduleDate, setScheduleDate] = useState(new Date())
  const [scheduleTime, setScheduleTime] = useState(new Date())
  const [venue, setVenue] = useState('')

  // redux state for response
  const { response, loading, error } = useSelector(state => ({
    response: state.publications.response.publicationExamInterviewSchedule.post,
    loading: state.publications.loading.loadingPublicationExamInterviewSchedule,
    error: state.publications.error.errorPublicationExamInterviewSchedule,
  }))

  const handleSubmit = event => {
    event.preventDefault()

    const scheduleDetails = {
      schedule: scheduleDate + ' ' + scheduleTime,
      venue: venue,
      scheduleType: 'examination',
    }
    dispatch(addExamInterviewSchedule(modalData.vppId, scheduleDetails))
  }

  // refresh list of publications
  useEffect(() => {
    if (!isEmpty(response)) {
      dispatch(getApprovedPublicationPositions(yearFilter))
      handleCloseScheduleExam()
      dispatch(resetPublicationResponses())
    }
  }, [response])

  return (
    <>
      <Modal
        isOpen={showScheduleExam}
        toggle={handleCloseScheduleExam}
        size="lg"
        centered
      >
        <ModalHeader toggle={handleCloseScheduleExam}>
          Schedule Examination
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
            notifMessage={'Examination scheduled'}
          />
        ) : null}

        <ModalBody>
          <Form id="scheduleExamForm" onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <Input
                  name="date"
                  type="date"
                  className="form-control"
                  id="date-input"
                  onChange={e => setScheduleDate(e.target.value)}
                  required
                />
              </Col>
              <Col>
                <Input
                  name="time"
                  type="time"
                  className="form-control"
                  id="time-input"
                  onChange={e => setScheduleTime(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Input
                  name="venue"
                  type="select"
                  className="form-control"
                  id="venue-select"
                  onChange={e => setVenue(e.target.value)}
                  required
                >
                  <option value="">Choose...</option>
                  {examInterviewVenues.map((venue, index) => (
                    <option key={index} value={venue}>
                      {venue}
                    </option>
                  ))}
                </Input>
              </Col>
            </Row>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button color="info" form="scheduleExamForm" type="submit">
            Send
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

ScheduleExam.propTypes = {
  showScheduleExam: PropTypes.bool,
  handleCloseScheduleExam: PropTypes.func,
  modalData: PropTypes.object,
  yearFilter: PropTypes.string,
}

export default ScheduleExam
