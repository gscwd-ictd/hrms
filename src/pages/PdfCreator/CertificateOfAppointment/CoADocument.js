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
    paddingHorizontal: 1,
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
    borderBottom: '0.5px solid #000000',
  },

  // Field Styles
  documentText: {
    fontFamily: 'TimesNewRomanRegular',
    fontSize: 11,
  },
  letterBodyText: {
    fontFamily: 'TimesNewRomanBold',
    fontSize: 11,
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
    fontSize: 11,
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
  w76: { width: '76%' },
  w75: { width: '75%' },
  w70: { width: '70%' },
  w68: { width: '68%' },
  w63: { width: '63%' },
  w62: { width: '62%' },
  w61: { width: '61%' },
  w60: { width: '60%' },
  w59_5: { width: '59.5%' },
  w58: { width: '58%' },
  w56: { width: '56%' },
  w57: { width: '57%' },
  w54_5: { width: '54.5%' },
  w50: { width: '50%' },
  w42: { width: 'w42%' },
  w40: { width: '40%' },
  w37: { width: '37%' },
  w35: { width: '35%' },
  w32: { width: '32%' },
  w30: { width: '30%' },
  w29: { width: '29%' },
  w28: { width: '28%' },
  w27: { width: '27%' },
  w26: { width: '26%' },
  w25: { width: '25%' },
  w24: { width: '24%' },
  w22: { width: '22%' },
  w20: { width: '20%' },
  w18: { width: '18%' },
  w16_5: { width: '16.5%' },
  w16: { width: '16%' },
  w15: { width: '15%' },
  w14: { width: '14%' },
  w13: { width: '13%' },
  w12: { width: '12%' },
  w11_5: { width: '11.5%' },
  w11: { width: '11%' },
  w10: { width: '10%' },
  w7_5: { width: '7.5%' },
  w6: { width: '6%' },
  w5: { width: '5%' },
  w4: { width: '4%' },
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
      // PSB #3 CHANGE TO CERTIFIEDBY
      .filter(signee => signee.role === null)
      .map((filtered, index) =>
        filtered.position === 'Department Manager A' ||
        filtered.position === 'OIC-Department Manager' ? (
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
                { fontSize: 12, paddingBottom: 3 },
              ]}
            >
              Human Resource {filtered.position}
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
        ) : filtered.position === 'Division Manager A' ||
          filtered.position === 'OIC-Division Manager' ? (
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

            {/* <Text
              style={[
                styles.documentText,
                styles.valueSubText,
                styles.textBold,
                { fontSize: 12 },
              ]}
            >
              {filtered.position}
            </Text> */}

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
        ) : null
      )

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
            {filtered.position === 'Assistant General Manager'
              ? filtered.position + ' for Administration'
              : filtered.position}
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
      subject="CS Form No. 33-B | Series of 2025"
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
              <Text style={[{ textTransform: 'uppercase' }]}>
                {certificateOfAppointment.data.addressLine1}
              </Text>
              <Text style={[{ textTransform: 'uppercase' }]}>
                {certificateOfAppointment.data.addressLine2}
              </Text>
            </View>

            {/* BODY */}
            <View style={[styles.letterBodyText]}>
              {/* PARAGRAPH 1 */}
              <View style={[{ paddingTop: 25 }]}>
                {/* ROW 1 */}
                <View
                  style={[
                    styles.rowContainer,
                    { justifyContent: 'space-between' },
                  ]}
                >
                  <View style={[styles.w28, styles.letterTextWrapper]}>
                    <Text style={[{ textIndent: 20 }]}>
                      You are hereby appointed as
                    </Text>
                  </View>

                  {/* POSITION TITLE  */}
                  <View style={[styles.w56, styles.letterTextWrapper]}>
                    <View style={[styles.borderBottom]}>
                      <Text style={[styles.upperCase, styles.valueMainText]}>
                        {certificateOfAppointment.data.positionTitle}
                      </Text>
                    </View>
                    <Text style={[styles.documentText, styles.valueSubText]}>
                      (Position Title)
                    </Text>
                  </View>

                  {/* SALARY GRADE */}
                  <View
                    style={[
                      styles.w15,
                      styles.letterTextWrapper,
                      {
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                      },
                    ]}
                  >
                    <Text style={[{ paddingRight: 1 }]}>&#40;SG/JG/PG</Text>
                    <View>
                      <View style={[styles.borderBottom]}>
                        <Text
                          style={[
                            styles.upperCase,
                            styles.valueMainText,
                            { paddingHorizontal: 2 },
                          ]}
                        >
                          {certificateOfAppointment.data.salaryGradeLevel}
                        </Text>
                      </View>
                    </View>
                    <Text>&#41;</Text>
                  </View>
                </View>

                {/* ROW 2 */}
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w5, styles.letterTextWrapper]}>
                    <Text>under</Text>
                  </View>

                  {/* NATURE OF APPOINTMENT */}
                  <View style={[styles.w22, styles.letterTextWrapper]}>
                    <View style={[styles.borderBottom]}>
                      <Text style={[styles.upperCase, styles.valueMainText]}>
                        {certificateOfAppointment.data.natureOfAppointment}
                      </Text>
                    </View>

                    <Text style={[styles.documentText, styles.valueSubText]}>
                      (Permanent, Temporary, etc.)
                    </Text>
                  </View>

                  <View style={[styles.w11, styles.letterTextWrapper]}>
                    <Text>status at the</Text>
                  </View>

                  {/* PLACE OF ASSIGNMENT */}
                  <View style={[styles.w62, styles.letterTextWrapper]}>
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
                  <View style={[styles.w24, styles.letterTextWrapper]}>
                    <Text>with a compensation rate of</Text>
                  </View>

                  <View style={[styles.w76, styles.letterTextWrapper]}>
                    <View style={[styles.borderBottom]}>
                      <Text style={[styles.upperCase, styles.valueMainText]}>
                        {certificateOfAppointment.data.amountInWords}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* ROW 4 */}
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w100, styles.letterTextWrapper]}>
                    <Text>pesos per month.</Text>
                  </View>
                </View>
              </View>

              {/* PARAGRAPH 2 */}
              <View style={[{ paddingTop: 25 }]}>
                {/* ROW 5 */}
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w32, styles.letterTextWrapper]}>
                    <Text style={[{ textIndent: 20 }]}>
                      The nature of this appointment is
                    </Text>
                  </View>

                  {/* APPOINTMENT TYPE */}
                  <View style={[styles.w68, styles.letterTextWrapper]}>
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
                  <View style={[styles.w4, styles.letterTextWrapper]}>
                    <Text>vice</Text>
                  </View>

                  {/* VICE */}
                  <View style={[styles.w61, styles.letterTextWrapper]}>
                    <View style={[styles.borderBottom]}>
                      <Text style={[styles.upperCase, styles.valueMainText]}>
                        {certificateOfAppointment.data.vice || ' '}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.w5, styles.letterTextWrapper]}>
                    <Text>, who</Text>
                  </View>

                  {/* WHO */}
                  <View style={[styles.w25, styles.letterTextWrapper]}>
                    <View style={[styles.borderBottom]}>
                      <Text style={[styles.upperCase, styles.valueMainText]}>
                        {certificateOfAppointment.data.viceStatus || ' '}
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
                  <View style={[styles.w16, styles.letterTextWrapper]}>
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

                  <View style={[styles.w5, styles.letterTextWrapper]}>
                    <Text>Page</Text>
                  </View>

                  {/* PAGE */}
                  <View style={[styles.w20, styles.letterTextWrapper]}>
                    <View style={[styles.borderBottom]}>
                      <Text
                        style={[
                          styles.upperCase,
                          styles.valueMainText,
                          styles.horizontalCenter,
                        ]}
                      >
                        {certificateOfAppointment.data.page || ' '}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.w5, styles.letterTextWrapper]}>
                    <Text>.</Text>
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
              <View style={[styles.w50, { paddingTop: 250 }]}>
                <View style={[styles.w60]}>
                  <Text
                    style={[
                      {
                        textAlign: 'left',
                        fontFamily: 'TimesNewRomanBold',
                        lineHeight: 1.3,
                      },
                    ]}
                  >
                    Accredited/Deregulated Pursuant to CSC Resolution No.
                    1801157 dated October 30, 2018 conferring PRIME-HRM Award to
                    GSCWD
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
                { fontSize: 12 },
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
              pursuant to the{' '}
              <Text style={[{ fontFamily: 'TimesNewRomanBold' }]}>
                2025 Omnibus Rules on Appointments and Other Human Resource
                Actions,
              </Text>{' '}
              have been complied with, reviewed, and found to be in order.
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
              in consonance with Republic Act No. 7041. The assessment by the
              Human Resource Merit Promotion and Selection Board (HRMPSB)
              started on{' '}
              <Text style={[styles.textBold, styles.upperCase]}>
                {certificateOfAppointment.data.psbDurationStartDate}
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
                { fontSize: 12 },
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
              qualified by at least the majority of the HRMPSB/Placement
              Committee during the deliberation held on{' '}
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
                { fontSize: 12 },
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
                      { marginVertical: 9 },
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
                      { marginVertical: 9 },
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
                    <View style={{ margin: '1 3 0 25' }}>
                      <Svg viewBox="0 0 24 24" width={10} height={10}>
                        <Path
                          d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                          stroke="black"
                        />
                      </Svg>
                    </View>

                    <Text>CSCRO/CSC-Commission</Text>
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
                    <View style={{ margin: '1 3 0 25' }}>
                      <Svg viewBox="0 0 24 24" width={10} height={10}>
                        <Path
                          d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                          stroke="black"
                        />
                      </Svg>
                    </View>

                    <Text>CSC-Commission</Text>
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
                    NONE
                  </Text>
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
                    <View style={{ margin: '1 3 0 25' }}>
                      <Svg viewBox="0 0 24 24" width={10} height={10}>
                        <Path
                          d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                          stroke="black"
                        />
                      </Svg>
                    </View>

                    <Text>Court of Appeals</Text>
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
                    NONE
                  </Text>
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

              {/* ROW 9 */}
              <View style={[styles.tableRowContainer, styles.borderTop]}>
                <View style={[styles.w40, styles.borderRight]}>
                  <View style={[styles.tableRowContainer, { margin: 5 }]}>
                    <View style={{ margin: '1 3 0 25' }}>
                      <Svg viewBox="0 0 24 24" width={10} height={10}>
                        <Path
                          d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                          stroke="black"
                        />
                      </Svg>
                    </View>

                    <Text>Supreme Court</Text>
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
                    NONE
                  </Text>
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
              <View style={[styles.w50, styles.borderRight, { fontSize: 10 }]}>
                <View style={[{ margin: 7, paddingTop: 15 }]}>
                  <Text>Original Copy - for the Agency</Text>
                  <Text>
                    Certified True Copy - for the Civil Service Commission
                  </Text>
                  <Text>Certified True Copy - for the Appointee</Text>
                </View>
              </View>

              <View style={[styles.w50]}>
                <View style={[{ margin: 5 }]}>
                  <Text style={[styles.textBold, styles.horizontalCenter]}>
                    Acknowledgement
                  </Text>
                  <View style={[styles.tableRowContainer, { paddingTop: 10 }]}>
                    <Text style={[styles.textItalic]}>
                      Received original copy of appointment on ____________
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.w100,
                      styles.horizontalCenter,
                      { marginHorizontal: 'auto' },
                    ]}
                  >
                    <View
                      style={[
                        styles.borderBottom,
                        { marginLeft: 50, height: 25, width: 150 },
                      ]}
                    ></View>
                    <Text>Appointee</Text>
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
      vice: PropTypes.string,
      viceStatus: PropTypes.string,
      page: PropTypes.string,
      psbDurationStartDate: PropTypes.string,
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
