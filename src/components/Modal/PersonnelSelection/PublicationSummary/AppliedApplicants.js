import React from "react"
import { isEmpty } from "lodash"
import { useSelector } from "react-redux"

import { Table } from "reactstrap"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"

const AppliedApplicants = () => {

  // redux state for list of applicants
  const { applicantList, loadingApplicants } = useSelector(
    state => ({
      applicantList: state.applicants.applicantList,
      loadingApplicants: state.applicants.loading.loadingApplicants,
    })
  )

  return (
    <>
      {loadingApplicants ? (
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
              {!isEmpty(applicantList) ? (
                applicantList.map(applicant => {
                  return (
                    <tr key={applicant._id}>
                      <td>{applicant.fullName}</td>
                      <td>{applicant.applicantType}</td>
                    </tr>
                  )
                }
                )) : (
                <tr>
                  <td colSpan={2} className="text-center text-danger">No Applicants</td>
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

export default AppliedApplicants