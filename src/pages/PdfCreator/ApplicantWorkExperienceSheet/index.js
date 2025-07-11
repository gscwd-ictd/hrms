import React, { useEffect, useState } from 'react'
import { Can } from 'casl/Can'
import { Container } from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import WesDocument from './WesDocument'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PDFViewer } from '@react-pdf/renderer'
import { isEmpty } from 'lodash'

const ApplicantWorkExperienceSheetPdf = () => {
  const [applicantFullName, setApplicantFullName] = useState('')

  // Redux state for loading applicant work experience sheet
  const { personalInfo, applicantWes, isLoading } = useSelector(state => ({
    personalInfo: state.applicants.pds.personalInfo,
    applicantWes: state.applicants.wes,
    isLoading: state.applicants.loading.laodingApplicantWes,
  }))

  const middleNameStr = mName => {
    if (mName === '' || mName === 'N/A' || mName === null) {
      return ''
    } else {
      return `${mName[0]}.`
    }
  }

  const nameExtStr = nExt => {
    if (nExt === '' || nExt === 'N/A' || nExt === null) {
      return ''
    } else {
      return `, ${nExt}`
    }
  }

  useEffect(() => {
    if (!isEmpty(personalInfo)) {
      const strFullName = `${personalInfo?.firstName || ''} ${middleNameStr(
        personalInfo?.middleName
      )} ${personalInfo?.lastName || ''} ${nameExtStr(
        personalInfo?.nameExtension
      )}`

      setApplicantFullName(strFullName)
    }
  }, [personalInfo])

  return (
    <React.Fragment>
      <Can I="access" this="Personnel_selection">
        <div className="page-content pt-3">
          <Container fluid={true}>
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <PDFViewer width={'100%'} height={800} showToolbar>
                <WesDocument
                  applicantWes={applicantWes}
                  applicantFullName={applicantFullName}
                />
              </PDFViewer>
            )}
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Personnel_selection">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default ApplicantWorkExperienceSheetPdf
