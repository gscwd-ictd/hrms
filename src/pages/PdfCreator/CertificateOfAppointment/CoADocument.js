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
  Svg,
  Path,
} from '@react-pdf/renderer'
import Header from 'components/PdfDocuments/CertificateOfAppointment/Header'

// Fonts
import TimesNewRomanRegular from 'assets/fonts/uploads/times-new-roman-regular.ttf'
import TimesNewRomanBold from 'assets/fonts/uploads/times-new-roman-bold.ttf'
import TimesNewRomanBoldItalic from 'assets/fonts/uploads/times-new-roman-bold-italic.ttf'
import TimesNewRomanItalic from 'assets/fonts/uploads/times-new-roman-italic.ttf'

import CSForm33BLogo from 'assets/images/cs_form_n_33b_background.png'

const styles = StyleSheet.create({
  page: {
    paddingVertical: 20,
  },
  pageBackground: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    display: 'block',
    height: '100%',
    width: '100%',
  },
  absoluteContainer: {
    position: 'absolute',
    left: '0px',
    right: '0px',
    top: '40px',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  tableRowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },
  bodyBorder: {
    marginHorizontal: 40,
  },
  letterTextWrapper: {
    paddingTop: 5,
    paddingHorizontal: 2,
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
  borderBottom: {
    borderBottom: '1px solid #000000',
  },

  // Field Styles
  documentText: {
    fontFamily: 'TimesNewRomanRegular',
    fontSize: 12,
  },
  letterBodyText: {
    fontFamily: 'TimesNewRomanBold',
    fontSize: 12,
  },
  textBold: {
    fontFamily: 'TimesNewRomanBold',
  },
  textItalic: {
    fontFamily: 'TimesNewRomanItalic',
  },
  valueMainText: {
    textTransform: 'uppercase',
    // marginHorizontal: "auto",
    textAlign: 'center',
  },
  valueSubText: {
    fontSize: 9,
    marginHorizontal: 'auto',
  },
  accreditedText: {
    fontFamily: 'TimesNewRomanBoldItalic',
    fontSize: 12,
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
  w80: { width: '80%' },
  w75: { width: '75%' },
  w70: { width: '70%' },
  w68: { width: '68%' },
  w63: { width: '63%' },
  w58: { width: '58%' },
  w50: { width: '50%' },
  w42: { width: 'w42%' },
  w40: { width: '40%' },
  w37: { width: '37%' },
  w35: { width: '35%' },
  w32: { width: '32%' },
  w25: { width: '25%' },
  w24: { width: '24%' },
  w20: { width: '20%' },
  w18: { width: '18%' },
  w12: { width: '12%' },
  w6: { width: '6%' },
  w5: { width: '5%' },
})

// FONTS
Font.register({
  family: 'TimesNewRomanRegular',
  src: TimesNewRomanRegular,
})
Font.register({
  family: 'TimesNewRomanBold',
  src: TimesNewRomanBold,
})
Font.register({
  family: 'TimesNewRomanBoldItalic',
  src: TimesNewRomanBoldItalic,
})
Font.register({
  family: 'TimesNewRomanItalic',
  src: TimesNewRomanItalic,
})

const CoADocument = props => {
  const { certificateOfAppointment } = props

  const renderGMSignatory = () => {
    var content = certificateOfAppointment.signatories
      .filter(
        signee =>
          signee.role === 'Appointing Authority' ||
          signee.role === 'OIC-General Manager'
      )
      .map((filtered, index) => (
        <View key={index}>
          <Text
            style={[
              styles.upperCase,
              styles.valueMainText,
              styles.textBold,
              styles.borderBottom,
            ]}
          >
            {filtered.fullName}
          </Text>

          <Text
            style={[styles.documentText, styles.valueSubText, { fontSize: 12 }]}
          >
            {filtered.role}
          </Text>
        </View>
      ))

    return content
  }

  const renderHRMOSignatory = () => {
    var content = certificateOfAppointment.signatories
      .filter(signee => signee.role === 'PSB# 3')
      .map((filtered, index) => (
        <View key={index}>
          <Text
            style={[
              styles.upperCase,
              styles.valueMainText,
              styles.textBold,
              styles.borderBottom,
            ]}
          >
            {filtered.fullName}
          </Text>

          <Text
            style={[
              styles.documentText,
              styles.valueSubText,
              styles.textBold,
              { fontSize: 12 },
            ]}
          >
            {filtered.position}
          </Text>

          <Text
            style={[
              styles.documentText,
              styles.valueSubText,
              styles.textBold,
              { fontSize: 12 },
            ]}
          >
            HRMO
          </Text>
        </View>
      ))

    return content
  }

  const renderChairpersonSignatory = () => {
    var content = certificateOfAppointment.signatories
      .filter(signee => signee.role === 'Chairperson, HRMPSB')
      .map((filtered, index) => (
        <View key={index}>
          <Text
            style={[
              styles.upperCase,
              styles.valueMainText,
              styles.textBold,
              styles.borderBottom,
            ]}
          >
            {filtered.fullName}
          </Text>

          <Text
            style={[
              styles.documentText,
              styles.valueSubText,
              styles.textBold,
              { fontSize: 12 },
            ]}
          >
            {filtered.position}
          </Text>

          <Text
            style={[
              styles.documentText,
              styles.valueSubText,
              styles.textBold,
              { fontSize: 12 },
            ]}
          >
            {filtered.role}
          </Text>
        </View>
      ))

    return content
  }

  return (
    <Document
      author="General Santos City Water District"
      subject="CS Form No. 33-B | Series of 2018"
      title="Certificate of Appointment"
    >
      {/* PAGE 1 */}
      <Page size={[612.3, 935.4]}>
        {/* BORDER BACKGROUND */}
        <View style={[styles.pageBackground]} fixed>
          <Image src={CSForm33BLogo} />
        </View>

        <View style={[styles.bodyBorder, styles.absoluteContainer]}>
          <Header />

          {/* LETTER CONTENT */}
          <View style={[styles.documentText]}>
            {/* TO */}
            <View style={{ paddingTop: 30 }}>
              <Text style={[styles.textBold, styles.upperCase]}>
                {certificateOfAppointment.data.applicantName}
              </Text>
              <Text>{certificateOfAppointment.data.addressLine1}</Text>
              <Text>{certificateOfAppointment.data.addressLine2}</Text>
            </View>

            {/* BODY */}
            <View style={[styles.letterBodyText]}>
              {/* PARAGRAPH 1 */}
              <View style={[{ paddingTop: 25 }]}>
                {/* ROW 1 */}
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w32, styles.letterTextWrapper]}>
                    <Text style={[{ textIndent: 25 }]}>
                      You are hereby appointed as
                    </Text>
                  </View>

                  {/* TITLE AND SALARY GRADE */}
                  <View style={[styles.w68, styles.letterTextWrapper]}>
                    <View style={[styles.borderBottom]}>
                      <Text style={[styles.upperCase, styles.valueMainText]}>
                        {certificateOfAppointment.data.positionTitle}
                        &nbsp; (SG-
                        {certificateOfAppointment.data.salaryGradeLevel})
                      </Text>
                    </View>
                    <Text style={[styles.documentText, styles.valueSubText]}>
                      (Position)
                    </Text>
                  </View>
                </View>

                {/* ROW 2 */}
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w6, styles.letterTextWrapper]}>
                    <Text>under</Text>
                  </View>

                  {/* NATURE OF APPOINTMENT */}
                  <View style={[styles.w24, styles.letterTextWrapper]}>
                    <View style={[styles.borderBottom]}>
                      <Text style={[styles.upperCase, styles.valueMainText]}>
                        {certificateOfAppointment.data.natureOfAppointment}
                      </Text>
                    </View>

                    <Text style={[styles.documentText, styles.valueSubText]}>
                      (Permanent, Temporary, etc.)
                    </Text>
                  </View>

                  <View style={[styles.w12, styles.letterTextWrapper]}>
                    <Text>status at the</Text>
                  </View>

                  {/* PLACE OF ASSIGNMENT */}
                  <View style={[styles.w58, styles.letterTextWrapper]}>
                    <View style={[styles.borderBottom]}>
                      <Text style={[styles.upperCase, styles.valueMainText]}>
                        {certificateOfAppointment.data.placeOfAssignment}
                      </Text>
                    </View>

                    <Text style={[styles.documentText, styles.valueSubText]}>
                      (Office/Department/Unit)
                    </Text>
                  </View>
                </View>

                {/* ROW 3 */}
                <View style={[styles.rowContainer]}>
                  <Text
                    style={[
                      styles.w100,
                      styles.letterTextWrapper,
                      { textAlign: 'left', lineHeight: 2.1 },
                    ]}
                  >
                    with a composition rate of{' '}
                    <Text
                      style={[
                        styles.upperCase,
                        { textDecoration: 'underline' },
                      ]}
                    >
                      {'  '}
                      {certificateOfAppointment.data.amountInWords}{' '}
                    </Text>
                    {'  '}
                    pesos per month.
                  </Text>
                </View>
              </View>

              {/* PARAGRAPH 2 */}
              <View style={[{ paddingTop: 25 }]}>
                {/* ROW 5 */}
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w37, styles.letterTextWrapper]}>
                    <Text style={[{ textIndent: 25 }]}>
                      The nature of this appointment is
                    </Text>
                  </View>

                  {/* APPOINTMENT TYPE */}
                  <View style={[styles.w63, styles.letterTextWrapper]}>
                    <View style={[styles.borderBottom]}>
                      <Text style={[styles.upperCase, styles.valueMainText]}>
                        {certificateOfAppointment.data.appointmentType}
                      </Text>
                    </View>
                    <Text style={[styles.documentText, styles.valueSubText]}>
                      (Original, Promotion, etc.)
                    </Text>
                  </View>
                </View>

                {/* ROW 6 */}
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w5, styles.letterTextWrapper]}>
                    <Text>vice</Text>
                  </View>

                  {/* VICE */}
                  <View style={[styles.w42, styles.letterTextWrapper]}>
                    <View style={[styles.borderBottom]}>
                      <Text style={[styles.upperCase, styles.valueMainText]}>
                        {' '}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.w6, styles.letterTextWrapper]}>
                    <Text>, who</Text>
                  </View>

                  {/* WHO */}
                  <View style={[styles.w42, styles.letterTextWrapper]}>
                    <View style={[styles.borderBottom]}>
                      <Text style={[styles.upperCase, styles.valueMainText]}>
                        {' '}
                      </Text>
                    </View>
                    <Text style={[styles.documentText, styles.valueSubText]}>
                      (Transferred, Retired, etc.)
                    </Text>
                  </View>

                  <View style={[styles.w5, styles.letterTextWrapper]}>
                    <Text>with</Text>
                  </View>
                </View>

                {/* ROW 7 */}
                <View
                  style={[
                    styles.rowContainer,
                    { justifyContent: 'flex-start' },
                  ]}
                >
                  <View style={[styles.w18, styles.letterTextWrapper]}>
                    <Text>Plantilla Item No.</Text>
                  </View>

                  {/* PLANTILLA ITEM NO. */}
                  <View style={[styles.w35, styles.letterTextWrapper]}>
                    <View style={[styles.borderBottom]}>
                      <Text style={[styles.upperCase, styles.valueMainText]}>
                        {certificateOfAppointment.data.itemNumber}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.w6, styles.letterTextWrapper]}>
                    <Text>Page</Text>
                  </View>

                  {/* PAGE */}
                  <View style={[styles.w25, styles.letterTextWrapper]}>
                    <View style={[{ flexDirection: 'row' }]}>
                      <Text
                        style={[
                          styles.upperCase,
                          styles.valueMainText,
                          { textDecoration: 'underline' },
                        ]}
                      >
                        {'                                       '}
                      </Text>
                      <Text>.</Text>
                    </View>
                    {/* <View
                      style={[styles.borderBottom, { flexDirection: "row" }]}
                    >
                      <Text style={[styles.upperCase, styles.valueMainText]}>
                        {
                          "                                                                                                 "
                        }
                      </Text>
                      <Text>.</Text>
                    </View> */}
                  </View>
                </View>
              </View>

              {/* PARAGRAPH 3 */}
              <View style={[{ paddingTop: 25 }]}>
                {/* ROW 8 */}
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w100, styles.letterTextWrapper]}>
                    <Text style={[{ textIndent: 25 }]}>
                      This appointment shall take effect on the date of signing
                      by the appointing officer/authority.
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* FOOTER */}
            <View style={[styles.rowContainer]}>
              {/* LEFT */}
              <View style={[styles.w50, { paddingTop: 150 }]}>
                <View
                  style={[
                    styles.borderAll,
                    styles.w70,
                    { marginHorizontal: 'auto' },
                  ]}
                >
                  <Text
                    style={[
                      styles.accreditedText,
                      styles.horizontalCenter,
                      { padding: 12 },
                    ]}
                  >
                    Accredited Pursuant to CSC Resolution Number 1801157 dated
                    October 30, 2018 conferring PRIME-HRM Award to GSCWD
                  </Text>
                </View>
              </View>

              {/* RIGHT */}
              <View style={[styles.w50, { paddingTop: 50 }]}>
                {/* SALUTATION */}
                <Text style={[styles.textBold]}>Very truly yours,</Text>

                {/* GM SIGNATORY */}
                <View style={[{ paddingTop: 80 }]}>
                  {renderGMSignatory()}
                  <View style={{ paddingTop: 25 }}>
                    <Text
                      style={[
                        styles.upperCase,
                        styles.valueMainText,
                        styles.textBold,
                        styles.borderBottom,
                      ]}
                    >
                      {certificateOfAppointment.data.dateOfSigning}
                    </Text>

                    <Text style={[styles.documentText, styles.valueSubText]}>
                      Date of Signing
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>

      {/* PAGE 2 */}
      <Page size={[612.3, 935.4]}>
        {/* BORDER BACKGROUND */}
        <View style={[styles.pageBackground]} fixed>
          <Image src={CSForm33BLogo} />
        </View>

        <View style={[styles.bodyBorder, styles.absoluteContainer]}>
          {/* SECTION 1 */}
          <View style={[styles.documentText]}>
            <Text
              style={[
                styles.textBold,
                styles.horizontalCenter,
                { fontSize: 13 },
              ]}
            >
              Certification
            </Text>

            {/* PARAGRAPH 1 */}
            <Text
              style={[
                {
                  textIndent: 25,
                  paddingTop: 10,
                  lineHeight: 1.5,
                  textAlign: 'justify',
                },
              ]}
            >
              This is to certify that all requirements and supporting papers
              pursuant to CSC MC No. 24, s. 2017 have been complied with,
              reviewed and found to be un order.
            </Text>

            {/* PARAGRAPH 2 */}
            <Text
              style={[
                {
                  textIndent: 25,
                  paddingTop: 10,
                  lineHeight: 1.5,
                  textAlign: 'justify',
                },
              ]}
            >
              The position was published at{' '}
              <Text style={[styles.textBold, { textTransform: 'uppercase' }]}>
                {certificateOfAppointment.data.publicationMode}
              </Text>{' '}
              from{' '}
              <Text style={[styles.textBold]}>
                {certificateOfAppointment.data.publicationPeriod}
              </Text>{' '}
              and posted in{' '}
              <Text style={[styles.textBold]}>
                THREE (3) CONSPICUOUS PLACES IN GENERAL SANTOS CITY WATER
                DISTRICT
              </Text>{' '}
              from{' '}
              <Text style={[styles.textBold]}>
                {certificateOfAppointment.data.publicationPeriod}
              </Text>{' '}
              in consonance with RA No. 7041. The assessment by the Human
              Resource Merit Promotion and Selection Board (HRMPSB) started on{' '}
              <Text style={[styles.textBold, styles.upperCase]}>
                {certificateOfAppointment.data.scheduleDate}
              </Text>
              .
            </Text>

            {/* PARAGRAPH 3 */}
            {/* REMOVED - 07/20/2023 */}
            {/* <Text
              style={[
                styles.textBold,
                {
                  textIndent: 25,
                  paddingTop: 10,
                  lineHeight: 1.5,
                  textAlign: 'justify',
                },
              ]}
            >
              EXEMPTED FROM THE PUBLICATION PURSUANT TO 2017 OMNIBUS RULES ON
              APPOINTMENTS AND OTHER HUMAN RESOURCE ACTION RULE VII, SECTION 26
              (d)
            </Text> */}

            {/* SIGNATORY */}
            <View style={[styles.rowContainer]}>
              <View style={[styles.w50]}></View>
              <View style={[styles.w50, { paddingTop: 35 }]}>
                {renderHRMOSignatory()}
              </View>
            </View>

            <View
              style={[
                {
                  backgroundColor: '#336BD0',
                  height: 10,
                  border: '1px solid #000000',
                  marginTop: 10,
                },
              ]}
            ></View>
          </View>

          {/* SECTION 2 */}
          <View style={[styles.documentText, { paddingTop: 15 }]}>
            <Text
              style={[
                styles.textBold,
                styles.horizontalCenter,
                { fontSize: 13 },
              ]}
            >
              Certification
            </Text>

            {/* PARAGRAPH 1 */}
            <Text
              style={[
                {
                  textIndent: 25,
                  paddingTop: 10,
                  lineHeight: 1.5,
                  textAlign: 'justify',
                },
              ]}
            >
              This is to certify that the appointee has been screened and found
              qualified by the majority of the HRMPSB during the deliberation
              held on{' '}
              <Text
                style={[
                  styles.textBold,
                  styles.upperCase,
                  // { textDecoration: 'underline' },
                ]}
              >
                {certificateOfAppointment.data.scheduleDate}
              </Text>
              .
            </Text>

            {/* SIGNATORY */}
            <View style={[styles.rowContainer]}>
              <View style={[styles.w50]}></View>
              <View style={[styles.w50, { paddingTop: 35 }]}>
                {renderChairpersonSignatory()}
              </View>
            </View>

            <View
              style={[
                {
                  backgroundColor: '#336BD0',
                  height: 10,
                  border: '1px solid #000000',
                  marginTop: 10,
                },
              ]}
            ></View>
          </View>

          {/* SECTION 3 */}
          <View style={[styles.documentText, { paddingTop: 15 }]}>
            <Text
              style={[
                styles.textBold,
                styles.horizontalCenter,
                { fontSize: 13 },
              ]}
            >
              CSC/HRMO Notation
            </Text>

            {/* TABLE */}
            <View style={[styles.borderAll, { marginTop: 5 }]}>
              {/* ROW 1 */}
              <View style={[styles.tableRowContainer]}>
                <View style={[styles.w80, styles.borderRight]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { marginVertical: 7 },
                    ]}
                  >
                    ACTION ON APPOINTMENTS
                  </Text>
                </View>
                <View style={[styles.w20]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { marginVertical: 7 },
                    ]}
                  >
                    Recorded by
                  </Text>
                </View>
              </View>

              {/* ROW 2 */}
              <View style={[styles.tableRowContainer, styles.borderTop]}>
                <View style={[styles.w80, styles.borderRight]}>
                  <View style={[styles.tableRowContainer, { margin: 5 }]}>
                    <View style={{ margin: '1 3 0 3' }}>
                      <Svg viewBox="0 0 24 24" width={10} height={10}>
                        <Path
                          d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                          stroke="black"
                        />
                      </Svg>
                    </View>

                    <Text style={[styles.textBold]}>
                      Validated per RAI for the month of{' '}
                      <Text
                        style={[
                          styles.upperCase,
                          styles.textBold,
                          { textDecoration: 'underline' },
                        ]}
                      >
                        {certificateOfAppointment.data.effectivityDate}
                      </Text>
                    </Text>
                  </View>
                </View>
                <View style={[styles.w20]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  ></Text>
                </View>
              </View>

              {/* ROW 3 */}
              <View style={[styles.tableRowContainer, styles.borderTop]}>
                <View style={[styles.w80, styles.borderRight]}>
                  <View style={[styles.tableRowContainer, { margin: 5 }]}>
                    <View style={{ margin: '1 3 0 3' }}>
                      <Svg viewBox="0 0 24 24" width={10} height={10}>
                        <Path
                          d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                          stroke="black"
                        />
                      </Svg>
                    </View>

                    <Text style={[styles.textBold]}>
                      Invalidated per CSCRO/FO letter dated{' '}
                    </Text>
                    <View style={[styles.borderBottom, { width: 180 }]}></View>
                  </View>
                </View>
                <View style={[styles.w20]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  ></Text>
                </View>
              </View>

              {/* ROW 4 */}
              <View style={[styles.tableRowContainer, styles.borderTop]}>
                <View style={[styles.w40, styles.borderRight]}>
                  <View style={[styles.tableRowContainer, { margin: 5 }]}>
                    <View style={{ margin: '1 3 0 3' }}>
                      <Svg viewBox="0 0 24 24" width={10} height={10}>
                        <Path
                          d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                          stroke="black"
                        />
                      </Svg>
                    </View>

                    <Text style={[styles.textBold]}>Appeal</Text>
                  </View>
                </View>
                <View style={[styles.w20, styles.borderRight]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  >
                    DATE FILED
                  </Text>
                </View>
                <View style={[styles.w20, styles.borderRight]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  >
                    STATUS
                  </Text>
                </View>
                <View style={[styles.w20]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 3 },
                    ]}
                  ></Text>
                </View>
              </View>

              {/* ROW 5 */}
              <View style={[styles.tableRowContainer, styles.borderTop]}>
                <View style={[styles.w40, styles.borderRight]}>
                  <View style={[styles.tableRowContainer, { margin: 5 }]}>
                    <View style={{ margin: '1 3 0 3' }}>
                      <Svg viewBox="0 0 24 24" width={10} height={10}>
                        <Path
                          d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                          stroke="black"
                        />
                      </Svg>
                    </View>

                    <Text style={[styles.textBold]}>CSCRO/CSC-Commission</Text>
                  </View>
                </View>
                <View style={[styles.w20, styles.borderRight]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  ></Text>
                </View>
                <View style={[styles.w20, styles.borderRight]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  ></Text>
                </View>
                <View style={[styles.w20]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  ></Text>
                </View>
              </View>

              {/* ROW 6 */}
              <View style={[styles.tableRowContainer, styles.borderTop]}>
                <View style={[styles.w40, styles.borderRight]}>
                  <View style={[styles.tableRowContainer, { margin: 5 }]}>
                    <View style={{ margin: '1 3 0 3' }}>
                      <Svg viewBox="0 0 24 24" width={10} height={10}>
                        <Path
                          d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                          stroke="black"
                        />
                      </Svg>
                    </View>

                    <Text style={[styles.textBold]}>Petition for Review</Text>
                  </View>
                </View>
                <View style={[styles.w20, styles.borderRight]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  ></Text>
                </View>
                <View style={[styles.w20, styles.borderRight]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  ></Text>
                </View>
                <View style={[styles.w20]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  ></Text>
                </View>
              </View>

              {/* ROW 7 */}
              <View style={[styles.tableRowContainer, styles.borderTop]}>
                <View style={[styles.w40, styles.borderRight]}>
                  <View style={[styles.tableRowContainer, { margin: 5 }]}>
                    <View style={{ margin: '1 3 0 3' }}>
                      <Svg viewBox="0 0 24 24" width={10} height={10}>
                        <Path
                          d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                          stroke="black"
                        />
                      </Svg>
                    </View>

                    <Text style={[styles.textBold]}>CSC-Commission</Text>
                  </View>
                </View>
                <View style={[styles.w20, styles.borderRight]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  ></Text>
                </View>
                <View style={[styles.w20, styles.borderRight]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  ></Text>
                </View>
                <View style={[styles.w20]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  ></Text>
                </View>
              </View>

              {/* ROW 8 */}
              <View style={[styles.tableRowContainer, styles.borderTop]}>
                <View style={[styles.w40, styles.borderRight]}>
                  <View style={[styles.tableRowContainer, { margin: 5 }]}>
                    <View style={{ margin: '1 3 0 3' }}>
                      <Svg viewBox="0 0 24 24" width={10} height={10}>
                        <Path
                          d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                          stroke="black"
                        />
                      </Svg>
                    </View>

                    <Text style={[styles.textBold]}>Court of Appeals</Text>
                  </View>
                </View>
                <View style={[styles.w20, styles.borderRight]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  ></Text>
                </View>
                <View style={[styles.w20, styles.borderRight]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  ></Text>
                </View>
                <View style={[styles.w20]}>
                  <Text
                    style={[
                      styles.horizontalCenter,
                      styles.textBold,
                      { margin: 5 },
                    ]}
                  ></Text>
                </View>
              </View>
            </View>

            <View
              style={[
                {
                  backgroundColor: '#336BD0',
                  height: 10,
                  border: '1px solid #000000',
                  marginTop: 10,
                },
              ]}
            ></View>
          </View>

          {/* SECTION 4 */}
          <View style={[styles.documentText, { paddingTop: 10 }]}>
            <View style={[styles.borderAll, styles.tableRowContainer]}>
              <View style={[styles.w50, styles.borderRight]}>
                <View style={[{ margin: 7 }]}>
                  <Text>Original Copy - for the Appointee</Text>
                  <Text>Original Copy - for the Civil Service Commission</Text>
                  <Text>Original Copy - for the Agency</Text>
                </View>
              </View>

              <View style={[styles.w50]}>
                <View style={[{ margin: 5 }]}>
                  <Text style={[styles.textBold, styles.horizontalCenter]}>
                    Acknowledgement
                  </Text>
                  <View style={[styles.tableRowContainer, { paddingTop: 10 }]}>
                    <Text style={[styles.textItalic]}>
                      Received original/photocopy of appointment on{' '}
                    </Text>
                    <View
                      style={[styles.borderBottom, { height: 13, width: 120 }]}
                    ></View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

CoADocument.propTypes = {
  certificateOfAppointment: PropTypes.shape({
    data: PropTypes.shape({
      applicantName: PropTypes.string,
      positionTitle: PropTypes.string,
      placeOfAssignment: PropTypes.string,
      addressLine1: PropTypes.string,
      addressLine2: PropTypes.string,
      amountInWords: PropTypes.string,
      itemNumber: PropTypes.string,
      natureOfAppointment: PropTypes.string,
      appointmentType: PropTypes.string,
      publicationPeriod: PropTypes.string,
      publicationMode: PropTypes.string,
      dateOfSigning: PropTypes.string,
      scheduleDate: PropTypes.string,
      salaryGradeLevel: PropTypes.number,
      effectivityDate: PropTypes.string,
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

export default CoADocument
