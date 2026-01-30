import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer'
import Header from 'components/PdfDocuments/SummaryRankingOfApplicants/Header'

// Fonts
import CalibriRegular from 'assets/fonts/uploads/calibri-regular.ttf'
import CalibriRegularBold from 'assets/fonts/uploads/calibri-regular-bold.ttf'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  signature: {
    width: 90,
    marginHorizontal: 'auto',
  },
  rowTable: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  // Border Styles
  borderTop: {
    borderTop: '1px solid #000000',
  },
  borderRight: {
    borderRight: '1px solid #000000',
  },
  borderBottom: {
    borderBottom: '1px solid #000000',
  },
  borderLeft: {
    borderLeft: '1px solid #000000',
  },

  // Field Styles
  documentTitle: {
    fontFamily: 'CalibriRegularBold',
    fontSize: 11,
    marginVertical: 10,
    textAlign: 'center',
  },
  bodyText: {
    fontFamily: 'CalibriRegular',
    fontSize: 10,
    paddingLeft: 3,
  },
  thText: {
    fontFamily: 'CalibriRegularBold',
    fontSize: 11,
    textAlign: 'center',
    padding: '5 2 2 2',
  },
  tdText: {
    fontFamily: 'CalibriRegular',
    fontSize: 11,
    textAlign: 'center',
    padding: '8 4 4 4',
  },
  signatureText: {
    fontFamily: 'CalibriRegular',
    fontSize: 11,
  },
  selectedApplicantsText: {
    fontFamily: 'CalibriRegular',
    fontSize: 11,
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

  // Width Styles
  w70: { width: '70%' },
  w50: { width: '50%' },
  w34: { width: '34%' },
  w32: { width: '32%' },
  w30: { width: '30%' },
  w8_5: { width: '8.5%' },
  w7_75: { width: '7.75' },
  w7_1: { width: '7.1%' },
  w6: { width: '6%' },
})

Font.register({
  family: 'CalibriRegular',
  src: CalibriRegular,
})

Font.register({
  family: 'CalibriRegularBold',
  src: CalibriRegularBold,
})

