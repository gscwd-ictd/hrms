import React from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer"
import Header from "components/PdfDocuments/CompetencyBasedInterviewReport/Header"

// Fonts
import CalibriRegular from "assets/fonts/uploads/calibri-regular.ttf"
import CalibriRegularBold from "assets/fonts/uploads/calibri-regular-bold.ttf"
import CalibriBoldItalic from "assets/fonts/uploads/calibri-bold-italic.ttf"

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
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  signature: {
    width: 100,
    marginHorizontal: "auto",
  },

  // Border Styles
  borderAll: {
    border: "2px solid #000000",
  },
  borderTop: {
    borderTop: "1px solid #000000",
  },
  borderRight: {
    borderRight: "1px solid #000000",
  },
  borderBottom: {
    borderBottom: "1px solid #000000",
  },
  borderLeft: {
    borderLeft: "1px solid #000000",
  },

  // Field Styles
  documentTitle: {
    fontFamily: "CalibriRegularBold",
    fontSize: 11,
    marginVertical: 8,
    textAlign: "center",
  },
  pleaseIndicateText: {
    fontFamily: "CalibriBoldItalic",
    fontSize: 11,
    marginVertical: 2,
  },
  bodyText: {
    fontFamily: "CalibriRegular",
    fontSize: 10,
  },
  coeaKey: {
    paddingTop: 2,
    paddingLeft: 2,
  },
  coeaValue: {
    paddingTop: 2,
    paddingLeft: 2,
    textTransform: "uppercase",
  },

  upperCase: {
    textTransform: "uppercase",
  },
  signatoryName: {
    fontFamily: "CalibriRegularBold",
    textTransform: "uppercase",
  },

  verticalCenter: { margin: "auto 0" },
  horizontalCenter: { textAlign: "center" },

  // Width Styles
  w100: { width: "100%" },
  w92: { width: "92%" },
  w80: { width: "80%" },
  w70: { width: "70%" },
  w65: { width: "65%" },
  w60: { width: "60%" },
  w50: { width: "50%" },
  w45: { width: "45%" },
  w42_5: { width: "42.5%" },
  w40: { width: "40%" },
  w35: { width: "35%" },
  w32: { width: "32%" },
  w30: { width: "30%" },
  w27_5: { width: "27.5%" },
  w20: { width: "20%" },
  w16_66: { width: "16.66%" },
  w15: { width: "15%" },
  w8_5: { width: "8.5%" },
  w8: { width: "8%" },
  w7_75: { width: "7.75" },
  w7_1: { width: "7.1%" },
  w6: { width: "6%" },

  h55: { height: 55 },
})

Font.register({
  family: "CalibriRegular",
  src: CalibriRegular,
})

Font.register({
  family: "CalibriRegularBold",
  src: CalibriRegularBold,
})

Font.register({
  family: "CalibriBoldItalic",
  src: CalibriBoldItalic,
})

