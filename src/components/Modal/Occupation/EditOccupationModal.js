import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchOccupations,
  updateOccupation,
  resetOccupationResponses,
} from 'store/actions'

import {
  Button,
  Col,
  Row,
  Label,
  Form,
  Input,
  FormGroup,
  FormFeedback,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// Formik validation
import * as Yup from 'yup'
import { useFormik } from 'formik'

const EditOccupationModal = props => {
  const { showEdt, handleCloseEdt, modalData } = props
  const dispatch = useDispatch()

  const { responsePut, isLoading, error } = useSelector(state => ({
    responsePut: state.Occupation.response.occupation.put,
    isLoading: state.Occupation.loading.occupationLoading,
    error: state.Occupation.error.occupationError,
  }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      occupationName: modalData.occupationName || '',
    },
    validationSchema: Yup.object({
      occupationName: Yup.string().required('Please enter an occupation name'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(updateOccupation(modalData._id, values))
      resetForm()
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showEdt) {
      dispatch(resetOccupationResponses())
    }
  }, [showEdt])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(responsePut)) {
      dispatch(fetchOccupations())
      dispatch(resetOccupationResponses())
      handleCloseEdt()
    }
  }, [responsePut])

  return (
    <>
      <Modal isOpen={showEdt} toggle={handleCloseEdt} size="md" centered>
        <ModalHeader toggle={handleCloseEdt}>Edit</ModalHeader>

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

        {!isEmpty(responsePut) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Update Successful'}
          />
        ) : null}

        <ModalBody>
          <Form
            id="editOccupationForm"
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="name-Input">Occupation Name</Label>
                  <Input
                    name="occupationName"
                    type="text"
                    className="form-control"
                    id="occupationName-Input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.occupationName || ''}
                    invalid={
                      validation.touched.occupationName &&
                      validation.errors.occupationName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.occupationName &&
                  validation.errors.occupationName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.occupationName}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" form="editOccupationForm" color="info">
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

EditOccupationModal.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
}

export default EditOccupationModal
