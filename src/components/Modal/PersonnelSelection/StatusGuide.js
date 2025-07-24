import React from 'react'
import { Modal, ModalHeader, ModalBody, Badge } from 'reactstrap'
import PropTypes from 'prop-types'
import SimpleBar from 'simplebar-react'
import classnames from 'classnames'
import {
  publicationStatus,
  publicationStatusGuide,
} from 'constants/publicationStatus'

const StatusGuide = props => {
  const { showStatusGuide, toggleStatusGuideModal } = props

  return (
    <>
      <Modal
        isOpen={showStatusGuide}
        toggle={toggleStatusGuideModal}
        size="lg"
        centered
      >
        <ModalHeader toggle={toggleStatusGuideModal}>Status Guide</ModalHeader>

        <ModalBody>
          <SimpleBar className="mt-2">
            <ul className="verti-timeline list-unstyled">
              {publicationStatusGuide.map((status, index) => {
                return (
                  <li className="event-list" key={index}>
                    <div className="event-timeline-dot">
                      <i className="bx bxs-right-arrow-circle font-size-18 bx-fade-right"></i>
                    </div>
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div
                          className={classnames('me-2 font-size-12 badge', {
                            'bg-primary':
                              status.status === publicationStatus.DOESET,
                            'bg-warning':
                              status.status ===
                              publicationStatus.FORCSCAPPROVAL,
                            'bg-info':
                              status.status === publicationStatus.OPENFORAPP ||
                              status.status === publicationStatus.CLOSEDFORAPP,
                            'bg-success':
                              status.status ===
                                publicationStatus.REQENTITYSELECTDONE ||
                              status.status === publicationStatus.EXAMDONE ||
                              status.status ===
                                publicationStatus.INTERVIEWDONE ||
                              status.status ===
                                publicationStatus.APPAUTHSELECTIONDONE ||
                              status.status === publicationStatus.HIRINGDONE,
                            'bg-secondary':
                              status.status ===
                                publicationStatus.REQENTITYSELECT ||
                              status.status ===
                                publicationStatus.SCHEDFOREXAM ||
                              status.status ===
                                publicationStatus.SCHEDFORINTERVIEW ||
                              status.status ===
                                publicationStatus.APPAUTHSELECTION,
                          })}
                        >
                          {status.status}
                        </div>

                        <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i>
                      </div>
                      <div className="flex-grow-1">
                        <div>
                          <p style={{ whiteSpace: 'pre-line' }}>
                            {status.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </SimpleBar>
        </ModalBody>
      </Modal>
    </>
  )
}

StatusGuide.propTypes = {
  showStatusGuide: PropTypes.bool,
  toggleStatusGuideModal: PropTypes.func,
}

export default StatusGuide
