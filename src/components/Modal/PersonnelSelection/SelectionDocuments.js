import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import { Modal } from "react-bootstrap"
import { Col, Row, Button } from "reactstrap"

const SelectionDocuments = props => {
  const { showSelectionDocuments, handleCloseSelectionDocuments, modalData } =
    props

  return (
    <>
      <Modal
        show={showSelectionDocuments}
        onHide={handleCloseSelectionDocuments}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Selection Documents</Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
                  style={{ width: "100%" }}
                >
                  Competency Based-Interview Report
                </Button>
              </Link>
            </Col>
          </Row>

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
                  style={{ width: "100%" }}
                >
                  Summary Report: Ranking of Applicants
                </Button>
              </Link>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
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
