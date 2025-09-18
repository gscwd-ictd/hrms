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
  Svg,
  Path,
} from '@react-pdf/renderer'
import ArialRegular from 'assets/fonts/uploads/arial.ttf'
import ArialBlack from 'assets/fonts/uploads/arial-black.ttf'
import ArialItalic from 'assets/fonts/uploads/arial-italic.ttf'
import ArialNarrow from 'assets/fonts/uploads/arial-narrow.ttf'
import ArialNarrowItalic from 'assets/fonts/uploads/arial-narrow-italic.ttf'
import ArialNarrowBold from 'assets/fonts/uploads/arial-narrow-bold.ttf'
import ArialBoldItalic from 'assets/fonts/uploads/arial-bold-italic.ttf'
import CalibriBoldItalic from 'assets/fonts/uploads/calibri-bold-italic.ttf'

import PersonalInformationPdf from 'components/PdfDocuments/PersonalDataSheet/Employee/PersonalInformationPdf'
import FamilyBackgroundPdf from 'components/PdfDocuments/PersonalDataSheet/Employee/FamilyBackgroundPdf'
import EducationalBackgroundPdf from 'components/PdfDocuments/PersonalDataSheet/Employee/EducationalBackgroundPdf'
import EligibilityPdf from 'components/PdfDocuments/PersonalDataSheet/Employee/EligibilityPdf'
import WorkExperiencePdf from 'components/PdfDocuments/PersonalDataSheet/Employee/WorkExperiencePdf'
import VoluntaryWorkPdf from 'components/PdfDocuments/PersonalDataSheet/Employee/VoluntaryWorkPdf'
import LearningAndDevelopmentPdf from 'components/PdfDocuments/PersonalDataSheet/Employee/LearningAndDevelopmentPdf'
import OtherInformationPdf from 'components/PdfDocuments/PersonalDataSheet/Employee/OtherInformationPdf'
import QuestionsPdf from 'components/PdfDocuments/PersonalDataSheet/Employee/QuestionsPdf'
import SignatureDate from 'components/PdfDocuments/PersonalDataSheet/Employee/SignatureDate'
import FooterPdf from 'components/PdfDocuments/PersonalDataSheet/Employee/FooterPdf'

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
  },
  bodyBorder: {
    margin: '10 10 0 10',
    border: '2px solid #000000',
  },
  mainTitleContainer: {
    width: '100%',
    textAlign: 'center',
    // flexGrow: 1,
  },
  mainTitle: {
    fontFamily: 'Arial',
    fontWeight: 800,
    fontSize: 18,
    paddingTop: 8,
  },
  csFormContainer: {
    position: 'absolute',
    top: 1,
    left: 1,
  },
  csForm: {
    fontFamily: 'Calibri',
    fontWeight: 600,
    fontStyle: 'italic',
    fontSize: 8,
  },
  revised2017: {
    fontFamily: 'Calibri',
    fontWeight: 600,
    fontStyle: 'italic',
    fontSize: 6.5,
  },
  line4Child1: {
    fontFamily: 'Arial',
    fontWeight: 600,
    fontStyle: 'italic',
    fontSize: 6.7,
    padding: '8 1 0 1',
  },
  line5Child1: {
    fontFamily: 'Arial',
    fontWeight: 600,
    fontStyle: 'italic',
    fontSize: 6.7,
    padding: '2 1 0 1',
  },
  line7Container: { flexDirection: 'row' },
  line7Child1Container: {
    flexDirection: 'row',
    width: '71%',
  },
  line7Child1: {
    fontFamily: 'Arial',
    fontWeight: 100,
    fontSize: 6.7,
    padding: '1 1 0 1',
  },
  line7Child2Container: {
    flexDirection: 'row',
    borderTop: '1px solid #000000',
    borderLeft: '1px solid #000000',
    width: '29%',
  },
  line7Child2Key: {
    backgroundColor: '#969696',
    borderRight: '1px solid #000000',
    fontFamily: 'Arial',
    fontWeight: 100,
    fontSize: 6.7,
    padding: '1',
    width: '21%',
    textAlign: 'center',
  },
  line7Child2Value: {
    fontFamily: 'Arial',
    fontWeight: 100,
    fontSize: 6.7,
    textAlign: 'right',
    padding: '1',
    width: '79%',
    textAlign: 'right',
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
  inputKey: {
    backgroundColor: '#EAEAEA',
    fontFamily: 'Arial',
    fontWeight: 100,
    fontSize: 6.7,
    padding: '4 5',
  },
  inputValue: {
    fontFamily: 'Arial',
    fontWeight: 100,
    fontSize: 6.7,
    padding: '4 8',
    textTransform: 'uppercase',
  },
  verticalCenter: { margin: 'auto 0' },
  horizontalCenter: { textAlign: 'center' },
  sectionTitleContainer: {
    backgroundColor: '#969696',
    padding: 1.5,
  },
  sectionTitleText: {
    color: '#ffffff',
    fontFamily: 'ArialNarrowBoldItalic',
    fontSize: 9.2,
  },
  sectionSubtitleText: {
    color: '#ffffff',
    fontFamily: 'ArialNarrowBoldItalic',
    fontSize: 6.5,
    paddingTop: 2,
  },

  // Width Styles
  w100: { width: '100%' },
  w64_2: { width: '64.2%' },
  w50: { width: '50%' },
  w46_2: { width: '46.2%' },
  w35_8: { width: '35.8%' },
  w34: { width: '34%' },
  w33_3: { width: '33.3%' },
  w31_9: { width: '31.9%' },
  w29_9: { width: '29.9%' },
  w29_8: { width: '29.8%' },
  w27_1: { width: '27.1%' },
  w24_5: { width: '24.5%' },
  w23_8: { width: '23.8%' },
  w22_5: { width: '22.5%' },
  w21_8: { width: '21.8%' },
  w18_6: { width: '18.6%' },
  w18: { width: '18%' },
  w17_2: { width: '17.2%' },
  w15_1: { width: '15.1%' },
  w14: { width: '14%' },
  w12: { width: '12%' },
  w9_8: { width: '9.8%' },
  w8_9: { width: '8.9%' },
  w7_45: { width: '7.45%' },
  w7: { width: '7%' },
  w6: { width: '6%' },
  w5_6: { width: '5.6%' },
})

