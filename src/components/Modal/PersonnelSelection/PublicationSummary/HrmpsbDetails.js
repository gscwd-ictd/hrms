import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Button, Table } from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import SwapPsbMember from './SwapPsbMember'
import { publicationStatus } from 'constants/publicationStatus'

const HrmpsbDetails = props => {
  const { modalData } = props
  // redux state for list of applicants
  const { psbDetails, loadingPsbDetails } = useSelector(state => ({
    psbDetails: state.personnelSelectionBoard.response.psbDetails,
    loadingPsbDetails: state.personnelSelectionBoard.loading.loadingPsbDetails,
  }))

  // Modal for Confirmation before proceeding
  const [memberRole, setMemberRole] = useState('')
  const [showSwapPsbMember, setShowSwapPsbMember] = useState(false)

  const handleCloseSwapPsbMember = () => setShowSwapPsbMember(false)
  const handleShowSwapPsbMember = role => {
    setMemberRole(role)
    setShowSwapPsbMember(true)
  }

  return (
    <>
      {loadingPsbDetails ? (
        <LoadingIndicator />
      ) : (
        <div className="table-responsive">
          <Table className="table mb-0">
            <tbody>
              {!isEmpty(psbDetails) ? (
                <>
                  {/* Exam Row */}
                  {psbDetails.schedule.exam ? (
                    <>
                      <tr>
                        <td>Exam Schedule</td>
                        <td>{psbDetails.schedule.exam.schedule}</td>
                      </tr>

                      <tr>
                        <td>Exam Venue</td>
                        <td>{psbDetails.schedule.exam.venue}</td>
                      </tr>
                    </>
                  ) : null}

                  {/* Interview Row */}
                  {psbDetails.schedule.interview ? (
                    <>
                      <tr>
                        <td>Interview Schedule</td>
                        <td>{psbDetails.schedule.interview.schedule}</td>
                      </tr>
                      <tr>
                        <td>Interview Venue</td>
                        <td>{psbDetails.schedule.interview.venue}</td>
                      </tr>
                    </>
                  ) : null}

                  {/* No. of Applicants Row */}
                  <tr>
                    <td>No. of Applicants</td>
                    <td colSpan={2}>{psbDetails.noOfApplicants}</td>
                  </tr>

                  {/* PSB Members Row */}
                  <tr>
                    <td>PSB Members</td>
                    <td>
                      <Table className="table mb-0">
                        <tbody>
                          {!isEmpty(psbDetails.psbMembers) ? (
                            psbDetails.psbMembers.map((member, i) => {
                              return (
                                <tr key={i}>
                                  <td>{member.role}</td>
                                  <td>{member.fullName}</td>
                                  <td>{member.psbMemberStatus}</td>

                                  {/* Hide swap button if this status is present */}
                                  {modalData.postingStatus ===
                                    publicationStatus.INTERVIEWDONE ||
                                  modalData.postingStatus ===
                                    publicationStatus.APPAUTHSELECTION ||
                                  modalData.postingStatus ===
                                    publicationStatus.APPAUTHSELECTIONDONE ||
                                  modalData.postingStatus ===
                                    publicationStatus.HIRINGDONE ||
                                  modalData.postingStatus ===
                                    publicationStatus.DOESET ? null : (
                                    <td>
                                      <Button
                                        type="button"
                                        color="info"
                                        onClick={() =>
                                          handleShowSwapPsbMember(member.role)
                                        }
                                      >
                                        <i className="bx bx-transfer-alt"></i>
                                      </Button>
                                    </td>
                                  )}
                                </tr>
                              )
                            })
                          ) : (
                            <tr>
                              <td colSpan={3}>No Members Set</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan={2} className="text-center text-danger">
                    No Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <SwapPsbMember
            showSwapPsbMember={showSwapPsbMember}
            vppId={modalData.vppId}
            memberRole={memberRole}
            handleCloseSwapPsbMember={handleCloseSwapPsbMember}
          />
        </div>
      )}
    </>
  )
}

HrmpsbDetails.propTypes = {
  modalData: PropTypes.object,
}

export default HrmpsbDetails
