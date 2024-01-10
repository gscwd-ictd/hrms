import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import {
  fetchCoreCompetencies,
  fetchFunctionalCompetencies,
  fetchManagerialCompetencies,
  fetchCrossCuttingCompetencies,
  resetCompetencyResponse,
  removeCompetencyDetails,
} from 'store/actions'
import { useDispatch, useSelector } from 'react-redux'

import {
  Button,
  Col,
  Row,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const DeleteCompetencyModelModal = props => {
  const { showDel, handleCloseDel, modalData } = props
  const dispatch = useDispatch()

  const submitDelete = () => {
    dispatch(removeCompetencyDetails(modalData.competencyId))
  }

  const { deleteCompetencyDetails, isLoading, error } = useSelector(state => ({
    deleteCompetencyDetails:
      state.competencyModel.response.deleteCompetencyDetails,
    isLoading: state.competencyModel.loading.loadingResponse,
    error: state.competencyModel.error.errorResponse,
  }))

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showDel) {
      dispatch(resetCompetencyResponse())
    }
  }, [showDel])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(deleteCompetencyDetails)) {
      dispatch(fetchCoreCompetencies())
      dispatch(fetchFunctionalCompetencies())
      dispatch(fetchManagerialCompetencies())
      dispatch(fetchCrossCuttingCompetencies())
      dispatch(resetCompetencyResponse())
      handleCloseDel()
    }
  }, [deleteCompetencyDetails])

  return (
    <>
      <Modal isOpen={showDel} toggle={handleCloseDel} size="sm" centered>
        {isLoading ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {error ? (
          <ToastrNotification toastType={'error'} notifMessage={error} />
        ) : null}

        {!isEmpty(deleteCompetencyDetails) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Competency Model Deleted'}
          />
        ) : null}

        <ModalBody>
          <Row>
            <Col lg={12}>
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                Are you sure you want to delete this entry
                <strong> {modalData.code}</strong>?
              </p>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            type="submit"
            color="danger"
            onClick={submitDelete}
            style={{ flex: 1 }}
          >
            Confirm
          </Button>
          <Button
            color="outline-light"
            onClick={handleCloseDel}
            style={{ flex: 1 }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

DeleteCompetencyModelModal.propTypes = {
  showDel: PropTypes.bool,
  handleCloseDel: PropTypes.func,
  modalData: PropTypes.object,
}

export default DeleteCompetencyModelModal
