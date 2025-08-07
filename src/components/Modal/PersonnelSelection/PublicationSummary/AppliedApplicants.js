import React from 'react'
import { isEmpty } from 'lodash'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import { Table, Badge } from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import { CapitalizeEachWord } from 'functions/CapitalizeEachWord'

const AppliedApplicants = () => {
  // redux state for list of applicants
  const { applicantList, loadingApplicants } = useSelector(state => ({
    applicantList: state.applicants.applicantList,
    loadingApplicants: state.applicants.loading.loadingApplicants,
  }))

  const statusBadge = applicantStatus => {
    return (
      <Badge
        className={classnames('me-2 font-size-12', {
          'bg-warning': applicantStatus === 'For review',
          'bg-success': applicantStatus === 'Qualified',
          'bg-danger': applicantStatus === 'Not qualified',
        })}
      >
        {applicantStatus}
      </Badge>
    )
  }

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
                <th>Status</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(applicantList) ? (
                applicantList.map(applicant => {
                  return (
                    <tr key={applicant._id}>
                      <td>{CapitalizeEachWord(applicant.fullName)}</td>
                      <td>{statusBadge(applicant.applicantStatus)}</td>
                      <td className="text-capitalize">
                        {applicant.applicantType}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={2} className="text-center text-danger">
                    No Applicants
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

export default AppliedApplicants
