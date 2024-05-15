import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import {
  fetchJobDescription,
  fetchPositionDuties,
  fetchPositionQualificationStandards,
  fetchCompetencyProficiencyLevels,
} from 'store/actions'
import { useDispatch, useSelector } from 'react-redux'

import {
  Alert,
  Col,
  Row,
  Label,
  Form,
  Input,
  FormGroup,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'

import { PDFViewer } from '@react-pdf/renderer'
import PdDocument from 'pages/PdfCreator/PositionDescription/PdDocument'

// Extra components
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// styles
import 'toastr/build/toastr.min.css'
import 'styles/custom_gscwd/components/loadingindicator.scss'

const ViewPDModal = props => {
  const { showPDFPreview, plantillaId, handleCloseModal } = props

  const dispatch = useDispatch()

  // Redux state for job description
  const { jobDescription, loadingJobDescription, errorJobDescription } =
    useSelector(state => ({
      jobDescription: state.jobDescription.response.get,
      loadingJobDescription: state.jobDescription.loading.loadingJobDescription,
      errorJobDescription: state.jobDescription.error.errorJobDescription,
    }))

  // Redux state for duties and responsibilities
  const {
    positionDutyResponsibilities,
    loadingPositionDuties,
    errorPositionDuties,
  } = useSelector(state => ({
    positionDutyResponsibilities:
      state.dutiesResponsibilities.response.positionDutyResponsibilities,
    loadingPositionDuties:
      state.dutiesResponsibilities.loading.loadingPositionDuties,
    errorPositionDuties: state.dutiesResponsibilities.error.errorPositionDuties,
  }))

  // Redux state for qualification standards
  const {
    positionQualificationStandards,
    loadingPositionQualificationStandards,
    errorPositionQualificationStandards,
  } = useSelector(state => ({
    positionQualificationStandards: state.qualificationStandards.position.get,
    loadingPositionQualificationStandards:
      state.qualificationStandards.loading
        .loadingPositionQualificationStandards,
    errorPositionQualificationStandards:
      state.qualificationStandards.error.errorPositionQualificationStandards,
  }))

  // Redux state for competency standards
  const { proficiencyLevel, loadingProficiencyLevel, errorProficiencyLevel } =
    useSelector(state => ({
      proficiencyLevel: state.positionCompetencySet.response.proficiencyLevel,
      loadingProficiencyLevel:
        state.positionCompetencySet.loading.loadingProficiencyLevel,
      errorProficiencyLevel:
        state.positionCompetencySet.error.errorProficiencyLevel,
    }))

  // useEffect(() => {
  //   console.log(jobDescription)
  //   console.log(positionDutyResponsibilities)
  //   console.log(positionQualificationStandards)
  //   console.log(proficiencyLevel)
  // }, [
  //   jobDescription,
  //   positionDutyResponsibilities,
  //   positionQualificationStandards,
  //   proficiencyLevel,
  // ])

  // Initial dispatch of values needed for adding a new position
  useEffect(() => {
    if (showPDFPreview) {
      dispatch(fetchJobDescription(plantillaId)) // fetch job description of plantilla position
      dispatch(fetchPositionDuties(plantillaId)) // fetch position duties of plantilla position
      dispatch(fetchPositionQualificationStandards(plantillaId)) // fetch qualification standards of plantilla position
      dispatch(fetchCompetencyProficiencyLevels(plantillaId)) // fetch competencies of plantilla position
    }
  }, [showPDFPreview])

  return (
    <>
      {/* Error Notif */}
      {errorJobDescription ? (
        <ToastrNotification
          toastType={'error'}
          notifMessage={errorJobDescription}
        />
      ) : null}

      {errorPositionDuties ? (
        <ToastrNotification
          toastType={'error'}
          notifMessage={errorPositionDuties}
        />
      ) : null}

      {errorPositionQualificationStandards ? (
        <ToastrNotification
          toastType={'error'}
          notifMessage={errorPositionQualificationStandards}
        />
      ) : null}

      {errorProficiencyLevel ? (
        <ToastrNotification
          toastType={'error'}
          notifMessage={errorProficiencyLevel}
        />
      ) : null}

      <Modal
        isOpen={showPDFPreview}
        toggle={handleCloseModal}
        size="xl"
        centered
      >
        <ModalHeader toggle={handleCloseModal}>
          Position Description Document
        </ModalHeader>

        <ModalBody>
          {loadingJobDescription ||
          loadingPositionDuties ||
          loadingPositionQualificationStandards ||
          loadingProficiencyLevel ? (
            <LoadingIndicator />
          ) : (
            <PDFViewer width={'100%'} height={700} showToolbar={false}>
              <PdDocument
                jobDescription={jobDescription}
                positionDutyResponsibilities={positionDutyResponsibilities}
                positionQualificationStandards={positionQualificationStandards}
                proficiencyLevel={proficiencyLevel}
              />
            </PDFViewer>
          )}
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Modal>
    </>
  )
}

ViewPDModal.propTypes = {
  showPDFPreview: PropTypes.bool,
  plantillaId: PropTypes.string,
  handleCloseModal: PropTypes.func,
}

export default ViewPDModal
