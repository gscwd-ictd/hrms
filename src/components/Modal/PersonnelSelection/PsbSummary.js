import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import { fetchPsbSummary } from 'store/actions'

import {
  Button,
  Col,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import CloseInterviewModal from 'components/Modal/Confirmation/CloseInterviewModal'

const PsbSummary = props => {
  const { showPsbSummary, modalData, handleClosePsbSummary, prfId } = props
  const dispatch = useDispatch()

  // redux state for HRMPSB Summary
  const { psbSummary, loadingPsbSummary, errorPsbSummary } = useSelector(
    state => ({
      psbSummary: state.personnelSelectionBoard.response.psbSummary,
      loadingPsbSummary:
        state.personnelSelectionBoard.loading.loadingPsbSummary,
      errorPsbSummary: state.personnelSelectionBoard.error.errorPsbSummary,
    })
  )

  // Modal for Confirmation before proceeding
  const [showCloseInterview, setShowCloseInterview] = useState(false)

  const handleCloseCloseInterview = () => setShowCloseInterview(false)
  const handleShowCloseInterview = () => setShowCloseInterview(true)

  useEffect(() => {
    if (showPsbSummary) {
      dispatch(fetchPsbSummary(modalData.vppId))
    }
  }, [showPsbSummary])

  return (
    <>
      <Modal
        isOpen={showPsbSummary}
        toggle={handleClosePsbSummary}
        fullscreen={true}
      >
        <ModalHeader toggle={handleClosePsbSummary}>HRMPSB Rating</ModalHeader>

        {errorPsbSummary ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorPsbSummary}
          />
        ) : null}

        <ModalBody>
          <Row>
            <Col>
              {loadingPsbSummary ? (
                <LoadingIndicator />
              ) : !isEmpty(psbSummary.ranking) &&
                psbSummary.salaryGrade <= 23 ? ( // 6 columns for 6 PSB members
                <div className="table-responsive">
                  <Table className="table mb-0 tbl-key-actions">
                    <thead className="thead-light">
                      <tr>
                        <th>Rank</th>
                        <th>Name of Applicant</th>
                        <th>PSB 1</th>
                        <th>PSB 2</th>
                        <th>PSB 3</th>
                        <th>PSB 4</th>
                        <th>PSB 5</th>
                        <th>PSB 6</th>
                        <th>Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      {psbSummary.ranking.map((applicant, index) => {
                        return (
                          <tr key={applicant.postingApplicantId}>
                            <td>{index + 1}</td>
                            <td>{applicant.applicantName}</td>
                            <td>{applicant.psb_1}</td>
                            <td>{applicant.psb_2}</td>
                            <td>{applicant.psb_3}</td>
                            <td>{applicant.psb_4}</td>
                            <td>{applicant.psb_5}</td>
                            <td>{applicant.psb_6}</td>
                            <td>{applicant.average}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
              ) : !isEmpty(psbSummary.ranking) &&
                psbSummary.salaryGrade == 24 ? ( // 8 columns for 8 PSB members
                <div className="table-responsive">
                  <Table className="table mb-0 tbl-key-actions">
                    <thead className="thead-light">
                      <tr>
                        <th>Rank</th>
                        <th>Name of Applicant</th>
                        <th>PSB 1</th>
                        <th>PSB 2</th>
                        <th>PSB 3</th>
                        <th>PSB 4</th>
                        <th>PSB 5</th>
                        <th>PSB 6</th>
                        <th>PSB 7</th>
                        <th>PSB 8</th>
                        <th>Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      {psbSummary.ranking.map((applicant, index) => {
                        return (
                          <tr key={applicant.postingApplicantId}>
                            <td>{index + 1}</td>
                            <td>{applicant.applicantName}</td>
                            <td>{applicant.psb_1}</td>
                            <td>{applicant.psb_2}</td>
                            <td>{applicant.psb_3}</td>
                            <td>{applicant.psb_4}</td>
                            <td>{applicant.psb_5}</td>
                            <td>{applicant.psb_6}</td>
                            <td>{applicant.psb_7}</td>
                            <td>{applicant.psb_8}</td>
                            <td>{applicant.average}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
              ) : !isEmpty(psbSummary.ranking) &&
                psbSummary.salaryGrade >= 25 ? ( // 7 columns for 7 PSB members
                <div className="table-responsive">
                  <Table className="table mb-0 tbl-key-actions">
                    <thead className="thead-light">
                      <tr>
                        <th>Rank</th>
                        <th>Name of Applicant</th>
                        <th>PSB 1</th>
                        <th>PSB 2</th>
                        <th>PSB 3</th>
                        <th>PSB 4</th>
                        <th>PSB 5</th>
                        <th>PSB 6</th>
                        <th>PSB 7</th>
                        <th>Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      {psbSummary.ranking.map((applicant, index) => {
                        return (
                          <tr key={applicant.postingApplicantId}>
                            <td>{index + 1}</td>
                            <td>{applicant.applicantName}</td>
                            <td>{applicant.psb_1}</td>
                            <td>{applicant.psb_2}</td>
                            <td>{applicant.psb_3}</td>
                            <td>{applicant.psb_4}</td>
                            <td>{applicant.psb_5}</td>
                            <td>{applicant.psb_6}</td>
                            <td>{applicant.psb_7}</td>
                            <td>{applicant.average}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <h5> No Records Found</h5>
              )}
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button
            color="info"
            onClick={() => handleShowCloseInterview()}
            disabled={psbSummary.allPsbSubmitted == '0' ? true : false}
          >
            Close Interview
          </Button>
        </ModalFooter>
      </Modal>

      <CloseInterviewModal
        showCloseInterview={showCloseInterview}
        modalData={modalData}
        prfId={prfId}
        handleCloseCloseInterview={handleCloseCloseInterview}
        handleClosePsbSummary={handleClosePsbSummary}
      />
    </>
  )
}

PsbSummary.propTypes = {
  showPsbSummary: PropTypes.bool,
  handleClosePsbSummary: PropTypes.func,
  modalData: PropTypes.object,
  prfId: PropTypes.string,
}

export default PsbSummary
