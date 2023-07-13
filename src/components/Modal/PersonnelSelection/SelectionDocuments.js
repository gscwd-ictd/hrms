import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { publicationStatus } from 'constants/publicationStatus'

import { Col, Row, Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

const SelectionDocuments = props => {
  const { showSelectionDocuments, handleCloseSelectionDocuments, modalData } =
    props
  return (
    <>
      <Modal
        isOpen={showSelectionDocuments}
        toggle={handleCloseSelectionDocuments}
        size="lg"
        centered
      >
        <ModalHeader toggle={handleCloseSelectionDocuments}>
          Selection Documents
        </ModalHeader>

        <ModalBody>
          <Row className="pb-2">
            <Col>
              <Link
                to={{
                  pathname: `/competency-based-interview-report-pdf/${modalData.vppId}`,
                }}
                target="_blank"
              >
                <Button
                  color="info"
                  className="btn-block"
                  style={{ width: '100%' }}
                >
                  Competency Based-Interview Report
                </Button>
              </Link>
            </Col>
          </Row>

          {modalData.postingStatus === publicationStatus.HIRINGDONE ? (
            <Row>
              <Col>
                <Link
                  to={{
                    pathname: `/summary-ranking-of-applicants-pdf/${modalData.vppId}`,
                  }}
                  target="_blank"
                >
                  <Button
                    color="info"
                    className="btn-block"
                    style={{ width: '100%' }}
                  >
                    Summary Report: Ranking of Applicants
                  </Button>
                </Link>
              </Col>
            </Row>
          ) : null}
        </ModalBody>
      </Modal>
    </>
  )
}

SelectionDocuments.propTypes = {
  showSelectionDocuments: PropTypes.bool,
  handleCloseSelectionDocuments: PropTypes.func,
  modalData: PropTypes.object,
}

export default SelectionDocuments
