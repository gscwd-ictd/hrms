import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import {
  workstations,
  supervisorManagers,
  appointmentTypes,
  publicationModes,
  frequencies,
} from 'constants/selectInputs'

import { useDispatch, useSelector } from 'react-redux'
import {
  addDbmCscAdditionalData,
  fetchAvailableItemNumbers,
  resetApplicantsResponses,
  fetchSelectedByAppointingAuth,
} from 'store/actions'

import {
  Col,
  Row,
  Form,
  Input,
  FormGroup,
  FormFeedback,
  Alert,
  Button,
  Label,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// Formik validation
import * as Yup from 'yup'
import { useFormik, getIn } from 'formik'

const DbmCscAdditionalInfo = props => {
  const {
    showDbmCscAdditionalInfo,
    handleCloseDbmCscAdditionalInfoModal,
    applicantData,
    vppId,
  } = props
  const dispatch = useDispatch()

  // redux store state after sending dbm additional details
  const {
    postDbmCscAdditionalDetails,
    loadingPostDbmCscAdditionalDetails,
    errorPostDbmCscAdditionalDetails,
  } = useSelector(state => ({
    postDbmCscAdditionalDetails:
      state.applicants.response.postDbmCscAdditionalDetails,
    loadingPostDbmCscAdditionalDetails:
      state.applicants.loading.loadingPostDbmCscAdditionalDetails,
    errorPostDbmCscAdditionalDetails:
      state.applicants.error.errorPostDbmCscAdditionalDetails,
  }))

  // redux store state for available item numbers
  const { availableItemNumbers, publicationsLoading, publicationsError } =
    useSelector(state => ({
      availableItemNumbers: state.publications.availableItemNumbers,
      publicationsLoading: state.publications.loading.publicationsLoading,
      publicationsError: state.publications.error.publicationsError,
    }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      basic: {
        itemNumber: '',
        immediateSupervisor: '',
        supervisorNextHigher: '',
        toolsUsed: '',
        workStation: '',
        appointmentType: '',
        publicationMode: '',
        directlySupervised: '',
        directlySupervisedItemNumbers: '',
      },
      contacts: {
        internal: {
          executiveIsOccasional: false,
          supervisorIsOccasional: false,
          nonSupervisorIsOccasional: false,
          staffIsOccasional: false,
        },
        external: {
          generalPublicIsOccasional: false,
          otherAgenciesIsOccasional: false,
          others: '',
        },
      },
      workingCondition: {
        isOfficeWork: false,
        isFieldWork: false,
        others: '',
      },
    },

    validationSchema: Yup.object().shape({
      basic: Yup.object().shape({
        itemNumber: Yup.string().required(
          'Please select an available item number'
        ),
        immediateSupervisor: Yup.string().required(
          'Please input the immediate supervisor'
        ),
        supervisorNextHigher: Yup.string().required(
          'Please input the next higher supervisor'
        ),
        toolsUsed: Yup.string().required(
          'Please input a machine/equipment/tools used for work'
        ),
        workStation: Yup.string().required('Please select a place of work'),
        appointmentType: Yup.string().required(
          'Please select an appointment type'
        ),
        publicationMode: Yup.string().required(
          'Please select a mode of publication'
        ),
      }),
      contacts: Yup.object().shape({
        internal: Yup.object().shape({
          executiveIsOccasional: Yup.bool().required('Please select an option'),
          supervisorIsOccasional: Yup.bool().required(
            'Please select an option'
          ),
          nonSupervisorIsOccasional: Yup.bool().required(
            'Please select an option'
          ),
          staffIsOccasional: Yup.bool().required('Please select an option'),
        }),
        external: Yup.object().shape({
          generalPublicIsOccasional: Yup.bool().required(
            'Please select an option'
          ),
          otherAgenciesIsOccasional: Yup.bool().required(
            'Please select an option'
          ),
        }),
      }),
      workingCondition: Yup.object().shape({
        isOfficeWork: Yup.bool().required('Please select an option'),
        isFieldWork: Yup.bool().required('Please select an option'),
      }),
    }),

    onSubmit: values => {
      dispatch(
        addDbmCscAdditionalData(applicantData.postingApplicantId, values)
      )
    },
  })

  // Change string value to boolean
  const stringToBool = str => {
    if (str === 'true') {
      return true
    } else {
      return false
    }
  }

  // Close modal form, reset the fields, re-load the applicant list
  useEffect(() => {
    if (!isEmpty(postDbmCscAdditionalDetails)) {
      validation.resetForm()
      handleCloseDbmCscAdditionalInfoModal()
      dispatch(fetchSelectedByAppointingAuth(vppId))
    }
  }, [postDbmCscAdditionalDetails])

  // Retrieve list of item numbers to be assigned to the hired applicant. ELSE reset the response in redux if there is existing post data.
  useEffect(() => {
    if (showDbmCscAdditionalInfo) {
      dispatch(fetchAvailableItemNumbers(vppId))
    } else {
      dispatch(resetApplicantsResponses())
    }
  }, [showDbmCscAdditionalInfo])

  return (
    <>
      <Modal
        isOpen={showDbmCscAdditionalInfo}
        toggle={handleCloseDbmCscAdditionalInfoModal}
        size="xl"
        centered
      >
        <ModalHeader toggle={handleCloseDbmCscAdditionalInfoModal}>
          DBM-CSC Form
        </ModalHeader>

        {/* Notifications */}
        {loadingPostDbmCscAdditionalDetails ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorPostDbmCscAdditionalDetails ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorPostDbmCscAdditionalDetails}
          />
        ) : null}

        {publicationsError ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={publicationsError}
          />
        ) : null}

        {!isEmpty(postDbmCscAdditionalDetails) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Succesfully added DBM-CSC additional details'}
          />
        ) : null}

        <Card>
          <CardBody>
            <ModalBody>
              <Form
                id="dbmCscAdditionalInfoForm"
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                {/* BASIC */}
                <Row>
                  {/* Item Number */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="item-number-select">Item Number</Label>
                      <Input
                        name="basic.itemNumber"
                        type="select"
                        className="form-control"
                        id="item-number-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.basic.itemNumber || ''}
                        invalid={
                          getIn(validation.touched, 'basic.itemNumber') &&
                          getIn(validation.errors, 'basic.itemNumber')
                            ? true
                            : false
                        }
                      >
                        <option value="" disabled>
                          Choose...
                        </option>
                        {availableItemNumbers.map(itemNumber => (
                          <option
                            key={itemNumber.positionId}
                            value={itemNumber.itemNumber}
                          >
                            {itemNumber.itemNumber}
                          </option>
                        ))}
                      </Input>
                      {getIn(validation.touched, 'basic.itemNumber') &&
                      getIn(validation.errors, 'basic.itemNumber') ? (
                        <FormFeedback type="invalid">
                          {getIn(validation.errors, 'basic.itemNumber')}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* Workstation/Place of Work */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="workstation-select">
                        Workstation/Place of Work
                      </Label>
                      <Input
                        name="basic.workStation"
                        type="select"
                        className="form-control"
                        id="workstation-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.basic.workStation || ''}
                        invalid={
                          getIn(validation.touched, 'basic.workStation') &&
                          getIn(validation.errors, 'basic.workStation')
                            ? true
                            : false
                        }
                      >
                        <option value="" disabled>
                          Choose...
                        </option>
                        {workstations.map((workstation, index) => (
                          <option key={index} value={workstation}>
                            {workstation}
                          </option>
                        ))}
                      </Input>
                      {getIn(validation.touched, 'basic.workStation') &&
                      getIn(validation.errors, 'basic.workStation') ? (
                        <FormFeedback type="invalid">
                          {getIn(validation.errors, 'basic.workStation')}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* Position Title of Immediate Supervisor */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="immediate-supervisor-select">
                        Position Title of Immediate Supervisor
                      </Label>
                      <Input
                        name="basic.immediateSupervisor"
                        type="select"
                        className="form-control"
                        id="immediate-supervisor-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.basic.immediateSupervisor || ''
                        }
                        invalid={
                          getIn(
                            validation.touched,
                            'basic.immediateSupervisor'
                          ) &&
                          getIn(validation.errors, 'basic.immediateSupervisor')
                            ? true
                            : false
                        }
                      >
                        <option value="" disabled>
                          Choose...
                        </option>
                        {supervisorManagers.map((supervisorManager, index) => (
                          <option key={index} value={supervisorManager}>
                            {supervisorManager}
                          </option>
                        ))}
                      </Input>
                      {getIn(validation.touched, 'basic.immediateSupervisor') &&
                      getIn(validation.errors, 'basic.immediateSupervisor') ? (
                        <FormFeedback type="invalid">
                          {getIn(
                            validation.errors,
                            'basic.immediateSupervisor'
                          )}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* Position Title of Next Higher */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="supervisor-next-higher-select">
                        Position Title of Next Higher
                      </Label>
                      <Input
                        name="basic.supervisorNextHigher"
                        type="select"
                        className="form-control"
                        id="supervisor-next-higher-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.basic.supervisorNextHigher || ''
                        }
                        invalid={
                          getIn(
                            validation.touched,
                            'basic.supervisorNextHigher'
                          ) &&
                          getIn(validation.errors, 'basic.supervisorNextHigher')
                            ? true
                            : false
                        }
                      >
                        <option value="" disabled>
                          Choose...
                        </option>
                        {supervisorManagers.map((supervisorManager, index) => (
                          <option key={index} value={supervisorManager}>
                            {supervisorManager}
                          </option>
                        ))}
                      </Input>
                      {getIn(
                        validation.touched,
                        'basic.supervisorNextHigher'
                      ) &&
                      getIn(validation.errors, 'basic.supervisorNextHigher') ? (
                        <FormFeedback type="invalid">
                          {getIn(
                            validation.errors,
                            'basic.supervisorNextHigher'
                          )}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* Appointment Type */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="appointment-type-select">
                        Appointment Type
                      </Label>
                      <Input
                        name="basic.appointmentType"
                        type="select"
                        className="form-control"
                        id="appointment-type-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.basic.appointmentType || ''}
                        invalid={
                          getIn(validation.touched, 'basic.appointmentType') &&
                          getIn(validation.errors, 'basic.appointmentType')
                            ? true
                            : false
                        }
                      >
                        <option value="" disabled>
                          Choose...
                        </option>
                        {appointmentTypes.map((appointmentType, index) => (
                          <option key={index} value={appointmentType}>
                            {appointmentType}
                          </option>
                        ))}
                      </Input>
                      {getIn(validation.touched, 'basic.appointmentType') &&
                      getIn(validation.errors, 'basic.appointmentType') ? (
                        <FormFeedback type="invalid">
                          {getIn(validation.errors, 'basic.appointmentType')}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* Publication Mode */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="publication-mode-select">
                        Publication Mode
                      </Label>
                      <Input
                        name="basic.publicationMode"
                        type="select"
                        className="form-control"
                        id="publication-mode-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.basic.publicationMode || ''}
                        invalid={
                          getIn(validation.touched, 'basic.publicationMode') &&
                          getIn(validation.errors, 'basic.publicationMode')
                            ? true
                            : false
                        }
                      >
                        <option value="" disabled>
                          Choose...
                        </option>
                        {publicationModes.map((publicationMode, index) => (
                          <option key={index} value={publicationMode}>
                            {publicationMode}
                          </option>
                        ))}
                      </Input>
                      {getIn(validation.touched, 'basic.publicationMode') &&
                      getIn(validation.errors, 'basic.publicationMode') ? (
                        <FormFeedback type="invalid">
                          {getIn(validation.errors, 'basic.publicationMode')}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* Machine, Equipment, & Tools Used Regularly in Performance of Work */}
                  <Col lg={6}>
                    <FormGroup>
                      <Label for="tools-used-input">
                        Machine, Equipment, & Tools Used Regularly in
                        Performance of Work
                      </Label>
                      <Input
                        name="basic.toolsUsed"
                        type="text"
                        className="form-control"
                        id="tools-used-input"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.basic.toolsUsed || ''}
                        invalid={
                          getIn(validation.touched, 'basic.toolsUsed') &&
                          getIn(validation.errors, 'basic.toolsUsed')
                            ? true
                            : false
                        }
                      />
                      {getIn(validation.touched, 'basic.toolsUsed') &&
                      getIn(validation.errors, 'basic.toolsUsed') ? (
                        <FormFeedback type="invalid">
                          {getIn(validation.errors, 'basic.toolsUsed')}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>

                <hr className="my-4"></hr>
                <h5>Position Title, and Item of those Directly Supervised</h5>
                <Row>
                  {/* Directly Supervised Position Title */}
                  <Col lg={6}>
                    <FormGroup>
                      <Label for="directly-supervised-input">
                        Position Title
                      </Label>
                      <Input
                        name="basic.directlySupervised"
                        type="text"
                        className="form-control"
                        id="directly-supervised-input"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.basic.directlySupervised || ''}
                      />
                    </FormGroup>
                  </Col>

                  {/* Directly Supervised Plantilla Number */}
                  <Col lg={6}>
                    <FormGroup>
                      <Label for="directly-supervised-item-numbers-input">
                        Item Number
                      </Label>
                      <Input
                        name="basic.directlySupervisedItemNumbers"
                        type="text"
                        className="form-control"
                        id="directly-supervised-item-numbers-input"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.basic
                            .directlySupervisedItemNumbers || ''
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <hr className="my-4"></hr>

                {/* CONTACTS / CLIENTS / STAKEHOLDER */}
                <h5>Contacts / Clients / Stakeholders</h5>
                <h6>Internal</h6>
                <Row className="mt-2">
                  {/* Executive / Managerial */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="executive-select">
                        Executive / Managerial
                      </Label>
                      <Input
                        name="contacts.internal.executiveIsOccasional"
                        type="select"
                        className="form-control"
                        id="executive-select"
                        onChange={selectedValue => {
                          validation.setFieldValue(
                            'contacts.internal.executiveIsOccasional',
                            stringToBool(selectedValue.target.value)
                          )
                        }}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.contacts.internal
                            .executiveIsOccasional
                        }
                        invalid={
                          getIn(
                            validation.touched,
                            'contacts.internal.executiveIsOccasional'
                          ) &&
                          getIn(
                            validation.errors,
                            'contacts.internal.executiveIsOccasional'
                          )
                            ? true
                            : false
                        }
                      >
                        {frequencies.map((frequency, index) => (
                          <option key={index} value={frequency.value}>
                            {frequency.name}
                          </option>
                        ))}
                      </Input>
                      {getIn(
                        validation.touched,
                        'contacts.internal.executiveIsOccasional'
                      ) &&
                      getIn(
                        validation.errors,
                        'contacts.internal.executiveIsOccasional'
                      ) ? (
                        <FormFeedback type="invalid">
                          {getIn(
                            validation.errors,
                            'contacts.internal.executiveIsOccasional'
                          )}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* Supervisors */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="supervisors-select">Supervisors</Label>
                      <Input
                        name="contacts.internal.supervisorIsOccasional"
                        type="select"
                        className="form-control"
                        id="supervisors-select"
                        onChange={selectedValue => {
                          validation.setFieldValue(
                            'contacts.internal.supervisorIsOccasional',
                            stringToBool(selectedValue.target.value)
                          )
                        }}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.contacts.internal
                            .supervisorIsOccasional
                        }
                        invalid={
                          getIn(
                            validation.touched,
                            'contacts.internal.supervisorIsOccasional'
                          ) &&
                          getIn(
                            validation.errors,
                            'contacts.internal.supervisorIsOccasional'
                          )
                            ? true
                            : false
                        }
                      >
                        {frequencies.map((frequency, index) => (
                          <option key={index} value={frequency.value}>
                            {frequency.name}
                          </option>
                        ))}
                      </Input>
                      {getIn(
                        validation.touched,
                        'contacts.internal.supervisorIsOccasional'
                      ) &&
                      getIn(
                        validation.errors,
                        'contacts.internal.supervisorIsOccasional'
                      ) ? (
                        <FormFeedback type="invalid">
                          {getIn(
                            validation.errors,
                            'contacts.internal.supervisorIsOccasional'
                          )}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* Non-Supervisors */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="non-supervisors-select">
                        Non-Supervisors
                      </Label>
                      <Input
                        name="contacts.internal.nonSupervisorIsOccasional"
                        type="select"
                        className="form-control"
                        id="non-supervisors-select"
                        onChange={selectedValue => {
                          validation.setFieldValue(
                            'contacts.internal.nonSupervisorIsOccasional',
                            stringToBool(selectedValue.target.value)
                          )
                        }}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.contacts.internal
                            .nonSupervisorIsOccasional
                        }
                        invalid={
                          getIn(
                            validation.touched,
                            'contacts.internal.nonSupervisorIsOccasional'
                          ) &&
                          getIn(
                            validation.errors,
                            'contacts.internal.nonSupervisorIsOccasional'
                          )
                            ? true
                            : false
                        }
                      >
                        {frequencies.map((frequency, index) => (
                          <option key={index} value={frequency.value}>
                            {frequency.name}
                          </option>
                        ))}
                      </Input>
                      {getIn(
                        validation.touched,
                        'contacts.internal.nonSupervisorIsOccasional'
                      ) &&
                      getIn(
                        validation.errors,
                        'contacts.internal.nonSupervisorIsOccasional'
                      ) ? (
                        <FormFeedback type="invalid">
                          {getIn(
                            validation.errors,
                            'contacts.internal.nonSupervisorIsOccasional'
                          )}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* Staff */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="staff-select">Staff</Label>
                      <Input
                        name="contacts.internal.staffIsOccasional"
                        type="select"
                        className="form-control"
                        id="staff-select"
                        onChange={selectedValue => {
                          validation.setFieldValue(
                            'contacts.internal.staffIsOccasional',
                            stringToBool(selectedValue.target.value)
                          )
                        }}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.contacts.internal.staffIsOccasional
                        }
                        invalid={
                          getIn(
                            validation.touched,
                            'contacts.internal.staffIsOccasional'
                          ) &&
                          getIn(
                            validation.errors,
                            'contacts.internal.staffIsOccasional'
                          )
                            ? true
                            : false
                        }
                      >
                        {frequencies.map((frequency, index) => (
                          <option key={index} value={frequency.value}>
                            {frequency.name}
                          </option>
                        ))}
                      </Input>
                      {getIn(
                        validation.touched,
                        'contacts.internal.staffIsOccasional'
                      ) &&
                      getIn(
                        validation.errors,
                        'contacts.internal.staffIsOccasional'
                      ) ? (
                        <FormFeedback type="invalid">
                          {getIn(
                            validation.errors,
                            'contacts.internal.staffIsOccasional'
                          )}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>

                <h6>External</h6>
                <Row className="mt-2">
                  {/* General Public */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="general-public-select">General Public</Label>
                      <Input
                        name="contacts.external.generalPublicIsOccasional"
                        type="select"
                        className="form-control"
                        id="general-public-select"
                        onChange={selectedValue => {
                          validation.setFieldValue(
                            'contacts.external.generalPublicIsOccasional',
                            stringToBool(selectedValue.target.value)
                          )
                        }}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.contacts.external
                            .generalPublicIsOccasional
                        }
                        invalid={
                          getIn(
                            validation.touched,
                            'contacts.external.generalPublicIsOccasional'
                          ) &&
                          getIn(
                            validation.errors,
                            'contacts.external.generalPublicIsOccasional'
                          )
                            ? true
                            : false
                        }
                      >
                        {frequencies.map((frequency, index) => (
                          <option key={index} value={frequency.value}>
                            {frequency.name}
                          </option>
                        ))}
                      </Input>
                      {getIn(
                        validation.touched,
                        'contacts.external.generalPublicIsOccasional'
                      ) &&
                      getIn(
                        validation.errors,
                        'contacts.external.generalPublicIsOccasional'
                      ) ? (
                        <FormFeedback type="invalid">
                          {getIn(
                            validation.errors,
                            'contacts.external.generalPublicIsOccasional'
                          )}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* Other Agencies */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="other-agencies-select">Other Agencies</Label>
                      <Input
                        name="contacts.external.otherAgenciesIsOccasional"
                        type="select"
                        className="form-control"
                        id="other-agencies-select"
                        onChange={selectedValue => {
                          validation.setFieldValue(
                            'contacts.external.otherAgenciesIsOccasional',
                            stringToBool(selectedValue.target.value)
                          )
                        }}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.contacts.external
                            .otherAgenciesIsOccasional
                        }
                        invalid={
                          getIn(
                            validation.touched,
                            'contacts.external.otherAgenciesIsOccasional'
                          ) &&
                          getIn(
                            validation.errors,
                            'contacts.external.otherAgenciesIsOccasional'
                          )
                            ? true
                            : false
                        }
                      >
                        {frequencies.map((frequency, index) => (
                          <option key={index} value={frequency.value}>
                            {frequency.name}
                          </option>
                        ))}
                      </Input>
                      {getIn(
                        validation.touched,
                        'contacts.external.otherAgenciesIsOccasional'
                      ) &&
                      getIn(
                        validation.errors,
                        'contacts.external.otherAgenciesIsOccasional'
                      ) ? (
                        <FormFeedback type="invalid">
                          {getIn(
                            validation.errors,
                            'contacts.external.otherAgenciesIsOccasional'
                          )}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* Others */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="others-external-input">
                        Others (please Specify):
                      </Label>
                      <Input
                        name="contacts.external.others"
                        type="text"
                        className="form-control"
                        id="others-external-input"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.contacts.external.others || ''}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <hr className="my-4"></hr>

                {/* WORKING CONDITION */}
                <h5>Working Condition</h5>
                <Row className="mt-2">
                  {/* Office Work */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="office-work-select">Office Work</Label>
                      <Input
                        name="workingCondition.isOfficeWork"
                        type="select"
                        className="form-control"
                        id="office-work-select"
                        onChange={selectedValue => {
                          validation.setFieldValue(
                            'workingCondition.isOfficeWork',
                            stringToBool(selectedValue.target.value)
                          )
                        }}
                        onBlur={validation.handleBlur}
                        value={validation.values.workingCondition.isOfficeWork}
                        invalid={
                          getIn(
                            validation.touched,
                            'workingCondition.isOfficeWork'
                          ) &&
                          getIn(
                            validation.errors,
                            'workingCondition.isOfficeWork'
                          )
                            ? true
                            : false
                        }
                      >
                        {frequencies.map((frequency, index) => (
                          <option key={index} value={frequency.value}>
                            {frequency.name}
                          </option>
                        ))}
                      </Input>
                      {getIn(
                        validation.touched,
                        'workingCondition.isOfficeWork'
                      ) &&
                      getIn(
                        validation.errors,
                        'workingCondition.isOfficeWork'
                      ) ? (
                        <FormFeedback type="invalid">
                          {getIn(
                            validation.errors,
                            'workingCondition.isOfficeWork'
                          )}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* Field Work */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="field-work-select">Field Work</Label>
                      <Input
                        name="workingCondition.isFieldWork"
                        type="select"
                        className="form-control"
                        id="field-work-select"
                        onChange={selectedValue => {
                          validation.setFieldValue(
                            'workingCondition.isFieldWork',
                            stringToBool(selectedValue.target.value)
                          )
                        }}
                        onBlur={validation.handleBlur}
                        value={validation.values.workingCondition.isFieldWork}
                        invalid={
                          getIn(
                            validation.touched,
                            'workingCondition.isFieldWork'
                          ) &&
                          getIn(
                            validation.errors,
                            'workingCondition.isFieldWork'
                          )
                            ? true
                            : false
                        }
                      >
                        {frequencies.map((frequency, index) => (
                          <option key={index} value={frequency.value}>
                            {frequency.name}
                          </option>
                        ))}
                      </Input>
                      {getIn(
                        validation.touched,
                        'workingCondition.isFieldWork'
                      ) &&
                      getIn(
                        validation.errors,
                        'workingCondition.isFieldWork'
                      ) ? (
                        <FormFeedback type="invalid">
                          {getIn(
                            validation.errors,
                            'workingCondition.isFieldWork'
                          )}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* Others */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="others-working-condition-input">
                        Others (please Specify):
                      </Label>
                      <Input
                        name="workingCondition.others"
                        type="text"
                        className="form-control"
                        id="others-working-condition-input"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.workingCondition.others || ''}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" form="dbmCscAdditionalInfoForm" color="info">
                Submit
              </Button>
            </ModalFooter>
          </CardBody>
        </Card>
      </Modal>
    </>
  )
}

DbmCscAdditionalInfo.propTypes = {
  showDbmCscAdditionalInfo: PropTypes.bool,
  handleCloseDbmCscAdditionalInfoModal: PropTypes.func,
  applicantData: PropTypes.shape({
    applicantEndorsementId: PropTypes.string,
    postingApplicantId: PropTypes.string,
    applicantName: PropTypes.string,
  }),
  vppId: PropTypes.string,
}

export default DbmCscAdditionalInfo
