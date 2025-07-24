import React from 'react'
import { isEmpty } from 'lodash'
import { useSelector } from 'react-redux'

import { Table } from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'

const ShortlistedApplicants = () => {
  // redux state for to be shortlisted applciants
  const { shortlistedApplicantList, loadingShortlistedApplicants } =
    useSelector(state => ({
      shortlistedApplicantList: state.applicants.shortlistedApplicantList,
      loadingShortlistedApplicants:
        state.applicants.loading.loadingShortlistedApplicants,
    }))

  return (
    <>
      {loadingShortlistedApplicants ? (
        <LoadingIndicator />
      ) : (
        <div className="table-responsive">
          <Table className="table mb-0">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(shortlistedApplicantList) ? (
                shortlistedApplicantList.map(applicant => {
                  return (
                    <tr key={applicant.applicantEndorsementId}>
                      <td>{applicant.applicantName}</td>
                      <td>{applicant.applicantType}</td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td className="text-center text-danger">
                    No Shortlisted Applicants
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

export default ShortlistedApplicants
