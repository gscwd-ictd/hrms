import React, { useState } from 'react'
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import ArialRegular from 'assets/fonts/uploads/arial.ttf'
import ArialNarrow from 'assets/fonts/uploads/arial-narrow.ttf'
import ArialNarrowItalic from 'assets/fonts/uploads/arial-narrow-italic.ttf'
import ArialNarrowBold from 'assets/fonts/uploads/arial-narrow-bold.ttf'
import ArialNarrowBoldItalic from 'assets/fonts/uploads/arial-narrow-bold-italic.ttf'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  sectionTitleContainer: {
    backgroundColor: '#969696',
    padding: 1.5,
  },
  sectionTitleText: {
    color: '#ffffff',
    fontFamily: 'ArialNarrowBoldItalic',
    fontSize: 9.2,
  },

  // Field Styles
  inputKey: {
    backgroundColor: '#EAEAEA',
    fontFamily: 'Arial',
    fontWeight: 100,
    fontSize: 6.7,
    padding: '3.5 5',
  },
  inputValue: {
    fontFamily: 'Arial',
    fontWeight: 100,
    fontSize: 6.7,
    padding: '4 8',
    height: 25,
  },
  inputAddressKey: {
    fontFamily: 'Arial',
    fontWeight: 100,
    fontStyle: 'italic',
    fontSize: 6.7,
    padding: '0 8',
  },
  warningText: {
    fontFamily: 'ArialNarrowBoldItalic',
    textAlign: 'center',
    fontSize: 6.7,
    color: 'red',
  },
  verticalCenter: { margin: 'auto 0' },
  horizontalCenter: { textAlign: 'center' },

  // Border Styles
  borderTop: {
    borderTop: '1px solid #000000',
  },
  borderRight: {
    borderRight: '1px solid #000000',
  },

  // Width Styles
  w100: { width: '100%' },
  w59: { width: '59%' },
  w23_8: { width: '23.8%' },
  w17_2: { width: '17.2%' },
})

Font.register({
  family: 'Arial',
  fonts: [
    { src: ArialRegular },
    { src: ArialNarrow, fontWeight: 100 },
    { src: ArialNarrowBold, fontWeight: 500 },
    { src: ArialNarrowItalic, fontWeight: 100, fontStyle: 'italic' },
  ],
})

Font.register({
  family: 'ArialNarrowBoldItalic',
  src: ArialNarrowBoldItalic,
})

const OtherInformationPdf = props => {
  const { skills, recognitions, organizations } = props
  const [emptySkillRows, setEmptySkillRows] = useState(7)
  const [emptyRecognitionRows, setEmptyRecognitionRows] = useState(7)
  const [emptyOrgRows, setEmptyOrgRows] = useState(7)

  const renderSpecialSkillRows = () => {
    var content = skills.slice(0, 7).map(skill => (
      <View
        style={[styles.inputValue, styles.borderRight, styles.borderTop]}
        key={skill._id}
      >
        <Text style={[styles.verticalCenter]}>{skill.skill}</Text>
      </View>
    ))

    return content
  }

  const renderEmptySpecialSkillRows = () => {
    let content = []
    const rowToRender = emptySkillRows - skills.length

    for (let i = 0; i < rowToRender; i++) {
      content.push(
        <View
          style={[styles.inputValue, styles.borderRight, styles.borderTop]}
          key={i}
        >
          <Text style={[styles.verticalCenter]}>N/A</Text>
        </View>
      )
    }

    return content
  }

  const renderRecognitionRows = () => {
    var content = recognitions.slice(0, 7).map(award => (
      <View
        style={[styles.inputValue, styles.borderRight, styles.borderTop]}
        key={award._id}
      >
        <Text style={[styles.verticalCenter]}>{award.recognition}</Text>
      </View>
    ))

    return content
  }

  const renderEmptyRecognitionRows = () => {
    let content = []
    const rowToRender = emptyRecognitionRows - recognitions.length

    for (let i = 0; i < rowToRender; i++) {
      content.push(
        <View
          style={[styles.inputValue, styles.borderRight, styles.borderTop]}
          key={i}
        >
          <Text style={[styles.verticalCenter]}>N/A</Text>
        </View>
      )
    }

    return content
  }

  const renderMembershipRows = () => {
    var content = organizations.slice(0, 7).map(organization => (
      <View
        style={[styles.inputValue, styles.borderTop]}
        key={organization._id}
      >
        <Text style={[styles.verticalCenter]}>{organization.organization}</Text>
      </View>
    ))

    return content
  }

  const renderEmptyMembershipRows = () => {
    let content = []
    const rowToRender = emptyOrgRows - organizations.length

    for (let i = 0; i < rowToRender; i++) {
      content.push(
        <View style={[styles.inputValue, styles.borderTop]} key={i}>
          <Text style={[styles.verticalCenter]}>N/A</Text>
        </View>
      )
    }

    return content
  }

  return (
    <View>
      <View style={[styles.sectionTitleContainer, styles.borderTop]}>
        <Text style={styles.sectionTitleText}>VIII. OTHER INFORMATION</Text>
      </View>

      {/* Header */}
      <View
        style={[
          styles.borderTop,
          { flexDirection: 'row', alignItems: 'stretch' },
        ]}
      >
        {/* Special SKills */}
        <View
          style={[
            styles.inputKey,
            styles.borderRight,
            styles.w17_2,
            { flexDirection: 'row' },
          ]}
        >
          <Text style={[styles.verticalCenter]}>31.</Text>
          <Text style={[styles.verticalCenter, { paddingLeft: 2 }]}>
            SPECIAL SKILLS and HOBBIES
          </Text>
        </View>

        {/* Non-Academic Distinctions */}
        <View
          style={[
            styles.inputKey,
            styles.borderRight,
            styles.w59,
            { flexDirection: 'row' },
          ]}
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

        {/* Membership */}
        <View style={[styles.inputKey, styles.w23_8, { flexDirection: 'row' }]}>
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
      </View>

      {/* Rows */}
      <View style={[{ flexDirection: 'row' }]}>
        {/* Special SKills */}
        <View style={[styles.w17_2]}>
          {renderSpecialSkillRows()}
          {renderEmptySpecialSkillRows()}
        </View>

        {/* Non-Academic Distinctions */}
        <View style={[styles.w59]}>
          {renderRecognitionRows()}
          {renderEmptyRecognitionRows()}
        </View>

        {/* Membership */}
        <View style={[styles.w23_8]}>
          {renderMembershipRows()}
          {renderEmptyMembershipRows()}
        </View>
      </View>
    </View>
  )
}

OtherInformationPdf.propTypes = {
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
}

export default OtherInformationPdf
