import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { styles } from 'pages/PdfCreator/EmployeePersonalDataSheet/PdsStyleSheet'
import ChunkSubstr from 'functions/ChunkSubstr'
import PdsDocDateFormatter from 'functions/PdsDocDateFormatter'

const renderChildrenExtraPage = childrenInfo => {
  var content = childrenInfo.slice(12).map(child => (
    <View style={[styles.borderTop, { flexDirection: 'row' }]} key={child._id}>
      <View style={[styles.borderRight, styles.inputValue, styles.w64_2]}>
        <Text>{child.childName}</Text>
      </View>

      <View style={[styles.inputValue, styles.w35_8]}>
        <Text>{PdsDocDateFormatter(child.birthDate)}</Text>
      </View>
    </View>
  ))

  return content
}

const renderVocationalExtraPage = vocational => {
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
        <View style={[styles.borderRight, styles.w50, styles.horizontalCenter]}>
          <Text style={[styles.verticalCenter]}>{vocation.from || 'N/A'}</Text>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
            {vocation.awards || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  ))

  return content
}

const renderCollegeExtraPage = college => {
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
        <View style={[styles.borderRight, styles.w50, styles.horizontalCenter]}>
          <Text style={[styles.verticalCenter]}>{college.from || 'N/A'}</Text>
        </View>
        <View style={[styles.w50, styles.horizontalCenter]}>
          <Text style={[styles.verticalCenter]}>{college.to || 'PRESENT'}</Text>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
            {college.awards || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  ))

  return content
}

const renderGraduateExtraPage = graduate => {
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
        <View style={[styles.borderRight, styles.w50, styles.horizontalCenter]}>
          <Text style={[styles.verticalCenter]}>{graduate.from || 'N/A'}</Text>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
            {graduate.awards || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  ))

  return content
}

const renderEligibilityExtraPage = eligibilities => {
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
        <Text style={[styles.verticalCenter]}>{eligibility.name || 'N/A'}</Text>
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
                {PdsDocDateFormatter(eligibility.examDate.from) +
                  ' to ' +
                  PdsDocDateFormatter(eligibility.examDate.to)}
              </>
            ) : !isEmpty(eligibility.examDate) &&
              !isEmpty(eligibility.examDate.from) ? ( // If exam date from is filled
              <>{PdsDocDateFormatter(eligibility.examDate.from)}</>
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
        <View style={[styles.w50, styles.horizontalCenter, styles.borderRight]}>
          <Text
            style={[styles.verticalCenter, { padding: '3 0' }]}
            hyphenationCallback={e => ChunkSubstr(e)}
          >
            {eligibility.licenseNumber || 'N/A'}
          </Text>
        </View>
        <View style={[styles.w50, styles.horizontalCenter]}>
          <View style={[styles.verticalCenter, { padding: '3 0' }]}>
            <Text>{PdsDocDateFormatter(eligibility.validity) || 'N/A'}</Text>
          </View>
        </View>
      </View>
    </View>
  ))

  return content
}

const renderWorkExperienceExtraPage = workExperience => {
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
        <View style={[styles.w50, styles.horizontalCenter, styles.borderRight]}>
          <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
            {PdsDocDateFormatter(experience.from) || 'N/A'}
          </Text>
        </View>
        <View style={[styles.w50, styles.horizontalCenter]}>
          <View style={[styles.verticalCenter, { padding: '3 0' }]}>
            <Text>{PdsDocDateFormatter(experience.to) || 'N/A'}</Text>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
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

const renderVoluntaryWorkExtraPage = voluntaryWork => {
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
        <View style={[styles.w50, styles.horizontalCenter, styles.borderRight]}>
          <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
            {PdsDocDateFormatter(voluntaryWork.from) || 'N/A'}
          </Text>
        </View>
        <View style={[styles.w50, styles.horizontalCenter]}>
          <View style={[styles.verticalCenter, { padding: '3 0' }]}>
            <Text>{PdsDocDateFormatter(voluntaryWork.to) || 'N/A'}</Text>
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

const renderLearningDevelopmentExtraPage1 = learningDevelopment => {
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
        <View style={[styles.w50, styles.horizontalCenter, styles.borderRight]}>
          <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
            {PdsDocDateFormatter(training.from) || 'N/A'}
          </Text>
        </View>
        <View style={[styles.w50, styles.horizontalCenter]}>
          <View style={[styles.verticalCenter, { padding: '3 0' }]}>
            <Text>{PdsDocDateFormatter(training.to) || 'N/A'}</Text>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
            {training.conductedBy || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  ))

  return content
}

const renderLearningDevelopmentExtraPage2 = learningDevelopment => {
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
        <View style={[styles.w50, styles.horizontalCenter, styles.borderRight]}>
          <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
            {PdsDocDateFormatter(training.from) || 'N/A'}
          </Text>
        </View>
        <View style={[styles.w50, styles.horizontalCenter]}>
          <View style={[styles.verticalCenter, { padding: '3 0' }]}>
            <Text>{PdsDocDateFormatter(training.to) || 'N/A'}</Text>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
            {training.conductedBy || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  ))

  return content
}

