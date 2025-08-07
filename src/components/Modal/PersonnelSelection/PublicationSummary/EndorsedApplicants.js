import React from 'react'
import { isEmpty } from 'lodash'
import { useSelector } from 'react-redux'

import { Table } from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import { CapitalizeEachWord } from 'functions/CapitalizeEachWord'

const EndorsedApplicants = () => {
  // redux state for to be endorsed applciants
  const { endorsedApplicantList, loadingEndorsedApplicants } = useSelector(
    state => ({
      endorsedApplicantList: state.applicants.endorsedApplicantList,
      loadingEndorsedApplicants:
        state.applicants.loading.loadingEndorsedApplicants,
    })
  )

  return (
    <>
      {loadingEndorsedApplicants ? (
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
              {!isEmpty(endorsedApplicantList.postingApplicants) ? (
                endorsedApplicantList.postingApplicants.map(applicant => {
                  return (
                    <tr key={applicant.postingApplicantId}>
                      <td>{CapitalizeEachWord(applicant.applicantName2)}</td>
                      <td className="text-capitalize">
                        {applicant.applicantType}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td className="text-center text-danger">
                    No Endorsed Applicants
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

export default EndorsedApplicants
