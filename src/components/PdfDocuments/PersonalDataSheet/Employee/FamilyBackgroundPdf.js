import React, { useState } from 'react'
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import ArialRegular from 'assets/fonts/uploads/arial.ttf'
import ArialBlack from 'assets/fonts/uploads/arial-black.ttf'
import ArialItalic from 'assets/fonts/uploads/arial-italic.ttf'
import ArialNarrow from 'assets/fonts/uploads/arial-narrow.ttf'
import ArialNarrowItalic from 'assets/fonts/uploads/arial-narrow-italic.ttf'
import ArialNarrowBold from 'assets/fonts/uploads/arial-narrow-bold.ttf'
import ArialBoldItalic from 'assets/fonts/uploads/arial-bold-italic.ttf'
import ArialNarrowBoldItalic from 'assets/fonts/uploads/arial-narrow-bold-italic.ttf'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: 'row',
  },
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

  // Border Styles
  borderTop: {
    borderTop: '1px solid #000000',
  },
  borderRight: {
    borderRight: '1px solid #000000',
  },

  // Width Styles
  w100: { width: '100%' },
  w70_1: { width: '70.1%' },
  w65: { width: '65%' },
  w57_6: { width: '57.6%' },
  w43_4: { width: '43.4%' },
  w42_9: { width: '42.9%' },
  w35: { width: '35%' },
  w29_9: { width: '29.9%' },
  w26_7: { width: '26.7%' },
})

Font.register({
  family: 'Arial',
  fonts: [
    { src: ArialRegular },
    { src: ArialBlack, fontWeight: 800 },
    { src: ArialItalic, fontStyle: 'italic' },
    { src: ArialBoldItalic, fontWeight: 500, fontStyle: 'italic' },
    { src: ArialNarrow, fontWeight: 100 },
    { src: ArialNarrowBold, fontWeight: 500 },
    { src: ArialNarrowItalic, fontWeight: 100, fontStyle: 'italic' },
  ],
})

Font.register({
  family: 'ArialNarrowBoldItalic',
  src: ArialNarrowBoldItalic,
})

