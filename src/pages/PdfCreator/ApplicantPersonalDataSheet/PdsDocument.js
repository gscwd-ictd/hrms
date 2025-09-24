import React from 'react'
import { Page, Text, View, Document, Svg, Path } from '@react-pdf/renderer'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { styles } from 'pages/PdfCreator/EmployeePersonalDataSheet/PdsStyleSheet'
import {
  renderChildrenExtraPage,
  renderVocationalExtraPage,
  renderCollegeExtraPage,
  renderGraduateExtraPage,
  renderEligibilityExtraPage,
  renderWorkExperienceExtraPage,
  renderVoluntaryWorkExtraPage,
  renderLearningDevelopmentExtraPage1,
  renderLearningDevelopmentExtraPage2,
  renderLearningDevelopmentExtraPage3,
  renderLearningDevelopmentExtraPage4,
  renderLearningDevelopmentExtraPage5,
  renderLearningDevelopmentExtraPage6,
  renderSpecialSkillsExtraPage,
  renderRecognitionExtraPage,
  renderMembershipExtraPage,
} from 'functions/PdsRenderExtraPage'

import PersonalInformationPdf from 'components/PdfDocuments/PersonalDataSheet/Applicant/PersonalInformationPdf'
import FamilyBackgroundPdf from 'components/PdfDocuments/PersonalDataSheet/Applicant/FamilyBackgroundPdf'
import EducationalBackgroundPdf from 'components/PdfDocuments/PersonalDataSheet/Applicant/EducationalBackgroundPdf'
import EligibilityPdf from 'components/PdfDocuments/PersonalDataSheet/Applicant/EligibilityPdf'
import WorkExperiencePdf from 'components/PdfDocuments/PersonalDataSheet/Applicant/WorkExperiencePdf'
import VoluntaryWorkPdf from 'components/PdfDocuments/PersonalDataSheet/Applicant/VoluntaryWorkPdf'
import LearningAndDevelopmentPdf from 'components/PdfDocuments/PersonalDataSheet/Applicant/LearningAndDevelopmentPdf'
import OtherInformationPdf from 'components/PdfDocuments/PersonalDataSheet/Applicant/OtherInformationPdf'
import QuestionsPdf from 'components/PdfDocuments/PersonalDataSheet/Applicant/QuestionsPdf'
import SignatureDate from 'components/PdfDocuments/PersonalDataSheet/Applicant/SignatureDate'
import FooterPdf from 'components/PdfDocuments/PersonalDataSheet/Applicant/FooterPdf'

export const chunkSubstr = word => {
  const middle = Math.floor(word.length / 2)
  const parts =
    word.length === 1
      ? [word]
      : [word.substring(0, middle), word.substring(middle)]

  return parts
}

