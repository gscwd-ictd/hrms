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
import Header from 'components/PdfDocuments/ResultsOfHiring/Header'

// Fonts
import CalibriRegular from 'assets/fonts/uploads/calibri-regular.ttf'
import CalibriRegularBold from 'assets/fonts/uploads/calibri-regular-bold.ttf'

Font.registerHyphenationCallback(word => {
  screen
  const middle = Math.floor(word.length / 2)
  const parts =
    word.length === 1
      ? [word]
      : [word.substring(0, middle), word.substring(middle)]

  return parts
})

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  bodyBorder: {
    border: '2px solid #000000',
  },
  signature: {
    width: 100,
    marginLeft: 50,
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

  // Field Styles
  documentTitle: {
    fontFamily: 'CalibriRegularBold',
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
  },
  bodyText: {
    fontFamily: 'CalibriRegular',
    fontSize: 11,
    paddingTop: 1,
  },
  tHeadText: {
    fontFamily: 'CalibriRegular',
    fontSize: 10,
    marginVertical: 'auto',
    padding: 3,
    textAlign: 'center',
  },
  tBodyText: {
    fontFamily: 'CalibriRegular',
    fontSize: 11,
    marginVertical: 'auto',
    paddingHorizontal: 2,
    paddingVertical: 8,
    textAlign: 'center',
  },
  tFooterText: {
    fontFamily: 'CalibriRegular',
    fontSize: 11,
    marginVertical: 'auto',
    padding: 2,
  },
  signatureText: {
    fontFamily: 'CalibriRegular',
    fontSize: 11,
    textAlign: 'left',
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  signatoryName: {
    fontFamily: 'CalibriRegularBold',
    textTransform: 'uppercase',
    padding: '4 0 0 2',
  },

  verticalCenter: { margin: 'auto 0' },
  horizontalCenter: { textAlign: 'center' },

  // Width Styles
  w100: { width: '100%' },
  w65: { width: '65%' },
  w58: { width: '58%' },
  w50: { width: '50%' },
  w45: { width: '45%' },
  w40: { width: '40%' },
  w35: { width: '35%' },
  w33_33: { width: '33.33%' },
  w30: { width: '30%' },
  w28: { width: '28%' },
  w26: { width: '26%' },
  w25: { width: '25%' },
  w20: { width: '20%' },
  w15: { width: '15%' },
  w14: { width: '14%' },
  w10: { width: '10%' },
  w8: { width: '8%' },
  w6: { width: '6%' },
  w2: { width: '2%' },
})

Font.register({
  family: 'CalibriRegular',
  src: CalibriRegular,
})

Font.register({
  family: 'CalibriRegularBold',
  src: CalibriRegularBold,
})

