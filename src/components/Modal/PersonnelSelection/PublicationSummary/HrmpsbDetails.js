import React from 'react'
import { isEmpty } from 'lodash'
import { useSelector } from 'react-redux'

import { Table } from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'

const HrmpsbDetails = () => {
  // redux state for list of applicants
  const { psbDetails, loadingPsbDetails } = useSelector(state => ({
    psbDetails: state.personnelSelectionBoard.response.psbDetails,
    loadingPsbDetails: state.personnelSelectionBoard.loading.loadingPsbDetails,
  }))

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

                  <tr>
                    <td>No. of Applicants</td>
                    <td colSpan={2}>{psbDetails.noOfApplicants}</td>
                  </tr>

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
        </div>
      )}
    </>
  )
}

export default HrmpsbDetails
