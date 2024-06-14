import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import {
  updateDutyResponsibility,
  fetchOccupationDuties,
  resetDutiesResponse,
} from 'store/actions'
import { useDispatch, useSelector } from 'react-redux'

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

const EditDutyModal = props => {
  const { showEdt, handleCloseEdt, modalData, occupationId } = props
  const dispatch = useDispatch()

  const {
    putDutiesRes,
    loadingDutyResponsibilities,
    errorDutyResponsibilities,
  } = useSelector(state => ({
    putDutiesRes: state.dutiesResponsibilities.response.dutyResponsibility.put,
    loadingDutyResponsibilities:
      state.dutiesResponsibilities.loading.loadingDutyResponsibilities,
    errorDutyResponsibilities:
      state.dutiesResponsibilities.error.errorDutyResponsibilities,
  }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      description: modalData.description || '',
    },
    validationSchema: Yup.object({
      description: Yup.string().required(
        'Please enter a duty and responsibility description'
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(updateDutyResponsibility(modalData.drId, values))
      resetForm()
    },
  })

  // Reset response state upon close of modal
  useEffect(() => {
    if (!showEdt) {
      dispatch(resetDutiesResponse())
    }
  }, [showEdt])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(putDutiesRes)) {
      dispatch(fetchOccupationDuties(occupationId))
      dispatch(resetDutiesResponse())
      handleCloseEdt()
    }
  }, [putDutiesRes])

  return (
    <>
      <Modal isOpen={showEdt} toggle={handleCloseEdt} size="lg" centered>
        <ModalHeader toggle={handleCloseEdt}>Edit</ModalHeader>

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

        {!isEmpty(putDutiesRes) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Update occupational duty successful'}
          />
        ) : null}

        <ModalBody>
          <Form
            id="editDutyForm"
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <Row>
              <Col lg={12}>
                <FormGroup>
                  <Label for="desc-Input">Description</Label>
                  <Input
                    name="description"
                    type="textarea"
                    className="form-control"
                    id="desc-Input"
                    rows={10}
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
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" form="editDutyForm" color="info">
            Update
          </Button>
          <Button color="danger" onClick={handleCloseEdt}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

EditDutyModal.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
  occupationId: PropTypes.string,
}

export default EditDutyModal