// Create Document Component
const PdsDocument = props => {
  const {
    personalInfo,
    permanentAddress,
    residentialAddress,
    governmentIssuedIds,
    spouse,
    parents,
    childrenInfo,
    elementary,
    secondary,
    vocational,
    college,
    graduate,
    eligibilities,
    workExperience,
    voluntaryWork,
    learningDevelopment,
    skills,
    recognitions,
    organizations,
    officeRelation,
    guiltyCharged,
    convicted,
    separatedService,
    candidateResigned,
    immigrant,
    indigenousPwdSoloParent,
    references,
    governmentIssuedId,
  } = props

  return (
    <Document
      author="General Santos City Water District"
      subject="CS Form No. 212. Revised 2025"
      title="Personal Data Sheet"
    >
      {/* Page 1 */}
      <Page size={[612.3, 935.4]} style={styles.page}>
        <View style={styles.bodyBorder}>
          <View style={styles.mainTitleContainer}>
            <Text style={styles.mainTitle}>PERSONAL DATA SHEET</Text>
          </View>
          <View style={styles.csFormContainer}>
            <Text style={styles.csForm}>CS Form No. 212</Text>
            <Text style={styles.revised2017}>Revised 2025</Text>
          </View>
          <View>
            <Text style={styles.line4Child1}>
              WARNING: Any misrepresentation made in the Personal Data Sheet and
              the Work Experience Sheet shall cause the filing of
              administrative/criminal case/s against the person concerned.
            </Text>
            <Text style={styles.line5Child1}>
              READ THE ATTACHED GUIDE TO FILLING OUT THE PERSONAL DATA SHEET
              (PDS) BEFORE ACCOMPLISHING THE PDS FORM.
            </Text>
          </View>
          <View style={styles.line7Container}>
            <View style={styles.line7Child1Container}>
              <Text style={styles.line7Child1}>
                Print legibly if accomplished through own handwriting. Tick
                appropriate boxes &#40;
              </Text>
              <Svg
                viewBox="0 0 24 24"
                width={6}
                height={6}
                style={[{ padding: '10 0 0 0' }]}
              >
                <Path
                  d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                  stroke="black"
                />
              </Svg>
              <Text style={styles.line7Child1}>
                &#41; and use separate sheet if necessary. Indicate N/A if not
                applicable.{' '}
                <span style={{ fontFamily: 'Arial', fontWeight: 200 }}>
                  DO NOT ABBREVIATE
                </span>
                .
              </Text>
            </View>
          </View>

          <PersonalInformationPdf
            personalInfo={personalInfo}
            permanentAddress={permanentAddress}
            residentialAddress={residentialAddress}
            governmentIssuedIds={governmentIssuedIds}
          />

          <FamilyBackgroundPdf
            spouse={spouse}
            parents={parents}
            childrenInfo={childrenInfo}
          />

          <EducationalBackgroundPdf
            elementary={elementary}
            secondary={secondary}
            vocational={vocational}
            college={college}
            graduate={graduate}
          />

          <SignatureDate />
        </View>
        <FooterPdf />
      </Page>

      {/* Page 2 */}
      <Page size={[612.3, 935.4]} style={styles.page}>
        <View style={styles.bodyBorder}>
          <EligibilityPdf eligibilities={eligibilities} />

          <WorkExperiencePdf workExperience={workExperience} />

          <SignatureDate />
        </View>
        <FooterPdf />
      </Page>

      {/* Page 3 */}
      <Page size={[612.3, 935.4]} style={styles.page}>
        <View style={styles.bodyBorder}>
          <VoluntaryWorkPdf voluntaryWork={voluntaryWork} />

          <LearningAndDevelopmentPdf
            learningDevelopment={learningDevelopment}
          />

          <OtherInformationPdf
            skills={skills}
            recognitions={recognitions}
            organizations={organizations}
          />

          <SignatureDate />
        </View>
        <FooterPdf />
      </Page>

      {/* Page 4 */}
      <Page size={[612.3, 935.4]} style={styles.page}>
        <View style={styles.bodyBorder}>
          <QuestionsPdf
            officeRelation={officeRelation}
            guiltyCharged={guiltyCharged}
            convicted={convicted}
            separatedService={separatedService}
            candidateResigned={candidateResigned}
            immigrant={immigrant}
            indigenousPwdSoloParent={indigenousPwdSoloParent}
            references={references}
            governmentIssuedId={governmentIssuedId}
          />
        </View>
        <FooterPdf />
      </Page>

      {/* Children Extra Page */}
      {!isEmpty(childrenInfo) && childrenInfo.length > 12 ? (
        <Page size={[612.3, 935.4]} style={styles.page}>
          <View style={styles.bodyBorder}>
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.borderRight, styles.inputKey, styles.w64_2]}>
                <Text>23. NAME of CHILDREN (Write full name and list all)</Text>
              </View>

              <View style={[styles.inputKey, styles.w35_8]}>
                <Text>DATE OF BIRTH (dd/mm/yyyy)</Text>
              </View>
            </View>

            {renderChildrenExtraPage(childrenInfo)}
            <SignatureDate />
          </View>
        </Page>
      ) : null}

      {/* Educational Information Extra Page */}
      {vocational.length > 1 || college.length > 1 || graduate.length > 1 ? (
        <Page size={[612.3, 935.4]} style={styles.page}>
          <View style={styles.bodyBorder}>
            <View style={[styles.sectionTitleContainer, styles.borderBottom]}>
              <Text style={styles.sectionTitleText}>
                III. EDUCATIONAL BACKGROUND
              </Text>
            </View>

            {/* Educational Background Header */}
            <View style={[{ flexDirection: 'row', alignItems: 'stretch' }]}>
              {/* Level */}
              <View
                style={[
                  styles.inputKey,
                  styles.borderRight,
                  styles.w17_2,
                  { flexDirection: 'row' },
                ]}
              >
                <Text style={[styles.verticalCenter]}>26.</Text>
                <Text style={[styles.verticalCenter, { paddingLeft: 28 }]}>
                  LEVEL
                </Text>
              </View>

              {/* Name of School */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w24_5,
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text>NAME OF SCHOOL</Text>
                  <Text>(Write in full)</Text>
                </View>
              </View>

              {/* Degree/Course */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w22_5,
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text>BASIC EDUCATION/DEGREE/COURSE</Text>
                  <Text>(Write in full)</Text>
                </View>
              </View>

              {/* Period of Attendance */}
              <View
                style={[
                  styles.borderRight,
                  styles.horizontalCenter,
                  styles.inputKey,
                  styles.w12,
                  { padding: '0' },
                ]}
              >
                <View
                  style={[{ margin: 'auto 0', padding: '6 1', fontSize: 5.7 }]}
                >
                  <Text>PERIOD OF ATTENDANCE</Text>
                </View>

                <View style={[styles.borderTop, { flexDirection: 'row' }]}>
                  <View
                    style={[
                      styles.borderRight,
                      styles.w50,
                      styles.horizontalCenter,
                    ]}
                  >
                    <Text style={{ lineHeight: 1.4, paddingTop: 0.8 }}>
                      From
                    </Text>
                  </View>
                  <View style={[styles.w50, styles.horizontalCenter]}>
                    <Text style={{ lineHeight: 1.4, paddingTop: 0.8 }}>To</Text>
                  </View>
                </View>
              </View>

              {/* Units earned */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w8_9,
                  { padding: '0 2' },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>HIGHEST LEVEL/ UNITS EARNED</Text>
                  <Text>(if not graduated)</Text>
                </View>
              </View>

              {/* Year graduated */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w7_45,
                  { padding: '0 2' },
                ]}
              >
                <View
                  style={[
                    styles.verticalCenter,
                    { fontSize: 5.7, padding: '0 4' },
                  ]}
                >
                  <Text>YEAR GRADUATED</Text>
                </View>
              </View>

              {/* Scholarship/Honors */}
              <View
                style={[
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w7_45,
                  { padding: '0 2' },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>SCHOLARSHIP/ ACADEMIC HONORS RECEIVED</Text>
                </View>
              </View>
            </View>

            {renderVocationalExtraPage(vocational)}
            {renderCollegeExtraPage(college)}
            {renderGraduateExtraPage(graduate)}
            <SignatureDate />
          </View>
        </Page>
      ) : null}

      {/* Eligibility Extra Page */}
      {eligibilities.length > 7 ? (
        <Page size={[612.3, 935.4]} style={styles.page}>
          <View style={styles.bodyBorder}>
            <View style={[styles.sectionTitleContainer, styles.borderBottom]}>
              <Text style={styles.sectionTitleText}>
                IV. CIVIL SERVICE ELIGIBILITY
              </Text>
            </View>

            {/* Eligibility Header */}
            <View style={[{ flexDirection: 'row', alignItems: 'stretch' }]}>
              {/* Eligibility Name */}
              <View
                style={[
                  styles.inputKey,
                  styles.borderRight,
                  styles.horizontalCenter,
                  styles.w34,
                  { flexDirection: 'row' },
                ]}
              >
                <Text style={[styles.verticalCenter]}>27.</Text>
                <View
                  style={[
                    styles.verticalCenter,
                    styles.horizontalCenter,
                    { padding: '3 10', width: '100%' },
                  ]}
                >
                  <Text>CAREER SERVICE/ RA 1080 (BOARD/ BAR) UNDER</Text>
                  <Text> SPECIAL LAWS/ CES/ CSEE</Text>
                  <Text>BARANGAY ELIGIBILITY / DRIVER&apos;S LICENSE</Text>
                </View>
              </View>

              {/* Rating */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w15_1,
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text>RATING</Text>
                  <Text>(If Applicable)</Text>
                </View>
              </View>

              {/* Date of examination */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w15_1,
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text>DATE OF EXAMINATION / CONFERMENT</Text>
                </View>
              </View>

              {/* Place of examination */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w21_8,
                  { padding: '0 2' },
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text>PLACE OF EXAMINATION / CONFERMENT</Text>
                </View>
              </View>

              {/* License */}
              <View
                style={[
                  styles.horizontalCenter,
                  styles.inputKey,
                  styles.w14,
                  { padding: '0' },
                ]}
              >
                <View style={[{ margin: 'auto 0', padding: '6 1' }]}>
                  <Text>LICENSE (if applicable)</Text>
                </View>

                <View style={[styles.borderTop, { flexDirection: 'row' }]}>
                  <View
                    style={[
                      styles.w50,
                      styles.horizontalCenter,
                      styles.borderRight,
                    ]}
                  >
                    <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
                      NUMBER
                    </Text>
                  </View>
                  <View style={[styles.w50, styles.horizontalCenter]}>
                    <View style={[styles.verticalCenter, { padding: '3 0' }]}>
                      <Text>Valid Until</Text>
                      <Text></Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {renderEligibilityExtraPage(eligibilities)}
            <SignatureDate />
          </View>
        </Page>
      ) : null}

      {/* Work Experience Extra Page */}
      {workExperience.length > 28 ? (
        <Page size={[612.3, 935.4]} style={styles.page}>
          <View style={styles.bodyBorder}>
            <View style={[styles.sectionTitleContainer, styles.borderBottom]}>
              <Text style={styles.sectionTitleText}>V. WORK EXPERIENCE</Text>
            </View>

            {/* Work Experience Header */}
            <View style={[{ flexDirection: 'row', alignItems: 'stretch' }]}>
              {/* Inclusive Dates */}
              <View
                style={[
                  styles.horizontalCenter,
                  styles.borderRight,
                  styles.inputKey,
                  styles.w18_6,
                  { padding: '0' },
                ]}
              >
                <View
                  style={[
                    styles.horizontalCenter,
                    { padding: '8 5', flexDirection: 'row' },
                  ]}
                >
                  <Text style={[styles.verticalCenter]}>28.</Text>
                  <View style={[styles.w100, { textAlign: 'center' }]}>
                    <Text>INCLUSIVE DATES</Text>
                    <Text>(dd/mm/yyyy)</Text>
                  </View>
                </View>

                <View style={[styles.borderTop, { flexDirection: 'row' }]}>
                  <View
                    style={[
                      styles.w50,
                      styles.horizontalCenter,
                      styles.borderRight,
                    ]}
                  >
                    <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
                      From
                    </Text>
                  </View>
                  <View style={[styles.w50, styles.horizontalCenter]}>
                    <View style={[styles.verticalCenter, { padding: '3 0' }]}>
                      <Text>To</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Position Title */}
              <View
                style={[
                  styles.inputKey,
                  styles.borderRight,
                  styles.horizontalCenter,
                  styles.w33_3,
                  { flexDirection: 'row' },
                ]}
              >
                <View
                  style={[
                    styles.verticalCenter,
                    styles.horizontalCenter,
                    { width: '100%' },
                  ]}
                >
                  <Text>POSITION TITLE</Text>
                  <Text>(Write in full/Do not abbreviate)</Text>
                </View>
              </View>

              {/* Company Name */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w29_9,
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text>DEPARTMENT / AGENCY / OFFICE / COMPANY</Text>
                  <Text>(Write in full/Do not abbreviate)</Text>
                </View>
              </View>

              {/* Status of Appointment */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w9_8,
                  { padding: 0 },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>STATUS OF</Text>
                  <Text>APPOINTMENT</Text>
                </View>
              </View>

              {/* Gov't Service */}
              <View
                style={[
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w9_8,
                  { padding: 0 },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>GOV&apos;T</Text>
                  <Text>SERVICE</Text>
                  <Text>(Y/ N)</Text>
                </View>
              </View>
            </View>

            {renderWorkExperienceExtraPage(workExperience)}
            <SignatureDate />
          </View>
        </Page>
      ) : null}

      {/* Voluntary Work Extra Page */}
      {voluntaryWork.length > 6 ? (
        <Page size={[612.3, 935.4]} style={styles.page}>
          <View style={styles.bodyBorder}>
            <View style={[styles.sectionTitleContainer, styles.borderBottom]}>
              <Text style={styles.sectionTitleText}>
                VI. VOLUNTARY WORK OR INVOLVEMENT IN CIVIC / NON-GOVERNMENT /
                PEOPLE / VOLUNTARY ORGANIZATION/S
              </Text>
            </View>

            {/* Voluntary Work header */}
            <View
              style={[
                styles.borderTop,
                { flexDirection: 'row', alignItems: 'stretch' },
              ]}
            >
              {/* Name & Address of Org */}
              <View
                style={[
                  styles.inputKey,
                  styles.borderRight,
                  styles.horizontalCenter,
                  styles.w46_2,
                  { flexDirection: 'row' },
                ]}
              >
                <Text style={[styles.verticalCenter]}>29.</Text>
                <View
                  style={[
                    styles.verticalCenter,
                    styles.horizontalCenter,
                    { padding: '3 10', width: '100%' },
                  ]}
                >
                  <Text>NAME & ADDRESS OF ORGANIZATION</Text>
                  <Text>(Write in full)</Text>
                </View>
              </View>

              {/* Inclusive Dates */}
              <View
                style={[
                  styles.horizontalCenter,
                  styles.borderRight,
                  styles.inputKey,
                  styles.w18,
                  { padding: '0' },
                ]}
              >
                <View
                  style={[styles.w100, { textAlign: 'center', padding: '4' }]}
                >
                  <Text>INCLUSIVE DATES</Text>
                  <Text>(dd/mm/yyyy)</Text>
                </View>

                <View style={[styles.borderTop, { flexDirection: 'row' }]}>
                  <View
                    style={[
                      styles.w50,
                      styles.horizontalCenter,
                      styles.borderRight,
                    ]}
                  >
                    <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
                      From
                    </Text>
                  </View>
                  <View style={[styles.w50, styles.horizontalCenter]}>
                    <View style={[styles.verticalCenter, { padding: '3 0' }]}>
                      <Text>To</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Hours */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w6,
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text>NUMBER OF HOURS</Text>
                </View>
              </View>

              {/* Position */}
              <View
                style={[
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w29_8,
                  { padding: 0 },
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text>POSITION / NATURE OF WORK</Text>
                </View>
              </View>
            </View>

            {renderVoluntaryWorkExtraPage(voluntaryWork)}
            <SignatureDate />
          </View>
        </Page>
      ) : null}

      {/* Learning and Development Extra Pages */}
      {learningDevelopment.length > 18 ? (
        <Page size={[612.3, 935.4]} style={styles.page}>
          <View style={styles.bodyBorder}>
            <View style={[styles.sectionTitleContainer, styles.borderBottom]}>
              <Text style={styles.sectionTitleText}>
                VII. LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS/TRAINING
                PROGRAMS ATTENDED
              </Text>
            </View>

            {/* Learning and Development header */}
            <View style={[{ flexDirection: 'row', alignItems: 'stretch' }]}>
              {/* Title of Learning and Development */}
              <View
                style={[
                  styles.inputKey,
                  styles.borderRight,
                  styles.horizontalCenter,
                  styles.w46_2,
                  { flexDirection: 'row' },
                ]}
              >
                <Text style={[styles.verticalCenter]}>30.</Text>
                <View
                  style={[
                    styles.verticalCenter,
                    styles.horizontalCenter,
                    { padding: '3 10', width: '100%' },
                  ]}
                >
                  <Text>
                    TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING
                    PROGRAMS
                  </Text>
                  <Text>(Write in full)</Text>
                </View>
              </View>

              {/* Inclusive Dates of Attendance */}
              <View
                style={[
                  styles.horizontalCenter,
                  styles.borderRight,
                  styles.inputKey,
                  styles.w18,
                  { padding: '0' },
                ]}
              >
                <View
                  style={[styles.w100, { textAlign: 'center', padding: '4 6' }]}
                >
                  <Text>INCLUSIVE DATES OF</Text>
                  <Text>ATTENDANCE</Text>
                  <Text>(dd/mm/yyyy)</Text>
                </View>

                <View style={[styles.borderTop, { flexDirection: 'row' }]}>
                  <View
                    style={[
                      styles.w50,
                      styles.horizontalCenter,
                      styles.borderRight,
                    ]}
                  >
                    <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
                      From
                    </Text>
                  </View>
                  <View style={[styles.w50, styles.horizontalCenter]}>
                    <View style={[styles.verticalCenter, { padding: '3 0' }]}>
                      <Text>To</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Hours */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w6,
                  { padding: '5.5 3' },
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text style={{ fontSize: 5.7 }}>NUMBER OF HOURS</Text>
                </View>
              </View>

              {/* Type of L&D */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w6,
                  { padding: '5.5 2' },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>Type of LD</Text>
                  <Text> (Managerial/ Supervisory/ Technical/etc)</Text>
                </View>
              </View>

              {/* Sponsored By */}
              <View
                style={[
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w23_8,
                  { padding: 0 },
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text>CONDUCTED/ SPONSORED BY</Text>
                  <Text>(Write in full)</Text>
                </View>
              </View>
            </View>

            {renderLearningDevelopmentExtraPage1(learningDevelopment)}
            <SignatureDate />
          </View>
        </Page>
      ) : null}

      {learningDevelopment.length > 51 ? (
        <Page size={[612.3, 935.4]} style={styles.page}>
          <View style={styles.bodyBorder}>
            <View style={[styles.sectionTitleContainer, styles.borderBottom]}>
              <Text style={styles.sectionTitleText}>
                VII. LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS/TRAINING
                PROGRAMS ATTENDED
              </Text>
            </View>

            {/* Learning and Development header */}
            <View style={[{ flexDirection: 'row', alignItems: 'stretch' }]}>
              {/* Title of Learning and Development */}
              <View
                style={[
                  styles.inputKey,
                  styles.borderRight,
                  styles.horizontalCenter,
                  styles.w46_2,
                  { flexDirection: 'row' },
                ]}
              >
                <Text style={[styles.verticalCenter]}>30.</Text>
                <View
                  style={[
                    styles.verticalCenter,
                    styles.horizontalCenter,
                    { padding: '3 10', width: '100%' },
                  ]}
                >
                  <Text>
                    TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING
                    PROGRAMS
                  </Text>
                  <Text>(Write in full)</Text>
                </View>
              </View>

              {/* Inclusive Dates of Attendance */}
              <View
                style={[
                  styles.horizontalCenter,
                  styles.borderRight,
                  styles.inputKey,
                  styles.w18,
                  { padding: '0' },
                ]}
              >
                <View
                  style={[styles.w100, { textAlign: 'center', padding: '4 6' }]}
                >
                  <Text>INCLUSIVE DATES OF</Text>
                  <Text>ATTENDANCE</Text>
                  <Text>(dd/mm/yyyy)</Text>
                </View>

                <View style={[styles.borderTop, { flexDirection: 'row' }]}>
                  <View
                    style={[
                      styles.w50,
                      styles.horizontalCenter,
                      styles.borderRight,
                    ]}
                  >
                    <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
                      From
                    </Text>
                  </View>
                  <View style={[styles.w50, styles.horizontalCenter]}>
                    <View style={[styles.verticalCenter, { padding: '3 0' }]}>
                      <Text>To</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Hours */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w6,
                  { padding: '5.5 3' },
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text style={{ fontSize: 5.7 }}>NUMBER OF HOURS</Text>
                </View>
              </View>

              {/* Type of L&D */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w6,
                  { padding: '5.5 2' },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>Type of LD</Text>
                  <Text> (Managerial/ Supervisory/ Technical/etc)</Text>
                </View>
              </View>

              {/* Sponsored By */}
              <View
                style={[
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w23_8,
                  { padding: 0 },
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text>CONDUCTED/ SPONSORED BY</Text>
                  <Text>(Write in full)</Text>
                </View>
              </View>
            </View>

            {renderLearningDevelopmentExtraPage2(learningDevelopment)}
            <SignatureDate />
          </View>
        </Page>
      ) : null}

      {learningDevelopment.length > 84 ? (
        <Page size={[612.3, 935.4]} style={styles.page}>
          <View style={styles.bodyBorder}>
            <View style={[styles.sectionTitleContainer, styles.borderBottom]}>
              <Text style={styles.sectionTitleText}>
                VII. LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS/TRAINING
                PROGRAMS ATTENDED
              </Text>
            </View>

            {/* Learning and Development header */}
            <View style={[{ flexDirection: 'row', alignItems: 'stretch' }]}>
              {/* Title of Learning and Development */}
              <View
                style={[
                  styles.inputKey,
                  styles.borderRight,
                  styles.horizontalCenter,
                  styles.w46_2,
                  { flexDirection: 'row' },
                ]}
              >
                <Text style={[styles.verticalCenter]}>30.</Text>
                <View
                  style={[
                    styles.verticalCenter,
                    styles.horizontalCenter,
                    { padding: '3 10', width: '100%' },
                  ]}
                >
                  <Text>
                    TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING
                    PROGRAMS
                  </Text>
                  <Text>(Write in full)</Text>
                </View>
              </View>

              {/* Inclusive Dates of Attendance */}
              <View
                style={[
                  styles.horizontalCenter,
                  styles.borderRight,
                  styles.inputKey,
                  styles.w18,
                  { padding: '0' },
                ]}
              >
                <View
                  style={[styles.w100, { textAlign: 'center', padding: '4 6' }]}
                >
                  <Text>INCLUSIVE DATES OF</Text>
                  <Text>ATTENDANCE</Text>
                  <Text>(dd/mm/yyyy)</Text>
                </View>

                <View style={[styles.borderTop, { flexDirection: 'row' }]}>
                  <View
                    style={[
                      styles.w50,
                      styles.horizontalCenter,
                      styles.borderRight,
                    ]}
                  >
                    <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
                      From
                    </Text>
                  </View>
                  <View style={[styles.w50, styles.horizontalCenter]}>
                    <View style={[styles.verticalCenter, { padding: '3 0' }]}>
                      <Text>To</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Hours */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w6,
                  { padding: '5.5 3' },
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text style={{ fontSize: 5.7 }}>NUMBER OF HOURS</Text>
                </View>
              </View>

              {/* Type of L&D */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w6,
                  { padding: '5.5 2' },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>Type of LD</Text>
                  <Text> (Managerial/ Supervisory/ Technical/etc)</Text>
                </View>
              </View>

              {/* Sponsored By */}
              <View
                style={[
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w23_8,
                  { padding: 0 },
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text>CONDUCTED/ SPONSORED BY</Text>
                  <Text>(Write in full)</Text>
                </View>
              </View>
            </View>

            {renderLearningDevelopmentExtraPage3(learningDevelopment)}
            <SignatureDate />
          </View>
        </Page>
      ) : null}

      {learningDevelopment.length > 117 ? (
        <Page size={[612.3, 935.4]} style={styles.page}>
          <View style={styles.bodyBorder}>
            <View style={[styles.sectionTitleContainer, styles.borderBottom]}>
              <Text style={styles.sectionTitleText}>
                VII. LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS/TRAINING
                PROGRAMS ATTENDED
              </Text>
            </View>

            {/* Learning and Development header */}
            <View style={[{ flexDirection: 'row', alignItems: 'stretch' }]}>
              {/* Title of Learning and Development */}
              <View
                style={[
                  styles.inputKey,
                  styles.borderRight,
                  styles.horizontalCenter,
                  styles.w46_2,
                  { flexDirection: 'row' },
                ]}
              >
                <Text style={[styles.verticalCenter]}>30.</Text>
                <View
                  style={[
                    styles.verticalCenter,
                    styles.horizontalCenter,
                    { padding: '3 10', width: '100%' },
                  ]}
                >
                  <Text>
                    TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING
                    PROGRAMS
                  </Text>
                  <Text>(Write in full)</Text>
                </View>
              </View>

              {/* Inclusive Dates of Attendance */}
              <View
                style={[
                  styles.horizontalCenter,
                  styles.borderRight,
                  styles.inputKey,
                  styles.w18,
                  { padding: '0' },
                ]}
              >
                <View
                  style={[styles.w100, { textAlign: 'center', padding: '4 6' }]}
                >
                  <Text>INCLUSIVE DATES OF</Text>
                  <Text>ATTENDANCE</Text>
                  <Text>(dd/mm/yyyy)</Text>
                </View>

                <View style={[styles.borderTop, { flexDirection: 'row' }]}>
                  <View
                    style={[
                      styles.w50,
                      styles.horizontalCenter,
                      styles.borderRight,
                    ]}
                  >
                    <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
                      From
                    </Text>
                  </View>
                  <View style={[styles.w50, styles.horizontalCenter]}>
                    <View style={[styles.verticalCenter, { padding: '3 0' }]}>
                      <Text>To</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Hours */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w6,
                  { padding: '5.5 3' },
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text style={{ fontSize: 5.7 }}>NUMBER OF HOURS</Text>
                </View>
              </View>

              {/* Type of L&D */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w6,
                  { padding: '5.5 2' },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>Type of LD</Text>
                  <Text> (Managerial/ Supervisory/ Technical/etc)</Text>
                </View>
              </View>

              {/* Sponsored By */}
              <View
                style={[
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w23_8,
                  { padding: 0 },
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text>CONDUCTED/ SPONSORED BY</Text>
                  <Text>(Write in full)</Text>
                </View>
              </View>
            </View>

            {renderLearningDevelopmentExtraPage4(learningDevelopment)}
            <SignatureDate />
          </View>
        </Page>
      ) : null}

      {learningDevelopment.length > 150 ? (
        <Page size={[612.3, 935.4]} style={styles.page}>
          <View style={styles.bodyBorder}>
            <View style={[styles.sectionTitleContainer, styles.borderBottom]}>
              <Text style={styles.sectionTitleText}>
                VII. LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS/TRAINING
                PROGRAMS ATTENDED
              </Text>
            </View>

            {/* Learning and Development header */}
            <View style={[{ flexDirection: 'row', alignItems: 'stretch' }]}>
              {/* Title of Learning and Development */}
              <View
                style={[
                  styles.inputKey,
                  styles.borderRight,
                  styles.horizontalCenter,
                  styles.w46_2,
                  { flexDirection: 'row' },
                ]}
              >
                <Text style={[styles.verticalCenter]}>30.</Text>
                <View
                  style={[
                    styles.verticalCenter,
                    styles.horizontalCenter,
                    { padding: '3 10', width: '100%' },
                  ]}
                >
                  <Text>
                    TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING
                    PROGRAMS
                  </Text>
                  <Text>(Write in full)</Text>
                </View>
              </View>

              {/* Inclusive Dates of Attendance */}
              <View
                style={[
                  styles.horizontalCenter,
                  styles.borderRight,
                  styles.inputKey,
                  styles.w18,
                  { padding: '0' },
                ]}
              >
                <View
                  style={[styles.w100, { textAlign: 'center', padding: '4 6' }]}
                >
                  <Text>INCLUSIVE DATES OF</Text>
                  <Text>ATTENDANCE</Text>
                  <Text>(dd/mm/yyyy)</Text>
                </View>

                <View style={[styles.borderTop, { flexDirection: 'row' }]}>
                  <View
                    style={[
                      styles.w50,
                      styles.horizontalCenter,
                      styles.borderRight,
                    ]}
                  >
                    <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
                      From
                    </Text>
                  </View>
                  <View style={[styles.w50, styles.horizontalCenter]}>
                    <View style={[styles.verticalCenter, { padding: '3 0' }]}>
                      <Text>To</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Hours */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w6,
                  { padding: '5.5 3' },
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text style={{ fontSize: 5.7 }}>NUMBER OF HOURS</Text>
                </View>
              </View>

              {/* Type of L&D */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w6,
                  { padding: '5.5 2' },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>Type of LD</Text>
                  <Text> (Managerial/ Supervisory/ Technical/etc)</Text>
                </View>
              </View>

              {/* Sponsored By */}
              <View
                style={[
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w23_8,
                  { padding: 0 },
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text>CONDUCTED/ SPONSORED BY</Text>
                  <Text>(Write in full)</Text>
                </View>
              </View>
            </View>

            {renderLearningDevelopmentExtraPage5(learningDevelopment)}
            <SignatureDate />
          </View>
        </Page>
      ) : null}

      {learningDevelopment.length > 183 ? (
        <Page size={[612.3, 935.4]} style={styles.page}>
          <View style={styles.bodyBorder}>
            <View style={[styles.sectionTitleContainer, styles.borderBottom]}>
              <Text style={styles.sectionTitleText}>
                VII. LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS/TRAINING
                PROGRAMS ATTENDED
              </Text>
            </View>

            {/* Learning and Development header */}
            <View style={[{ flexDirection: 'row', alignItems: 'stretch' }]}>
              {/* Title of Learning and Development */}
              <View
                style={[
                  styles.inputKey,
                  styles.borderRight,
                  styles.horizontalCenter,
                  styles.w46_2,
                  { flexDirection: 'row' },
                ]}
              >
                <Text style={[styles.verticalCenter]}>30.</Text>
                <View
                  style={[
                    styles.verticalCenter,
                    styles.horizontalCenter,
                    { padding: '3 10', width: '100%' },
                  ]}
                >
                  <Text>
                    TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING
                    PROGRAMS
                  </Text>
                  <Text>(Write in full)</Text>
                </View>
              </View>

              {/* Inclusive Dates of Attendance */}
              <View
                style={[
                  styles.horizontalCenter,
                  styles.borderRight,
                  styles.inputKey,
                  styles.w18,
                  { padding: '0' },
                ]}
              >
                <View
                  style={[styles.w100, { textAlign: 'center', padding: '4 6' }]}
                >
                  <Text>INCLUSIVE DATES OF</Text>
                  <Text>ATTENDANCE</Text>
                  <Text>(dd/mm/yyyy)</Text>
                </View>

                <View style={[styles.borderTop, { flexDirection: 'row' }]}>
                  <View
                    style={[
                      styles.w50,
                      styles.horizontalCenter,
                      styles.borderRight,
                    ]}
                  >
                    <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
                      From
                    </Text>
                  </View>
                  <View style={[styles.w50, styles.horizontalCenter]}>
                    <View style={[styles.verticalCenter, { padding: '3 0' }]}>
                      <Text>To</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Hours */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w6,
                  { padding: '5.5 3' },
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text style={{ fontSize: 5.7 }}>NUMBER OF HOURS</Text>
                </View>
              </View>

              {/* Type of L&D */}
              <View
                style={[
                  styles.borderRight,
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w6,
                  { padding: '5.5 2' },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>Type of LD</Text>
                  <Text> (Managerial/ Supervisory/ Technical/etc)</Text>
                </View>
              </View>

              {/* Sponsored By */}
              <View
                style={[
                  styles.inputKey,
                  styles.horizontalCenter,
                  styles.w23_8,
                  { padding: 0 },
                ]}
              >
                <View style={[styles.verticalCenter]}>
                  <Text>CONDUCTED/ SPONSORED BY</Text>
                  <Text>(Write in full)</Text>
                </View>
              </View>
            </View>

            {renderLearningDevelopmentExtraPage6(learningDevelopment)}
            <SignatureDate />
          </View>
        </Page>
      ) : null}

      {/* Special Skills */}
      {skills.length > 7 ? (
        <Page size={[612.3, 935.4]} style={styles.page}>
          <View style={styles.bodyBorder}>
            <View
              style={[styles.inputKey, styles.w100, { flexDirection: 'row' }]}
            >
              <Text style={[styles.verticalCenter]}>31.</Text>
              <Text
                style={[
                  styles.verticalCenter,
                  styles.horizontalCenter,
                  styles.w100,
                ]}
              >
                SPECIAL SKILLS and HOBBIES
              </Text>
            </View>

            {renderSpecialSkillsExtraPage(skills)}
            <SignatureDate />
          </View>
        </Page>
      ) : null}

      {/* Non-Academic Distinctions */}
      {recognitions.length > 7 ? (
        <Page size={[612.3, 935.4]} style={styles.page}>
          <View style={styles.bodyBorder}>
            <View
              style={[styles.inputKey, styles.w100, { flexDirection: 'row' }]}
            >
              <Text style={[styles.verticalCenter]}>32.</Text>

              <View
                style={[
                  styles.w100,
                  styles.verticalCenter,
                  styles.horizontalCenter,
                ]}
              >
                <Text>NON-ACADEMIC DISTINCTIONS / RECOGNITION</Text>
                <Text>(Write in full)</Text>
              </View>
            </View>

            {renderRecognitionExtraPage(recognitions)}
            <SignatureDate />
          </View>
        </Page>
      ) : null}

      {/* Membership */}
      {organizations.length > 7 ? (
        <Page size={[612.3, 935.4]} style={styles.page}>
          <View style={styles.bodyBorder}>
            <View
              style={[styles.inputKey, styles.w100, { flexDirection: 'row' }]}
            >
              <Text style={[styles.verticalCenter]}>33.</Text>

              <View
                style={[
                  styles.w100,
                  styles.verticalCenter,
                  styles.horizontalCenter,
                ]}
              >
                <Text>MEMBERSHIP IN ASSOCIATION / ORGANIZATION</Text>
                <Text>(Write in full)</Text>
              </View>
            </View>

            {renderMembershipExtraPage(organizations)}
            <SignatureDate />
          </View>
        </Page>
      ) : null}
    </Document>
  )
}

PdsDocument.propTypes = {
  personalInfo: PropTypes.object.isRequired,
  permanentAddress: PropTypes.object.isRequired,
  residentialAddress: PropTypes.object.isRequired,
  governmentIssuedIds: PropTypes.object.isRequired,
  spouse: PropTypes.object.isRequired,
  parents: PropTypes.object.isRequired,
  childrenInfo: PropTypes.arrayOf(
    PropTypes.shape({
      childName: PropTypes.string.isRequired,
      birthDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  elementary: PropTypes.object.isRequired,
  secondary: PropTypes.object.isRequired,
  vocational: PropTypes.array.isRequired,
  college: PropTypes.array.isRequired,
  graduate: PropTypes.array.isRequired,
  eligibilities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.string,
      examDate: PropTypes.shape({
        from: PropTypes.string,
        to: PropTypes.string,
      }),
      examPlace: PropTypes.string,
      licenseNumber: PropTypes.string,
      validity: PropTypes.string,
    })
  ).isRequired,
  workExperience: PropTypes.arrayOf(
    PropTypes.shape({
      positionTitle: PropTypes.string,
      companyName: PropTypes.string,
      monthlySalary: PropTypes.number,
      salaryGrade: PropTypes.string,
      appointmentStatus: PropTypes.string,
      isGovernmentService: PropTypes.number,
      from: PropTypes.string,
      to: PropTypes.string,
    })
  ).isRequired,
  voluntaryWork: PropTypes.arrayOf(
    PropTypes.shape({
      organizationName: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string,
      numberOfHours: PropTypes.number,
      position: PropTypes.string,
    })
  ).isRequired,
  learningDevelopment: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string,
      type: PropTypes.string,
      numberOfHours: PropTypes.number,
      conductedBy: PropTypes.string,
    })
  ).isRequired,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      skill: PropTypes.string.isRequired,
    })
  ).isRequired,
  recognitions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      recognition: PropTypes.string.isRequired,
    })
  ).isRequired,
  organizations: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      organization: PropTypes.string.isRequired,
    })
  ).isRequired,
  officeRelation: PropTypes.object.isRequired,
  guiltyCharged: PropTypes.object.isRequired,
  convicted: PropTypes.object.isRequired,
  separatedService: PropTypes.object.isRequired,
  candidateResigned: PropTypes.object.isRequired,
  immigrant: PropTypes.object.isRequired,
  indigenousPwdSoloParent: PropTypes.object.isRequired,
  references: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      telephoneNumber: PropTypes.string.isRequired,
    })
  ).isRequired,
  governmentIssuedId: PropTypes.object.isRequired,
}

export default PdsDocument
