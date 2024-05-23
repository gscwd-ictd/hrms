import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import {
  fetchOccupationDuties,
  resetDutiesResponse,
  addOccupationalDutyResponsibility,
} from 'store/actions'
import { useDispatch, useSelector } from 'react-redux'

import {
  Col,
  Row,
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
import ToastrNotification from 'components/Notifications/ToastrNotification'

// Formik validation
import * as Yup from 'yup'
import { useFormik } from 'formik'

const AddDutyModal = props => {
  const { showAdd, handleCloseAdd, occupationId } = props
  const dispatch = useDispatch()

  const {
    loadingDutyResponsibilities,
    errorDutyResponsibilities,
    postOccupationalDutyResponsibility,
  } = useSelector(state => ({
    loadingDutyResponsibilities:
      state.dutiesResponsibilities.loading.loadingDutyResponsibilities,
    errorDutyResponsibilities:
      state.dutiesResponsibilities.error.errorDutyResponsibilities,
    postOccupationalDutyResponsibility:
      state.dutiesResponsibilities.response.occupationalDutyResponsibility.post,
  }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      description: '',
    },
    validationSchema: Yup.object({
      description: Yup.string().required(
        'Please enter a duty and responsibility description'
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addOccupationalDutyResponsibility(occupationId, values))
      resetForm()
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showAdd) {
      dispatch(resetDutiesResponse())
    }
  }, [showAdd])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(postOccupationalDutyResponsibility)) {
      dispatch(fetchOccupationDuties(occupationId))
      dispatch(resetDutiesResponse())
      handleCloseAdd()
    }
  }, [postOccupationalDutyResponsibility])

  return (
    <>
      <Modal isOpen={showAdd} toggle={handleCloseAdd} size="lg" centered>
        <ModalHeader toggle={handleCloseAdd}>
          Duty and Responsibility Details
        </ModalHeader>

        {loadingDutyResponsibilities ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorDutyResponsibilities ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorDutyResponsibilities}
          />
        ) : null}

        {!isEmpty(postOccupationalDutyResponsibility) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'New duty & responsibility created'}
          />
        ) : null}

        <ModalBody>
          <Form
            id="addDutyForm"
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <Row>
              <Col lg={12}>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Input
                        name="description"
                        type="textarea"
                        className="form-control"
                        id="desc-Input"
                        rows="10"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.description || ''}
                        invalid={
                          validation.touched.description &&
                          validation.errors.description
                            ? true
                            : false
                        }
                      />
                      {validation.touched.description &&
                      validation.errors.description ? (
                        <FormFeedback type="invalid">
                          {validation.errors.description}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" form="addDutyForm" color="info">
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

AddDutyModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
  occupationId: PropTypes.string,
  history: PropTypes.object,
}

export default AddDutyModal