const RoHDocument = props => {
  const { resultsOfHiringDocument, effectivityDate } = props

  return (
    <Document
      author="General Santos City Water District"
      subject="Results of Hiring Process - HRD-005-2"
      title="Results of Hiring Process"
    >
      <Page size="A4" style={styles.page}>
        <Header />

        <View style={[{ marginHorizontal: 15 }]}>
          {/* DOCUMENT TITLE */}
          <View style={[styles.documentTitle]}>
            <Text>RESULTS OF HIRING PROCESS</Text>
          </View>

          {/* Section 1 */}
          <View style={styles.bodyBorder}>
            {/* HEADER */}
            <View style={[styles.rowContainer]}>
              <View style={[styles.w20, styles.borderRight]}>
                <Text style={[styles.tHeadText]}>POSITION</Text>
              </View>

              <View style={[styles.w26, styles.borderRight]}>
                <Text style={[styles.tHeadText]}>DIVISION</Text>
              </View>

              <View style={[styles.w6, styles.borderRight]}>
                <Text style={[styles.tHeadText]}>SG</Text>
              </View>

              <View style={[styles.w6, styles.borderRight]}>
                <Text style={[styles.tHeadText]}>LEVEL</Text>
              </View>

              <View style={[styles.w14, styles.borderRight]}>
                <Text style={[styles.tHeadText]}>PLANTILLA NO.</Text>
              </View>

              <View style={[styles.w28]}>
                <Text style={[styles.tHeadText]}>
                  SELECTED APPLICANT AFTER HIRING PROCESS
                </Text>
              </View>
            </View>

            {/* BODY */}
            {resultsOfHiringDocument.resultsOfHiring.map(hiredApplicant => (
              <View
                style={[styles.rowContainer, styles.borderTop]}
                key={hiredApplicant.vppId}
              >
                <View style={[styles.w20, styles.borderRight]}>
                  <Text style={[styles.tBodyText]}>
                    {hiredApplicant.positionTitle || ''}
                  </Text>
                </View>

                <View style={[styles.w26, styles.borderRight]}>
                  <Text style={[styles.tBodyText]}>
                    {hiredApplicant.assignedTo || ''}
                  </Text>
                </View>

                <View style={[styles.w6, styles.borderRight]}>
                  <Text style={[styles.tBodyText]}>
                    {hiredApplicant.salaryGradeLevel || ''}
                  </Text>
                </View>

                <View style={[styles.w6, styles.borderRight]}>
                  <Text style={[styles.tBodyText]}>
                    {hiredApplicant.level || ''}
                  </Text>
                </View>

                <View style={[styles.w14, styles.borderRight]}>
                  <Text style={[styles.tBodyText]}>
                    {hiredApplicant.plantillaNumber || ''}
                  </Text>
                </View>

                <View style={[styles.w28]}>
                  <Text style={[styles.tBodyText]}>
                    {hiredApplicant.selected || ''}
                  </Text>
                </View>
              </View>
            ))}

            {/* FOOTER */}
            <View style={[styles.borderTop, { paddingTop: 3 }]}>
              <View style={[styles.rowContainer]}>
                <Text style={[styles.tFooterText, styles.w40]}>
                  EFFECTIVITY DATE OF APPOINTMENT
                </Text>
                <Text style={[styles.tFooterText, styles.w2]}>:</Text>
                <Text style={[styles.tFooterText, styles.w58]}>
                  {effectivityDate}
                </Text>
              </View>

              <View style={[styles.rowContainer]}>
                <Text style={[styles.tFooterText, styles.w40]}>
                  NATURE OF APPOINTMENT
                </Text>
                <Text style={[styles.tFooterText, styles.w2]}>:</Text>
                <Text style={[styles.tFooterText, styles.w58]}>PERMANENT</Text>
              </View>
            </View>
          </View>

          {/* Section 2 */}
          {/* REMINDER */}
          <View style={[styles.bodyText, { paddingTop: 15 }]}>
            <Text>
              FOR MORE DETAILS, PLEASE SEE THE HUMAN RESOURCE DEPARTMENT
            </Text>
          </View>

          {/* Section 3 */}
          {/* Signatories */}
          <View style={[styles.rowContainer, { paddingTop: 20 }]}>
            {/* CERTIFIED CORRECT BY */}
            <View style={[styles.w50, styles.signatureText]}>
              <Text style={[{ padding: '4 0 0 2' }]}>
                Certified Correct by:
              </Text>
              <Image
                src={`${process.env.REACT_APP_IMAGE_SERVER_URL}${resultsOfHiringDocument.signatories.certifiedCorrectBy.signatureUrl}`}
                style={[styles.signature]}
              />
              <Text style={[styles.signatoryName]}>
                {
                  resultsOfHiringDocument.signatories.certifiedCorrectBy
                    .fullName
                }
              </Text>
              <Text style={[{ padding: '5 0 0 2' }]}>
                {
                  resultsOfHiringDocument.signatories.certifiedCorrectBy
                    .position
                }
              </Text>
            </View>

            {/* REVIEWED BY */}
            <View style={[styles.w50, styles.signatureText]}>
              <Text style={[{ padding: '4 0 0 2' }]}>Approved by:</Text>
              <Image
                src={`${process.env.REACT_APP_IMAGE_SERVER_URL}${resultsOfHiringDocument.signatories.approvedBy.signatureUrl}`}
                style={[styles.signature]}
              />
              <Text style={[styles.signatoryName]}>
                {resultsOfHiringDocument.signatories.approvedBy.fullName}
              </Text>
              <Text style={[{ padding: '5 0 0 2' }]}>
                {resultsOfHiringDocument.signatories.approvedBy.position}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

RoHDocument.propTypes = {
  resultsOfHiringDocument: PropTypes.object.isRequired,
  effectivityDate: PropTypes.string.isRequired,
}
export default RoHDocument
