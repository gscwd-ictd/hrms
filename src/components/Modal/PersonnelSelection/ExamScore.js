import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchQualifiedApplicants,
  updateQualifiedApplicantExamScore,
  updateQualifiedApplicantsExamScores,
  resetApplicantsResponses,
} from 'store/actions'

import {
  Button,
  Col,
  Row,
  FormGroup,
  Alert,
  Table,
  Input,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'

const ExamScore = props => {
  const { showExamScore, modalData, handleCloseExamScore } = props
  const dispatch = useDispatch()

  // Redux state for list of qualified applicants
  const {
    qualifiedApplicantList,
    loadingQualifiedApplicants,
    errorQualifiedApplicants,
  } = useSelector(state => ({
    qualifiedApplicantList: state.applicants.qualifiedApplicantList,
    loadingQualifiedApplicants:
      state.applicants.loading.loadingQualifiedApplicants,
    errorQualifiedApplicants: state.applicants.error.errorQualifiedApplicants,
  }))

  // Redux state for updating the applicant scores
  const {
    patchApplicantsScores,
    loadingResponseApplicantsScores,
    errorResponseApplicantsScores,
  } = useSelector(state => ({
    patchApplicantsScores: state.applicants.response.patchApplicantsScores,
    loadingResponseApplicantsScores:
      state.applicants.loading.loadingResponseApplicantsScores,
    errorResponseApplicantsScores:
      state.applicants.error.errorResponseApplicantsScores,
  }))

  const handleSubmit = event => {
    event.preventDefault()

    dispatch(updateQualifiedApplicantsExamScores(qualifiedApplicantList))
  }

  const handleApplicantScore = (index, event) => {
    const { value, min, max } = event.target
    const floatedValue = Math.max(
      Number(min),
      Math.min(Number(max), Number(value))
    )
    document.getElementById('examScore-input-' + index).value = floatedValue

    dispatch(updateQualifiedApplicantExamScore(index, floatedValue))
  }

  useEffect(() => {
    if (showExamScore) {
      dispatch(fetchQualifiedApplicants(modalData.vppId))
    }
  }, [showExamScore])

  useEffect(() => {
    if (!isEmpty(patchApplicantsScores)) {
      handleCloseExamScore()
      dispatch(resetApplicantsResponses())
    }
  }, [patchApplicantsScores])

  return (
    <>
      <Modal
        isOpen={showExamScore}
        toggle={handleCloseExamScore}
        size="lg"
        centered
      >
        <ModalHeader toggle={handleCloseExamScore}>
          Applicants Examination Score
        </ModalHeader>

        {loadingResponseApplicantsScores ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorQualifiedApplicants ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorQualifiedApplicants}
          />
        ) : null}

        {errorResponseApplicantsScores ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorResponseApplicantsScores}
          />
        ) : null}

        {!isEmpty(patchApplicantsScores) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Exam Scores Updated Successfully'}
          />
        ) : null}

        <ModalBody>
          <p>
            <span className="text-danger">Note:</span> Maximum percentage for
            examination is 40%
          </p>
          <Row>
            <Col md={12}>
              {loadingQualifiedApplicants ? (
                <LoadingIndicator />
              ) : (
                <>
                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Applicant</th>
                          <th>Exam Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {qualifiedApplicantList &&
                        qualifiedApplicantList.length > 0 ? (
                          qualifiedApplicantList.map((applicant, index) => {
                            return (
                              <tr key={applicant.postingApplicantId}>
                                <td>{applicant.applicantName2}</td>
                                <td>
                                  <FormGroup>
                                    <Input
                                      name={'examScore' + index}
                                      type="number"
                                      className="form-control"
                                      id={'examScore-input-' + index}
                                      defaultValue={applicant.examScore}
                                      onChange={event =>
                                        handleApplicantScore(index, event)
                                      }
                                      min="0"
                                      max="40"
                                      required
                                    />
                                    {}
                                    <FormFeedback type="invalid">
                                      May error
                                    </FormFeedback>
                                  </FormGroup>
                                </td>
                              </tr>
                            )
                          })
                        ) : (
                          <tr>
                            <td colSpan="2" className="ta-center">
                              No Records Available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button color="info" onClick={event => handleSubmit(event)}>
            Send
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

ExamScore.propTypes = {
  showExamScore: PropTypes.bool,
  handleCloseExamScore: PropTypes.func,
  modalData: PropTypes.object,
}

export default ExamScore