Font.register({
  family: 'Arial',
  fonts: [
    { src: ArialRegular },
    { src: ArialBlack, fontWeight: 800 },
    { src: ArialItalic, fontStyle: 'italic' },
    { src: ArialNarrow, fontWeight: 100 },
    { src: ArialNarrowBold, fontWeight: 200 },
    { src: ArialNarrowItalic, fontWeight: 100, fontStyle: 'italic' },
    { src: ArialBoldItalic, fontWeight: 600, fontStyle: 'italic' },
  ],
})

Font.register({
  family: 'Calibri',
  fonts: [{ src: CalibriBoldItalic, fontWeight: 600, fontStyle: 'italic' }],
})

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
    formatDate,
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

  const renderChildrenExtraPage = () => {
    var content = childrenInfo.slice(12).map(child => (
      <View
        style={[styles.borderTop, { flexDirection: 'row' }]}
        key={child._id}
      >
        <View style={[styles.borderRight, styles.inputValue, styles.w64_2]}>
          <Text>{child.childName}</Text>
        </View>

        <View style={[styles.inputValue, styles.w35_8]}>
          <Text>{formatDate(child.birthDate)}</Text>
        </View>
      </View>
    ))

    return content
  }

  const renderVocationalExtraPage = () => {
    var content = vocational.slice(1).map(vocation => (
      <View
        style={[
          styles.borderTop,
          { flexDirection: 'row', alignItems: 'stretch' },
        ]}
        key={vocation._id}
      >
        {/* Level */}
        <View style={[styles.inputKey, styles.borderRight, styles.w17_2]}>
          <Text style={[styles.verticalCenter]}>VOCATIONAL/TRADE COURSE</Text>
        </View>

        {/* Name of School */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.w24_5,
            { padding: '4 2' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{vocation.schoolName || 'N/A'}</Text>
          </View>
        </View>

        {/* Degree/Course */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.w22_5,
            { padding: '4 2' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{vocation.degree || 'N/A'}</Text>
          </View>
        </View>

        {/* Period of Attendance */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.w12,
            { padding: '0', flexDirection: 'row' },
          ]}
        >
          <View
            style={[styles.borderRight, styles.w50, styles.horizontalCenter]}
          >
            <Text style={[styles.verticalCenter]}>
              {vocation.from || 'N/A'}
            </Text>
          </View>
          <View style={[styles.w50, styles.horizontalCenter]}>
            <Text style={[styles.verticalCenter]}>
              {vocation.to || 'PRESENT'}
            </Text>
          </View>
        </View>

        {/* Units earned */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w8_9,
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>
              {vocation.yearGraduated !== null
                ? 'GRADUATED'
                : vocation.units === '' && vocation.yearGraduated === null
                ? 'N/A'
                : vocation.units}
            </Text>
          </View>
        </View>

        {/* Year graduated */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w7_45,
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{vocation.yearGraduated || 'N/A'}</Text>
          </View>
        </View>

        {/* Scholarship/Honors */}
        <View
          style={[
            styles.inputValue,
            styles.horizontalCenter,
            styles.w7_45,
            { fontSize: 6.2, padding: '4 2' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {vocation.awards || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    ))

    return content
  }

  const renderCollegeExtraPage = () => {
    var content = college.slice(1).map(college => (
      <View
        style={[
          styles.borderTop,
          { flexDirection: 'row', alignItems: 'stretch' },
        ]}
        key={college._id}
      >
        {/* Level */}
        <View style={[styles.inputKey, styles.borderRight, styles.w17_2]}>
          <Text style={[styles.verticalCenter]}>COLLEGE</Text>
        </View>

        {/* Name of School */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.w24_5,
            { padding: '4 2' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{college.schoolName || 'N/A'}</Text>
          </View>
        </View>

        {/* Degree/Course */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.w22_5,
            { padding: '4 2' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{college.degree || 'N/A'}</Text>
          </View>
        </View>

        {/* Period of Attendance */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.w12,
            { padding: '0', flexDirection: 'row' },
          ]}
        >
          <View
            style={[styles.borderRight, styles.w50, styles.horizontalCenter]}
          >
            <Text style={[styles.verticalCenter]}>{college.from || 'N/A'}</Text>
          </View>
          <View style={[styles.w50, styles.horizontalCenter]}>
            <Text style={[styles.verticalCenter]}>
              {college.to || 'PRESENT'}
            </Text>
          </View>
        </View>

        {/* Units earned */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w8_9,
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>
              {college.yearGraduated !== null
                ? 'GRADUATED'
                : college.units === '' && college.yearGraduated === null
                ? 'N/A'
                : college.units}
            </Text>
          </View>
        </View>

        {/* Year graduated */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w7_45,
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{college.yearGraduated || 'N/A'}</Text>
          </View>
        </View>

        {/* Scholarship/Honors */}
        <View
          style={[
            styles.inputValue,
            styles.horizontalCenter,
            styles.w7_45,
            { fontSize: 6.2, padding: '4 2' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {college.awards || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    ))

    return content
  }

  const renderGraduateExtraPage = () => {
    var content = graduate.slice(1).map(graduate => (
      <View
        style={[
          styles.borderTop,
          { flexDirection: 'row', alignItems: 'stretch' },
        ]}
        key={graduate._id}
      >
        {/* Level */}
        <View style={[styles.inputKey, styles.borderRight, styles.w17_2]}>
          <Text style={[styles.verticalCenter]}>GRADUATE STUDIES</Text>
        </View>

        {/* Name of School */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.w24_5,
            { padding: '4 2' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{graduate.schoolName || 'N/A'}</Text>
          </View>
        </View>

        {/* Degree/Course */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.w22_5,
            { padding: '4 2' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{graduate.degree || 'N/A'}</Text>
          </View>
        </View>

        {/* Period of Attendance */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.w12,
            { padding: '0', flexDirection: 'row' },
          ]}
        >
          <View
            style={[styles.borderRight, styles.w50, styles.horizontalCenter]}
          >
            <Text style={[styles.verticalCenter]}>
              {graduate.from || 'N/A'}
            </Text>
          </View>
          <View style={[styles.w50, styles.horizontalCenter]}>
            <Text style={[styles.verticalCenter]}>
              {graduate.to || 'PRESENT'}
            </Text>
          </View>
        </View>

        {/* Units earned */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w8_9,
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>
              {graduate.yearGraduated !== null
                ? 'GRADUATED'
                : graduate.units === '' && graduate.yearGraduated === null
                ? 'N/A'
                : graduate.units}
            </Text>
          </View>
        </View>

        {/* Year graduated */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w7_45,
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{graduate.yearGraduated || 'N/A'}</Text>
          </View>
        </View>

        {/* Scholarship/Honors */}
        <View
          style={[
            styles.inputValue,
            styles.horizontalCenter,
            styles.w7_45,
            { fontSize: 6.2, padding: '4 2' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {graduate.awards || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    ))

    return content
  }

  const renderEligibilityExtraPage = () => {
    var content = eligibilities.slice(7).map(eligibility => (
      <View
        style={[
          styles.borderTop,
          { flexDirection: 'row', alignItems: 'stretch' },
        ]}
        key={eligibility._id}
      >
        {/* Eligibility Name */}
        <View
          style={[
            styles.inputValue,
            styles.borderRight,
            styles.w34,
            { flexDirection: 'row' },
          ]}
        >
          <Text style={[styles.verticalCenter]}>
            {eligibility.name || 'N/A'}
          </Text>
        </View>

        {/* Rating */}
        <View
          style={[
            styles.inputValue,
            styles.borderRight,
            styles.horizontalCenter,
            styles.w15_1,
          ]}
        >
          <Text style={[styles.verticalCenter]}>
            {eligibility.rating || 'N/A'}
          </Text>
        </View>

        {/* Date of examination */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w15_1,
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>
              {/* If exam date for from and to is filled */}
              {!isEmpty(eligibility.examDate) &&
              !isEmpty(eligibility.examDate.to) ? (
                <>
                  {eligibility.examDate.from + ' | ' + eligibility.examDate.to}
                </>
              ) : !isEmpty(eligibility.examDate) &&
                !isEmpty(eligibility.examDate.from) ? ( // If exam date from is filled
                <>{eligibility.examDate.from}</>
              ) : (
                <>N/A</>
              )}
            </Text>
          </View>
        </View>

        {/* Place of examination */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w21_8,
            { padding: '0 2' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{eligibility.examPlace || 'N/A'}</Text>
          </View>
        </View>

        {/* License */}
        <View
          style={[
            styles.inputValue,
            styles.w14,
            { padding: 0, flexDirection: 'row' },
          ]}
        >
          <View
            style={[styles.w50, styles.horizontalCenter, styles.borderRight]}
          >
            <Text
              style={[styles.verticalCenter, { padding: '3 0' }]}
              hyphenationCallback={e => chunkSubstr(e)}
            >
              {eligibility.licenseNumber || 'N/A'}
            </Text>
          </View>
          <View style={[styles.w50, styles.horizontalCenter]}>
            <View style={[styles.verticalCenter, { padding: '3 0' }]}>
              <Text>{formatDate(eligibility.validity) || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </View>
    ))

    return content
  }

  const renderWorkExperienceExtraPage = () => {
    var content = workExperience.slice(28).map(experience => (
      <View
        style={[
          styles.borderTop,
          { flexDirection: 'row', alignItems: 'stretch' },
        ]}
        key={experience._id}
      >
        {/* Inclusive Dates */}
        <View
          style={[
            styles.horizontalCenter,
            styles.borderRight,
            styles.inputValue,
            styles.w18_6,
            { padding: '0', flexDirection: 'row' },
          ]}
        >
          <View
            style={[styles.w50, styles.horizontalCenter, styles.borderRight]}
          >
            <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
              {formatDate(experience.from) || 'N/A'}
            </Text>
          </View>
          <View style={[styles.w50, styles.horizontalCenter]}>
            <View style={[styles.verticalCenter, { padding: '3 0' }]}>
              <Text>{formatDate(experience.to) || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Position Title */}
        <View
          style={[
            styles.inputValue,
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
            <Text>{experience.positionTitle || 'N/A'}</Text>
          </View>
        </View>

        {/* Company Name */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w29_9,
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{experience.companyName || 'N/A'}</Text>
          </View>
        </View>

        {/* Status of Appointment */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w9_8,
            { fontSize: 6.2, padding: 0 },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {experience.appointmentStatus || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Gov't Service */}
        <View
          style={[
            styles.inputValue,
            styles.horizontalCenter,
            styles.w9_8,
            { padding: 0 },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{experience.isGovernmentService ? 'Y' : 'N'}</Text>
          </View>
        </View>
      </View>
    ))

    return content
  }

  const renderVoluntaryWorkExtraPage = () => {
    var content = voluntaryWork.slice(6).map(voluntaryWork => (
      <View
        style={[
          styles.borderTop,
          { flexDirection: 'row', alignItems: 'stretch' },
        ]}
        key={voluntaryWork._id}
      >
        {/* Name & Address of Org */}
        <View
          style={[
            styles.inputValue,
            styles.borderRight,
            styles.horizontalCenter,
            styles.w46_2,
            { flexDirection: 'row' },
          ]}
        >
          <Text>{voluntaryWork.organizationName || 'N/A'}</Text>
        </View>

        {/* Inclusive Dates */}
        <View
          style={[
            styles.horizontalCenter,
            styles.borderRight,
            styles.inputValue,
            styles.w18,
            { padding: '0', flexDirection: 'row' },
          ]}
        >
          <View
            style={[styles.w50, styles.horizontalCenter, styles.borderRight]}
          >
            <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
              {formatDate(voluntaryWork.from) || 'N/A'}
            </Text>
          </View>
          <View style={[styles.w50, styles.horizontalCenter]}>
            <View style={[styles.verticalCenter, { padding: '3 0' }]}>
              <Text>{formatDate(voluntaryWork.to) || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Hours */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w6,
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text style={{ fontSize: 5.7 }}>
              {voluntaryWork.numberOfHours || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Position */}
        <View
          style={[
            styles.inputValue,
            styles.horizontalCenter,
            styles.w29_8,
            { padding: 0 },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{voluntaryWork.position || 'N/A'}</Text>
          </View>
        </View>
      </View>
    ))

    return content
  }

  const renderLearningDevelopmentExtraPage1 = () => {
    var content = learningDevelopment.slice(17, 50).map(training => (
      <View
        style={[
          styles.borderTop,
          { flexDirection: 'row', alignItems: 'stretch' },
        ]}
        key={training._id}
      >
        {/* Title of Learning and Development */}
        <View
          style={[
            styles.inputValue,
            styles.borderRight,
            styles.horizontalCenter,
            styles.w46_2,
          ]}
        >
          <Text style={[styles.verticalCenter]}>{training.title || 'N/A'}</Text>
        </View>

        {/* Inclusive Dates of Attendance */}
        <View
          style={[
            styles.horizontalCenter,
            styles.borderRight,
            styles.inputValue,
            styles.w18,
            { padding: '0', flexDirection: 'row' },
          ]}
        >
          <View
            style={[styles.w50, styles.horizontalCenter, styles.borderRight]}
          >
            <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
              {formatDate(training.from) || 'N/A'}
            </Text>
          </View>
          <View style={[styles.w50, styles.horizontalCenter]}>
            <View style={[styles.verticalCenter, { padding: '3 0' }]}>
              <Text>{formatDate(training.to) || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Hours */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w6,
            { padding: '5.5 3' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{training.numberOfHours || 'N/A'}</Text>
          </View>
        </View>

        {/* Type of L&D */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w6,
            { fontSize: 5, padding: '5.5 3' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {training.type || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Sponsored By */}
        <View
          style={[
            styles.inputValue,
            styles.horizontalCenter,
            styles.w23_8,
            { padding: 0 },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {training.conductedBy || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    ))

    return content
  }

  const renderLearningDevelopmentExtraPage2 = () => {
    var content = learningDevelopment.slice(50, 83).map(training => (
      <View
        style={[
          styles.borderTop,
          { flexDirection: 'row', alignItems: 'stretch' },
        ]}
        key={training._id}
      >
        {/* Title of Learning and Development */}
        <View
          style={[
            styles.inputValue,
            styles.borderRight,
            styles.horizontalCenter,
            styles.w46_2,
          ]}
        >
          <Text style={[styles.verticalCenter]}>{training.title || 'N/A'}</Text>
        </View>

        {/* Inclusive Dates of Attendance */}
        <View
          style={[
            styles.horizontalCenter,
            styles.borderRight,
            styles.inputValue,
            styles.w18,
            { padding: '0', flexDirection: 'row' },
          ]}
        >
          <View
            style={[styles.w50, styles.horizontalCenter, styles.borderRight]}
          >
            <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
              {formatDate(training.from) || 'N/A'}
            </Text>
          </View>
          <View style={[styles.w50, styles.horizontalCenter]}>
            <View style={[styles.verticalCenter, { padding: '3 0' }]}>
              <Text>{formatDate(training.to) || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Hours */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w6,
            { padding: '5.5 3' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{training.numberOfHours || 'N/A'}</Text>
          </View>
        </View>

        {/* Type of L&D */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w6,
            { fontSize: 5, padding: '5.5 3' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {training.type || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Sponsored By */}
        <View
          style={[
            styles.inputValue,
            styles.horizontalCenter,
            styles.w23_8,
            { padding: 0 },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {training.conductedBy || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    ))

    return content
  }

  const renderLearningDevelopmentExtraPage3 = () => {
    var content = learningDevelopment.slice(83, 116).map(training => (
      <View
        style={[
          styles.borderTop,
          { flexDirection: 'row', alignItems: 'stretch' },
        ]}
        key={training._id}
      >
        {/* Title of Learning and Development */}
        <View
          style={[
            styles.inputValue,
            styles.borderRight,
            styles.horizontalCenter,
            styles.w46_2,
          ]}
        >
          <Text style={[styles.verticalCenter]}>{training.title || 'N/A'}</Text>
        </View>

        {/* Inclusive Dates of Attendance */}
        <View
          style={[
            styles.horizontalCenter,
            styles.borderRight,
            styles.inputValue,
            styles.w18,
            { padding: '0', flexDirection: 'row' },
          ]}
        >
          <View
            style={[styles.w50, styles.horizontalCenter, styles.borderRight]}
          >
            <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
              {formatDate(training.from) || 'N/A'}
            </Text>
          </View>
          <View style={[styles.w50, styles.horizontalCenter]}>
            <View style={[styles.verticalCenter, { padding: '3 0' }]}>
              <Text>{formatDate(training.to) || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Hours */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w6,
            { padding: '5.5 3' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{training.numberOfHours || 'N/A'}</Text>
          </View>
        </View>

        {/* Type of L&D */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w6,
            { fontSize: 5, padding: '5.5 3' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {training.type || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Sponsored By */}
        <View
          style={[
            styles.inputValue,
            styles.horizontalCenter,
            styles.w23_8,
            { padding: 0 },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {training.conductedBy || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    ))

    return content
  }

  const renderLearningDevelopmentExtraPage4 = () => {
    var content = learningDevelopment.slice(116, 149).map(training => (
      <View
        style={[
          styles.borderTop,
          { flexDirection: 'row', alignItems: 'stretch' },
        ]}
        key={training._id}
      >
        {/* Title of Learning and Development */}
        <View
          style={[
            styles.inputValue,
            styles.borderRight,
            styles.horizontalCenter,
            styles.w46_2,
          ]}
        >
          <Text style={[styles.verticalCenter]}>{training.title || 'N/A'}</Text>
        </View>

        {/* Inclusive Dates of Attendance */}
        <View
          style={[
            styles.horizontalCenter,
            styles.borderRight,
            styles.inputValue,
            styles.w18,
            { padding: '0', flexDirection: 'row' },
          ]}
        >
          <View
            style={[styles.w50, styles.horizontalCenter, styles.borderRight]}
          >
            <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
              {formatDate(training.from) || 'N/A'}
            </Text>
          </View>
          <View style={[styles.w50, styles.horizontalCenter]}>
            <View style={[styles.verticalCenter, { padding: '3 0' }]}>
              <Text>{formatDate(training.to) || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Hours */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w6,
            { padding: '5.5 3' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{training.numberOfHours || 'N/A'}</Text>
          </View>
        </View>

        {/* Type of L&D */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w6,
            { fontSize: 5, padding: '5.5 3' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {training.type || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Sponsored By */}
        <View
          style={[
            styles.inputValue,
            styles.horizontalCenter,
            styles.w23_8,
            { padding: 0 },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {training.conductedBy || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    ))

    return content
  }

  const renderLearningDevelopmentExtraPage5 = () => {
    var content = learningDevelopment.slice(149, 182).map(training => (
      <View
        style={[
          styles.borderTop,
          { flexDirection: 'row', alignItems: 'stretch' },
        ]}
        key={training._id}
      >
        {/* Title of Learning and Development */}
        <View
          style={[
            styles.inputValue,
            styles.borderRight,
            styles.horizontalCenter,
            styles.w46_2,
          ]}
        >
          <Text style={[styles.verticalCenter]}>{training.title || 'N/A'}</Text>
        </View>

        {/* Inclusive Dates of Attendance */}
        <View
          style={[
            styles.horizontalCenter,
            styles.borderRight,
            styles.inputValue,
            styles.w18,
            { padding: '0', flexDirection: 'row' },
          ]}
        >
          <View
            style={[styles.w50, styles.horizontalCenter, styles.borderRight]}
          >
            <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
              {formatDate(training.from) || 'N/A'}
            </Text>
          </View>
          <View style={[styles.w50, styles.horizontalCenter]}>
            <View style={[styles.verticalCenter, { padding: '3 0' }]}>
              <Text>{formatDate(training.to) || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Hours */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w6,
            { padding: '5.5 3' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{training.numberOfHours || 'N/A'}</Text>
          </View>
        </View>

        {/* Type of L&D */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w6,
            { fontSize: 5, padding: '5.5 3' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {training.type || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Sponsored By */}
        <View
          style={[
            styles.inputValue,
            styles.horizontalCenter,
            styles.w23_8,
            { padding: 0 },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {training.conductedBy || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    ))

    return content
  }

  const renderLearningDevelopmentExtraPage6 = () => {
    var content = learningDevelopment.slice(182, 215).map(training => (
      <View
        style={[
          styles.borderTop,
          { flexDirection: 'row', alignItems: 'stretch' },
        ]}
        key={training._id}
      >
        {/* Title of Learning and Development */}
        <View
          style={[
            styles.inputValue,
            styles.borderRight,
            styles.horizontalCenter,
            styles.w46_2,
          ]}
        >
          <Text style={[styles.verticalCenter]}>{training.title || 'N/A'}</Text>
        </View>

        {/* Inclusive Dates of Attendance */}
        <View
          style={[
            styles.horizontalCenter,
            styles.borderRight,
            styles.inputValue,
            styles.w18,
            { padding: '0', flexDirection: 'row' },
          ]}
        >
          <View
            style={[styles.w50, styles.horizontalCenter, styles.borderRight]}
          >
            <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
              {formatDate(training.from) || 'N/A'}
            </Text>
          </View>
          <View style={[styles.w50, styles.horizontalCenter]}>
            <View style={[styles.verticalCenter, { padding: '3 0' }]}>
              <Text>{formatDate(training.to) || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Hours */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w6,
            { padding: '5.5 3' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{training.numberOfHours || 'N/A'}</Text>
          </View>
        </View>

        {/* Type of L&D */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w6,
            { fontSize: 5, padding: '5.5 3' },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {training.type || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Sponsored By */}
        <View
          style={[
            styles.inputValue,
            styles.horizontalCenter,
            styles.w23_8,
            { padding: 0 },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text hyphenationCallback={e => chunkSubstr(e)}>
              {training.conductedBy || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    ))

    return content
  }

  const renderSpecialSkillsExtraPage = () => {
    var content = skills.slice(7).map(skill => (
      <View style={[styles.inputValue, styles.borderTop]} key={skill._id}>
        <Text style={[styles.verticalCenter]}>{skill}</Text>
      </View>
    ))

    return content
  }

  const renderRecognitionExtraPage = () => {
    var content = recognitions.slice(7).map(award => (
      <View style={[styles.inputValue, styles.borderTop]} key={award._id}>
        <Text style={[styles.verticalCenter]}>{award}</Text>
      </View>
    ))

    return content
  }

  const renderMembershipExtraPage = () => {
    var content = organizations.slice(7).map(org => (
      <View style={[styles.inputValue, styles.borderTop]} key={org._id}>
        <Text style={[styles.verticalCenter]}>{org}</Text>
      </View>
    ))

    return content
  }

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
                appropriate boxes (
              </Text>
              <Svg viewBox="0 0 24 24" width={7} height={7}>
                <Path
                  d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                  stroke="black"
                />
              </Svg>
              <Text style={styles.line7Child1}>
                ) and use separate sheet if necessary. Indicate N/A if not
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
            formatDate={formatDate}
          />

          <FamilyBackgroundPdf
            spouse={spouse}
            parents={parents}
            childrenInfo={childrenInfo}
            formatDate={formatDate}
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
          <EligibilityPdf
            eligibilities={eligibilities}
            formatDate={formatDate}
          />

          <WorkExperiencePdf
            workExperience={workExperience}
            formatDate={formatDate}
          />

          <SignatureDate />
        </View>
        <FooterPdf />
      </Page>

      {/* Page 3 */}
      <Page size={[612.3, 935.4]} style={styles.page}>
        <View style={styles.bodyBorder}>
          <VoluntaryWorkPdf
            voluntaryWork={voluntaryWork}
            formatDate={formatDate}
          />

          <LearningAndDevelopmentPdf
            learningDevelopment={learningDevelopment}
            formatDate={formatDate}
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
            formatDate={formatDate}
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

            {renderChildrenExtraPage()}
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

            {renderVocationalExtraPage()}
            {renderCollegeExtraPage()}
            {renderGraduateExtraPage()}
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
                      <Text>Date of</Text>
                      <Text>Validity</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {renderEligibilityExtraPage()}
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

            {renderWorkExperienceExtraPage()}
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

            {renderVoluntaryWorkExtraPage()}
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
                  { padding: '5.5 3' },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>Type of LD</Text>
                  <Text> ( Managerial/ Supervisory/ Technical/etc)</Text>
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

            {renderLearningDevelopmentExtraPage1()}
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
                  { padding: '5.5 3' },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>Type of LD</Text>
                  <Text> ( Managerial/ Supervisory/ Technical/etc)</Text>
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

            {renderLearningDevelopmentExtraPage2()}
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
                  { padding: '5.5 3' },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>Type of LD</Text>
                  <Text> ( Managerial/ Supervisory/ Technical/etc)</Text>
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

            {renderLearningDevelopmentExtraPage3()}
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
                  { padding: '5.5 3' },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>Type of LD</Text>
                  <Text> ( Managerial/ Supervisory/ Technical/etc)</Text>
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

            {renderLearningDevelopmentExtraPage4()}
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
                  { padding: '5.5 3' },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>Type of LD</Text>
                  <Text> ( Managerial/ Supervisory/ Technical/etc)</Text>
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

            {renderLearningDevelopmentExtraPage5()}
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
                  { padding: '5.5 3' },
                ]}
              >
                <View style={[styles.verticalCenter, { fontSize: 5.7 }]}>
                  <Text>Type of LD</Text>
                  <Text> ( Managerial/ Supervisory/ Technical/etc)</Text>
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

            {renderLearningDevelopmentExtraPage6()}
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

            {renderSpecialSkillsExtraPage()}
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

            {renderRecognitionExtraPage()}
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

            {renderMembershipExtraPage()}
            <SignatureDate />
          </View>
        </Page>
      ) : null}
    </Document>
  )
}

PdsDocument.propTypes = {
  formatDate: PropTypes.func.isRequired,
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
