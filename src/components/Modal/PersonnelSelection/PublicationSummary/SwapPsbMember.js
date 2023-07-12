import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import {
  updateSwapPsbMember,
  fetchPsbDetails,
  fetchUnassignedPSBMembers,
} from 'store/actions'

import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  FormFeedback,
  Form,
} from 'reactstrap'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import Select from 'react-select'

// Formik formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

const SwapPsbMember = props => {
  const { showSwapPsbMember, vppId, memberRole, handleCloseSwapPsbMember } =
    props
  const dispatch = useDispatch()

  // whole value of the selected option with the label
  const [selectEmployee, setSelectEmployee] = useState(null)

  const {
    // Redux state for multi-select input of unassigned psb members
    getUnassignedPSBMembers,
    loadingGetUnassignedPSBMember,
    errorGetUnassignedPSBMember,

    // Redux state for patch on swap of psb member
    patchSwapPsbMember,
    loadingPatchSwapPsbMember,
  } = useSelector(state => ({
    getUnassignedPSBMembers:
      state.personnelSelectionBoard.response.get.unassignedPSBMembers,
    loadingGetUnassignedPSBMember:
      state.personnelSelectionBoard.loading.loadingGetUnassignedPSBMember,
    errorGetUnassignedPSBMember:
      state.personnelSelectionBoard.error.errorGetUnassignedPSBMember,

    patchSwapPsbMember:
      state.personnelSelectionBoard.response.patchSwapPsbMember,
    loadingPatchSwapPsbMember:
      state.personnelSelectionBoard.loading.loadingPatchSwapPsbMember,
  }))

  // Add PSB member data to redux state
  const handleSelectedPSBMember = optionValue => {
    setSelectEmployee(optionValue)
  }

  // Remove PSB text to memberRole
  const removePsbText = text => {
    return text.replace('PSB ', '')
  }

  // Formik and Yup initialization
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      psbNo: removePsbText(memberRole),
      vppId: vppId.vppId,
      employeeId: '',
    },
    validationSchema: Yup.object({
      employeeId: Yup.string().required('Please select a employee'),
    }),
    onSubmit: values => {
      dispatch(updateSwapPsbMember(values))
    },
  })

  // Initial fetch of employees that are not PSB
  useEffect(() => {
    if (showSwapPsbMember) {
      dispatch(fetchUnassignedPSBMembers(vppId.vppId))
    }
  }, [showSwapPsbMember])

  // Reload table and reset form
  useEffect(() => {
    if (!isEmpty(patchSwapPsbMember)) {
      formik.resetForm()
      // dispatch(fetchPsbDetails(vppId.vppId))
      setSelectEmployee(null)
      handleCloseSwapPsbMember()
    }
  }, [patchSwapPsbMember])

  return (
    <>
      <Modal
        isOpen={showSwapPsbMember}
        toggle={handleCloseSwapPsbMember}
        size="md"
        centered
      >
        <ModalHeader toggle={handleCloseSwapPsbMember}>
          Swap PSB Member
        </ModalHeader>

        {/* Notif */}
        {errorGetUnassignedPSBMember ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorGetUnassignedPSBMember}
          />
        ) : null}

        {loadingPatchSwapPsbMember ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        <ModalBody>
          <Form
            id="swapPsbMemberForm"
            onSubmit={e => {
              e.preventDefault()
              formik.handleSubmit()
              return false
            }}
          >
            <FormGroup>
              {/* <Select
                name="select-psb-member"
                onChange={e => {
                  handleSelectedPSBMember(e)
                }}
                value={selectedPSBMember || ''}
                options={getUnassignedPSBMembers}
              /> */}

              <Select
                name="employeeId"
                id="select-psb-member"
                onChange={selectedOption => {
                  formik.handleChange('employeeId')(
                    selectedOption.value.employeeId
                  )
                  handleSelectedPSBMember(selectedOption)
                }}
                onBlur={formik.handleBlur}
                value={selectEmployee || ''}
                options={getUnassignedPSBMembers}
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
                loading={loadingGetUnassignedPSBMember ? true : false}
                // isDisabled={loadingGetUnassignedPSBMember ? true : false}
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
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" form="swapPsbMemberForm" color="info">
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

SwapPsbMember.propTypes = {
  showSwapPsbMember: PropTypes.bool,
  vppId: PropTypes.object,
  memberRole: PropTypes.string,
  handleCloseSwapPsbMember: PropTypes.func,
}

export default SwapPsbMember