const FamilyBackgroundPdf = props => {
  const { formatDate, spouse, parents, childrenInfo } = props
  const [emptyChildRows, setEmptyChildRows] = useState(12)

  const renderChildrenRows = () => {
    var content = childrenInfo.slice(0, 12).map((child, index) => (
      <View style={[styles.borderTop, { flexDirection: 'row' }]} key={index}>
        <View style={[styles.borderRight, styles.inputValue, styles.w65]}>
          <Text>{child.childName}</Text>
        </View>

        <View style={[styles.inputValue, styles.w35]}>
          <Text style={{ textAlign: 'center' }}>
            {formatDate(child.birthDate)}
          </Text>
        </View>
      </View>
    ))

    return content
  }

  const renderEmptyChildrenRows = () => {
    let content = []
    const rowToRender = emptyChildRows - childrenInfo.length

    for (let i = 0; i < rowToRender; i++) {
      content.push(
        <View style={[styles.borderTop, { flexDirection: 'row' }]} key={i}>
          <View style={[styles.borderRight, styles.inputValue, styles.w65]}>
            <Text style={{ textAlign: 'center' }}>N/A</Text>
          </View>

          <View style={[styles.inputValue, styles.w35]}>
            <Text style={{ textAlign: 'center' }}>N/A</Text>
          </View>
        </View>
      )
    }
    return content
  }

  return (
    <View>
      <View style={[styles.sectionTitleContainer, styles.borderTop]}>
        <Text style={styles.sectionTitleText}>II. FAMILY BACKGROUND</Text>
      </View>

      <View
        style={[
          styles.borderTop,
          { flexDirection: 'row', alignItems: 'stretch' },
        ]}
      >
        <View style={[styles.w57_6]}>
          {/* Line 36 Spouse Surname */}
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.borderRight, styles.inputKey, styles.w29_9]}>
              <Text>22. SPOUSE&#39;S SURNAME</Text>
            </View>

            <View
              style={[
                styles.borderRight,
                styles.inputValue,
                styles.w70_1,
                { padding: '4 8' },
              ]}
            >
              <Text>{spouse.lastName || 'N/A'}</Text>
            </View>
          </View>

          {/* Line 37 Spouse First Name */}
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.borderRight, styles.inputKey, styles.w29_9]}>
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;FIRST NAME</Text>
            </View>

            <View
              style={[
                styles.borderRight,
                styles.borderTop,
                styles.inputValue,
                styles.w43_4,
                { padding: '4 8' },
              ]}
            >
              <Text>{spouse.firstName || 'N/A'}</Text>
            </View>

            <View
              style={[
                styles.borderRight,
                styles.borderTop,
                styles.inputKey,
                styles.w26_7,
                {
                  padding: 1,
                  fontSize: 5.7,
                  flexDirection: 'row',
                },
              ]}
            >
              <Text>NAME EXTENSION (JR., SR)</Text>
              <Text style={{ padding: '3 8', fontSize: 5.7 }}>
                {spouse.nameExtension || 'N/A'}
              </Text>
            </View>
          </View>

          {/* Line 38 Spouse Middle Name */}
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.borderRight, styles.inputKey, styles.w29_9]}>
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;MIDDLE NAME</Text>
            </View>

            <View
              style={[
                styles.borderTop,
                styles.borderRight,
                styles.inputValue,
                styles.w70_1,
                { padding: '4 8' },
              ]}
            >
              <Text>{spouse.middleName || 'N/A'}</Text>
            </View>
          </View>

          {/* Line 39 Spouse Occupation */}
          <View style={[styles.borderTop, { flexDirection: 'row' }]}>
            <View style={[styles.borderRight, styles.inputKey, styles.w29_9]}>
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;OCCUPATION</Text>
            </View>

            <View
              style={[
                styles.borderRight,
                styles.inputValue,
                styles.w70_1,
                { padding: '4 8' },
              ]}
            >
              <Text>{spouse.occupation || 'N/A'}</Text>
            </View>
          </View>

          {/* Line 40 Spouse Business name */}
          <View style={[styles.borderTop, { flexDirection: 'row' }]}>
            <View style={[styles.borderRight, styles.inputKey, styles.w29_9]}>
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;EMPLOYER/BUSINESS NAME</Text>
            </View>

            <View
              style={[
                styles.borderRight,
                styles.inputValue,
                styles.w70_1,
                { padding: '4 8' },
              ]}
            >
              <Text>{spouse.employer || 'N/A'}</Text>
            </View>
          </View>

          {/* Line 41 Spouse Business address */}
          <View style={[styles.borderTop, { flexDirection: 'row' }]}>
            <View style={[styles.borderRight, styles.inputKey, styles.w29_9]}>
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;BUSINESS ADDRESS</Text>
            </View>

            <View
              style={[
                styles.borderRight,
                styles.inputValue,
                styles.w70_1,
                { padding: '4 8' },
              ]}
            >
              <Text>{spouse.businessAddress || 'N/A'}</Text>
            </View>
          </View>

          {/* Line 42 Spouse Business telephone no. */}
          <View style={[styles.borderTop, { flexDirection: 'row' }]}>
            <View style={[styles.borderRight, styles.inputKey, styles.w29_9]}>
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;TELEPHONE NO.</Text>
            </View>

            <View
              style={[
                styles.borderRight,
                styles.inputValue,
                styles.w70_1,
                { padding: '4 8' },
              ]}
            >
              <Text>{spouse.telephoneNumber || 'N/A'}</Text>
            </View>
          </View>

          {/* Line 43 Father Surname */}
          <View style={[styles.borderTop, { flexDirection: 'row' }]}>
            <View style={[styles.borderRight, styles.inputKey, styles.w29_9]}>
              <Text>24. FATHER&#39;S SURNAME</Text>
            </View>

            <View
              style={[
                styles.borderRight,
                styles.inputValue,
                styles.w70_1,
                { padding: '4 8' },
              ]}
            >
              <Text>{parents.fatherLastName || 'N/A'}</Text>
            </View>
          </View>

          {/* Line 44 Father First Name */}
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.borderRight, styles.inputKey, styles.w29_9]}>
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;FIRST NAME</Text>
            </View>

            <View
              style={[
                styles.borderRight,
                styles.borderTop,
                styles.inputValue,
                styles.w43_4,
                { padding: '4 8' },
              ]}
            >
              <Text>{parents.fatherFirstName || 'N/A'}</Text>
            </View>

            <View
              style={[
                styles.borderRight,
                styles.borderTop,
                styles.inputKey,
                styles.w26_7,
                {
                  padding: 1,
                  fontSize: 5.7,
                  flexDirection: 'row',
                },
              ]}
            >
              <Text>NAME EXTENSION (JR., SR)</Text>
              <Text style={{ padding: '3 8', fontSize: 5.7 }}>
                {parents.fatherNameExtension || 'N/A'}
              </Text>
            </View>
          </View>

          {/* Line 45 Father Middle Name */}
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.borderRight, styles.inputKey, styles.w29_9]}>
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;MIDDLE NAME</Text>
            </View>

            <View
              style={[
                styles.borderTop,
                styles.borderRight,
                styles.inputValue,
                styles.w70_1,
                { padding: '4 8' },
              ]}
            >
              <Text>{parents.fatherMiddleName || 'N/A'}</Text>
            </View>
          </View>

          {/* Line 46 Mother's Maiden Name  */}
          <View style={[styles.borderTop, { flexDirection: 'row' }]}>
            <View style={[styles.inputKey, styles.w29_9]}>
              <Text>25. MOTHER&#39;S MAIDEN NAME</Text>
            </View>

            <View
              style={[
                styles.borderRight,
                styles.inputValue,
                styles.w70_1,
                { padding: '4 8', backgroundColor: '#EAEAEA' },
              ]}
            >
              <Text></Text>
            </View>
          </View>

          {/* Line 47 Mother Surname */}
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.borderRight, styles.inputKey, styles.w29_9]}>
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;SURNAME</Text>
            </View>

            <View
              style={[
                styles.borderTop,
                styles.borderRight,
                styles.inputValue,
                styles.w70_1,
                { padding: '4 8' },
              ]}
            >
              <Text>{parents.motherLastName || 'N/A'}</Text>
            </View>
          </View>

          {/* Line 48 Mother First Name */}
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.borderRight, styles.inputKey, styles.w29_9]}>
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;FIRST NAME</Text>
            </View>

            <View
              style={[
                styles.borderTop,
                styles.borderRight,
                styles.inputValue,
                styles.w70_1,
                { padding: '4 8' },
              ]}
            >
              <Text>{parents.motherFirstName || 'N/A'}</Text>
            </View>
          </View>

          {/* Line 49 Mother Middle Name */}
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.borderRight, styles.inputKey, styles.w29_9]}>
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;MIDDLE NAME</Text>
            </View>

            <View
              style={[
                styles.borderTop,
                styles.borderRight,
                styles.inputValue,
                styles.w70_1,
                { padding: '4 8' },
              ]}
            >
              <Text>{parents.motherMiddleName || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* No. 23 Children */}
        <View style={[styles.w42_9]}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.borderRight, styles.inputKey, styles.w65]}>
              <Text>23. NAME of CHILDREN (Write full name and list all)</Text>
            </View>

            <View style={[styles.inputKey, styles.w35]}>
              <Text>DATE OF BIRTH (dd/mm/yyyy)</Text>
            </View>
          </View>

          {renderChildrenRows()}

          {childrenInfo.length < 12 ? <>{renderEmptyChildrenRows()}</> : null}

          <View style={[styles.borderTop]}>
            <View style={[styles.inputKey, styles.w100]}>
              <Text style={styles.warningText}>
                (Continue on separate sheet if necessary)
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

FamilyBackgroundPdf.propTypes = {
  spouse: PropTypes.object.isRequired,
  parents: PropTypes.object.isRequired,
  childrenInfo: PropTypes.arrayOf(
    PropTypes.shape({
      childName: PropTypes.string.isRequired,
      birthDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default FamilyBackgroundPdf
