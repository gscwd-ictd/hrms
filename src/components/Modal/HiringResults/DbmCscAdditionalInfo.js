import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import {
  workstations,
  supervisorManagers,
  appointmentTypes,
  publicationModes,
  frequencies,
  natureOfAppointment2,
  viceTypes,
} from 'constants/selectInputs'

import { useDispatch, useSelector } from 'react-redux'
import {
  addDbmCscAdditionalData,
  fetchAvailableItemNumbers,
  resetApplicantsResponses,
  fetchSelectedByAppointingAuth,
  fetchSelectionForCoaCertification,
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
import { useFormik, FormikProvider, getIn, FieldArray } from 'formik'

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

  // redux store state for selection on certified by
  const {
    selectionForCoaCertification,
    loadingSelectionForCoaCertification,
    errorSelectionForCoaCertification,
  } = useSelector(state => ({
    selectionForCoaCertification:
      state.publications.selectionForCoaCertification,
    loadingSelectionForCoaCertification:
      state.publications.loading.loadingSelectionForCoaCertification,
    errorSelectionForCoaCertification:
      state.publications.error.errorSelectionForCoaCertification,
  }))

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      basic: {
        postingApplicantId: applicantData.postingApplicantId,
        itemNumber: '',
        immediateSupervisor: '',
        supervisorNextHigher: '',
        toolsUsed: '',
        workStation: '',
        appointmentType: '',
        publicationMode: '',
        directlySupervised: [
          {
            title: '',
            itemNumber: '',
          },
        ],
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
      certificateOfAppointment: {
        natureOfAppointment: '',
        vice: '',
        viceType: null,
        fieldPage: '',
        certifiedBy: '',
        psbDurationStartDate: '',
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
        directlySupervised: Yup.array().of(
          Yup.object().shape({
            title: Yup.string().required(
              'Title is required. Indicate NONE if Not applicable'
            ),
            itemNumber: Yup.string().required(
              'Title is required. Indicate NONE if Not applicable'
            ),
          })
        ),
        // presentAppropriationAct: Yup.string().required(
        //   'This field is required'
        // ),
        // previousAppropriationAct: Yup.string().required(
        //   'This field is required'
        // ),
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
      certificateOfAppointment: Yup.object().shape({
        natureOfAppointment: Yup.string().required(
          'Please select a nature of appointment'
        ),
        fieldPage: Yup.string().required('Please input the page no.'),
        certifiedBy: Yup.string().required(
          'Please select a employee that will certify'
        ),
        psbDurationStartDate: Yup.string().required(
          'Please select enter a date'
        ),
      }),
    }),

    onSubmit: values => {
      dispatch(addDbmCscAdditionalData(values))
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
      dispatch(fetchSelectionForCoaCertification())
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
          DBM-CSC Form | {applicantData.applicantName}
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

        {errorSelectionForCoaCertification ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorSelectionForCoaCertification}
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

                  {/* Present Approp Act */}
                  {/* <Col lg={4}>
                    <FormGroup>
                      <Label for="present-approp-act-input">
                        Present Approp Act
                      </Label>
                      <Input
                        name="basic.presentAppropriationAct"
                        type="text"
                        className="form-control"
                        id="present-approp-act-input"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.basic.presentAppropriationAct || ''
                        }
                        invalid={
                          getIn(
                            validation.touched,
                            'basic.presentAppropriationAct'
                          ) &&
                          getIn(
                            validation.errors,
                            'basic.presentAppropriationAct'
                          )
                            ? true
                            : false
                        }
                      />
                      {getIn(
                        validation.touched,
                        'basic.presentAppropriationAct'
                      ) &&
                      getIn(
                        validation.errors,
                        'basic.presentAppropriationAct'
                      ) ? (
                        <FormFeedback type="invalid">
                          {getIn(
                            validation.errors,
                            'basic.presentAppropriationAct'
                          )}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col> */}

                  {/* Previous Approp Act */}
                  {/* <Col lg={4}>
                    <FormGroup>
                      <Label for="previous-approp-act-input">
                        Previous Approp Act
                      </Label>
                      <Input
                        name="basic.previousAppropriationAct"
                        type="text"
                        className="form-control"
                        id="present-approp-act-input"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.basic.previousAppropriationAct || ''
                        }
                        invalid={
                          getIn(
                            validation.touched,
                            'basic.previousAppropriationAct'
                          ) &&
                          getIn(
                            validation.errors,
                            'basic.previousAppropriationAct'
                          )
                            ? true
                            : false
                        }
                      />
                      {getIn(
                        validation.touched,
                        'basic.previousAppropriationAct'
                      ) &&
                      getIn(
                        validation.errors,
                        'basic.previousAppropriationAct'
                      ) ? (
                        <FormFeedback type="invalid">
                          {getIn(
                            validation.errors,
                            'basic.previousAppropriationAct'
                          )}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col> */}

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

                {/* DIRECTLY SUPERVISED */}
                <h5>Position Title, and Item of those Directly Supervised</h5>

                <FormikProvider value={validation}>
                  <FieldArray
                    name="basic.directlySupervised"
                    render={arrayHelpers => (
                      <div>
                        {validation.values.basic.directlySupervised?.length >
                          0 &&
                          validation.values.basic.directlySupervised?.map(
                            (position, index) => (
                              <Row
                                key={index}
                                style={{ alignItems: 'flex-end' }}
                              >
                                {/* Directly Supervised Position Title */}
                                <Col lg={6}>
                                  <FormGroup>
                                    <Label for={`position-${index}-title`}>
                                      Position Title
                                    </Label>
                                    <Input
                                      name={`basic.directlySupervised.${index}.title`}
                                      type="text"
                                      className="form-control"
                                      id={`position-${index}-title`}
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={
                                        validation.values.basic
                                          .directlySupervised?.[index].title ||
                                        ''
                                      }
                                      invalid={
                                        getIn(
                                          validation.touched,
                                          `basic.directlySupervised.${index}.title`
                                        ) &&
                                        getIn(
                                          validation.errors,
                                          `basic.directlySupervised.${index}.title`
                                        )
                                          ? true
                                          : false
                                      }
                                    />
                                    {getIn(
                                      validation.touched,
                                      `basic.directlySupervised.${index}.title`
                                    ) &&
                                    getIn(
                                      validation.errors,
                                      `basic.directlySupervised.${index}.title`
                                    ) ? (
                                      <FormFeedback type="invalid">
                                        {getIn(
                                          validation.errors,
                                          `basic.directlySupervised.${index}.title`
                                        )}
                                      </FormFeedback>
                                    ) : null}
                                  </FormGroup>
                                </Col>

                                {/* Directly Supervised Plantilla Number */}
                                <Col lg={5}>
                                  <FormGroup>
                                    <Label for={`position-${index}-itemNumber`}>
                                      Item Number
                                    </Label>
                                    <Input
                                      name={`basic.directlySupervised.${index}.itemNumber`}
                                      type="text"
                                      className="form-control"
                                      id={`position-${index}-itemNumber`}
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={
                                        validation.values.basic
                                          .directlySupervised?.[index]
                                          .itemNumber || ''
                                      }
                                      invalid={
                                        getIn(
                                          validation.touched,
                                          `basic.directlySupervised.${index}.itemNumber`
                                        ) &&
                                        getIn(
                                          validation.errors,
                                          `basic.directlySupervised.${index}.itemNumber`
                                        )
                                          ? true
                                          : false
                                      }
                                    />
                                    {getIn(
                                      validation.touched,
                                      `basic.directlySupervised.${index}.itemNumber`
                                    ) &&
                                    getIn(
                                      validation.errors,
                                      `basic.directlySupervised.${index}.itemNumber`
                                    ) ? (
                                      <FormFeedback type="invalid">
                                        {getIn(
                                          validation.errors,
                                          `basic.directlySupervised.${index}.itemNumber`
                                        )}
                                      </FormFeedback>
                                    ) : null}
                                  </FormGroup>
                                </Col>

                                {/** Show add button to first entry only. Remove button to index 1 and up */}
                                {index == 0 ? (
                                  <Col lg={1}>
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        arrayHelpers.push({
                                          title: '',
                                          itemNumber: '',
                                        })
                                      }
                                      className="mb-3 btn-success"
                                    >
                                      +
                                    </Button>
                                  </Col>
                                ) : (
                                  <Col lg={1}>
                                    <Button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                      className="mb-3 btn-danger"
                                    >
                                      -
                                    </Button>
                                  </Col>
                                )}
                              </Row>
                            )
                          )}
                      </div>
                    )}
                  />
                </FormikProvider>

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

                <hr className="my-4"></hr>

                {/* CERTIFICATE OF APPOINTMENT */}
                <h5>Certificate of Appointment Additional Details</h5>
                <Row className="mt-2">
                  {/* Nature of Appointment */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="nature-of-appointment-select">
                        Nature of Appointment
                      </Label>
                      <Input
                        name="certificateOfAppointment.natureOfAppointment"
                        type="select"
                        className="form-control"
                        id="nature-of-appointment-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.certificateOfAppointment
                            .natureOfAppointment || ''
                        }
                        invalid={
                          getIn(
                            validation.touched,
                            'certificateOfAppointment.natureOfAppointment'
                          ) &&
                          getIn(
                            validation.errors,
                            'certificateOfAppointment.natureOfAppointment'
                          )
                            ? true
                            : false
                        }
                      >
                        <option value="" disabled>
                          Choose...
                        </option>
                        {natureOfAppointment2.map((appointment, index) => (
                          <option key={index} value={appointment.value}>
                            {appointment.label}
                          </option>
                        ))}
                      </Input>
                      {getIn(
                        validation.touched,
                        'certificateOfAppointment.natureOfAppointment'
                      ) &&
                      getIn(
                        validation.errors,
                        'certificateOfAppointment.natureOfAppointment'
                      ) ? (
                        <FormFeedback type="invalid">
                          {getIn(
                            validation.errors,
                            'certificateOfAppointment.natureOfAppointment'
                          )}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* Vice (Employee Name) */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="vice-input">Vice Name</Label>
                      <Input
                        name="certificateOfAppointment.vice"
                        type="text"
                        className="form-control"
                        id="vice-input"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.certificateOfAppointment.vice || ''
                        }
                      />
                    </FormGroup>
                  </Col>

                  {/* Vice Type */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="vice-type-select">Vice Type</Label>
                      <Input
                        name="certificateOfAppointment.viceType"
                        type="select"
                        className="form-control"
                        id="vice-type-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.certificateOfAppointment.viceType ||
                          ''
                        }
                        invalid={
                          getIn(
                            validation.touched,
                            'certificateOfAppointment.viceType'
                          ) &&
                          getIn(
                            validation.errors,
                            'certificateOfAppointment.viceType'
                          )
                            ? true
                            : false
                        }
                      >
                        <option value="" disabled>
                          Choose...
                        </option>
                        {viceTypes.map((viceType, index) => (
                          <option key={index} value={viceType.value}>
                            {viceType.label}
                          </option>
                        ))}
                      </Input>
                      {getIn(
                        validation.touched,
                        'certificateOfAppointment.viceType'
                      ) &&
                      getIn(
                        validation.errors,
                        'certificateOfAppointment.viceType'
                      ) ? (
                        <FormFeedback type="invalid">
                          {getIn(
                            validation.errors,
                            'certificateOfAppointment.viceType'
                          )}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* Page */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="page-input">Page No.</Label>
                      <Input
                        name="certificateOfAppointment.fieldPage"
                        type="text"
                        className="form-control"
                        id="field-page-input"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.certificateOfAppointment
                            .fieldPage || ''
                        }
                      />
                    </FormGroup>
                  </Col>

                  {/* PSB Duration Start Date */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="psb-start-date-input">
                        PSB Duration Start Date
                      </Label>
                      <Input
                        name="certificateOfAppointment.psbDurationStartDate"
                        type="date"
                        className="form-control"
                        id="field-psb-start-date-input"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.certificateOfAppointment
                            .psbDurationStartDate || ''
                        }
                      />
                    </FormGroup>
                  </Col>

                  {/* Certified By */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label for="certified-by-select">Certified By</Label>
                      <Input
                        name="certificateOfAppointment.certifiedBy"
                        type="select"
                        className="form-control"
                        id="certified-by-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.certificateOfAppointment
                            .certifiedBy || ''
                        }
                        invalid={
                          getIn(
                            validation.touched,
                            'certificateOfAppointment.certifiedBy'
                          ) &&
                          getIn(
                            validation.errors,
                            'certificateOfAppointment.certifiedBy'
                          )
                            ? true
                            : false
                        }
                      >
                        <option value="" disabled>
                          Choose...
                        </option>
                        {selectionForCoaCertification.map(employee => (
                          <option
                            key={employee.value.employeeId}
                            value={employee.value.employeeId}
                          >
                            {employee.label} | {employee.value.positionTitle}
                          </option>
                        ))}
                      </Input>
                      {getIn(
                        validation.touched,
                        'certificateOfAppointment.certifiedBy'
                      ) &&
                      getIn(
                        validation.errors,
                        'certificateOfAppointment.certifiedBy'
                      ) ? (
                        <FormFeedback type="invalid">
                          {getIn(
                            validation.errors,
                            'certificateOfAppointment.certifiedBy'
                          )}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                form="dbmCscAdditionalInfoForm"
                color="info"
              >
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
