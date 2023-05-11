import React from "react"
import { isEmpty } from "lodash"
import { useSelector } from "react-redux"

import { Table } from "reactstrap"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"

const EndorsedApplicants = () => {

  // redux state for to be endorsed applciants
  const {
    endorsedApplicantList,
    loadingEndorsedApplicants,
  } = useSelector(state => ({
    endorsedApplicantList: state.applicants.endorsedApplicantList,
    loadingEndorsedApplicants:
      state.applicants.loading.loadingEndorsedApplicants,
  }))

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
              </tr>
            </thead>
            <tbody>


              {!isEmpty(endorsedApplicantList.postingApplicants) ? (
                endorsedApplicantList.postingApplicants.map(applicant => {
                  return (
                    <tr key={applicant.postingApplicantId}>
                      <td>{applicant.applicantName2}</td>
                    </tr>
                  )
                }
                )) : (
                <tr>
                  <td className="text-center text-danger">No Endorsed Applicants</td>
                </tr>
              )
              }
            </tbody>
          </Table>
        </div>
      )}
    </>
  )
}

export default EndorsedApplicants