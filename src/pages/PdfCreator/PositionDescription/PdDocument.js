import React from 'react'
import PropTypes from 'prop-types'

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer'
import Header from 'components/PdfDocuments/PositionDescription/Header'

// Fonts
import CalibriRegular from 'assets/fonts/uploads/calibri-regular.ttf'
import CalibriRegularBold from 'assets/fonts/uploads/calibri-regular-bold.ttf'
import { isEmpty } from 'lodash'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    paddingTop: 15,
    paddingBottom: 35,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 3,
  },
  bodyBorder: {
    marginHorizontal: 50,
  },

  // Table Styles
  rowContainerTable: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tHeadFirstLevel: {
    padding: '4 0 0 4',
  },
  tHeadSecondLevel: {
    fontFamily: 'CalibriRegularBold',
    padding: '4 0 0 4',
    textAlign: 'center',
  },
  tData: {
    padding: '4 4 0 4',
  },

  // Border Styles
  borderAll: {
    border: '1px solid #000000',
  },
  borderTop: {
    borderTop: '1px solid #000000',
  },
  borderRight: {
    borderRight: '1px solid #000000',
  },
  borderLeft: {
    borderLeft: '1px solid #000000',
  },
  borderBottom: {
    borderBottom: '1px solid #000000',
  },

  // Field Styles
  documentTitle: {
    fontFamily: 'CalibriRegularBold',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  headerText: {
    fontFamily: 'CalibriRegularBold',
    textDecoration: 'underline',
    fontSize: 13,
    marginTop: 15,
    marginBottom: 4,
  },
  bodyText: {
    fontFamily: 'CalibriRegular',
    fontSize: 12,
  },
  bodyTextBold: {
    fontFamily: 'CalibriRegularBold',
    fontSize: 12,
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  signatoryName: {
    fontFamily: 'CalibriRegularBold',
    textTransform: 'uppercase',
    marginTop: -15,
  },

  verticalCenter: { margin: 'auto 0' },
  horizontalCenter: { textAlign: 'center' },
  signature: {
    width: 90,
    marginHorizontal: 'auto',
  },

  // Width Styles
  w100: { width: '100%' },
  w75: { width: '75%' },
  w70: { width: '70%' },
  w60: { width: '60%' },
  w50: { width: '50%' },
  w40: { width: '40%' },
  w33_33: { width: '33.33%' },
  w30: { width: '30%' },
  w26: { width: '26%' },
  w20: { width: '20%' },
  w16: { width: '16%' },
  w15: { width: '15%' },
  w14: { width: '14%' },
  w10: { width: '10%' },
  w5: { width: '5%' },
})

Font.register({
  family: 'CalibriRegular',
  src: CalibriRegular,
})

Font.register({
  family: 'CalibriRegularBold',
  src: CalibriRegularBold,
})

