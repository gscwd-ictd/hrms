import React, { useState } from 'react'
import { isEmpty } from 'lodash'
import { useSelector } from 'react-redux'

import { Table, Button } from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import PsbRemarks from './PsbRemarks'

const HrmpsbSummary = () => {
  // redux state for HRMPSB Summary
  const { psbSummary, loadingPsbSummary } = useSelector(state => ({
    psbSummary: state.personnelSelectionBoard.response.psbSummary,
    loadingPsbSummary: state.personnelSelectionBoard.loading.loadingPsbSummary,
  }))

  // Modal for PSB remarks
  const [applicantDetails, setApplicantDetails] = useState(null)
  const [showPsbRemarks, setShowPsbRemarks] = useState(false)

  const handleCloseSwapPsbMember = () => setShowPsbRemarks(false)
  const handleShowRemarks = applicantDetails => {
    setApplicantDetails(applicantDetails)
    setShowPsbRemarks(true)
  }

  return (
    <>
      {loadingPsbSummary ? (
        <LoadingIndicator />
      ) : !isEmpty(psbSummary.ranking) && psbSummary.salaryGrade <= 23 ? ( // 6 columns for 6 PSB members
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {psbSummary.ranking.map((applicant, index) => {
                return (
                  <tr key={applicant.postingApplicantId}>
                    <td>{applicant.rank}</td>
                    <td>{applicant.applicantName}</td>
                    <td>{applicant.psb_1}</td>
                    <td>{applicant.psb_2}</td>
                    <td>{applicant.psb_3}</td>
                    <td>{applicant.psb_4}</td>
                    <td>{applicant.psb_5}</td>
                    <td>{applicant.psb_6}</td>
                    <td>{applicant.average}</td>
                    <td>
                      <Button
                        type="button"
                        color="info"
                        onClick={() => handleShowRemarks(applicant)}
                      >
                        <i className="bx bx-comment-dots"></i>
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      ) : !isEmpty(psbSummary.ranking) && psbSummary.salaryGrade == 24 ? ( // 8 columns for 8 PSB members
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {psbSummary.ranking.map((applicant, index) => {
                return (
                  <tr key={applicant.postingApplicantId}>
                    <td>{applicant.rank}</td>
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
                    <td>
                      <Button
                        type="button"
                        color="info"
                        onClick={() => handleShowRemarks(applicant)}
                      >
                        <i className="bx bx-comment-dots"></i>
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      ) : !isEmpty(psbSummary.ranking) && psbSummary.salaryGrade >= 25 ? ( // 7 columns for 7 PSB members
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {psbSummary.ranking.map((applicant, index) => {
                return (
                  <tr key={applicant.postingApplicantId}>
                    <td>{applicant.rank}</td>
                    <td>{applicant.applicantName}</td>
                    <td>{applicant.psb_1}</td>
                    <td>{applicant.psb_2}</td>
                    <td>{applicant.psb_3}</td>
                    <td>{applicant.psb_4}</td>
                    <td>{applicant.psb_5}</td>
                    <td>{applicant.psb_6}</td>
                    <td>{applicant.psb_7}</td>
                    <td>{applicant.average}</td>
                    <td>
                      <Button
                        type="button"
                        color="info"
                        onClick={() => handleShowRemarks(applicant)}
                      >
                        <i className="bx bx-comment-dots"></i>
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      ) : (
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
              <tr>
                <td className="text-center text-danger" colSpan={11}>
                  No Records Found
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}

      <PsbRemarks
        applicantDetails={applicantDetails}
        showPsbRemarks={showPsbRemarks}
        handleCloseSwapPsbMember={handleCloseSwapPsbMember}
      />
    </>
  )
}

export default HrmpsbSummary
