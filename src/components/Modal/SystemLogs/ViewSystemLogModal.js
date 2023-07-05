import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import dayjs from 'dayjs'

import { useDispatch, useSelector } from 'react-redux'
import { fetchSystemLog, resetSystemLogs } from 'store/actions'

import OutlinedBox from 'components/OutlinedBox'
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const ViewSystemLogModal = props => {
  const dispatch = useDispatch()
  const { showView, handleCloseView, modalData } = props

  // redux state for system log details
  const { systemLog, loadingResponse, errorResponse } = useSelector(state => ({
    systemLog: state.systemLogs.response.getSystemLog,
    loadingResponse: state.systemLogs.loading.loadingResponse,
    errorResponse: state.systemLogs.error.errorResponse,
  }))

  // get the date and change format
  const formatToDate = dateTime => {
    if (!isEmpty(dateTime)) {
      const date = new Date(dateTime)
      return dayjs(date).format('MMMM DD, YYYY')
    } else {
      return ''
    }
  }

  // get the time and change format
  const formatToTime = dateTime => {
    if (!isEmpty(dateTime)) {
      const date = new Date(dateTime)
      return dayjs(date).format('hh:mm:ss A')
    } else {
      return ''
    }
  }

  // fetch system log full details
  useEffect(() => {
    if (!showView) {
      dispatch(resetSystemLogs())
    } 
  }, [showView])

  return (
    <>
      <Modal isOpen={showView} toggle={handleCloseView} size="lg" centered>
        <ModalHeader toggle={handleCloseView}></ModalHeader>

        {/* Notifications */}
        {errorResponse ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorResponse}
          />
        ) : null}

        <ModalBody>
          {loadingResponse ? (
            <LoadingIndicator />
          ) : (
            <Row className="pb-2">
              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={'Date'}
                  value={formatToDate(systemLog.dateLogged) || 'N/A'}
                />
              </Col>

              <Col md={6} className="mt-3">
                <OutlinedBox
                  label={'Time'}
                  value={formatToTime(systemLog.dateLogged) || 'N/A'}
                />
              </Col>

              <Col md={12} className="mt-3">
                <OutlinedBox
                  label={'User Name'}
                  value={systemLog.userFullName || 'N/A'}
                />
              </Col>

              <Col md={12} className="mt-3">
                <OutlinedBox
                  label={'Method'}
                  value={systemLog.method || 'N/A'}
                />
              </Col>

              <Col md={12} className="mt-3">
                <OutlinedBox label={'Route'} value={systemLog.route || 'N/A'} />
              </Col>

              <Col md={12} className="mt-3">
                <OutlinedBox label={'Body'} value={systemLog.body || 'N/A'} />
              </Col>
            </Row>
          )}
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Modal>
    </>
  )
}

ViewSystemLogModal.propTypes = {
  showView: PropTypes.bool,
  handleCloseView: PropTypes.func,
  modalData: PropTypes.shape({
    _id: PropTypes.string,
    dateLogged: PropTypes.string,
    userFullName: PropTypes.string,
  }).isRequired,
}

export default ViewSystemLogModal
