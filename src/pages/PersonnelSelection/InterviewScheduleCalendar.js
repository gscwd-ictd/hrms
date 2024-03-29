import React, { useState, useEffect } from 'react'
import { Row, Col, Table, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { isEmpty } from 'lodash'
import { fetchCalendarInterviewSchedules } from 'store/actions'
import { useDispatch, useSelector } from 'react-redux'

// Calendar
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import BootstrapTheme from '@fullcalendar/bootstrap'

// extra components
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// style
import '@fullcalendar/bootstrap/main.css'

const InterviewScheduleCalendar = () => {
  const dispatch = useDispatch()

  const [modalViewEvent, setModalViewEvent] = useState(false)
  const [event, setEvent] = useState({})

  const { interviewSchedules, isLoading, error } = useSelector(state => ({
    interviewSchedules: state.publications.interviewSchedules,
    isLoading: state.publications.loading.interviewSchedulesLoading,
    error: state.publications.error.interviewSchedulesError,
  }))

  /**
   * Handling the modal state
   */
  const toggle = () => {
    if (modalViewEvent) {
      setModalViewEvent(false)
      setEvent({})
      // setEvent(null)
    } else {
      setModalViewEvent(true)
    }
  }

  /**
   * Handling click on event on calendar
   */
  const handleEventClick = arg => {
    const event = arg.event

    setEvent({
      id: event.id,
      positionTitle: event.title,
      noOfApplicants: event._def.extendedProps.numberOfApplicants,
      psbMembers: event._def.extendedProps.psbMembers,
      scheduleType: event._def.extendedProps.scheduleType,
      venue: event._def.extendedProps.venue,
      start: event.start.toLocaleString('en-US', {
        timeZone: 'Asia/Manila',
      }),
    })

    toggle()
  }

  useEffect(() => {
    dispatch(fetchCalendarInterviewSchedules())
  }, [dispatch])

  return (
    <>
      {error ? (
        <ToastrNotification toastType={'error'} notifMessage={error} />
      ) : null}

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, BootstrapTheme]}
          handleWindowResize={true}
          themeSystem="bootstrap"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
          editable={false}
          droppable={false}
          selectable={true}
          events={interviewSchedules}
          eventClick={handleEventClick}
        />
      )}

      {/* View Event */}
      <Modal isOpen={modalViewEvent} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle}>
          {modalViewEvent ? event.positionTitle : ''}
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md={12}>
              {!isEmpty(event) ? (
                <Table>
                  <tbody>
                    <tr>
                      <td>Schedule</td>
                      <td>{event.start}</td>
                    </tr>

                    <tr>
                      <td>No. of Applicants</td>
                      <td>{event.noOfApplicants}</td>
                    </tr>

                    <tr>
                      <td>PSB Members</td>
                      <td>
                        <ul>
                          {!isEmpty(event.psbMembers) ? (
                            event.psbMembers.map((member, i) => {
                              return (
                                <li key={i}>
                                  {member.role} - {member.fullName}
                                </li>
                              )
                            })
                          ) : (
                            <li>No Members Set</li>
                          )}
                        </ul>
                      </td>
                    </tr>

                    <tr>
                      <td>Schedule Type</td>
                      <td>
                        {event.scheduleType.charAt(0).toUpperCase() +
                          event.scheduleType.slice(1)}
                      </td>
                    </tr>

                    <tr>
                      <td>Venue</td>
                      <td>{event.venue}</td>
                    </tr>
                  </tbody>
                </Table>
              ) : null}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  )
}

export default InterviewScheduleCalendar
