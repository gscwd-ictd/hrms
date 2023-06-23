import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchNonUsers,
  fetchUsers,
  addUser,
  resetUserResponse,
  fetchHrmsModules,
} from 'store/actions'

import {
  Col,
  Row,
  Label,
  Form,
  FormGroup,
  FormFeedback,
  Alert,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import Select from 'react-select'

// Formik formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

const AddUserModal = props => {
  const { showAdd, handleCloseAdd } = props
  const dispatch = useDispatch()
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [userRoles, setUserRoles] = useState([])

  // Redux state list of employees that are not HRMS users
  const { nonUserList, loadingNonUserList, errorNonUserList } = useSelector(
    state => ({
      nonUserList: state.users.nonUserList,
      loadingNonUserList: state.users.loading.loadingNonUserList,
      errorNonUserList: state.users.error.errorNonUserList,
    })
  )

  // Redux state for list of HRMS modules
  const { modulesList, loadingModulesList, errorModulesList } = useSelector(
    state => ({
      modulesList: state.modules.modulesList,
      loadingModulesList: state.modules.loading.loadingModulesList,
      errorModulesList: state.modules.error.errorModulesList,
    })
  )

  // Redux state for response on assigning an employee as HRMS user
  const { postAddUser, loadingResponse, errorResponse } = useSelector(
    state => ({
      postAddUser: state.users.response.postAddUser,
      loadingResponse: state.users.loading.loadingResponse,
      errorResponse: state.users.error.errorResponse,
    })
  )

  // Formik value and validation
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      employeeId: '',
      userRoles: userRoles,
    },
    validationSchema: Yup.object({
      employeeId: Yup.string().required('Please select an employee'),
    }),
    onSubmit: values => {
      dispatch(addUser(values))
    },
  })

  // selected employee from select-input
  const handleSelectEmployee = selectedOption => {
    setSelectedEmployee(selectedOption)
  }

  // uncheck all checked checkboxes
  const clearCheckbox = () => {
    userRoles.map((role, index) => {
      document.getElementById(`${role.slug}-checkbox`).checked = false
    })
  }

  // Initial fetch of data for select fields on employees(SG20 up) and vacant positions(SG24)
  // Initial fetch of data for modules in HRMS
  useEffect(() => {
    if (showAdd) {
      dispatch(fetchNonUsers())
      dispatch(fetchHrmsModules())
    } else {
      dispatch(resetUserResponse())
    }
  }, [showAdd])

  // Reload background table and close modal
  useEffect(() => {
    if (!isEmpty(postAddUser)) {
      dispatch(fetchUsers())
      dispatch(resetUserResponse())

      formik.resetForm()
      setSelectedEmployee(null)
      clearCheckbox()
      setUserRoles([])
      handleCloseAdd()
    }
  }, [postAddUser])

  // Execute if module list is fetched
  useEffect(() => {
    if (!isEmpty(modulesList)) {
      setUserRoles([])

      modulesList.map(module => {
        const newUserRole = {
          moduleId: module._id,
          hasAccess: false,
          module: module.module,
          slug: module.slug,
          url: module.url,
        }
        setUserRoles(userRole => [...userRole, newUserRole])
      })
    }
  }, [modulesList])

  return (
    <Modal
      isOpen={showAdd}
      toggle={handleCloseAdd}
      size="lg"
      animation={false}
      centered
    >
      <ModalHeader toggle={handleCloseAdd}>Assign HRMS User</ModalHeader>

      {/* Notifications */}
      {loadingResponse ? (
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
      {errorNonUserList ? (
        <ToastrNotification
          toastType={'error'}
          notifMessage={errorNonUserList}
        />
      ) : null}

      {!isEmpty(postAddUser) ? (
        <ToastrNotification
          toastType={'success'}
          notifMessage={'Employee assigned successfully as HRMS user'}
        />
      ) : null}

      <ModalBody>
        <Form
          id="addUserForm"
          onSubmit={e => {
            e.preventDefault()
            formik.handleSubmit()
            return false
          }}
        >
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="name-Input">Employee</Label>
                {loadingNonUserList ? (
                  <i className="mdi mdi-loading mdi-spin ms-2 "></i>
                ) : null}

                <Select
                  name="employeeId"
                  id="employee-selection"
                  onChange={selectedOption => {
                    formik.handleChange('employeeId')(
                      selectedOption.value.employeeId
                    )
                    handleSelectEmployee(selectedOption)
                  }}
                  onBlur={formik.handleBlur}
                  value={selectedEmployee || ''}
                  options={nonUserList}
                  getOptionLabel={option =>
                    `${option.value.fullName} | ${option.value.positionTitle}`
                  }
                  styles={{
                    control: styles => ({
                      ...styles,
                      borderColor:
                        formik.errors.employeeId && formik.touched.employeeId
                          ? 'red'
                          : styles.borderColor,
                      '&:hover': {
                        borderColor:
                          formik.errors.employeeId && formik.touched.employeeId
                            ? 'red'
                            : styles['&:hover'].borderColor,
                      },
                    }),
                  }}
                  isDisabled={loadingNonUserList ? true : false}
                />

                <FormFeedback
                  style={{
                    display:
                      formik.errors.employeeId && formik.touched.employeeId
                        ? 'block'
                        : 'none',
                  }}
                >
                  {formik.errors.employeeId}
                </FormFeedback>
              </FormGroup>

              <FormGroup row>
                <Label sm={2}>Modules</Label>

                <Col style={{ columns: 2 }}>
                  {loadingModulesList ||
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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
        <Button type="submit" form="addUserForm" color="info">
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  )
}

AddUserModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
  history: PropTypes.object,
}

export default AddUserModal