const renderLearningDevelopmentExtraPage3 = learningDevelopment => {
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
        <View style={[styles.w50, styles.horizontalCenter, styles.borderRight]}>
          <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
            {PdsDocDateFormatter(training.from) || 'N/A'}
          </Text>
        </View>
        <View style={[styles.w50, styles.horizontalCenter]}>
          <View style={[styles.verticalCenter, { padding: '3 0' }]}>
            <Text>{PdsDocDateFormatter(training.to) || 'N/A'}</Text>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
            {training.conductedBy || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  ))

  return content
}

const renderLearningDevelopmentExtraPage4 = learningDevelopment => {
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
        <View style={[styles.w50, styles.horizontalCenter, styles.borderRight]}>
          <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
            {PdsDocDateFormatter(training.from) || 'N/A'}
          </Text>
        </View>
        <View style={[styles.w50, styles.horizontalCenter]}>
          <View style={[styles.verticalCenter, { padding: '3 0' }]}>
            <Text>{PdsDocDateFormatter(training.to) || 'N/A'}</Text>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
            {training.conductedBy || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  ))

  return content
}

const renderLearningDevelopmentExtraPage5 = learningDevelopment => {
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
        <View style={[styles.w50, styles.horizontalCenter, styles.borderRight]}>
          <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
            {PdsDocDateFormatter(training.from) || 'N/A'}
          </Text>
        </View>
        <View style={[styles.w50, styles.horizontalCenter]}>
          <View style={[styles.verticalCenter, { padding: '3 0' }]}>
            <Text>{PdsDocDateFormatter(training.to) || 'N/A'}</Text>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
            {training.conductedBy || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  ))

  return content
}

const renderLearningDevelopmentExtraPage6 = learningDevelopment => {
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
        <View style={[styles.w50, styles.horizontalCenter, styles.borderRight]}>
          <Text style={[styles.verticalCenter, { padding: '3 0' }]}>
            {PdsDocDateFormatter(training.from) || 'N/A'}
          </Text>
        </View>
        <View style={[styles.w50, styles.horizontalCenter]}>
          <View style={[styles.verticalCenter, { padding: '3 0' }]}>
            <Text>{PdsDocDateFormatter(training.to) || 'N/A'}</Text>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
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
          <Text hyphenationCallback={e => ChunkSubstr(e)}>
            {training.conductedBy || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  ))

  return content
}

const renderSpecialSkillsExtraPage = skills => {
  var content = skills.slice(7).map(skill => (
    <View style={[styles.inputValue, styles.borderTop]} key={skill._id}>
      <Text style={[styles.verticalCenter]}>{skill}</Text>
    </View>
  ))

  return content
}

const renderRecognitionExtraPage = recognitions => {
  var content = recognitions.slice(7).map(award => (
    <View style={[styles.inputValue, styles.borderTop]} key={award._id}>
      <Text style={[styles.verticalCenter]}>{award}</Text>
    </View>
  ))

  return content
}

const renderMembershipExtraPage = organizations => {
  var content = organizations.slice(7).map(org => (
    <View style={[styles.inputValue, styles.borderTop]} key={org._id}>
      <Text style={[styles.verticalCenter]}>{org}</Text>
    </View>
  ))

  return content
}

export {
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
}
