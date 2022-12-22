import React from "react"
import PropTypes from "prop-types"

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer"
import Header from "components/PdfDocuments/ReportOnAppointmentsIssued/Header"

// Fonts
import CalibriRegular from "../../../assets/fonts/uploads/calibri-regular.ttf"
import CalibriRegularBold from "../../../assets/fonts/uploads/calibri-regular-bold.ttf"
import CalibriRegularBoldItalic from "../../../assets/fonts/uploads/calibri-bold-italic.ttf"

Font.registerHyphenationCallback(word => [word])

Font.register({
  family: "CalibriRegular",
  src: CalibriRegular,
})

Font.register({
  family: "CalibriRegularBold",
  src: CalibriRegularBold,
})

Font.register({
  family: "CalibriRegularBoldItalic",
  src: CalibriRegularBoldItalic,
})

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    paddingTop: 20,
    paddingBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 5,
  },
  bodyBorder: {
    marginTop: 5,
    marginBottom: 8,
    marginHorizontal: 10,
  },

  // Table Styles
  tableBorder: {
    border: "1px solid #000000",
  },
  rowContainerTable: {
    flexDirection: "row",
    alignItems: "stretch",
  },

  // Border Styles
  borderTop: {
    borderTop: "1px solid #000000",
  },
  borderRight: {
    borderRight: "1px solid #000000",
  },
  borderBottom: {
    borderBottom: "1px solid #000000",
  },

  // Field Styles
  bodyText: {
    fontFamily: "CalibriRegular",
    fontSize: 7.5,
  },
  bodyTextBold: {
    fontFamily: "CalibriRegularBold",
    fontSize: 7.5,
  },
  bodyTextBoldUppercase: {
    fontFamily: "CalibriRegularBold",
    fontSize: 7.5,
    textTransform: "uppercase",
  },
  tableHeaderText: {
    fontFamily: "CalibriRegular",
    fontSize: 6,
    margin: "auto 0",
    textAlign: "center",
    paddingTop: 2,
    paddingHorizontal: 2,
  },
  tableBodyText: {
    fontFamily: "CalibriRegular",
    fontSize: 6,
    margin: "auto 0",
    textAlign: "center",
    paddingTop: 2,
    paddingHorizontal: 2,
    textTransform: "uppercase",
  },
  tableBodyTextBold: {
    fontFamily: "CalibriRegularBold",
    fontSize: 7.5,
  },

  hrTagLineText: {
    fontFamily: "CalibriRegularBoldItalic",
    fontSize: 14,
  },
  reminderText: {
    fontFamily: "CalibriRegularBold",
    fontSize: 12,
    color: "#ff0000",
    paddingTop: 5,
  },
  upperCase: {
    textTransform: "uppercase",
  },
  signatoryName: {
    fontFamily: "CalibriRegularBold",
    textTransform: "uppercase",
    paddingTop: 3,
  },

  // Sub Columns Vertical Spacings
  nameOfAppointeeCols: {
    paddingVertical: 12,
  },
  publicationCols: {
    paddingVertical: 3.32,
  },
  cscActionCols: {
    paddingVertical: 8.25,
  },

  verticalCenter: { margin: "auto 0" },
  horizontalCenter: { textAlign: "center" },
  signature: {
    width: 100,
    marginHorizontal: "auto",
  },

  // Width Styles
  w100: { width: "100%" },
  w90: { width: "90%" },
  w80: { width: "80%" },
  w77_5: { width: "77.5%" },
  w75: { width: "75%" },
  w70: { width: "70%" },
  w67: { width: "67%" },
  w65: { width: "65%" },
  w62: { width: "62%" },
  w60: { width: "60%" },
  w59: { width: "59%" },
  w55: { width: "55%" },
  w50: { width: "50%" },
  w46: { width: "46%" },
  w45: { width: "45%" },
  w40: { width: "40%" },
  w38: { width: "38%" },
  w35: { width: "35%" },
  w33_33: { width: "33.33%" },
  w33: { width: "33%" },
  w31_5: { width: "31.5%" },
  w30: { width: "30%" },
  w28: { width: "28%" },
  w25: { width: "25%" },
  w23: { width: "23%" },
  w22_5: { width: "22.5%" },
  w22: { width: "22%" },
  w21: { width: "21%" },
  w20: { width: "20%" },
  w14_5: { width: "14.5%" },
  w14: { width: "14%" },
  w13: { width: "13%" },
  w12: { width: "12%" },
  w12_5: { width: "12.5%" },
  w11: { width: "11%" },
  w10: { width: "10%" },
  w9: { width: "9%" },
  w7_59: { width: "7.59%" },
  w7_245: { width: "7.245%" },
  w7: { width: "7%" },
  w6_5: { width: "6.5%" },
  w6_1: { width: "6.1%" },
  w6: { width: "6%" },
  w5_5: { width: "5.5%" },
  w5: { width: "5%" },
  w4_90: { width: "4.90%" },
  w4_83: { width: "4.83%" },
  w4_73: { width: "4.73%" },
  w4_63: { width: "4.63%" },
  w4_5: { width: "4.5%" },
  w4: { width: "4%" },
  w3_5: { width: "3.5%" },
  w3_335: { width: "3.335%" },
  w2: { width: "2%" },
})

