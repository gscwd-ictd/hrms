import React from 'react'
import { isEmpty } from 'lodash'
import { useSelector } from 'react-redux'

import { Table } from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'

const HiredApplicants = () => {
  // redux state for to be selected applciants by appointing authority
  const { selectedApplicantsByAppAuth, loadingSelectedByAppointingAuth } =
    useSelector(state => ({
      selectedApplicantsByAppAuth:
        state.personnelSelectionBoard.response.selectedByAppointingAuth,
      loadingSelectedByAppointingAuth:
        state.personnelSelectionBoard.loading.loadingSelectedByAppointingAuth,
    }))

  return (
    <>
      {loadingSelectedByAppointingAuth ? (
        <LoadingIndicator />
      ) : (
        <div className="table-responsive">
          <Table className="table mb-0">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(selectedApplicantsByAppAuth) ? (
                selectedApplicantsByAppAuth.map(applicant => {
                  return (
                    <tr key={applicant.applicantEndorsementId}>
                      <td>{applicant.applicantName}</td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td className="text-center text-danger">
                    No Selected Applicants
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

export default HiredApplicants