const PdDocument = props => {
  const {
    jobDescription,
    positionDutyResponsibilities,
    positionQualificationStandards,
    proficiencyLevel,
    prfTrail,
    prfDetails,
  } = props

  const renderCoreDuties = () => {
    var content = positionDutyResponsibilities.duties.core.map(
      (duty, index) => {
        if (index === 0) {
          return (
            <View key={index} wrap={false}>
              <Text style={[styles.headerText]}>
                Statement of Duties and Responsibilities
              </Text>

              <View>
                <View style={[styles.rowContainerTable, styles.borderAll]}>
                  <View
                    style={[
                      styles.w14,
                      styles.tHeadSecondLevel,
                      styles.borderRight,
                    ]}
                  >
                    <Text>Percentage of Work</Text>
                  </View>

                  <View
                    style={[
                      styles.w60,
                      styles.tHeadSecondLevel,
                      styles.borderRight,
                    ]}
                  >
                    <Text>Duties and Responsibilities</Text>
                  </View>

                  <View style={[styles.w26, styles.tHeadSecondLevel]}>
                    <Text>Competency/Level</Text>
                  </View>
                </View>

                <View style={[styles.rowContainerTable, styles.borderAll]}>
                  <View style={[styles.w14, styles.tData, styles.borderRight]}>
                    <Text
                      style={[styles.horizontalCenter, styles.verticalCenter]}
                    >
                      {duty.percentage}
                    </Text>
                  </View>
                  <View style={[styles.w60, styles.tData, styles.borderRight]}>
                    <Text>{duty.description}</Text>
                  </View>
                  <View
                    style={[styles.w26, styles.tData, styles.horizontalCenter]}
                  >
                    <Text>{duty.competency} / </Text>
                    <Text>{duty.level}</Text>
                  </View>
                </View>
              </View>
            </View>
          )
        } else {
          return (
            <View
              style={[styles.rowContainerTable, styles.borderAll]}
              key={index}
              wrap={false}
            >
              <View style={[styles.w14, styles.tData, styles.borderRight]}>
                <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                  {duty.percentage}
                </Text>
              </View>
              <View style={[styles.w60, styles.tData, styles.borderRight]}>
                <Text>{duty.description}</Text>
              </View>
              <View style={[styles.w26, styles.tData, styles.horizontalCenter]}>
                <Text>{duty.competency} / </Text>
                <Text>{duty.level}</Text>
              </View>
            </View>
          )
        }
      }
    )

    return content
  }

  const renderCompetencies = () => {
    const allCompetencies = [
      ...proficiencyLevel.functional,
      ...proficiencyLevel.crossCutting,
      ...proficiencyLevel.managerial,
    ]

    const orderMap = new Map()
    positionDutyResponsibilities.duties.core.forEach((duty, index) => {
      orderMap.set(duty.competency, index)
    })

    allCompetencies.sort((a, b) => {
      const indexA = orderMap.get(a.name)
      const indexB = orderMap.get(b.name)

      return indexA - indexB
    })

    var content = allCompetencies.map((competency, index) => (
      <View
        style={[styles.rowContainerTable, styles.borderAll]}
        key={index}
        wrap={false}
      >
        <View style={[styles.w60, styles.tData, styles.borderRight]}>
          <Text
            style={{ fontFamily: 'CalibriRegularBold', textAlign: 'center' }}
          >
            {competency.name}
          </Text>

          <Text style={{ textAlign: 'justify' }}>{competency.description}</Text>
        </View>
        <View style={[styles.w40, styles.tData]}>
          <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
            {competency.level}
          </Text>
        </View>
      </View>
    ))

    return content
  }

  const renderReviewedBy = () => {
    var content = (
      <>
        {prfDetails?.from.name === prfTrail.department.name ||
        prfTrail.department.status === 'N/A' ? (
          <Text
            style={[
              {
                fontFamily: 'CalibriRegularBold',
                textTransform: 'uppercase',
                paddingTop: 40,
              },
            ]}
          >
            N/A
          </Text>
        ) : (
          <>
            <Image
              src={`${process.env.REACT_APP_IMAGE_SERVER_URL}${prfTrail.department.signatureUrl}`}
              style={[styles.signature]}
            />
            <Text style={[styles.signatoryName]}>
              {prfTrail.department.name}
            </Text>
            <Text>{prfTrail.department.position}</Text>
          </>
        )}
      </>
    )

    return content
  }

  const renderRecommendedBy = () => {
    var content = (
      <>
        {prfDetails?.from.name === prfTrail.agm.name ||
        prfTrail.agm.status === 'N/A' ? (
          <Text
            style={[
              {
                fontFamily: 'CalibriRegularBold',
                textTransform: 'uppercase',
                paddingTop: 25,
              },
            ]}
          >
            N/A
          </Text>
        ) : (
          <>
            <Image
              src={`${process.env.REACT_APP_IMAGE_SERVER_URL}${prfTrail.agm.signatureUrl}`}
              style={[styles.signature]}
            />
            <Text style={[styles.signatoryName]}>{prfTrail.agm.name}</Text>
            <Text>{prfTrail.agm.position}</Text>
          </>
        )}
      </>
    )

    return content
  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <Document
      author="General Santos City Water District"
      subject="Position Description - HRD-014-3"
      title={'Position Description for ' + jobDescription.itemNumber}
    >
      <Page size="A4" style={styles.page}>
        <Header />

        <View style={[styles.bodyBorder]}>
          {/* Document Title */}
          <View style={[styles.documentTitle]}>
            <Text>POSITION DESCRIPTION</Text>
          </View>

          <View style={[styles.bodyText]}>
            {/* JOB DESCRIPTION */}
            <View wrap={false}>
              {/* Item Number */}
              <View style={[styles.rowContainer]}>
                <View style={[styles.w30]}>
                  <Text>Item Number</Text>
                </View>

                <View style={[styles.w10]}>
                  <Text>:</Text>
                </View>

                <View style={[styles.w60]}>
                  <Text>{jobDescription.itemNumber || 'N/A'}</Text>
                </View>
              </View>

              {/* Job Title */}
              <View style={[styles.rowContainer]}>
                <View style={[styles.w30]}>
                  <Text>Position Title</Text>
                </View>

                <View style={[styles.w10]}>
                  <Text>:</Text>
                </View>

                <View style={[styles.w60]}>
                  <Text>{jobDescription.positionTitle || 'N/A'}</Text>
                </View>
              </View>

              {/* Office */}
              <View style={[styles.rowContainer]}>
                <View style={[styles.w30]}>
                  <Text>Office</Text>
                </View>

                <View style={[styles.w10]}>
                  <Text>:</Text>
                </View>

                <View style={[styles.w60]}>
                  <Text>{jobDescription.assignedTo.office.name || 'N/A'}</Text>
                </View>
              </View>

              {/* Department */}
              <View style={[styles.rowContainer]}>
                <View style={[styles.w30]}>
                  <Text>Department</Text>
                </View>

                <View style={[styles.w10]}>
                  <Text>:</Text>
                </View>

                <View style={[styles.w60]}>
                  <Text>
                    {jobDescription.assignedTo.department.name || 'N/A'}
                  </Text>
                </View>
              </View>

              {/* Division */}
              <View style={[styles.rowContainer]}>
                <View style={[styles.w30]}>
                  <Text>Division</Text>
                </View>

                <View style={[styles.w10]}>
                  <Text>:</Text>
                </View>

                <View style={[styles.w60]}>
                  <Text>
                    {jobDescription.assignedTo.division.name || 'N/A'}
                  </Text>
                </View>
              </View>

              {/* Reports to */}
              <View style={[styles.rowContainer]}>
                <View style={[styles.w30]}>
                  <Text>Reports to</Text>
                </View>

                <View style={[styles.w10]}>
                  <Text>:</Text>
                </View>

                <View style={[styles.w60]}>
                  <Text>{jobDescription.reportsTo || 'N/A'}</Text>
                </View>
              </View>

              {/* Salary Grade */}
              <View style={[styles.rowContainer]}>
                <View style={[styles.w30]}>
                  <Text>Salary Grade</Text>
                </View>

                <View style={[styles.w10]}>
                  <Text>:</Text>
                </View>

                <View style={[styles.w60]}>
                  <Text>{jobDescription.salary.salaryGrade || 0}</Text>
                </View>
              </View>

              {/* Nature of Appointment */}
              <View style={[styles.rowContainer]}>
                <View style={[styles.w30]}>
                  <Text>Nature of Appointment</Text>
                </View>

                <View style={[styles.w10]}>
                  <Text>:</Text>
                </View>

                <View style={[styles.w60]}>
                  <Text>
                    {capitalizeFirstLetter(
                      jobDescription.natureOfAppointment
                    ) || 'N/A'}
                  </Text>
                </View>
              </View>

              {/* Org struct description */}
              <View>
                <Text style={[styles.headerText]}>
                  Describe briefly the general function of
                  Office/Department/Division
                </Text>
                <Text>{jobDescription.description || 'N/A'}</Text>
              </View>

              {/* Job Summary */}
              <View>
                <Text style={[styles.headerText]}>
                  Describe briefly the general function of the position (Job
                  Summary)
                </Text>
                <Text>{jobDescription.summary || 'N/A'}</Text>
              </View>
            </View>

            {/* DUTIES AND RESPONSIBILITIES */}
            <View>
              <View>
                {/* <View style={[styles.tHeadFirstLevel]}>
                    <Text>CORE</Text>
                  </View> */}

                {renderCoreDuties()}

                {/* SUPPORT */}
                {/* <View style={[styles.tableBorder, { marginTop: 10 }]}>
                  <View style={[styles.tHeadFirstLevel]}>
                    <Text>SUPPORT</Text>
                  </View>

                  <View style={[styles.rowContainerTable, styles.borderTop]}>
                    <View
                      style={[
                        styles.w14,
                        styles.tHeadSecondLevel,
                        styles.borderRight,
                      ]}
                    >
                      <Text>Percentage</Text>
                    </View>
                    <View
                      style={[
                        styles.w70,
                        styles.tHeadSecondLevel,
                        styles.borderRight,
                      ]}
                    >
                      <Text>Duty Description</Text>
                    </View>
                    <View style={[styles.w16, styles.tHeadSecondLevel]}>
                      <Text>Level</Text>
                    </View>
                  </View>

                  {renderSupportDuties()}
                </View> */}
              </View>
            </View>

            {/* QUALIFICATION STANDARDS */}
            <View wrap={false} break>
              <View>
                <Text style={[styles.headerText, { marginTop: 0 }]} debug>
                  Qualification Standards
                </Text>
              </View>

              <View style={{ marginLeft: 15 }}>
                {/* Education */}
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w20, styles.bodyTextBold]}>
                    <Text>Education</Text>
                  </View>

                  <View style={[styles.w5]}>
                    <Text>:</Text>
                  </View>

                  <View style={[styles.w75]}>
                    <Text>
                      {positionQualificationStandards.education || 'N/A'}
                    </Text>
                  </View>
                </View>

                {/* Training */}
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w20, styles.bodyTextBold]}>
                    <Text>Training</Text>
                  </View>

                  <View style={[styles.w5]}>
                    <Text>:</Text>
                  </View>

                  <View style={[styles.w75]}>
                    <Text>
                      {positionQualificationStandards.training || 'N/A'}
                    </Text>
                  </View>
                </View>

                {/* Experience */}
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w20, styles.bodyTextBold]}>
                    <Text>Experience</Text>
                  </View>

                  <View style={[styles.w5]}>
                    <Text>:</Text>
                  </View>

                  <View style={[styles.w75]}>
                    <Text>
                      {positionQualificationStandards.experience || 'N/A'}
                    </Text>
                  </View>
                </View>

                {/* Eligibility */}
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w20, styles.bodyTextBold]}>
                    <Text>Eligibility</Text>
                  </View>

                  <View style={[styles.w5]}>
                    <Text>:</Text>
                  </View>

                  <View style={[styles.w75]}>
                    <Text>
                      {positionQualificationStandards.eligibility || 'N/A'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* COMPETENCIES */}
            <View>
              <View>
                <Text style={[styles.headerText]}>Competencies</Text>
              </View>

              <View>
                {/* Table Header */}
                <View style={[styles.rowContainerTable, styles.borderAll]}>
                  <View
                    style={[
                      styles.w60,
                      styles.tHeadSecondLevel,
                      styles.borderRight,
                    ]}
                  >
                    <Text>Competency</Text>
                  </View>
                  <View style={[styles.w40, styles.tHeadSecondLevel]}>
                    <Text>Required Proficiency Level</Text>
                  </View>
                </View>

                {/* Table Body */}
                {renderCompetencies()}
              </View>
            </View>

            {/* SIGNATORIES */}
            {!isEmpty(prfDetails) ? (
              <>
                <View style={[{ marginTop: 10 }]} wrap={false}>
                  {/* Row 1  */}
                  <View style={[styles.rowContainer]} wrap={false}>
                    {/* REQUESTED BY */}
                    <View style={[styles.w33_33]}>
                      <Text>Requested by:</Text>
                      <View style={[styles.horizontalCenter]}>
                        <Image
                          source={`${process.env.REACT_APP_IMAGE_SERVER_URL}${prfDetails?.from.fromSignatureUrl}`}
                          style={[styles.signature]}
                        />
                        <Text style={[styles.signatoryName]}>
                          {prfDetails?.from.name}
                        </Text>
                        <Text>{prfDetails?.from.position}</Text>
                      </View>
                    </View>

                    {/* REVIEWED BY */}
                    <View style={[styles.w33_33]}>
                      <Text>Reviewed by:</Text>
                      <View style={[styles.horizontalCenter]}>
                        {renderReviewedBy()}
                      </View>
                    </View>

                    {/* RECOMMENDED BY */}
                    <View style={[styles.w33_33]}>
                      <Text>Recommended by:</Text>
                      <View style={[styles.horizontalCenter]}>
                        {renderRecommendedBy()}
                      </View>
                    </View>
                  </View>

                  {/* Row 2  */}
                  <View
                    style={[styles.rowContainer, { marginTop: 20 }]}
                    wrap={false}
                  >
                    {/* CERTIFIED CORRECT BY */}
                    <View style={[styles.w50]}>
                      <Text>Certified correct by:</Text>
                      <View style={[styles.horizontalCenter]}>
                        <Image
                          source={`${process.env.REACT_APP_IMAGE_SERVER_URL}${prfTrail.admin.signatureUrl}`}
                          style={[styles.signature]}
                        />
                        <Text style={[styles.signatoryName]}>
                          {prfTrail.admin.name}
                        </Text>
                        <Text>{prfTrail.admin.position}</Text>
                      </View>
                    </View>

                    {/* APPROVED BY */}
                    <View style={[styles.w50]}>
                      <Text>Approved by:</Text>
                      <View style={[styles.horizontalCenter]}>
                        <Image
                          source={`${process.env.REACT_APP_IMAGE_SERVER_URL}${prfDetails?.for.forSignatureUrl}`}
                          style={[styles.signature]}
                        />
                        <Text style={[styles.signatoryName]}>
                          {prfDetails?.for.name}
                        </Text>
                        <Text>{prfDetails?.for.position}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </Page>
    </Document>
  )
}

PdDocument.propTypes = {
  jobDescription: PropTypes.object.isRequired,
  positionDutyResponsibilities: PropTypes.object.isRequired,
  positionQualificationStandards: PropTypes.object.isRequired,
  proficiencyLevel: PropTypes.object.isRequired,
  prfTrail: PropTypes.object,
  prfDetails: PropTypes.object,
}
export default PdDocument
