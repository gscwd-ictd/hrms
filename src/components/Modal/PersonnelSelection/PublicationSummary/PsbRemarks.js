import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import { fetchApplicantPsbRemarks } from 'store/actions'

import {
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Row,
  Card,
  CardTitle,
  CardBody,
} from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import { CapitalizeEachWord } from 'functions/CapitalizeEachWord'

const PsbRemarks = props => {
  const { applicantDetails, showPsbRemarks, handleCloseSwapPsbMember } = props
  const dispatch = useDispatch()

  // Redux state for PSB remarks
  const { applicantPsbRemarks, loadingApplicantPsbRemarks } = useSelector(
    state => ({
      applicantPsbRemarks:
        state.personnelSelectionBoard.response.applicantPsbRemarks,
      loadingApplicantPsbRemarks:
        state.personnelSelectionBoard.loading.loadingApplicantPsbRemarks,
    })
  )

  // get list of endorsed applicants
  useEffect(() => {
    if (showPsbRemarks) {
      dispatch(fetchApplicantPsbRemarks(applicantDetails.postingApplicantId))
    }
  }, [showPsbRemarks])

  return (
    <>
      <Modal
        isOpen={showPsbRemarks}
        toggle={handleCloseSwapPsbMember}
        size="lg"
        centered
        className="modal-confirmation"
      >
        {loadingApplicantPsbRemarks ? (
          <div className="pt-3">
            <LoadingIndicator />
          </div>
        ) : (
          <>
            <ModalHeader toggle={handleCloseSwapPsbMember}>
              {!isEmpty(applicantDetails) ? (
                <>
                  Rank {applicantDetails.rank} |{' '}
                  {CapitalizeEachWord(applicantDetails.applicantName)}
                </>
              ) : null}
            </ModalHeader>

            <ModalBody>
              <Row>
                <Col>
                  {applicantPsbRemarks.length > 0 ? (
                    applicantPsbRemarks.map(remark => {
                      if (remark.remarks !== '') {
                        return (
                          <Card key={remark.psbNo}>
                            <CardTitle>
                              PSB {remark.psbNo} | {remark.psbName}
                            </CardTitle>
                            <CardBody className="p-2">
                              {remark.remarks}
                            </CardBody>
                          </Card>
                        )
                      }
                    })
                  ) : (
                    <div>No Remarks</div>
                  )}
                </Col>
              </Row>
            </ModalBody>
          </>
        )}
      </Modal>
    </>
  )
}

PsbRemarks.propTypes = {
  applicantDetails: PropTypes.object,
  showPsbRemarks: PropTypes.bool,
  handleCloseSwapPsbMember: PropTypes.func,
}

export default PsbRemarks
