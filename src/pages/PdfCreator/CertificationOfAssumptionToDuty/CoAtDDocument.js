import React from 'react'
import PropTypes from 'prop-types'

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import Header from 'components/PdfDocuments/CertificationOfAssumptionToDuty/Header'

// Fonts
import CalibriRegular from 'assets/fonts/uploads/calibri-regular.ttf'
import CalibriRegularBold from 'assets/fonts/uploads/calibri-regular-bold.ttf'
import ArialRegular from 'assets/fonts/uploads/arial-regular.ttf'
import ArialSemiBold from 'assets/fonts/uploads/arial.ttf'
import ArialBoldItalic from 'assets/fonts/uploads/arial-bold-italic.ttf'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    paddingVertical: 40,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingTop: 6,
  },
  bodyBorder: {
    marginHorizontal: 50,
  },

  // Border Styles
  borderBottom: {
    borderBottom: '1px solid #000000',
  },

  // Field Styles
  documentCodeText: {
    fontFamily: 'ArialBoldItalic',
    fontSize: 12,
    paddingTop: 20,
  },
  documentTitle: {
    fontFamily: 'ArialSemiBold',
    fontSize: 18,
    paddingTop: 35,
  },
  certificationBodyText: {
    fontFamily: 'ArialRegular',
    fontSize: 12,
    paddingTop: 34,
  },
  textBold: {
    fontFamily: 'ArialSemiBold',
  },
  alignBottom: {
    marginTop: 'auto',
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
  w73: { width: '73%' },
  w67: { width: '67%' },
  w55: { width: '55%' },
  w50: { width: '50%' },
  w49: { width: '49%' },
  w44_5: { width: 'w44.5%' },
  w44: { width: '44%' },
  w33: { width: '33%' },
  w24: { width: '24%' },
  w10: { width: '10%' },
  w6_5: { width: '6.5%' },
  w3: { width: '3%' },
})

// FONTS
Font.register({
  family: 'CalibriRegular',
  src: CalibriRegular,
})
Font.register({
  family: 'CalibriRegularBold',
  src: CalibriRegularBold,
})
Font.register({
  family: 'ArialRegular',
  src: ArialRegular,
})
Font.register({
  family: 'ArialSemiBold',
  src: ArialSemiBold,
})
Font.register({
  family: 'ArialBoldItalic',
  src: ArialBoldItalic,
})

