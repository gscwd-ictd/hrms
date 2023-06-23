import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUserRoles,
  updateUserRoles,
  fetchUsers,
  resetUserResponse,
} from 'store/actions'

import {
  Button,
  Col,
  Row,
  Label,
  Form,
  Input,
  FormGroup,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// Formik formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

const EditUserModal = props => {
  const { showEdt, handleCloseEdt, modalData } = props
  const dispatch = useDispatch()

  // Redux state for user's roles and response on updating
  const {
    userRoles,
    loadingResponse,
    patchUpdateUserRoles,
    loadingResponseUpdate,
    errorResponse,
  } = useSelector(state => ({
    userRoles: state.users.response.getFetchUserRoles,
    loadingResponse: state.users.loading.loadingResponse,
    patchUpdateUserRoles: state.users.response.patchUpdateUserRoles,
    loadingResponseUpdate: state.users.response.loadingResponseUpdate,
    errorResponse: state.users.error.errorResponse,
  }))

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      userRoles: userRoles,
    },
    validationSchema: Yup.object({}),
    onSubmit: values => {
      dispatch(updateUserRoles(values))
    },
  })

  const handleIsChecked = (isChecked, index) => {
    if (isChecked === true) {
      formik.values.userRoles[index].hasAccess = 1
    } else {
      formik.values.userRoles[index].hasAccess = 0
    }
    // formik.values.salaryGrade = selectedOption.value.salaryGrade
  }

  // Reset response state upon close of modal
  useEffect(() => {
    if (showEdt) {
      dispatch(fetchUserRoles(modalData.employeeId))
    } else {
      dispatch(resetUserResponse())
    }
  }, [showEdt])

  // Execute after successful submission of form
  useEffect(() => {
    if (!isEmpty(patchUpdateUserRoles)) {
      dispatch(fetchUsers())
      dispatch(resetUserResponse())
      handleCloseEdt()
      formik.resetForm()
    }
  }, [patchUpdateUserRoles])

  return (
    <Modal isOpen={showEdt} toggle={handleCloseEdt} size="lg" centered>
      <ModalHeader toggle={handleCloseEdt}>Modules</ModalHeader>

      {/* Notifications */}
      {loadingResponseUpdate ? (
        <Alert
          color="info"
          className="alert-dismissible fade show m-3"
          role="alert"
        >
          <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
        </Alert>
      ) : null}

      {errorResponse ? (
        <ToastrNotification toastType={'error'} notifMessage={errorResponse} />
      ) : null}

      {!isEmpty(patchUpdateUserRoles) ? (
        <ToastrNotification
          toastType={'success'}
          notifMessage={'Update Successful'}
        />
      ) : null}

      <ModalBody>
        <Form
          id="editUserForm"
          onSubmit={e => {
            e.preventDefault()
            formik.handleSubmit()
            return false
          }}
        >
          <Row>
            <Col md={12}>
              <FormGroup row>
                <Col style={{ columns: 2 }}>
                  {loadingResponse ||
                  isEmpty(formik.values.userRoles) ||
                  isEmpty(userRoles) ? (
                    <i className="mdi mdi-loading mdi-spin "></i>
                  ) : (
                    userRoles.map((role, index) => {
                      return (
                        <FormGroup check key={index}>
                          <Input
                            name={`userRoles[${index}].hasAccess`}
                            id={role.slug + '-checkbox'}
                            type="checkbox"
                            // onChange={formik.handleChange}
                            onChange={isChecked => {
                              // formik.handleChange(`userRoles[${index}].hasAccess`)(formik)

                              handleIsChecked(isChecked.target.checked, index)
                            }}
                            onBlur={formik.handleBlur}
                            defaultChecked={
                              formik.values.userRoles[index].hasAccess
                            }
                          />

                          <Label for={role.slug + '-checkbox'} check>
                            {role.module}
                          </Label>
                        </FormGroup>
                      )
                    })
                  )}
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button type="submit" form="editUserForm" color="info">
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  )
}

EditUserModal.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
}

export default EditUserModal
