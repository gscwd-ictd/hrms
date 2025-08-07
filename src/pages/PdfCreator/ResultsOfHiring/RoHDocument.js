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
import { isEmpty } from 'lodash'

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
    position: 'absolute',
    width: 70,
    paddingTop: 20,
    marginLeft: 40,
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
    fontSize: 17,
    marginBottom: 10,
    textAlign: 'center',
  },
  bodyText: {
    fontFamily: 'CalibriRegular',
    fontSize: 10,
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
    fontSize: 10,
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
    padding: '50 0 0 2',
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

  const removeUnsedPlantillaId = (plantillaIds, applicants) => {
    const arrPId = plantillaIds.split(', \n')
    const arrApp = applicants.split(/[\n]/)

    if (arrPId.length > arrApp.length) {
      arrPId.pop()
      return arrPId.join(', \n')
    } else {
      return plantillaIds
    }
  }

  return (
    <Document
      author="General Santos City Water District"
      subject="Results of Hiring Process - HRD-005-2"
      title="Results of Hiring Process"
    >
      <Page size="A4" style={[styles.page, { padding: '10 0 10 0' }]}>
        <Header />

        <View style={[{ marginHorizontal: 15 }]}>
          {/* DOCUMENT TITLE */}
          <View style={[styles.documentTitle]}>
            <Text>RESULTS OF HIRING PROCESS</Text>
          </View>

          {/* Section 1 */}
          {/* <View style={styles.bodyBorder}> */}
          <View>
            {/* HEADER */}
            <View
              style={[
                styles.rowContainer,
                {
                  borderTop: '2px solid #000000',
                  borderRight: '2px solid #000000',
                  borderLeft: '2px solid #000000',
                },
              ]}
            >
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
                style={[
                  styles.rowContainer,
                  styles.borderTop,
                  styles.borderBottom,
                  {
                    borderRight: '2px solid #000000',
                    borderLeft: '2px solid #000000',
                  },
                ]}
                key={hiredApplicant.vppId}
                wrap={false}
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
                    {removeUnsedPlantillaId(
                      hiredApplicant.plantillaNumber,
                      hiredApplicant.selected
                    ) || ''}
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
            <View style={[styles.borderTop, { paddingTop: 3 }]} wrap={false}>
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

          <View wrap={false}>
            {/* Section 2 */}
            {/* REMINDER */}
            <View style={[styles.bodyText, { paddingTop: 10 }]}>
              <Text>
                FOR MORE DETAILS, PLEASE SEE THE HUMAN RESOURCE DEPARTMENT
              </Text>
            </View>

            {/* Section 3 */}
            {/* Signatories */}
            <View style={[styles.rowContainer, { paddingTop: 10 }]}>
              {/* CERTIFIED CORRECT BY */}
              <View style={[styles.w50, styles.signatureText]}>
                <Text style={[{ padding: '4 0 0 2' }]}>
                  Certified Correct by:
                </Text>
                {!isEmpty(
                  resultsOfHiringDocument.signatories?.certifiedCorrectBy
                ) ? (
                  <>
                    <Image
                      src={`${process.env.REACT_APP_IMAGE_SERVER_URL}${resultsOfHiringDocument.signatories?.certifiedCorrectBy?.signatureUrl}`}
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
                  </>
                ) : null}
              </View>

              {/* REVIEWED BY */}
              <View style={[styles.w50, styles.signatureText]}>
                <Text style={[{ padding: '4 0 0 2' }]}>Approved by:</Text>
                {!isEmpty(resultsOfHiringDocument.signatories?.approvedBy) ? (
                  <>
                    <Image
                      src={`${process.env.REACT_APP_IMAGE_SERVER_URL}${resultsOfHiringDocument.signatories?.approvedBy?.signatureUrl}`}
                      style={[styles.signature]}
                    />
                    <Text style={[styles.signatoryName]}>
                      {resultsOfHiringDocument.signatories.approvedBy.fullName}
                    </Text>
                    <Text style={[{ padding: '5 0 0 2' }]}>
                      {resultsOfHiringDocument.signatories.approvedBy.position}
                    </Text>
                  </>
                ) : null}
              </View>
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