const CoAtDDocument = props => {
  const { certificationOfAssumptionToDuty } = props

  const renderGeneralManagerSignatory = () => {
    var content = certificationOfAssumptionToDuty.signatories
      .filter(
        signee =>
          signee.position === 'General Manager A' ||
          signee.position === 'OIC-General Manager'
      )
      .map((filtered, index) => (
        <View key={index}>
          <View style={[styles.horizontalCenter]}>
            <Text style={[styles.upperCase, styles.textBold]}>
              {filtered.fullName}
            </Text>
            {filtered.position === 'OIC-General Manager' ? (
              <Text style={[{ paddingTop: 4 }]}>Acting General Manager A</Text>
            ) : (
              <Text style={[{ paddingTop: 4 }]}>{filtered.position}</Text>
            )}
          </View>
        </View>
      ))

    return content
  }

  const renderAttestedBySignatory = () => {
    var content = certificationOfAssumptionToDuty.signatories
      .filter(
        signee =>
          signee.position === 'Department Manager A' ||
          signee.position === 'OIC-Department Manager'
      )
      .map((filtered, index) => (
        <View key={index} style={[{ paddingTop: 50 }]}>
          <View>
            <Text style={[styles.upperCase, styles.textBold]}>
              {filtered.fullName}
            </Text>
            <Text style={[{ paddingTop: 4 }]}>{filtered.position}</Text>
          </View>
        </View>
      ))

    return content
  }

  return (
    <Document
      author="General Santos City Water District"
      subject="CS Form No. 4 | Series of 2018"
      title="Certification of Assumption to Duty"
    >
      <Page size={[612.3, 935.4]} style={styles.page}>
        <Header />

        <View style={styles.bodyBorder}>
          {/* DOCUMENT CODE */}
          <View style={[styles.documentCodeText]}>
            <Text>CS Form No. 4</Text>
            <Text style={{ paddingTop: 3 }}>Series of 2018</Text>
          </View>

          {/* DOCUMENT TITLE */}
          <View style={[styles.documentTitle, styles.horizontalCenter]}>
            <Text>CERTIFICATION OF ASSUMPTION TO DUTY</Text>
          </View>

          {/* CERTIFICATION TEXT BODY */}
          <View style={[styles.certificationBodyText]}>
            {/* LINE 1 */}
            <View style={[styles.rowContainer]}>
              <View
                style={[styles.w33, styles.alignBottom, { paddingLeft: 25 }]}
              >
                <Text>This is to certify that Ms/Mr.</Text>
              </View>

              {/* APPLICANT NAME */}
              <View
                style={[
                  styles.borderBottom,
                  styles.w67,
                  styles.alignBottom,
                  { marginLeft: 2 },
                ]}
              >
                <Text
                  style={[
                    styles.horizontalCenter,
                    styles.upperCase,
                    styles.textBold,
                  ]}
                >
                  {certificationOfAssumptionToDuty.data.applicantName}
                </Text>
              </View>
            </View>

            {/* LINE 2 */}
            <View style={[styles.rowContainer]}>
              <View style={[styles.w49, styles.alignBottom]}>
                <Text>has assumed the duties and responsibilities as</Text>
              </View>

              {/* POSITION TITLE */}
              <View
                style={[
                  styles.borderBottom,
                  styles.w44_5,
                  styles.alignBottom,
                  { marginHorizontal: 2 },
                ]}
              >
                <Text style={[styles.horizontalCenter, styles.textBold]}>
                  {certificationOfAssumptionToDuty.data.positionTitle}
                </Text>
              </View>
              <View style={[styles.w6_5, styles.alignBottom]}>
                <Text>in the</Text>
              </View>
            </View>

            {/* LINE 3 */}
            <View style={[styles.rowContainer]}>
              {/* PLACE OF ASSIGNMENT  */}
              <View
                style={[
                  styles.borderBottom,
                  styles.w55,
                  styles.alignBottom,
                  { marginRight: 2 },
                ]}
              >
                <Text
                  style={[
                    styles.horizontalCenter,
                    styles.upperCase,
                    styles.textBold,
                  ]}
                >
                  {certificationOfAssumptionToDuty.data.placeOfAssignment}
                </Text>
              </View>

              <View style={[styles.w10, styles.alignBottom]}>
                <Text> effective </Text>
              </View>

              {/* EFFECTIVITY DATE */}
              <View style={[styles.w36, styles.alignBottom, { marginLeft: 2 }]}>
                <Text style={[styles.textBold]}>
                  {
                    certificationOfAssumptionToDuty.data.effectivityDate
                      .monthDayYear
                  }
                  .
                </Text>
              </View>
            </View>

            {/* LINE 4 */}
            <View style={[styles.rowContainer, { paddingTop: 25 }]}>
              <View
                style={[styles.w100, styles.alignBottom, { paddingLeft: 25 }]}
              >
                <Text>
                  This certification is issued in connection with the issuance
                  of the
                </Text>
              </View>
            </View>

            {/* LINE 5 */}
            <View style={[styles.rowContainer]}>
              <View style={[styles.w24, styles.alignBottom]}>
                <Text>appointment of Ms/Mr. </Text>
              </View>

              {/* APPLICANT NAME */}
              <View
                style={[
                  styles.borderBottom,
                  styles.w73,
                  styles.alignBottom,
                  { marginHorizontal: 3 },
                ]}
              >
                <Text
                  style={[
                    styles.horizontalCenter,
                    styles.upperCase,
                    styles.textBold,
                  ]}
                >
                  {certificationOfAssumptionToDuty.data.applicantName}
                </Text>
              </View>
              <View style={[styles.w3, styles.alignBottom]}>
                <Text>as</Text>
              </View>
            </View>

            {/* LINE 6 */}
            <View style={[styles.rowContainer]}>
              {/* POSITION TITLE */}
              <View
                style={[styles.borderBottom, styles.w73, styles.alignBottom]}
              >
                <Text style={[styles.horizontalCenter, styles.textBold]}>
                  {certificationOfAssumptionToDuty.data.positionTitle}
                </Text>
              </View>
              <Text>.</Text>
            </View>

            {/* LINE 7 */}
            <View style={[{ paddingTop: 25 }]}>
              <View style={[styles.w100, styles.alignBottom]}>
                <Text style={[styles.horizontalCenter]}>
                  Done this{' '}
                  {
                    certificationOfAssumptionToDuty.data.effectivityDate
                      .dayMonthYear
                  }{' '}
                  in the City of General Santos.
                </Text>
              </View>
            </View>

            {/* GENERAL MANAGER */}
            <View style={[styles.rowContainer, { paddingTop: 70 }]}>
              <View style={[styles.w50]}></View>
              <View style={[styles.w50]}>
                {renderGeneralManagerSignatory()}
              </View>
            </View>

            {/* ATTESTED BY */}
            <View style={[{ paddingTop: 40 }]}>
              <View style={[styles.w50]}>
                <Text>Attested by:</Text>
                {renderAttestedBySignatory()}
              </View>
            </View>

            {/* 201 FILE */}
            <View
              style={[
                styles.documentCodeText,
                { paddingTop: 40, fontSize: 8.5 },
              ]}
            >
              <Text>201 file</Text>
              <Text style={{ paddingTop: 10 }}>CSC</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

CoAtDDocument.propTypes = {
  certificationOfAssumptionToDuty: PropTypes.shape({
    data: PropTypes.shape({
      applicantName: PropTypes.string,
      positionTitle: PropTypes.string,
      placeOfAssignment: PropTypes.string,
      effectivityDate: PropTypes.shape({
        monthDayYear: PropTypes.string,
        dayMonthYear: PropTypes.string,
      }),
    }),
    signatories: PropTypes.arrayOf(
      PropTypes.shape({
        fullName: PropTypes.string,
        position: PropTypes.string,
        assignment: PropTypes.string,
        role: PropTypes.string,
      })
    ),
  }).isRequired,
}

export default CoAtDDocument