const SRoADocument = props => {
  const { psbSummary, selectedApplicantsByAppAuth } = props

  return (
    <Document
      author="General Santos City Water District"
      subject="HRD-004-0"
      title="Summary Report RE: Ranking of Applicants"
    >
      <Page size="A4" style={styles.page}>
        <Header />

        <View>
          {/* DOCUMENT TITLE */}
          <View style={[styles.documentTitle]}>
            <Text>SUMMARY REPORT RE: RANKING OF APPLICANTS FOR</Text>

            <Text>
              <Text> Position: </Text>
              <Text style={{ textTransform: 'uppercase' }}>
                {psbSummary.positionDetails.positionTitle}
              </Text>
            </Text>

            <Text>
              {' '}
              <Text style={{ textTransform: 'capitalize' }}>
                {psbSummary.positionDetails.orgType}:{' '}
              </Text>
              <Text style={{ textTransform: 'uppercase' }}>
                {psbSummary.positionDetails.assignedTo}
              </Text>
            </Text>
          </View>

          {/* RANKING (for SG 23 below) */}
          {!isEmpty(psbSummary.ranking) && psbSummary.salaryGrade <= 23 ? (
            <View
              style={[
                styles.borderTop,
                styles.borderRight,
                styles.borderBottom,
                styles.borderLeft,
                { marginHorizontal: 20 },
              ]}
              wrap={false}
            >
              {/* Header */}
              <View style={[styles.rowContainer]}>
                <View style={[styles.w6, styles.borderRight]}>
                  <Text style={[styles.thText]}>RANK</Text>
                </View>
                <View style={[styles.w34, styles.borderRight]}>
                  <Text style={[styles.thText]}>NAME OF APPLICANTS</Text>
                </View>
                <View style={[styles.w8_5, styles.borderRight]}>
                  <Text style={[styles.thText]}>PSB 1</Text>
                </View>
                <View style={[styles.w8_5, styles.borderRight]}>
                  <Text style={[styles.thText]}>PSB 2</Text>
                </View>
                <View style={[styles.w8_5, styles.borderRight]}>
                  <Text style={[styles.thText]}>PSB 3</Text>
                </View>
                <View style={[styles.w8_5, styles.borderRight]}>
                  <Text style={[styles.thText]}>PSB 4</Text>
                </View>
                <View style={[styles.w8_5, styles.borderRight]}>
                  <Text style={[styles.thText]}>PSB 5</Text>
                </View>
                <View style={[styles.w8_5, styles.borderRight]}>
                  <Text style={[styles.thText]}>PSB 6</Text>
                </View>
                <View style={[styles.w8_5]}>
                  <Text style={[styles.thText, { fontSize: 8 }]}>Average</Text>
                </View>
              </View>

              {/* Body */}
              <View>
                {psbSummary.ranking.map((applicant, index) => (
                  <View
                    style={[styles.rowContainer, styles.borderTop]}
                    key={applicant.postingApplicantId}
                  >
                    <View style={[styles.w6, styles.borderRight]}>
                      <Text style={[styles.tdText]}>{index + 1}</Text>
                    </View>
                    <View style={[styles.w34, styles.borderRight]}>
                      <Text style={[styles.tdText]}>
                        {applicant.applicantName}
                      </Text>
                    </View>
                    <View style={[styles.w8_5, styles.borderRight]}>
                      <Text style={[styles.tdText]}>{applicant.psb_1}</Text>
                    </View>
                    <View style={[styles.w8_5, styles.borderRight]}>
                      <Text style={[styles.tdText]}>{applicant.psb_2}</Text>
                    </View>
                    <View style={[styles.w8_5, styles.borderRight]}>
                      <Text style={[styles.tdText]}>{applicant.psb_3}</Text>
                    </View>
                    <View style={[styles.w8_5, styles.borderRight]}>
                      <Text style={[styles.tdText]}>{applicant.psb_4}</Text>
                    </View>
                    <View style={[styles.w8_5, styles.borderRight]}>
                      <Text style={[styles.tdText]}>{applicant.psb_5}</Text>
                    </View>
                    <View style={[styles.w8_5, styles.borderRight]}>
                      <Text style={[styles.tdText]}>{applicant.psb_6}</Text>
                    </View>
                    <View style={[styles.w8_5]}>
                      <Text style={[styles.tdText]}>{applicant.average}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {/* RANKING (for SG 24) */}
          {!isEmpty(psbSummary.ranking) && psbSummary.salaryGrade == 24 ? (
            <View
              style={[
                styles.borderTop,
                styles.borderRight,
                styles.borderBottom,
                styles.borderLeft,
                styles.rowContainer,
                { marginHorizontal: 20 },
              ]}
              wrap={false}
            >
              {/* Header */}
              <View style={[styles.w6, styles.borderRight]}>
                <Text style={[styles.thText]}>RANK</Text>
              </View>
              <View style={[styles.w30, styles.borderRight]}>
                <Text style={[styles.thText]}>NAME OF APPLICANTS</Text>
              </View>
              <View style={[styles.w7_1, styles.borderRight]}>
                <Text style={[styles.thText]}>PSB 1</Text>
              </View>
              <View style={[styles.w7_1, styles.borderRight]}>
                <Text style={[styles.thText]}>PSB 2</Text>
              </View>
              <View style={[styles.w7_1, styles.borderRight]}>
                <Text style={[styles.thText]}>PSB 3</Text>
              </View>
              <View style={[styles.w7_1, styles.borderRight]}>
                <Text style={[styles.thText]}>PSB 4</Text>
              </View>
              <View style={[styles.w7_1, styles.borderRight]}>
                <Text style={[styles.thText]}>PSB 5</Text>
              </View>
              <View style={[styles.w7_1, styles.borderRight]}>
                <Text style={[styles.thText]}>PSB 6</Text>
              </View>
              <View style={[styles.w7_1, styles.borderRight]}>
                <Text style={[styles.thText]}>PSB 7</Text>
              </View>
              <View style={[styles.w7_1, styles.borderRight]}>
                <Text style={[styles.thText]}>PSB 8</Text>
              </View>
              <View style={[styles.w7_1]}>
                <Text style={[styles.thText, { fontSize: 8 }]}>Average</Text>
              </View>
            </View>
          ) : null}

          {/* RANKING (for SG 25 UP) */}
          {!isEmpty(psbSummary.ranking) && psbSummary.salaryGrade >= 25 ? (
            <View
              style={[
                styles.borderTop,
                styles.borderRight,
                styles.borderBottom,
                styles.borderLeft,
                styles.rowContainer,
                { marginHorizontal: 20 },
              ]}
              wrap={false}
            >
              {/* Header */}
              <View style={[styles.w6, styles.borderRight]}>
                <Text style={[styles.thText]}>RANK</Text>
              </View>
              <View style={[styles.w32, styles.borderRight]}>
                <Text style={[styles.thText]}>NAME OF APPLICANTS</Text>
              </View>
              <View style={[styles.w7_75, styles.borderRight]}>
                <Text style={[styles.thText]}>PSB 1</Text>
              </View>
              <View style={[styles.w7_75, styles.borderRight]}>
                <Text style={[styles.thText]}>PSB 2</Text>
              </View>
              <View style={[styles.w7_75, styles.borderRight]}>
                <Text style={[styles.thText]}>PSB 3</Text>
              </View>
              <View style={[styles.w7_75, styles.borderRight]}>
                <Text style={[styles.thText]}>PSB 4</Text>
              </View>
              <View style={[styles.w7_75, styles.borderRight]}>
                <Text style={[styles.thText]}>PSB 5</Text>
              </View>
              <View style={[styles.w7_75, styles.borderRight]}>
                <Text style={[styles.thText]}>PSB 6</Text>
              </View>
              <View style={[styles.w7_75, styles.borderRight]}>
                <Text style={[styles.thText]}>PSB 7</Text>
              </View>
              <View style={[styles.w7_75]}>
                <Text style={[styles.thText, { fontSize: 8 }]}>Average</Text>
              </View>
            </View>
          ) : null}

          {/* Additional hiring details */}
          <View
            style={[
              styles.bodyText,
              styles.w70,
              { marginHorizontal: 'auto', paddingTop: 10 },
            ]}
            wrap={false}
          >
            <View style={[styles.rowContainer, { paddingTop: 2 }]}>
              <Text style={[styles.w50]}>Date posted in GSCWD &amp; CSC</Text>
              <View
                style={[
                  styles.borderBottom,
                  styles.w50,
                  styles.horizontalCenter,
                ]}
              >
                <Text>{psbSummary.postingDate}</Text>
              </View>
            </View>

            <View style={[styles.rowContainer, { paddingTop: 2 }]}>
              <Text style={[styles.w50]}>No. of submitted applications</Text>
              <View
                style={[
                  styles.borderBottom,
                  styles.w50,
                  styles.horizontalCenter,
                ]}
              >
                <Text>{psbSummary.numberOfApplicants}</Text>
              </View>
            </View>

            <View style={[styles.rowContainer, { paddingTop: 2 }]}>
              <Text style={[styles.w50]}>No. of qualified applicants</Text>
              <View
                style={[
                  styles.borderBottom,
                  styles.w50,
                  styles.horizontalCenter,
                ]}
              >
                <Text>{psbSummary.numberOfQualifiedApplicants}</Text>
              </View>
            </View>

            <View style={[styles.rowContainer, { paddingTop: 2 }]}>
              <Text style={[styles.w50]}>Date of Panel interview</Text>
              <View
                style={[
                  styles.borderBottom,
                  styles.w50,
                  styles.horizontalCenter,
                ]}
              >
                <Text>{psbSummary.dateOfPanelInterview}</Text>
              </View>
            </View>

            <View style={[styles.rowContainer, { paddingTop: 2 }]}>
              <Text style={[styles.w50]}>
                No. of applicants came for an interview
              </Text>
              <View
                style={[
                  styles.borderBottom,
                  styles.w50,
                  styles.horizontalCenter,
                ]}
              >
                <Text>{psbSummary.numberOfInterviewedApplicants}</Text>
              </View>
            </View>
          </View>

          {/* PSB signatory */}
          <View
            style={[
              styles.signatureText,
              styles.w70,
              { paddingTop: 25, marginHorizontal: 'auto' },
            ]}
            wrap={false}
          >
            <View style={[styles.rowTable]}>
              <View style={[styles.w50]}>
                <Text>Certified Corrected by:</Text>
                {psbSummary.signatories.map((signatory, index) => {
                  if (signatory.role == 'PSB 1') {
                    return (
                      <View key={index}>
                        <Image
                          src={`${process.env.REACT_APP_IMAGE_SERVER_URL}${signatory.signatureUrl}`}
                          style={[styles.signature]}
                        />

                        <Text style={[styles.signatoryName]}>
                          {signatory.fullName}
                        </Text>

                        <Text>{signatory.position}</Text>
                        <Text>{signatory.role}</Text>
                      </View>
                    )
                  }
                })}
              </View>

              <View style={[styles.w50]}>
                <Text>Confirmed by:</Text>
                {psbSummary.signatories.map((signatory, index) => {
                  if (signatory.role == 'PSB 2') {
                    return (
                      <View key={index}>
                        <Image
                          src={`${process.env.REACT_APP_IMAGE_SERVER_URL}${signatory.signatureUrl}`}
                          style={[styles.signature]}
                        />

                        <Text style={[styles.signatoryName]}>
                          {signatory.fullName}
                        </Text>

                        <Text>{signatory.position}</Text>
                        <Text>{signatory.role}</Text>
                      </View>
                    )
                  }
                })}
              </View>

              {psbSummary.signatories.map((signatory, index) => {
                if (
                  signatory.role != 'PSB 1' &&
                  signatory.role != 'PSB 2' &&
                  signatory.role != 'Appointing authority'
                ) {
                  return (
                    <View style={[styles.w50]} key={index}>
                      <Image
                        src={`${process.env.REACT_APP_IMAGE_SERVER_URL}${signatory.signatureUrl}`}
                        style={[styles.signature]}
                      />

                      <Text style={[styles.signatoryName]}>
                        {signatory.fullName}
                      </Text>

                      <Text>{signatory.position}</Text>
                      <Text>{signatory.role}</Text>
                    </View>
                  )
                }
              })}
            </View>
          </View>

          <View wrap={false}>
            {/* SELECTED APPLICANTS */}
            <View
              style={[
                styles.selectedApplicantsText,
                styles.w70,
                { paddingTop: 25, marginHorizontal: 'auto' },
              ]}
              wrap={false}
            >
              <Text>
                Selected by the Appointing Authority after the Hiring Process
              </Text>

              <View style={[{ paddingTop: 10 }]}>
                {selectedApplicantsByAppAuth.length > 0 ? (
                  selectedApplicantsByAppAuth.map((applicant, index) => {
                    return (
                      <View
                        key={applicant.applicantEndorsementId}
                        style={[styles.rowContainer, { paddingBottom: 8 }]}
                      >
                        <Text style={[{ paddingRight: 5 }]}>{index + 1}</Text>
                        <Text
                          style={[
                            styles.borderBottom,
                            styles.upperCase,
                            { paddingHorizontal: 10 },
                          ]}
                        >
                          {applicant.applicantName}
                        </Text>
                      </View>
                    )
                  })
                ) : (
                  <View style={[styles.rowContainer, { paddingBottom: 8 }]}>
                    <Text
                      style={[
                        styles.borderBottom,
                        styles.upperCase,
                        { paddingHorizontal: 25, color: 'red' },
                      ]}
                    >
                      NO SELECTED APPLICANT
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Appointing Authority Signatory */}
            <View
              style={[
                styles.signatureText,
                styles.w70,
                { paddingTop: 25, marginHorizontal: 'auto' },
              ]}
              wrap={false}
            >
              <View style={[styles.rowTable]}>
                <View style={[styles.w50]}>
                  <Text>Approved by:</Text>
                  {psbSummary.signatories.map((signatory, index) => {
                    if (signatory.role == 'Appointing authority') {
                      return (
                        <View key={index}>
                          <Image
                            src={`${process.env.REACT_APP_IMAGE_SERVER_URL}${signatory.signatureUrl}`}
                            style={[styles.signature]}
                          />

                          <Text style={[styles.signatoryName]}>
                            {signatory.fullName}
                          </Text>

                          <Text>{signatory.position}</Text>
                        </View>
                      )
                    }
                  })}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

SRoADocument.propTypes = {
  psbSummary: PropTypes.object.isRequired,
  selectedApplicantsByAppAuth: PropTypes.arrayOf(
    PropTypes.shape({
      applicantEndorsementId: PropTypes.string.isRequired,
      applicantName: PropTypes.string.isRequired,
    })
  ).isRequired,
}
export default SRoADocument
