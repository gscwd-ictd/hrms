import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { useSelector } from 'react-redux'

import {
  Col,
  Row,
  Label,
  Form,
  Input,
  FormGroup,
  FormFeedback,
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'

const BirthdayModal = props => {
  const { showModal, handleCloseModal, birthdayCelebrants } = props

  // const { birthdayCelebrants } = useSelector(state => ({
  //   birthdayCelebrants: state.Dashboard.birthdayCelebrants,
  //   isLoading: state.Dashboard.loading.loadingBirthdayCelebrants,
  //   error: state.Dashboard.error.errorBirthdayCelebrants,
  // }))

  return (
    <>
      <Modal isOpen={showModal} toggle={handleCloseModal} size="lg" centered>
        <ModalHeader toggle={handleCloseModal}>
          {new Date().toLocaleString('default', { month: 'long' })} Birthday
          Celebrants
        </ModalHeader>

        <ModalBody>
          <>
            <Row>
              {birthdayCelebrants.map((employee, key) => (
                <Col key={'_li_' + key} className="mb-1" lg={6}>
                  <Row>
                    <Col sm="2" className="my-auto">
                      <div className="avatar-sm">
                        <img
                          src={employee.picture}
                          alt=""
                          className="img-thumbnail rounded-circle"
                        />
                      </div>
                    </Col>
                    <Col sm="10" className="my-auto">
                      <h5 className="font-size-12 mb-0">{employee.name}</h5>
                      <p className="font-size-11 text-muted mb-0">
                        {employee.birthday}
                      </p>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Modal>
    </>
  )
}

BirthdayModal.propTypes = {
  showModal: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  birthdayCelebrants: PropTypes.array,
}

export default BirthdayModal