const RAIDocument = props => {
  const { reportOnAppointmentsIssued, yearMonth } = props

  const renderAppointedApplicant = () => {
    var content = reportOnAppointmentsIssued.data.map(
      (appointedApplicant, index) => (
        <View style={[styles.rowContainerTable, styles.borderTop]} key={index}>
          {/* NUMBER */}
          <View style={[styles.borderRight, styles.w2]}>
            <Text style={[styles.tableBodyText]}>{index + 1}</Text>
          </View>

          {/* DATE ISSUED */}
          <View style={[styles.borderRight, styles.w5]}>
            <Text style={[styles.tableBodyText]}>
              {appointedApplicant.effectivityDate}
            </Text>
          </View>

          {/* START ---- NAME OF APPOINTEE/S 23% */}
          {/* LAST NAME w31_5 */}
          <View style={[styles.w7_245, styles.borderRight]}>
            <Text style={[styles.tableBodyText]}>
              {appointedApplicant.lastName}
            </Text>
          </View>

          {/* FIRST NAME w33 */}
          <View style={[styles.w7_59, styles.borderRight]}>
            <Text style={[styles.tableBodyText]}>
              {appointedApplicant.firstName}
            </Text>
          </View>

          {/* NAME EXTENSION w14_5 */}
          <View style={[styles.w3_335, styles.borderRight]}>
            <Text style={[styles.tableBodyText]}>
              {appointedApplicant.nameExtension}
            </Text>
          </View>

          {/* MIDDLE NAME w21 */}
          <View style={[styles.w4_83, styles.borderRight]}>
            <Text style={[styles.tableBodyText]}>
              {appointedApplicant.middleName}
            </Text>
          </View>
          {/* END ---- NAME OF APPOINTEE/S */}

          {/* POSITION TITLE */}
          <View style={[styles.borderRight, styles.w7]}>
            <Text style={[styles.tableBodyText]}>
              {appointedApplicant.positionTitle}
            </Text>
          </View>

          {/* ITEM NO. */}
          <View style={[styles.borderRight, styles.w6]}>
            <Text style={[styles.tableBodyText]}>
              {appointedApplicant.itemNumber}
            </Text>
          </View>

          {/* SALARY/ JOB/ PAY GRADE */}
          <View style={[styles.borderRight, styles.w3_5]}>
            <Text style={[styles.tableBodyText]}>
              {appointedApplicant.salaryGrade}
            </Text>
          </View>

          {/* SALARY RATE */}
          <View style={[styles.borderRight, styles.w4_5]}>
            <Text style={[styles.tableBodyText]}>
              {appointedApplicant.monthlySalary}
            </Text>
          </View>

          {/* EMPLOYMENT STATUS */}
          <View style={[styles.borderRight, styles.w5]}>
            <Text style={[styles.tableBodyText]}>
              {appointedApplicant.employmentStatus}
            </Text>
          </View>

          {/* START ---- PERIOD OF EMPLOYMENT 9% */}
          {/* FROM */}
          <View style={[styles.w4_5, styles.borderRight]}>
            <Text style={[styles.tableBodyText]}>
              {appointedApplicant.employmentFrom}
            </Text>
          </View>

          {/* TO */}
          <View style={[styles.w4_5, styles.borderRight]}>
            <Text style={[styles.tableBodyText]}>
              {appointedApplicant.employmentTo}
            </Text>
          </View>
          {/* END ---- PERIOD OF EMPLOYMENT */}

          {/* NATURE OF APPOINTMENT */}
          <View style={[styles.borderRight, styles.w6]}>
            <Text style={[styles.tableBodyText]}>
              {appointedApplicant.natureOfAppointment}
            </Text>
          </View>

          {/* START ---- PUBLICATION 11% */}
          {/* DATE 45% */}
          <View style={[styles.w4_90, styles.borderRight]}>
            <Text style={[styles.tableBodyText]}>
              {appointedApplicant.publicationPeriod}
            </Text>
          </View>

          {/* MODE 55% */}
          <View style={[styles.w6_1, styles.borderRight]}>
            <Text
              style={[styles.tableBodyText, { textTransform: "capitalize" }]}
            >
              {appointedApplicant.publicationMode}
            </Text>
          </View>
          {/* END ---- PUBLICATION */}

          {/* START ---- CSC ACTION 14% */}
          {/* VALIDATED 33_33% */}
          <View style={[styles.w4_63, styles.borderRight]}>
            <Text style={[styles.tableBodyText]}></Text>
          </View>

          {/* DATE OF ACTION 33_33% */}
          <View style={[styles.w4_63, styles.borderRight]}>
            <Text style={[styles.tableBodyText]}></Text>
          </View>

          {/* DATE OF RELEASE 33_33% */}
          <View style={[styles.w4_73, styles.borderRight]}>
            <Text style={[styles.tableBodyText]}></Text>
          </View>
          {/* END ---- CSC ACTION */}

          {/* AGENCY RECEIVING OFFICER */}
          <View style={[styles.w4]}>
            <Text
              style={[styles.tableBodyText, { textTransform: "capitalize" }]}
            ></Text>
          </View>
        </View>
      )
    )

    return content
  }

  const renderHRDManagerSignatory = () => {
    var content = reportOnAppointmentsIssued.signatories
      .filter(signee => signee.role === "Department Manager")
      .map((filtered, index) => (
        <View style={[{ paddingTop: 20 }]} key={index}>
          <View style={[styles.w67, styles.horizontalCenter]}>
            <View style={[styles.borderBottom]}>
              <Text style={[styles.bodyTextBoldUppercase, { fontSize: 8.5 }]}>
                {filtered.fullName}
              </Text>
            </View>
            <Text style={[styles.horizontalCenter, { paddingTop: 1 }]}>
              {filtered.position}
            </Text>
          </View>
        </View>
      ))

    return content
  }

  const renderGeneralManagerSignatory = () => {
    var content = reportOnAppointmentsIssued.signatories
      .filter(signee => signee.role === "General Manager")
      .map((filtered, index) => (
        <View style={[{ paddingTop: 20 }]} key={index}>
          <View style={[styles.w67, styles.horizontalCenter]}>
            <View style={[styles.borderBottom]}>
              <Text style={[styles.bodyTextBoldUppercase, { fontSize: 8.5 }]}>
                {filtered.fullName}
              </Text>
            </View>
            <Text style={[styles.horizontalCenter, { paddingTop: 1 }]}>
              {filtered.position}
            </Text>
          </View>
        </View>
      ))

    return content
  }

  return (
    <Document
      author="General Santos City Water District"
      subject="CS Form No. 2 | Revised 2018"
      title={"Report on Appointments Issued " + yearMonth}
    >
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Header yearMonth={yearMonth} />

        <View style={[styles.bodyBorder, styles.bodyText]}>
          {/* DATE RECEIVED */}
          <View
            style={[
              styles.w100,
              {
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingRight: 10,
              },
            ]}
          >
            <View style={[styles.rowContainer, styles.w25]}>
              <Text style={[styles.bodyTextBold, styles.w38]}>
                Date received by CSCPO:
              </Text>
              <View style={[styles.borderBottom, styles.w62]}></View>
            </View>
          </View>

          {/* AGENCY / CSC RESOLUTION / CSCFO in-charge */}
          <View style={[styles.rowContainer, styles.bodyTextBold]}>
            <View style={[styles.w33_33]}>
              <View style={[styles.rowContainer, { justifyContent: "center" }]}>
                <Text>AGENCY:</Text>
                <View
                  style={[
                    styles.borderBottom,
                    styles.w60,
                    styles.horizontalCenter,
                  ]}
                >
                  <Text>GENERAL SANTOS CITY WATER DISTRICT</Text>
                </View>
              </View>
            </View>
            <View style={[styles.w33_33]}>
              <View style={[styles.rowContainer, { justifyContent: "center" }]}>
                <Text>CSC Resolution No:</Text>
                <View
                  style={[
                    styles.borderBottom,
                    styles.w35,
                    styles.horizontalCenter,
                  ]}
                >
                  <Text>1100603</Text>
                </View>
              </View>
            </View>
            <View style={[styles.w33_33]}>
              <View style={[styles.rowContainer]}>
                <Text>CSCFO in-charge:</Text>
                <View style={[styles.borderBottom, styles.w77_5]}></View>
              </View>
            </View>
          </View>

          {/* INSTRUCTIONS */}
          <View style={[styles.bodyText, { paddingBottom: 3 }]}>
            <View style={[styles.rowContainer]}>
              <Text style={[{ paddingRight: 10 }]}>INSTRUCTIONS</Text>
              <View>
                <Text>
                  (1) Fill-out the data needed in the form completely and
                  accurately.
                </Text>
                <Text>(2) Do not abbreviate entries in the form.</Text>
                <Text>
                  (3) Accomplish the Checklist of Common Requirements and sign
                  the certification.
                </Text>
                <Text>
                  (4) Submit the duly accomplished form in electronic and
                  printed copy (2 cpoies) to the CSC Field Office-in-Charge
                </Text>
                <Text style={[{ paddingLeft: 11 }]}>
                  together with the original CSC copy of appointments and
                  supporting documents within the 30th day of the succeeding
                  month.
                </Text>
              </View>
            </View>

            <Text style={[styles.bodyTextBold]}>
              Pertinent data on appointed issued
            </Text>
          </View>

          {/* TABLE */}
          <View style={[styles.tableBorder]} wrap={false}>
            {/* TABLE HEADER */}
            <View style={[styles.rowContainerTable]}>
              {/* NUMBER */}
              <View style={[styles.borderRight, styles.w2]}>
                <Text style={[styles.tableHeaderText]}></Text>
              </View>

              {/* DATE ISSUED */}
              <View style={[styles.borderRight, styles.w5]}>
                <Text style={[styles.tableHeaderText]}>
                  Date issued/ Effectivity (mm/dd/yyyy)
                </Text>
              </View>

              {/* NAME OF APPOINTEE/S */}
              <View style={[styles.borderRight, styles.w23]}>
                <View style={[styles.borderBottom]}>
                  <Text style={[styles.bodyTextBold, styles.tableHeaderText]}>
                    NAME OF APPOINTEE/S
                  </Text>
                </View>

                <View style={[styles.rowContainerTable]}>
                  {/* LAST NAME */}
                  <View style={[styles.w31_5, styles.borderRight]}>
                    <Text style={[styles.tableHeaderText]}>Last Name</Text>
                  </View>

                  {/* FIRST NAME */}
                  <View
                    style={[
                      styles.w33,
                      styles.borderRight,
                      styles.nameOfAppointeeCols,
                    ]}
                  >
                    <Text style={[styles.tableHeaderText]}>First Name</Text>
                  </View>

                  {/* NAME EXTENSION */}
                  <View
                    style={[
                      styles.w14_5,
                      styles.borderRight,
                      styles.nameOfAppointeeCols,
                    ]}
                  >
                    <Text style={[styles.tableHeaderText]}>Name Extension</Text>
                  </View>

                  {/* MIDDLE NAME */}
                  <View style={[styles.w21, styles.nameOfAppointeeCols]}>
                    <Text style={[styles.tableHeaderText]}>Middle Name</Text>
                  </View>
                </View>
              </View>

              {/* POSITION TITLE */}
              <View style={[styles.borderRight, styles.w7]}>
                <Text style={[styles.tableHeaderText]}>
                  POSITION TITLE (indicate parenthetical title if applicable)
                </Text>
              </View>

              {/* ITEM NO. */}
              <View style={[styles.borderRight, styles.w6]}>
                <Text style={[styles.tableHeaderText]}>ITEM NO.</Text>
              </View>

              {/* SALARY/ JOB/ PAY GRADE */}
              <View style={[styles.borderRight, styles.w3_5]}>
                <Text style={[styles.tableHeaderText]}>
                  SALARY/ JOB/ PAY GRADE.
                </Text>
              </View>

              {/* SALARY RATE */}
              <View style={[styles.borderRight, styles.w4_5]}>
                <Text style={[styles.tableHeaderText]}>
                  SALARY RATE (Monthly)
                </Text>
              </View>

              {/* EMPLOYMENT STATUS */}
              <View style={[styles.borderRight, styles.w5]}>
                <Text style={[styles.tableHeaderText]}>EMPLOYMENT STATUS</Text>
              </View>

              {/* PERIOD OF EMPLOYMENT */}
              <View style={[styles.borderRight, styles.w9]}>
                <Text style={[styles.tableHeaderText]}>
                  PERIOD OF EMPLOYMENT (for Temporary, Casual/ Contractual
                  Appointments) (mm/dd/yyyy to mm/dd/yyyy)
                </Text>
              </View>

              {/* NATURE OF APPOINTMENT */}
              <View style={[styles.borderRight, styles.w6]}>
                <Text style={[styles.tableHeaderText]}>
                  NATURE OF APPOINTMENT
                </Text>
              </View>

              {/* PUBLICATION */}
              <View style={[styles.borderRight, styles.w11]}>
                <View style={[styles.borderBottom]}>
                  <Text style={[styles.bodyTextBold, styles.tableHeaderText]}>
                    PUBLICATION
                  </Text>
                </View>

                <View style={[styles.rowContainerTable]}>
                  {/* DATE */}
                  <View
                    style={[
                      styles.w45,
                      styles.borderRight,
                      styles.publicationCols,
                    ]}
                  >
                    <View style={[styles.tableHeaderText]}>
                      <Text style={[{ fontFamily: "CalibriRegularBold" }]}>
                        DATE
                      </Text>
                      <Text style={[{ fontSize: 5 }]}>
                        indicate period of publication (mm/dd/yyyy to
                        mm/dd/yyyy)
                      </Text>
                    </View>
                  </View>

                  {/* MODE */}
                  <View style={[styles.w55, styles.publicationCols]}>
                    <View style={[styles.tableHeaderText]}>
                      <Text style={[{ fontFamily: "CalibriRegularBold" }]}>
                        MODE
                      </Text>
                      <Text>(CSC Bulletin of Vacant Positions)</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* CSC ACTION */}
              <View style={[styles.borderRight, styles.w14]}>
                <View style={[styles.borderBottom]}>
                  <Text style={[styles.bodyTextBold, styles.tableHeaderText]}>
                    CSC ACTION
                  </Text>
                </View>

                <View style={[styles.rowContainerTable]}>
                  {/* VALIDATED */}
                  <View
                    style={[
                      styles.w33_33,
                      styles.borderRight,
                      styles.cscActionCols,
                    ]}
                  >
                    <Text style={[styles.tableHeaderText]}>
                      V-Validated INV- Invalidated
                    </Text>
                  </View>

                  {/* DATE OF ACTION */}
                  <View
                    style={[
                      styles.w33_33,
                      styles.borderRight,
                      styles.cscActionCols,
                    ]}
                  >
                    <Text style={[styles.tableHeaderText]}>
                      Date of Action (mm/dd/yyyy)
                    </Text>
                  </View>

                  {/* DATE OF RELEASE*/}
                  <View style={[styles.w33_33, styles.cscActionCols]}>
                    <Text style={[styles.tableHeaderText]}>
                      Date of Release (mm/dd/yyyy)
                    </Text>
                  </View>
                </View>
              </View>

              {/* AGENCY RECEIVING OFFICER */}
              <View style={[styles.w4]}>
                <Text style={[styles.tableHeaderText]}>
                  Agency Receiving Officer
                </Text>
              </View>
            </View>

            {/* TABLE BODY (NUMBERING) */}
            <View style={[styles.rowContainerTable, styles.borderTop]}>
              {/* NUMBER */}
              <View style={[styles.borderRight, styles.w2]}>
                <Text style={[styles.tableHeaderText]}></Text>
              </View>

              {/* DATE ISSUED */}
              <View style={[styles.borderRight, styles.w5]}>
                <Text style={[styles.tableHeaderText]}>(1)</Text>
              </View>

              {/* NAME OF APPOINTEE/S */}
              <View style={[styles.borderRight, styles.w23]}>
                <Text style={[styles.tableHeaderText]}>(2)</Text>
              </View>

              {/* POSITION TITLE */}
              <View style={[styles.borderRight, styles.w7]}>
                <Text style={[styles.tableHeaderText]}>(3)</Text>
              </View>

              {/* ITEM NO. */}
              <View style={[styles.borderRight, styles.w6]}>
                <Text style={[styles.tableHeaderText]}>(4)</Text>
              </View>

              {/* SALARY/ JOB/ PAY GRADE */}
              <View style={[styles.borderRight, styles.w3_5]}>
                <Text style={[styles.tableHeaderText]}>(5)</Text>
              </View>

              {/* SALARY RATE */}
              <View style={[styles.borderRight, styles.w4_5]}>
                <Text style={[styles.tableHeaderText]}>(6)</Text>
              </View>

              {/* EMPLOYMENT STATUS */}
              <View style={[styles.borderRight, styles.w5]}>
                <Text style={[styles.tableHeaderText]}>(7)</Text>
              </View>

              {/* PERIOD OF EMPLOYMENT */}
              <View style={[styles.borderRight, styles.w9]}>
                <Text style={[styles.tableHeaderText]}>(8)</Text>
              </View>

              {/* NATURE OF APPOINTMENT */}
              <View style={[styles.borderRight, styles.w6]}>
                <Text style={[styles.tableHeaderText]}>(9)</Text>
              </View>

              {/* START ---- PUBLICATION 11% */}
              {/* DATE */}
              <View style={[styles.w4_90, styles.borderRight]}>
                <Text style={[styles.tableHeaderText]}>(10)</Text>
              </View>

              {/* MODE */}
              <View style={[styles.w6_1, styles.borderRight]}>
                <Text style={[styles.tableHeaderText]}>(11)</Text>
              </View>
              {/* END ---- PUBLICATION */}

              {/* START ---- CSC ACTION */}
              {/* VALIDATED */}
              <View style={[styles.w4_63, styles.borderRight]}>
                <Text style={[styles.tableHeaderText]}>(12)</Text>
              </View>

              {/* DATE OF ACTION */}
              <View style={[styles.w4_63, styles.borderRight]}>
                <Text style={[styles.tableHeaderText]}>(13)</Text>
              </View>

              {/* DATE OF RELEASE*/}
              <View style={[styles.w4_73, styles.borderRight]}>
                <Text style={[styles.tableHeaderText]}>(14)</Text>
              </View>
              {/* END ---- CSC ACTION */}

              {/* AGENCY RECEIVING OFFICER */}
              <View style={[styles.w4]}>
                <Text style={[styles.tableHeaderText]}>(15)</Text>
              </View>
            </View>

            {/* TABLE BODY (DATA) (SAMPLE ONLY) */}
            {renderAppointedApplicant()}
          </View>

          {/* DETAILS AFTER TABLE */}
          <View style={[styles.rowContainer]} wrap={false}>
            {/* CERTIFICATION 1 */}
            <View style={[styles.w33_33]}>
              <Text style={[styles.bodyTextBold]}>CERTIFICATION:</Text>

              {/* CERTIFICATION TEXT */}
              <View
                style={[
                  styles.bodyText,
                  { paddingTop: 6, justifyContent: "center" },
                ]}
              >
                <Text style={[{ paddingLeft: 8 }]}>
                  This is to certify that the information contained in this
                </Text>
                <Text>
                  report are true, correct and complete based on the Plantilla
                </Text>
                <Text>of Personnel and appointment/s issued.</Text>
              </View>

              {renderHRDManagerSignatory()}
            </View>

            {/* CERTIFICATION 2 */}
            <View style={[styles.w33_33]}>
              <Text style={[styles.bodyTextBold]}>CERTIFICATION:</Text>

              {/* CERTIFICATION TEXT */}
              <View
                style={[
                  styles.bodyText,
                  { paddingTop: 6, justifyContent: "center" },
                ]}
              >
                <Text style={[{ paddingLeft: 8 }]}>
                  This is to certify that the appointment/s issued
                </Text>
                <Text>is/are accordance with existing Civil Service Law,</Text>
                <Text>rules and regulations.</Text>
              </View>

              {renderGeneralManagerSignatory()}
            </View>

            {/* POST-AUDITED BY */}
            <View style={[styles.w33_33]}>
              <Text style={[styles.bodyTextBold]}>Post-Audited by::</Text>

              <View>
                <Text>{""}</Text>
              </View>

              <View style={[{ paddingTop: 53 }]}>
                <View style={[styles.w67, styles.horizontalCenter]}>
                  <View style={[styles.borderBottom]}>
                    <Text
                      style={[styles.bodyTextBoldUppercase, { fontSize: 8.5 }]}
                    >
                      DIR. EDNA C. NEBRUA-MAHINAY
                    </Text>
                  </View>
                  <Text style={[styles.horizontalCenter, { paddingTop: 1 }]}>
                    CSC Official
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* FOR CSC USE ONLY */}
          <View style={[{ marginTop: 10 }]} wrap={false}>
            <Text style={[styles.bodyTextBold, { paddingLeft: 2 }]}>
              For CSC Use Only:
            </Text>
            <View style={[styles.tableBorder]}>
              <View
                style={[styles.borderBottom, { paddingTop: 2, paddingLeft: 2 }]}
              >
                <Text style={[styles.bodyTextBold]}>
                  REMARKS/COMMENTS/RECOMMENDATIONS (e.g. Reasons for
                  Invalidation):
                </Text>
              </View>
              <View style={[{ paddingTop: 13 }]}></View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

RAIDocument.propTypes = {
  reportOnAppointmentsIssued: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        effectivityDate: PropTypes.string,
        lastName: PropTypes.string,
        firstName: PropTypes.string,
        nameExtension: PropTypes.string,
        middleName: PropTypes.string,
        positionTitle: PropTypes.string,
        itemNumber: PropTypes.string,
        salaryGrade: PropTypes.string,
        monthlySalary: PropTypes.string,
        employmentFrom: PropTypes.string,
        employmentTo: PropTypes.string,
        natureOfAppointment: PropTypes.string,
        publicationPeriod: PropTypes.string,
        publicationMode: PropTypes.string,
      })
    ),
    signatories: PropTypes.arrayOf(
      PropTypes.shape({
        fullName: PropTypes.string,
        position: PropTypes.string,
        assignment: PropTypes.string,
        role: PropTypes.string,
      })
    ),
  }).isRequired,
  yearMonth: PropTypes.string.isRequired,
}
export default RAIDocument
