import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Card, CardBody, Modal, ModalHeader, ModalBody } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getEvents } from "store/actions"

// Calendar
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import BootstrapTheme from "@fullcalendar/bootstrap"

// style
import "@fullcalendar/bootstrap/main.css"

const CalendarCard = props => {
  const dispatch = useDispatch()

  const [event, setEvent] = useState({})
  const [modal, setModal] = useState(false)

  const { events } = useSelector(state => ({
    events: state.calendar.events,
  }))

  useEffect(() => {
    dispatch(getEvents())
  }, [])

  /**
   * Handling the modal state
   */
  const toggle = () => {
    if (modal) {
      setModal(false)
      setEvent(null)
    } else {
      setModal(true)
    }
  }

  /**
   * Handling click on event on calendar
   */
  const handleEventClick = arg => {
    const event = arg.event
    console.log(event)
    setEvent({
      id: event.id,
      title: event.title,
      noOfApplicants: event._def.extendedProps.noOfApplicants,
      psbMembers: event._def.extendedProps.psbMembers,
      start: event.start,
    })
    toggle()
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, BootstrapTheme]}
            handleWindowResize={true}
            themeSystem="bootstrap"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "",
            }}
            events={events}
            eventClick={handleEventClick}
          />

          {/* View Event */}
          <Modal isOpen={modal}>
            <ModalHeader toggle={toggle} tag="h4">
              {modal ? event.title : ""}
            </ModalHeader>
            <ModalBody>{JSON.stringify(event)}</ModalBody>
          </Modal>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default CalendarCard