const CBIRDocument = props => {
  const {
    competencyBasedInterviewReportsHeader,
    competencyBasedInterviewReports,
  } = props

  const renderCoreCompeteciesHeader = () => {
    if (!isEmpty(competencyBasedInterviewReportsHeader.core)) {
      var content = (
        <View style={[styles.w42_5, { borderRight: "2px solid #000000" }]}>
          <View style={[styles.borderBottom]}>
            <View style={[styles.horizontalCenter]}>
              <Text style={[{ paddingTop: 2 }]}>CORE COMPETENCIES</Text>
            </View>
          </View>

          <View style={[styles.rowContainer, styles.borderBottom]}>
            {competencyBasedInterviewReportsHeader.core.map(
              (coreHeader, index) => (
                <View style={[styles.w20, styles.borderRight]} key={index}>
                  <View style={[styles.horizontalCenter]}>
                    <View style={[styles.borderBottom, styles.h55]}>
                      <Text style={[styles.verticalCenter, { fontSize: 7.5 }]}>
                        {coreHeader.name}
                      </Text>
                    </View>
                    <Text style={[{ paddingTop: 2, fontSize: 8 }]}>
                      {coreHeader.level}
                    </Text>
                  </View>
                </View>
              )
            )}

            <View style={[styles.w20]}>
              <View style={[styles.horizontalCenter, styles.verticalCenter]}>
                <Text style={[{ fontSize: 8 }]}>AVERAGE</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }

    return content
  }

  const renderFuncCompeteciesHeader = () => {
    if (!isEmpty(competencyBasedInterviewReportsHeader.functional)) {
      var content = (
        <View style={[styles.w42_5]}>
          <View style={[styles.borderBottom]}>
            <View style={[styles.horizontalCenter]}>
              <Text style={[{ paddingTop: 2 }]}>FUNCTIONAL COMPETENCIES</Text>
            </View>
          </View>

          <View style={[styles.rowContainer, styles.borderBottom]}>
            {competencyBasedInterviewReportsHeader.functional.map(
              (funcHeader, index) => (
                <View style={[styles.w20, styles.borderRight]} key={index}>
                  <View style={[styles.horizontalCenter]}>
                    <View style={[styles.borderBottom, styles.h55]}>
                      <Text style={[styles.verticalCenter, { fontSize: 7.5 }]}>
                        {funcHeader.name}
                      </Text>
                    </View>
                    <Text style={[{ paddingTop: 2, fontSize: 8 }]}>
                      {funcHeader.level}
                    </Text>
                  </View>
                </View>
              )
            )}

            <View style={[styles.w20]}>
              <View style={[styles.horizontalCenter, styles.verticalCenter]}>
                <Text style={[{ fontSize: 8 }]}>AVERAGE</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }

    return content
  }

  const renderMgmtCompeteciesHeader = () => {
    if (!isEmpty(competencyBasedInterviewReportsHeader.managerial)) {
      var content = (
        <View style={[styles.w42_5]}>
          <View style={[styles.borderBottom]}>
            <View style={[styles.horizontalCenter]}>
              <Text style={[{ paddingTop: 2 }]}>MANAGERIAL COMPETENCIES</Text>
            </View>
          </View>

          <View style={[styles.rowContainer, styles.borderBottom]}>
            {competencyBasedInterviewReportsHeader.managerial.map(
              (mangerialHeader, index) => (
                <View style={[styles.w16_66, styles.borderRight]} key={index}>
                  <View style={[styles.horizontalCenter]}>
                    <View style={[styles.borderBottom, styles.h55]}>
                      <Text style={[styles.verticalCenter, { fontSize: 7.5 }]}>
                        {mangerialHeader.name}
                      </Text>
                    </View>
                    <Text style={[{ paddingTop: 2, fontSize: 8 }]}>
                      {mangerialHeader.level}
                    </Text>
                  </View>
                </View>
              )
            )}

            <View style={[styles.w20]}>
              <View style={[styles.horizontalCenter, styles.verticalCenter]}>
                <Text style={[{ fontSize: 8 }]}>AVERAGE</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }

    return content
  }

  const renderApplicantScore = psb => {
    if (!isEmpty(psb.competencyBasedInterviewReport.applicantsScores)) {
      var content = (
        <>
          {psb.competencyBasedInterviewReport.applicantsScores.map(
            (applicant, index) => (
              <View
                style={[styles.rowContainer, styles.borderBottom]}
                key={index}
              >
                {/* APPLICANT NAME */}
                <View
                  style={[styles.w15, { borderRight: "2px solid #000000" }]}
                >
                  <View
                    style={[styles.horizontalCenter, styles.verticalCenter]}
                  >
                    <Text>{applicant.applicantName2}</Text>
                  </View>
                </View>

                {/* CORE */}
                {!isEmpty(applicant.competencies.coreScores) ? (
                  <View
                    style={[styles.w42_5, { borderRight: "2px solid #000000" }]}
                  >
                    <View style={[styles.rowContainer]}>
                      {applicant.competencies.coreScores.map(score => (
                        <View
                          style={[styles.w20, styles.borderRight]}
                          key={score.ratingId}
                        >
                          <View style={[styles.horizontalCenter]}>
                            <View style={[{ height: 15 }]}>
                              <Text
                                style={[styles.verticalCenter, { fontSize: 9 }]}
                              >
                                {score.rating}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ))}

                      <View style={[styles.w20]}>
                        <View
                          style={[
                            styles.horizontalCenter,
                            styles.verticalCenter,
                          ]}
                        >
                          <Text style={[{ fontSize: 8 }]}>
                            {applicant.competencies.coreAverage}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null}

                {/* FUNCTIONAL */}
                {!isEmpty(applicant.competencies.functionalScores) ? (
                  <View style={[styles.w42_5]}>
                    <View style={[styles.rowContainer]}>
                      {applicant.competencies.functionalScores.map(score => (
                        <View
                          style={[styles.w20, styles.borderRight]}
                          key={score.ratingId}
                        >
                          <View style={[styles.horizontalCenter]}>
                            <View style={[{ height: 15 }]}>
                              <Text
                                style={[styles.verticalCenter, { fontSize: 9 }]}
                              >
                                {score.rating}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ))}

                      <View style={[styles.w20]}>
                        <View
                          style={[
                            styles.horizontalCenter,
                            styles.verticalCenter,
                          ]}
                        >
                          <Text style={[{ fontSize: 8 }]}>
                            {applicant.competencies.functionalAverage}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null}

                {/* MANAGERIAL */}
                {!isEmpty(applicant.competencies.managerialScore) ? (
                  <View style={[styles.w42_5]}>
                    <View style={[styles.rowContainer]}>
                      {applicant.competencies.managerialScore.map(score => (
                        <View
                          style={[styles.w20, styles.borderRight]}
                          key={score.ratingId}
                        >
                          <View style={[styles.horizontalCenter]}>
                            <View style={[{ height: 15 }]}>
                              <Text
                                style={[styles.verticalCenter, { fontSize: 9 }]}
                              >
                                {score.rating}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ))}

                      <View style={[styles.w20]}>
                        <View
                          style={[
                            styles.horizontalCenter,
                            styles.verticalCenter,
                          ]}
                        >
                          <Text style={[{ fontSize: 8 }]}>
                            {applicant.competencies.managerialAvg}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null}
              </View>
            )
          )}
        </>
      )
    }

    return content
  }

  return (
    <Document
      author="General Santos City Water District"
      subject=" HRD-002-3"
      title="Competency Based-Interview Report"
    >
      <Page size="A4" orientation="landscape" style={styles.page}>
        {!isEmpty(competencyBasedInterviewReports) &&
        !isEmpty(competencyBasedInterviewReportsHeader) ? (
          <>
            {competencyBasedInterviewReports.map((psb, index) => {
              return (
                <View key={index} wrap={false}>
                  <Header />

                  <View style={[{ paddingHorizontal: 5 }]}>
                    {/* DOCUMENT TITLE */}
                    <View style={[styles.documentTitle]}>
                      <Text>COMPETENCY BASED-INTERVIEW REPORT</Text>
                      <Text style={[{ fontSize: 9 }]}>
                        (To be accomplished by interviewers)
                      </Text>
                    </View>

                    {/* REMINDER */}
                    <Text style={[styles.pleaseIndicateText]}>
                      PLEASE INDICATE IN APPROPRIATE SPACE YOUR RATING AND
                      RECOMMENDATION
                    </Text>

                    {/* TABLE APPLICANT SCORES */}
                    <View style={[styles.borderAll, styles.bodyText]}>
                      {/* HEADER */}
                      <View style={[styles.rowContainer]}>
                        <View
                          style={[
                            styles.w15,
                            styles.borderBottom,
                            { borderRight: "2px solid #000000" },
                          ]}
                        >
                          <View
                            style={[
                              styles.horizontalCenter,
                              styles.verticalCenter,
                            ]}
                          >
                            <Text>NAME OF APPLICANTS</Text>
                          </View>
                        </View>

                        {!isEmpty(competencyBasedInterviewReportsHeader) ? (
                          <>
                            {/* render core competency headers */}
                            {renderCoreCompeteciesHeader()}

                            {/*  render functional competency headers*/}
                            {renderFuncCompeteciesHeader()}

                            {/*  render managerial competency headers*/}
                            {renderMgmtCompeteciesHeader()}
                          </>
                        ) : null}
                      </View>

                      {/* BODY */}
                      {!isEmpty(competencyBasedInterviewReports) ? (
                        <>{renderApplicantScore(psb)}</>
                      ) : null}
                    </View>

                    {/* RECOMMENDATION AND EVAL SCALE */}
                    <View style={[styles.bodyText, { padding: 10 }]}>
                      <View style={[styles.rowContainer]}>
                        {/* RECOMMENDATION */}
                        <View style={[styles.w60, { paddingRight: 5 }]}>
                          {/* RECOMMENDATION VALUE */}
                          {/* <View style={[{ paddingBottom: 15 }]}>
                            <Text>RECOMMENDATION:</Text>
                            <Text style={[styles.borderBottom]}>
                              {
                                psb.competencyBasedInterviewReport
                                  .recommendation
                              }
                            </Text>
                          </View> */}

                          {/* PSB MEMBER DETAILS */}
                          <View style={[styles.rowContainer]}>
                            {/* PSB ROLE */}
                            <View
                              style={[
                                styles.w20,
                                { marginTop: "auto", paddingBottom: 10 },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.horizontalCenter,
                                  { fontSize: 15 },
                                ]}
                              >
                                {
                                  psb.competencyBasedInterviewReport
                                    .psbMemberDetails.role
                                }
                              </Text>
                            </View>

                            {/* SIGNATORY */}
                            <View
                              style={[
                                styles.horizontalCenter,
                                styles.w60,
                                { marginTop: "auto" },
                              ]}
                            >
                              <Image
                                src={
                                  psb.competencyBasedInterviewReport
                                    .psbMemberDetails.signatureUrl
                                }
                                style={[styles.signature]}
                              />
                              <View style={[styles.borderBottom]}>
                                {" "}
                                <Text style={[{ textTransform: "uppercase" }]}>
                                  {
                                    psb.competencyBasedInterviewReport
                                      .psbMemberDetails.fullName
                                  }
                                </Text>
                              </View>
                              <Text style={[{ marginTop: 3 }]}>
                                PRINTED NAME AND SIGNATURE
                              </Text>
                            </View>

                            {/* DATE OF SIGNATORY */}
                            <View
                              style={[
                                styles.horizontalCenter,
                                styles.w20,
                                { marginTop: "auto" },
                              ]}
                            >
                              <View style={[styles.borderBottom]}>
                                {" "}
                                <Text style={[{ textTransform: "uppercase" }]}>
                                  {
                                    psb.competencyBasedInterviewReport
                                      .recommendationDate
                                  }
                                </Text>
                              </View>
                              <Text style={[{ marginTop: 3 }]}>DATE</Text>
                            </View>
                          </View>
                        </View>

                        {/* EVALUATION SCALE */}
                        <View style={[styles.w40]}>
                          <View
                            style={[
                              styles.borderAll,
                              { backgroundColor: "#d1d1d1" },
                            ]}
                          >
                            <View style={[styles.borderBottom]}>
                              <Text
                                style={[
                                  {
                                    fontFamily: "CalibriRegularBold",
                                    padding: 2,
                                  },
                                ]}
                              >
                                Evaluation Scale
                              </Text>
                            </View>

                            {/* 5 */}
                            <View
                              style={[styles.rowContainer, styles.borderBottom]}
                            >
                              <View style={[styles.borderRight, styles.w8]}>
                                <Text
                                  style={[
                                    styles.verticalCenter,
                                    styles.horizontalCenter,
                                    { paddingHorizontal: 3 },
                                  ]}
                                >
                                  5
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={[
                                    styles.verticalCenter,
                                    styles.horizontalCenter,
                                    styles.w92,
                                    {
                                      fontSize: 8,
                                      padding: 3,
                                    },
                                  ]}
                                >
                                  <Text
                                    style={[
                                      { fontFamily: "CalibriRegularBold" },
                                    ]}
                                  >
                                    Excellent
                                  </Text>
                                  <Text>
                                    : The candidate indentified a meaningful
                                    situation that provided strong and
                                    consistent demonstration of teh competency
                                    and/or technical skill through excellent
                                    evidence of meaningful behaviours.
                                  </Text>
                                </Text>
                              </View>
                            </View>

                            {/* 4 */}
                            <View
                              style={[styles.rowContainer, styles.borderBottom]}
                            >
                              <View style={[styles.borderRight, styles.w8]}>
                                <Text
                                  style={[
                                    styles.verticalCenter,
                                    styles.horizontalCenter,
                                    { paddingHorizontal: 3 },
                                  ]}
                                >
                                  4
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={[
                                    styles.verticalCenter,
                                    styles.horizontalCenter,
                                    styles.w92,
                                    {
                                      fontSize: 8,
                                      padding: 3,
                                    },
                                  ]}
                                >
                                  <Text
                                    style={[
                                      { fontFamily: "CalibriRegularBold" },
                                    ]}
                                  >
                                    Good
                                  </Text>
                                  <Text>
                                    : The candidate provided solid positive
                                    evidence of having demonstrated the
                                    competency and/or techncal skill through a
                                    wide range of effective behaviours.
                                  </Text>
                                </Text>
                              </View>
                            </View>

                            {/* 3 */}
                            <View
                              style={[styles.rowContainer, styles.borderBottom]}
                            >
                              <View style={[styles.borderRight, styles.w8]}>
                                <Text
                                  style={[
                                    styles.verticalCenter,
                                    styles.horizontalCenter,
                                    { paddingHorizontal: 3 },
                                  ]}
                                >
                                  3
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={[
                                    styles.verticalCenter,
                                    styles.horizontalCenter,
                                    styles.w92,
                                    {
                                      fontSize: 8,
                                      padding: 3,
                                    },
                                  ]}
                                >
                                  <Text
                                    style={[
                                      { fontFamily: "CalibriRegularBold" },
                                    ]}
                                  >
                                    Average
                                  </Text>
                                  <Text>
                                    : The candidate provided adequate evidence
                                    of having demonstrated the comptency and/or
                                    technical skill through several effective
                                    behaviours.
                                  </Text>
                                </Text>
                              </View>
                            </View>

                            {/* 2 */}
                            <View
                              style={[styles.rowContainer, styles.borderBottom]}
                            >
                              <View style={[styles.borderRight, styles.w8]}>
                                <Text
                                  style={[
                                    styles.verticalCenter,
                                    styles.horizontalCenter,
                                    { paddingHorizontal: 3 },
                                  ]}
                                >
                                  2
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={[
                                    styles.verticalCenter,
                                    styles.horizontalCenter,
                                    styles.w92,
                                    {
                                      fontSize: 8,
                                      padding: 3,
                                    },
                                  ]}
                                >
                                  <Text
                                    style={[
                                      { fontFamily: "CalibriRegularBold" },
                                    ]}
                                  >
                                    Poor
                                  </Text>
                                  <Text>
                                    : The candidate provided poor positive
                                    evidence of having demonstrated the
                                    comptency and/or technical skill through
                                    limited effective behaviours.
                                  </Text>
                                </Text>
                              </View>
                            </View>

                            {/* 1 */}
                            <View style={[styles.rowContainer]}>
                              <View style={[styles.borderRight, styles.w8]}>
                                <Text
                                  style={[
                                    styles.verticalCenter,
                                    styles.horizontalCenter,
                                    { paddingHorizontal: 3 },
                                  ]}
                                >
                                  1
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={[
                                    styles.verticalCenter,
                                    styles.horizontalCenter,
                                    styles.w92,
                                    {
                                      fontSize: 8,
                                      padding: 3,
                                    },
                                  ]}
                                >
                                  <Text
                                    style={[
                                      { fontFamily: "CalibriRegularBold" },
                                    ]}
                                  >
                                    No evidence
                                  </Text>
                                  <Text>
                                    : The candidate did not provide any positive
                                    evidence of having demonstrated the
                                    comptency and/or technical skill.
                                  </Text>
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })}
          </>
        ) : null}
      </Page>

      <Page size="A4" orientation="landscape" style={styles.page}>
        {!isEmpty(competencyBasedInterviewReports) ? (
          <>
            {competencyBasedInterviewReports.map((psb, index) => {
              return (
                <View key={index} wrap={false}>
                  <Header />

                  <View
                    style={[
                      styles.bodyText,
                      { paddingHorizontal: 5, paddingTop: 10 },
                    ]}
                  >
                    {/* POSITION DETAILS & QUALIFICATIONS */}
                    <View style={[styles.borderAll]}>
                      {/* HEADER */}
                      <View style={[styles.rowContainer, styles.borderBottom]}>
                        <View
                          style={[
                            styles.w40,
                            { borderRight: "2px solid #000000" },
                          ]}
                        >
                          <Text
                            style={[
                              {
                                fontFamily: "CalibriRegularBold",
                                paddingTop: 2,
                                paddingLeft: 2,
                              },
                            ]}
                          >
                            COMPARATIVE EVALUATION OF APPLICANTS
                          </Text>
                        </View>
                        <View style={[styles.w60]}>
                          <Text
                            style={[
                              {
                                fontFamily: "CalibriRegularBold",
                                paddingTop: 2,
                                paddingLeft: 2,
                              },
                            ]}
                          >
                            QUALIFICATION STANDARD
                          </Text>
                        </View>
                      </View>

                      {/* BODY TABLE */}
                      <View style={[styles.rowContainer]}>
                        {/* LEFT */}
                        <View
                          style={[
                            styles.w40,
                            { borderRight: "2px solid #000000" },
                          ]}
                        >
                          <View
                            style={[styles.rowContainer, styles.borderBottom]}
                          >
                            <View style={[styles.w35, styles.borderRight]}>
                              <Text style={[styles.coeaKey]}>
                                For the Position of
                              </Text>
                            </View>
                            <View style={[styles.w65]}>
                              <Text style={[styles.coeaValue]}>
                                {
                                  psb.comparativeEvaluationOfApplicants
                                    .positionDetails.positionTitle
                                }
                              </Text>
                            </View>
                          </View>

                          <View
                            style={[styles.rowContainer, styles.borderBottom]}
                          >
                            <View style={[styles.w35, styles.borderRight]}>
                              <Text style={[styles.coeaKey]}>
                                JO / Casual / Permanent
                              </Text>
                            </View>
                            <View style={[styles.w65]}>
                              <Text style={[styles.coeaValue]}>
                                {
                                  psb.comparativeEvaluationOfApplicants
                                    .positionDetails.natureOfAppointment
                                }
                              </Text>
                            </View>
                          </View>

                          <View
                            style={[styles.rowContainer, styles.borderBottom]}
                          >
                            <View style={[styles.w35, styles.borderRight]}>
                              <Text style={[styles.coeaKey]}>
                                {"Office / Department /\n Division"}
                              </Text>
                            </View>
                            <View style={[styles.w65]}>
                              <Text style={[styles.coeaValue]}>
                                {
                                  psb.comparativeEvaluationOfApplicants
                                    .positionDetails.assignedTo
                                }
                              </Text>
                            </View>
                          </View>

                          <View
                            style={[styles.rowContainer, styles.borderBottom]}
                          >
                            <View style={[styles.w35, styles.borderRight]}>
                              <Text style={[styles.coeaKey]}>
                                PSB Date and Time
                              </Text>
                            </View>
                            <View style={[styles.w65]}>
                              <Text style={[styles.coeaValue]}>
                                {psb.comparativeEvaluationOfApplicants.schedule}
                              </Text>
                            </View>
                          </View>
                        </View>

                        {/* RIGHT */}
                        <View style={[styles.w60]}>
                          <View
                            style={[styles.rowContainer, styles.borderBottom]}
                          >
                            <View style={[styles.w20, styles.borderRight]}>
                              <Text style={[styles.coeaKey]}>Education</Text>
                            </View>
                            <View style={[styles.w80]}>
                              <Text
                                style={[
                                  styles.coeaValue,
                                  styles.horizontalCenter,
                                ]}
                              >
                                {
                                  psb.comparativeEvaluationOfApplicants
                                    .positionDetails.qualificationStandards
                                    .education
                                }
                              </Text>
                            </View>
                          </View>

                          <View
                            style={[styles.rowContainer, styles.borderBottom]}
                          >
                            <View style={[styles.w20, styles.borderRight]}>
                              <Text style={[styles.coeaKey]}>Experience</Text>
                            </View>
                            <View style={[styles.w80]}>
                              <Text
                                style={[
                                  styles.coeaValue,
                                  styles.horizontalCenter,
                                ]}
                              >
                                {
                                  psb.comparativeEvaluationOfApplicants
                                    .positionDetails.qualificationStandards
                                    .experience
                                }
                              </Text>
                            </View>
                          </View>

                          <View
                            style={[styles.rowContainer, styles.borderBottom]}
                          >
                            <View style={[styles.w20, styles.borderRight]}>
                              <Text style={[styles.coeaKey]}>Training</Text>
                            </View>
                            <View style={[styles.w80]}>
                              <Text
                                style={[
                                  styles.coeaValue,
                                  styles.horizontalCenter,
                                ]}
                              >
                                {
                                  psb.comparativeEvaluationOfApplicants
                                    .positionDetails.qualificationStandards
                                    .training
                                }
                              </Text>
                            </View>
                          </View>

                          <View
                            style={[styles.rowContainer, styles.borderBottom]}
                          >
                            <View style={[styles.w20, styles.borderRight]}>
                              <Text style={[styles.coeaKey]}>Eligibility</Text>
                            </View>
                            <View style={[styles.w80]}>
                              <Text
                                style={[
                                  styles.coeaValue,
                                  styles.horizontalCenter,
                                ]}
                              >
                                {
                                  psb.comparativeEvaluationOfApplicants
                                    .positionDetails.qualificationStandards
                                    .eligibility
                                }
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>

                    {/* APPLICANTS RATING & RATING BREAKDOWN */}
                    <View style={[{ paddingTop: 10 }]}>
                      <View style={[styles.rowContainer]}>
                        {/* PERCENTAGE RATE */}
                        <View style={[styles.w60, styles.borderAll]}>
                          {/* HEADER */}
                          <View
                            style={[styles.rowContainer, styles.borderBottom]}
                          >
                            {/* NAME */}
                            <View style={[styles.w30, styles.borderRight]}>
                              <Text
                                style={[
                                  styles.horizontalCenter,
                                  styles.verticalCenter,
                                ]}
                              >
                                NAME
                              </Text>
                            </View>

                            {/* CORE COMPETENCY */}
                            <View
                              style={[
                                styles.w20,
                                styles.borderRight,
                                { fontSize: 7.5 },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.horizontalCenter,
                                  styles.verticalCenter,
                                ]}
                              >
                                CORE COMPETENCY
                              </Text>
                              <View style={[styles.rowContainer]}>
                                <View style={[styles.w50, styles.borderRight]}>
                                  <Text
                                    style={[
                                      styles.horizontalCenter,
                                      { paddingTop: 3 },
                                    ]}
                                  >
                                    AVERAGE
                                  </Text>
                                </View>
                                <View style={[styles.w50]}>
                                  <Text
                                    style={[
                                      styles.horizontalCenter,
                                      { paddingTop: 3 },
                                    ]}
                                  >
                                    30%
                                  </Text>
                                </View>
                              </View>
                            </View>

                            {/* FUNC/LEADERSHIP COMPETENCIES */}
                            <View
                              style={[
                                styles.w20,
                                styles.borderRight,
                                { fontSize: 7.5 },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.horizontalCenter,
                                  styles.verticalCenter,
                                  { paddingTop: 2 },
                                ]}
                              >
                                LEADERSHIP/FUNCTIONAL COMPETENCY
                              </Text>
                              <View style={[styles.rowContainer]}>
                                <View style={[styles.w50, styles.borderRight]}>
                                  <Text
                                    style={[
                                      styles.horizontalCenter,
                                      { paddingTop: 3 },
                                    ]}
                                  >
                                    AVERAGE
                                  </Text>
                                </View>
                                <View style={[styles.w50]}>
                                  <Text
                                    style={[
                                      styles.horizontalCenter,
                                      { paddingTop: 3 },
                                    ]}
                                  >
                                    40%
                                  </Text>
                                </View>
                              </View>
                            </View>

                            {/* EXAM */}
                            <View
                              style={[
                                styles.w15,
                                styles.borderRight,
                                { fontSize: 7.5 },
                              ]}
                            >
                              <View
                                style={[
                                  styles.horizontalCenter,
                                  styles.verticalCenter,
                                ]}
                              >
                                <Text>EXAM</Text>
                                <Text style={[{ paddingTop: 4 }]}>30%</Text>
                              </View>
                            </View>

                            {/* TOTAL RATING */}
                            <View style={[styles.w15, { fontSize: 7.5 }]}>
                              <Text
                                style={[
                                  styles.horizontalCenter,
                                  styles.verticalCenter,
                                ]}
                              >
                                TOTAL RATING
                              </Text>
                            </View>
                          </View>

                          {/* BODY */}
                          {psb.comparativeEvaluationOfApplicants.applicantsRating.map(
                            applicant => {
                              return (
                                <View
                                  style={[
                                    styles.rowContainer,
                                    styles.borderBottom,
                                  ]}
                                  key={applicant.applicantId}
                                >
                                  {/* NAME */}
                                  <View
                                    style={[styles.w30, styles.borderRight]}
                                  >
                                    <Text
                                      style={[
                                        styles.verticalCenter,
                                        { paddingLeft: 3, paddingTop: 3 },
                                      ]}
                                    >
                                      {applicant.applicantName2}
                                    </Text>
                                  </View>

                                  {/* CORE COMPETENCY */}
                                  <View
                                    style={[styles.w20, styles.borderRight]}
                                  >
                                    <View style={[styles.rowContainer]}>
                                      <View
                                        style={[styles.w50, styles.borderRight]}
                                      >
                                        <Text
                                          style={[
                                            styles.horizontalCenter,
                                            { paddingTop: 3 },
                                          ]}
                                        >
                                          {applicant.coreAverage}
                                        </Text>
                                      </View>
                                      <View style={[styles.w50]}>
                                        <Text
                                          style={[
                                            styles.horizontalCenter,
                                            { paddingTop: 3 },
                                          ]}
                                        >
                                          {applicant.corePercentage}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>

                                  {/* FUNC/LEADERSHIP COMPETENCIES */}
                                  <View
                                    style={[styles.w20, styles.borderRight]}
                                  >
                                    <View style={[styles.rowContainer]}>
                                      <View
                                        style={[styles.w50, styles.borderRight]}
                                      >
                                        <Text
                                          style={[
                                            styles.horizontalCenter,
                                            { paddingTop: 3 },
                                          ]}
                                        >
                                          {applicant.functionalAverage ||
                                            applicant.managerialAverage}
                                        </Text>
                                      </View>
                                      <View style={[styles.w50]}>
                                        <Text
                                          style={[
                                            styles.horizontalCenter,
                                            { paddingTop: 3 },
                                          ]}
                                        >
                                          {applicant.functionalPercentage ||
                                            applicant.managerialPercentage}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>

                                  {/* EXAM */}
                                  <View
                                    style={[styles.w15, styles.borderRight]}
                                  >
                                    <View
                                      style={[
                                        styles.horizontalCenter,
                                        { paddingTop: 3 },
                                      ]}
                                    >
                                      <Text>{applicant.examPercentage}</Text>
                                    </View>
                                  </View>

                                  {/* TOTAL RATING */}
                                  <View style={[styles.w15]}>
                                    <Text
                                      style={[
                                        styles.horizontalCenter,
                                        { paddingTop: 3 },
                                      ]}
                                    >
                                      {applicant.percentageTotal}
                                    </Text>
                                  </View>
                                </View>
                              )
                            }
                          )}
                        </View>

                        {/* BREAKDOWN */}
                        <View style={[styles.w40]}>
                          <View
                            style={[styles.borderAll, { marginHorizontal: 35 }]}
                          >
                            {/* HEADER */}
                            <View
                              style={[
                                styles.rowContainer,
                                styles.borderBottom,
                                { backgroundColor: "#d1d1d1" },
                              ]}
                            >
                              <View style={[styles.w60, styles.borderRight]}>
                                <Text
                                  style={[
                                    styles.horizontalCenter,
                                    styles.verticalCenter,
                                    { paddingTop: 3 },
                                  ]}
                                >
                                  Percentage of Rating
                                </Text>
                              </View>

                              <View style={[styles.w20, styles.borderRight]}>
                                <Text
                                  style={[
                                    styles.horizontalCenter,
                                    styles.verticalCenter,
                                    { paddingTop: 3 },
                                  ]}
                                >
                                  with exam
                                </Text>
                              </View>

                              <View style={[styles.w20]}>
                                <Text
                                  style={[
                                    styles.horizontalCenter,
                                    styles.verticalCenter,
                                    { paddingTop: 3 },
                                  ]}
                                >
                                  w/o exam
                                </Text>
                              </View>
                            </View>

                            {/* BODY */}
                            {/* Core */}
                            <View
                              style={[styles.rowContainer, styles.borderBottom]}
                            >
                              <View style={[styles.w60, styles.borderRight]}>
                                <Text
                                  style={[
                                    styles.horizontalCenter,
                                    styles.verticalCenter,
                                    { paddingTop: 3 },
                                  ]}
                                >
                                  Core Competency
                                </Text>
                              </View>

                              <View style={[styles.w20, styles.borderRight]}>
                                <Text
                                  style={[
                                    styles.horizontalCenter,
                                    styles.verticalCenter,
                                    { paddingTop: 3 },
                                  ]}
                                >
                                  30%
                                </Text>
                              </View>

                              <View style={[styles.w20]}>
                                <Text
                                  style={[
                                    styles.horizontalCenter,
                                    styles.verticalCenter,
                                    { paddingTop: 3 },
                                  ]}
                                >
                                  40%
                                </Text>
                              </View>
                            </View>

                            {/* Functional */}
                            <View
                              style={[styles.rowContainer, styles.borderBottom]}
                            >
                              <View style={[styles.w60, styles.borderRight]}>
                                <Text
                                  style={[
                                    styles.horizontalCenter,
                                    styles.verticalCenter,
                                    { paddingTop: 3 },
                                  ]}
                                >
                                  Functional Competency
                                </Text>
                              </View>

                              <View style={[styles.w20, styles.borderRight]}>
                                <Text
                                  style={[
                                    styles.horizontalCenter,
                                    styles.verticalCenter,
                                    { paddingTop: 3 },
                                  ]}
                                >
                                  40%
                                </Text>
                              </View>

                              <View style={[styles.w20]}>
                                <Text
                                  style={[
                                    styles.horizontalCenter,
                                    styles.verticalCenter,
                                    { paddingTop: 3 },
                                  ]}
                                >
                                  60%
                                </Text>
                              </View>
                            </View>

                            {/* Examination */}
                            <View
                              style={[styles.rowContainer, styles.borderBottom]}
                            >
                              <View style={[styles.w60, styles.borderRight]}>
                                <Text
                                  style={[
                                    styles.horizontalCenter,
                                    styles.verticalCenter,
                                    { paddingTop: 3 },
                                  ]}
                                >
                                  Examination Results
                                </Text>
                              </View>

                              <View style={[styles.w20, styles.borderRight]}>
                                <Text
                                  style={[
                                    styles.horizontalCenter,
                                    styles.verticalCenter,
                                    { paddingTop: 3 },
                                  ]}
                                >
                                  30%
                                </Text>
                              </View>

                              <View style={[styles.w20]}></View>
                            </View>

                            {/* Total */}
                            <View style={[styles.rowContainer]}>
                              <View style={[styles.w60, styles.borderRight]}>
                                <Text
                                  style={[
                                    styles.horizontalCenter,
                                    styles.verticalCenter,
                                    { paddingTop: 3 },
                                  ]}
                                >
                                  TOTAL RATING
                                </Text>
                              </View>

                              <View style={[styles.w20, styles.borderRight]}>
                                <Text
                                  style={[
                                    styles.horizontalCenter,
                                    styles.verticalCenter,
                                    { paddingTop: 3 },
                                  ]}
                                >
                                  100%
                                </Text>
                              </View>

                              <View style={[styles.w20]}>
                                <Text
                                  style={[
                                    styles.horizontalCenter,
                                    styles.verticalCenter,
                                    { paddingTop: 3 },
                                  ]}
                                >
                                  100
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>

                    {/* SIGNATORY */}
                    <View style={[styles.bodyText, { padding: 20 }]}>
                      <View style={[styles.rowContainer]}>
                        {/* PSB MEMBER DETAILS */}
                        <View style={[styles.rowContainer]}>
                          {/* PSB ROLE */}
                          <View
                            style={[
                              styles.w20,
                              { marginTop: "auto", paddingBottom: 10 },
                            ]}
                          >
                            <Text
                              style={[
                                styles.horizontalCenter,
                                { fontSize: 15 },
                              ]}
                            >
                              {
                                psb.competencyBasedInterviewReport
                                  .psbMemberDetails.role
                              }
                            </Text>
                          </View>

                          {/* SIGNATORY */}
                          <View
                            style={[
                              styles.horizontalCenter,
                              styles.w60,
                              { marginTop: "auto" },
                            ]}
                          >
                            {/* signature image */}
                            <Image
                              src={
                                psb.competencyBasedInterviewReport
                                  .psbMemberDetails.signatureUrl
                              }
                              style={[styles.signature]}
                            />
                            {/* psb member name */}
                            <Text style={[{ textTransform: "uppercase" }]}>
                              {
                                psb.competencyBasedInterviewReport
                                  .psbMemberDetails.fullName
                              }
                            </Text>
                            {/* line */}
                            <View style={[styles.rowContainer]}>
                              <View style={[styles.w27_5]}></View>
                              <View
                                style={[styles.borderBottom, styles.w45]}
                              ></View>
                              <View style={[styles.w27_5]}></View>
                            </View>

                            <Text style={[{ marginTop: 3 }]}>
                              PRINTED NAME AND SIGNATURE
                            </Text>
                          </View>

                          {/* DATE OF SIGNATORY */}
                          <View
                            style={[
                              styles.horizontalCenter,
                              styles.w20,
                              { marginTop: "auto" },
                            ]}
                          >
                            <View style={[styles.borderBottom]}>
                              {" "}
                              <Text style={[{ textTransform: "uppercase" }]}>
                                {
                                  psb.competencyBasedInterviewReport
                                    .recommendationDate
                                }
                              </Text>
                            </View>
                            <Text style={[{ marginTop: 3 }]}>DATE</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })}
          </>
        ) : null}
      </Page>
    </Document>
  )
}

CBIRDocument.propTypes = {
  competencyBasedInterviewReportsHeader: PropTypes.object.isRequired,
  competencyBasedInterviewReports: PropTypes.array.isRequired,
}
export default CBIRDocument
