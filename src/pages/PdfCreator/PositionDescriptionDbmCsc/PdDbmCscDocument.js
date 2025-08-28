import React from 'react'
import PropTypes from 'prop-types'

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

// Fonts
import CalibriRegular from 'assets/fonts/uploads/calibri-regular.ttf'
import CalibriRegularBold from 'assets/fonts/uploads/calibri-regular-bold.ttf'
import CalibriRegularItalic from 'assets/fonts/uploads/calibri-bold-italic.ttf'

Font.registerHyphenationCallback(word => [word])

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    paddingTop: 15,
    paddingBottom: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  bodyBorder: {
    marginHorizontal: 22,
  },

  // Table Styles
  tableBorder: {
    border: '1px solid #000000',
  },
  rowContainerTable: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tData: {
    padding: '4 0 0 4',
  },
  tDataColored: {
    backgroundColor: '#D3CFBA',
  },
  tDataVerticalCenter: {
    paddingTop: 11,
    paddingBottom: 9,
  },

  // Border Styles
  borderAll: {
    border: '1.5px solid #000000',
  },
  borderTop: {
    borderTop: '1.5px solid #000000',
  },
  borderRight: {
    borderRight: '1.5px solid #000000',
  },
  borderBottom: {
    borderBottom: '1.5px solid #000000',
  },
  borderLeft: {
    borderLeft: '1.5px solid #000000',
  },

  // Field Styles
  subtitleText: {
    fontFamily: 'CalibriRegular',
    fontSize: 8,
    paddingTop: 2,
    paddingHorizontal: 2,
  },
  bodyText: {
    fontFamily: 'CalibriRegular',
    fontSize: 9.5,
    paddingTop: 2,
    paddingHorizontal: 2,
  },
  bodyTextItalic: {
    fontFamily: 'CalibriRegularItalic',
    fontSize: 9.5,
    paddingTop: 2,
    paddingHorizontal: 2,
  },
  bodyTextBold: {
    fontFamily: 'CalibriRegularBold',
    fontSize: 11,
    paddingTop: 2,
    paddingHorizontal: 2,
  },
  bodyTextBoldUppercase: {
    fontFamily: 'CalibriRegularBold',
    fontSize: 11,
    textTransform: 'uppercase',
    paddingTop: 2,
    paddingHorizontal: 2,
  },
  textWithCheckbox: {
    fontFamily: 'CalibriRegular',
    fontSize: 9.5,
    paddingTop: 1,
  },
  pageNumber: {
    fontFamily: 'CalibriRegularItalic',
    // fontStyle: 'italic',
    position: 'absolute',
    fontSize: 9,
    bottom: 13,
    left: 0,
    right: 25,
    textAlign: 'right',
    color: 'grey',
  },

  // Unordered List
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  bullet: {
    marginTop: '-3px',
    height: '100%',
  },

  verticalCenter: { margin: 'auto 0' },
  horizontalCenter: { textAlign: 'center' },

  // Width Styles
  w100: { width: '100%' },
  w90: { width: '90%' },
  w75: { width: '75%' },
  w70: { width: '70%' },
  w60: { width: '60%' },
  w50: { width: '50%' },
  w40: { width: '40%' },
  w33_33: { width: '33.33%' },
  w30: { width: '30%' },
  w25: { width: '25%' },
  w20: { width: '20%' },
  w10: { width: '10%' },
  w5: { width: '5%' },
})

Font.register({
  family: 'CalibriRegular',
  src: CalibriRegular,
})

Font.register({
  family: 'CalibriRegularBold',
  src: CalibriRegularBold,
})

Font.register({
  family: 'CalibriRegularItalic',
  src: CalibriRegularItalic,
})

export const chunkSubstr = (str, size) => {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }

  return chunks
}

export const remarksHyphenationCallback = word => {
  if (word.length > 16) {
    return chunkSubstr(word, 14)
  } else {
    return [word]
  }
}

const PdDbmCscDocument = props => {
  const { applicantDbmCsc } = props

  const renderDirectlySupervised = positions => {
    // .slice(0, 7) use if positions will be limited to 7 entries only

    var content = positions.map((position, index) => (
      <View style={[styles.rowContainer, styles.borderBottom]} key={index}>
        <View style={[styles.w50, styles.borderRight]}>
          <View>
            <Text
              style={[
                styles.bodyTextBold,
                styles.horizontalCenter,
                styles.verticalCenter,
                { paddingTop: 9, paddingBottom: 5 },
              ]}
            >
              {position.title}
            </Text>
          </View>
        </View>

        <View style={[styles.w50]}>
          <View>
            <Text
              style={[
                styles.bodyTextBold,
                styles.horizontalCenter,
                styles.verticalCenter,
                { paddingTop: 9, paddingBottom: 6 },
              ]}
            >
              {position.itemNumber}
            </Text>
          </View>
        </View>
      </View>
    ))

    return content
  }

  const renderIsOccasionalCheckBox = isOccasional => {
    if (isOccasional === 'Occasional') {
      return (
        <View style={[{ margin: 'auto' }]}>
          <Svg viewBox="0 0 24 24" width={10} height={10}>
            <Path
              d="M11 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597zm11-15v20h-20v-20h20zm2-2h-24v24h24v-24z"
              stroke="black"
            />
          </Svg>
        </View>
      )
    } else {
      return (
        <View style={[{ margin: 'auto' }]}>
          <Svg viewBox="0 0 24 24" width={10} height={10}>
            <Path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z" stroke="black" />
          </Svg>
        </View>
      )
    }
  }

  const renderIsFrequentCheckBox = isFrequent => {
    if (isFrequent === 'Frequent') {
      return (
        <View style={[{ margin: 'auto' }]}>
          <Svg viewBox="0 0 24 24" width={10} height={10}>
            <Path
              d="M11 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597zm11-15v20h-20v-20h20zm2-2h-24v24h24v-24z"
              stroke="black"
            />
          </Svg>
        </View>
      )
    } else {
      return (
        <View style={[{ margin: 'auto' }]}>
          <Svg viewBox="0 0 24 24" width={10} height={10}>
            <Path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z" stroke="black" />
          </Svg>
        </View>
      )
    }
  }

  const renderCompetencies = competencyArray => {
    var content = competencyArray.map((competency, index) => (
      <View
        style={[styles.rowContainer, styles.borderAll]}
        key={index}
        wrap={false}
      >
        <View style={[styles.w75, styles.borderRight]}>
          <Text style={[styles.bodyText, { textTransform: 'uppercase' }]}>
            {competency.competencyName}
          </Text>
          <Text style={[styles.bodyText]}>{competency.description}</Text>
        </View>
        <View style={[styles.w25]}>
          <Text
            style={[
              styles.bodyTextBoldUppercase,
              styles.horizontalCenter,
              styles.verticalCenter,
            ]}
          >
            {competency.level}
          </Text>
        </View>
      </View>
    ))

    return content
  }

  const listItem = children => {
    var myArray = children.split('\n\n')

    var content = myArray.map((perDuty, index) => (
      <View style={[styles.row, styles.w90]} key={index}>
        <View style={styles.bullet}>
          <Text>{'\u2022' + ' '}</Text>
        </View>
        <Text style={[styles.bodyText, { flexWrap: 'wrap' }]}>{perDuty}</Text>
      </View>
    ))

    return content
  }

  const renderDuties = dutiesCoreArray => {
    var content = dutiesCoreArray.map((duty, index) => (
      <View
        style={[styles.rowContainer, styles.borderAll]}
        key={index}
        wrap={false}
      >
        <View style={[styles.w25, styles.borderRight]}>
          <Text
            style={[
              styles.bodyText,
              styles.verticalCenter,
              styles.horizontalCenter,
            ]}
          >
            {duty.percentage} %
          </Text>
        </View>
        <View style={[styles.w50, styles.borderRight]}>
          {listItem(duty.dutyResponsibility)}
        </View>
        <View style={[styles.w25]}>
          <Text
            style={[
              styles.bodyTextBoldUppercase,
              styles.horizontalCenter,
              styles.verticalCenter,
            ]}
            hyphenationCallback={remarksHyphenationCallback}
          >
            {duty.competencyName}/{duty.competencyLevel}
          </Text>
        </View>
      </View>
    ))

    return content
  }

  return (
    <Document
      author="General Santos City Water District"
      subject="Position Description Form"
      title="DBM-CSC Form No. 1"
    >
      <Page size={[612.3, 935.4]} style={styles.page}>
        <View style={[styles.bodyBorder]}>
          {/* ROW 1 */}
          <View style={[styles.rowContainer, styles.borderAll]}>
            <View
              style={[
                styles.w50,
                styles.horizontalCenter,
                styles.borderRight,
                styles.tDataVerticalCenter,
              ]}
            >
              <Text style={[styles.bodyTextBold]}>
                Republic of the Philippines
              </Text>
              <Text style={[styles.bodyTextBold]}>
                POSITION DESCRIPTION FORM
              </Text>
              <Text style={[styles.bodyTextBold]}>DBM-CSC Form No. 1</Text>
              <Text style={[styles.subtitleText]}>
                (Revised Version No. 1, s. 2017)
              </Text>
            </View>

            <View style={[styles.w50]}>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                1. POSITION TITLE (as approved by authorized agency) with
                parenthetical title
              </Text>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tDataVerticalCenter,
                ]}
              >
                {applicantDbmCsc.positionDetails.positionTitle}
              </Text>
            </View>
          </View>

          {/* ROW 2 */}
          <View style={[styles.rowContainer, styles.borderAll]}>
            <View style={[styles.w50, styles.borderRight]}>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                2. ITEM NUMBER
              </Text>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tDataVerticalCenter,
                ]}
              >
                {applicantDbmCsc.positionDescriptionFormBasic.itemNumber}
              </Text>
            </View>

            <View style={[styles.w50]}>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                3. SALARY GRADE
              </Text>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tDataVerticalCenter,
                ]}
              >
                {applicantDbmCsc.positionDetails.salaryGrade}
              </Text>
            </View>
          </View>

          {/* ROW 3 */}
          <View style={[styles.borderAll]}>
            <View>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                4. FOR LOCAL GOVERNMENT POSITION, ENUMERATE GOVERNMENTAL UNIT
                AND CLASS
              </Text>

              <View style={[styles.rowContainer]}>
                {/* Column 1 */}
                <View
                  style={[
                    styles.w33_33,
                    styles.tDataVerticalCenter,
                    { paddingHorizontal: 30 },
                  ]}
                >
                  <View style={[styles.rowContainer]}>
                    <Svg viewBox="0 0 24 24" width={10} height={10}>
                      <Path
                        d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                        stroke="black"
                      />
                    </Svg>
                    <Text style={[styles.textWithCheckbox]}>
                      &nbsp; Province
                    </Text>
                  </View>

                  <View style={[styles.rowContainer]}>
                    <Svg viewBox="0 0 24 24" width={10} height={10}>
                      <Path
                        d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                        stroke="black"
                      />
                      {/* <Path
                        d="M11 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597zm11-15v20h-20v-20h20zm2-2h-24v24h24v-24z"
                        stroke="black"
                      /> */}
                    </Svg>
                    <Text style={[styles.textWithCheckbox]}>&nbsp; City</Text>
                  </View>

                  <View style={[styles.rowContainer]}>
                    <Svg viewBox="0 0 24 24" width={10} height={10}>
                      <Path
                        d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                        stroke="black"
                      />
                    </Svg>
                    <Text style={[styles.textWithCheckbox]}>
                      &nbsp; Municipality
                    </Text>
                  </View>
                </View>

                {/* Column 2 */}
                <View
                  style={[
                    styles.w33_33,
                    styles.tDataVerticalCenter,
                    { paddingHorizontal: 30 },
                  ]}
                >
                  <View style={[styles.rowContainer]}>
                    <Svg viewBox="0 0 24 24" width={10} height={10}>
                      <Path
                        d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                        stroke="black"
                      />
                    </Svg>
                    <Text style={[styles.textWithCheckbox]}>
                      &nbsp; 1st Class
                    </Text>
                  </View>

                  <View style={[styles.rowContainer]}>
                    <Svg viewBox="0 0 24 24" width={10} height={10}>
                      <Path
                        d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                        stroke="black"
                      />
                    </Svg>
                    <Text style={[styles.textWithCheckbox]}>
                      &nbsp; 2nd Class
                    </Text>
                  </View>

                  <View style={[styles.rowContainer]}>
                    <Svg viewBox="0 0 24 24" width={10} height={10}>
                      <Path
                        d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                        stroke="black"
                      />
                    </Svg>
                    <Text style={[styles.textWithCheckbox]}>
                      &nbsp; 3rd Class
                    </Text>
                  </View>

                  <View style={[styles.rowContainer]}>
                    <Svg viewBox="0 0 24 24" width={10} height={10}>
                      <Path
                        d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                        stroke="black"
                      />
                    </Svg>
                    <Text style={[styles.textWithCheckbox]}>
                      &nbsp; 4th Class
                    </Text>
                  </View>
                </View>

                {/* Column 3 */}
                <View
                  style={[
                    styles.w33_33,
                    styles.tDataVerticalCenter,
                    { paddingHorizontal: 30 },
                  ]}
                >
                  <View style={[styles.rowContainer]}>
                    <Svg viewBox="0 0 24 24" width={10} height={10}>
                      <Path
                        d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                        stroke="black"
                      />
                    </Svg>
                    <Text style={[styles.textWithCheckbox]}>
                      &nbsp; 5th Class
                    </Text>
                  </View>

                  <View style={[styles.rowContainer]}>
                    <Svg viewBox="0 0 24 24" width={10} height={10}>
                      <Path
                        d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                        stroke="black"
                      />
                    </Svg>
                    <Text style={[styles.textWithCheckbox]}>
                      &nbsp; 6th Class
                    </Text>
                  </View>

                  <View style={[styles.rowContainer]}>
                    <Svg viewBox="0 0 24 24" width={10} height={10}>
                      <Path
                        d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z"
                        stroke="black"
                      />
                    </Svg>
                    <Text style={[styles.textWithCheckbox]}>
                      &nbsp; Special
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* ROW 4 */}
          <View style={[styles.rowContainer, styles.borderAll]}>
            <View style={[styles.w50, styles.borderRight]}>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                5. DEPARTMENT, CORPORATION OR AGENCY/LOCAL GOVERNMENT
              </Text>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tDataVerticalCenter,
                ]}
              >
                GOVERMENT OWNED AND CONTROLLED CORPORATION
              </Text>
            </View>

            <View style={[styles.w50]}>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                  { paddingBottom: 13.5 },
                ]}
              >
                6. BUREAU OR OFFICE
              </Text>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tDataVerticalCenter,
                ]}
              >
                GENERAL SANTOS CITY WATER DISTRICT
              </Text>
            </View>
          </View>

          {/* ROW 5 */}
          <View style={[styles.rowContainer, styles.borderAll]}>
            <View style={[styles.w50, styles.borderRight]}>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                7. DEPARTMENT / BRANCH / DIVISION
              </Text>
              <Text
                style={[
                  styles.bodyTextBoldUppercase,
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tDataVerticalCenter,
                ]}
              >
                {applicantDbmCsc.positionDetails.placeOfAssignment}
              </Text>
            </View>

            <View style={[styles.w50]}>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                8. WORKSTATION / PLACE OF WORK
              </Text>
              <Text
                style={[
                  styles.bodyTextBoldUppercase,
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tDataVerticalCenter,
                ]}
              >
                {applicantDbmCsc.positionDescriptionFormBasic.workStation}
              </Text>
            </View>
          </View>

          {/* ROW 6 */}
          <View style={[styles.rowContainer, styles.borderAll]}>
            <View style={[styles.w50, styles.borderRight]}>
              <View style={[styles.rowContainer]}>
                {/* 9 */}
                <View style={[styles.w50, styles.borderRight]}>
                  <Text
                    style={[
                      styles.bodyTextBold,
                      styles.tDataColored,
                      styles.borderBottom,
                    ]}
                  >
                    9. PRESENT APPROP ACT
                  </Text>
                  <Text
                    style={[
                      styles.bodyTextBoldUppercase,
                      styles.horizontalCenter,
                      styles.verticalCenter,
                      styles.tDataVerticalCenter,
                    ]}
                  >
                    {/* {
                      applicantDbmCsc.positionDescriptionFormBasic
                        .presentAppropriationAct
                    } */}
                    NBC#591
                  </Text>
                </View>

                {/* 10 */}
                <View style={[styles.w50]}>
                  <Text
                    style={[
                      styles.bodyTextBold,
                      styles.tDataColored,
                      styles.borderBottom,
                    ]}
                  >
                    10. PREVIOUS APPROP ACT
                  </Text>
                  <Text
                    style={[
                      styles.bodyTextBoldUppercase,
                      styles.horizontalCenter,
                      styles.verticalCenter,
                      styles.tDataVerticalCenter,
                    ]}
                  >
                    {/* {
                      applicantDbmCsc.positionDescriptionFormBasic
                        .previousAppropriationAct
                    } */}
                    NBC#588
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.w50]}>
              <View style={[styles.rowContainer]}>
                {/* 11 */}
                <View style={[styles.w50, styles.borderRight]}>
                  <Text
                    style={[
                      styles.bodyTextBold,
                      styles.tDataColored,
                      styles.borderBottom,
                    ]}
                  >
                    11. SALARY AUTHORIZED
                  </Text>
                  <Text
                    style={[
                      styles.bodyTextBoldUppercase,
                      styles.horizontalCenter,
                      styles.verticalCenter,
                      styles.tDataVerticalCenter,
                    ]}
                  >
                    {applicantDbmCsc.positionDetails.salary}
                  </Text>
                </View>

                {/* 12 */}
                <View style={[styles.w50]}>
                  <Text
                    style={[
                      styles.bodyTextBold,
                      styles.tDataColored,
                      styles.borderBottom,
                    ]}
                  >
                    12. OTHER COMPENSATION
                  </Text>
                  <Text
                    style={[
                      styles.bodyTextBoldUppercase,
                      styles.horizontalCenter,
                      styles.verticalCenter,
                      styles.tDataVerticalCenter,
                    ]}
                  >
                    PERA - 2,000.00
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* ROW 7 */}
          <View style={[styles.rowContainer, styles.borderAll]}>
            <View style={[styles.w50, styles.borderRight]}>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                13. POSITION TITLE OF IMMEDIATE SUPERVISOR
              </Text>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tDataVerticalCenter,
                ]}
              >
                {
                  applicantDbmCsc.positionDescriptionFormBasic
                    .immediateSupervisor
                }
              </Text>
            </View>

            <View style={[styles.w50]}>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                14. POSITION TITLE OF NEXT HIGHER SUPERVISOR
              </Text>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tDataVerticalCenter,
                ]}
              >
                {
                  applicantDbmCsc.positionDescriptionFormBasic
                    .supervisorNextHigher
                }
              </Text>
            </View>
          </View>

          {/* ROW 8 */}
          <View style={[styles.borderAll]}>
            <View>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                15. POSITION TITLE, AND ITEM OF THOSE DIRECTLY SUPERVISED
              </Text>

              <View style={[styles.borderBottom, styles.horizontalCenter]}>
                <Text style={[styles.bodyTextItalic]}>
                  (if more than seven (7) list only by their item numbers and
                  titles)
                </Text>
              </View>

              <View style={[styles.rowContainer]}>
                <View style={[styles.w50, styles.borderRight]}>
                  <View style={[styles.borderBottom]}>
                    <Text
                      style={[styles.horizontalCenter, styles.bodyTextBold]}
                    >
                      POSITION TITLE
                    </Text>
                  </View>
                </View>

                <View style={[styles.w50]}>
                  <View style={[styles.borderBottom]}>
                    <Text
                      style={[styles.horizontalCenter, styles.bodyTextBold]}
                    >
                      ITEM NUMBER
                    </Text>
                  </View>
                </View>
              </View>

              {/* Render rows for each poisition */}
              {renderDirectlySupervised(
                applicantDbmCsc.positionDescriptionFormBasic.directlySupervised
              )}
            </View>
          </View>

          {/* ROW 9 */}
          <View style={[styles.borderAll, { borderTop: 'none' }]} wrap={false}>
            <View>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                16. MACHINE, EQUIPMENT, TOOLS, ETC., USED REGULARLY IN
                PERFORMANCE OF WORK
              </Text>

              <Text
                style={[
                  styles.bodyTextBoldUppercase,
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tDataVerticalCenter,
                ]}
              >
                {applicantDbmCsc.positionDescriptionFormBasic.toolsUsed}
              </Text>
            </View>
          </View>

          {/* ROW 10 */}
          <View style={[styles.borderAll]} wrap={false}>
            <View>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                17. CONTACTS / CLIENTS / STAKEHOLDERS
              </Text>

              <View style={[styles.tDataColored, styles.borderBottom]}>
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w50, styles.rowContainer]}>
                    <View style={[styles.w40]}>
                      <Text
                        style={[
                          styles.bodyTextBold,
                          styles.borderRight,
                          styles.horizontalCenter,
                        ]}
                      >
                        17a. Internal
                      </Text>
                    </View>
                    <View style={[styles.w30]}>
                      <Text
                        style={[
                          styles.bodyTextBold,
                          styles.borderRight,
                          styles.horizontalCenter,
                        ]}
                      >
                        Occasional
                      </Text>
                    </View>
                    <View style={[styles.w30]}>
                      <Text
                        style={[
                          styles.bodyTextBold,
                          styles.borderRight,
                          styles.horizontalCenter,
                        ]}
                      >
                        Frequent
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.w50, styles.rowContainer]}>
                    <View style={[styles.w40]}>
                      <Text
                        style={[
                          styles.bodyTextBold,
                          styles.borderRight,
                          styles.horizontalCenter,
                        ]}
                      >
                        17b. External
                      </Text>
                    </View>
                    <View style={[styles.w30]}>
                      <Text
                        style={[
                          styles.bodyTextBold,
                          styles.borderRight,
                          styles.horizontalCenter,
                        ]}
                      >
                        Occasional
                      </Text>
                    </View>
                    <View style={[styles.w30]}>
                      <Text
                        style={[styles.bodyTextBold, styles.horizontalCenter]}
                      >
                        Frequent
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={[{ paddingTop: 3 }]}>
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w50, styles.rowContainer]}>
                    <View style={[styles.w40]}>
                      <Text style={[styles.bodyText]}>
                        Executive / Managerial
                      </Text>
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsOccasionalCheckBox(
                        applicantDbmCsc.contacts.internal.executiveFrequency
                      )}
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsFrequentCheckBox(
                        applicantDbmCsc.contacts.internal.executiveFrequency
                      )}
                    </View>
                  </View>

                  <View style={[styles.w50, styles.rowContainer]}>
                    <View style={[styles.w40]}>
                      <Text style={[styles.bodyText]}>General Public</Text>
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsOccasionalCheckBox(
                        applicantDbmCsc.contacts.external.generalPublicFrequency
                      )}
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsFrequentCheckBox(
                        applicantDbmCsc.contacts.external.generalPublicFrequency
                      )}
                    </View>
                  </View>
                </View>
              </View>

              <View>
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w50, styles.rowContainer]}>
                    <View style={[styles.w40]}>
                      <Text style={[styles.bodyText]}>Supervisors</Text>
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsOccasionalCheckBox(
                        applicantDbmCsc.contacts.internal.supervisorsFrequency
                      )}
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsFrequentCheckBox(
                        applicantDbmCsc.contacts.internal.supervisorsFrequency
                      )}
                    </View>
                  </View>

                  <View style={[styles.w50, styles.rowContainer]}>
                    <View style={[styles.w40]}>
                      <Text style={[styles.bodyText]}>Other Agencies</Text>
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsOccasionalCheckBox(
                        applicantDbmCsc.contacts.external.otherAgenciesFrequency
                      )}
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsFrequentCheckBox(
                        applicantDbmCsc.contacts.external.otherAgenciesFrequency
                      )}
                    </View>
                  </View>
                </View>
              </View>

              <View>
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w50, styles.rowContainer]}>
                    <View style={[styles.w40]}>
                      <Text style={[styles.bodyText]}>Non-Supervisors</Text>
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsOccasionalCheckBox(
                        applicantDbmCsc.contacts.internal
                          .nonSupervisorsFrequency
                      )}
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsFrequentCheckBox(
                        applicantDbmCsc.contacts.internal
                          .nonSupervisorsFrequency
                      )}
                    </View>
                  </View>

                  <View style={[styles.w50, styles.rowContainer]}>
                    <View style={[styles.w40]}>
                      <Text style={[styles.bodyText]}>
                        Others (Please Specify):
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.w60,
                        { borderBottom: '1px solid #000000' },
                      ]}
                    >
                      <Text style={[styles.bodyText]}>
                        {applicantDbmCsc.contacts.external.others}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={[{ paddingBottom: 3 }]}>
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w50, styles.rowContainer]}>
                    <View style={[styles.w40]}>
                      <Text style={[styles.bodyText]}>Supervisors</Text>
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsOccasionalCheckBox(
                        applicantDbmCsc.contacts.internal.staffFrequency
                      )}
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsFrequentCheckBox(
                        applicantDbmCsc.contacts.internal.staffFrequency
                      )}
                    </View>
                  </View>

                  <View style={[styles.w50, styles.rowContainer]}></View>
                </View>
              </View>
            </View>
          </View>

          {/* ROW 11 */}
          <View style={[styles.borderAll]} wrap={false}>
            <View>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                18. WORKING CONDITION
              </Text>

              <View style={[{ paddingTop: 3 }]}>
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w50, styles.rowContainer]}>
                    <View style={[styles.w40]}>
                      <Text style={[styles.bodyText]}>Office Work</Text>
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsOccasionalCheckBox(
                        applicantDbmCsc.workingCondition.officeWorkFrequency
                      )}
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsFrequentCheckBox(
                        applicantDbmCsc.workingCondition.officeWorkFrequency
                      )}
                    </View>
                  </View>

                  <View style={[styles.w50, styles.rowContainer]}>
                    <View style={[styles.w40]}>
                      <Text style={[styles.bodyText]}>
                        Others (Please Specify):
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.w60,
                        { borderBottom: '1px solid #000000' },
                      ]}
                    >
                      <Text style={[styles.bodyText]}>
                        {applicantDbmCsc.workingCondition.others}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={[{ paddingBottom: 3 }]}>
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w50, styles.rowContainer]}>
                    <View style={[styles.w40]}>
                      <Text style={[styles.bodyText]}>Field Work</Text>
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsOccasionalCheckBox(
                        applicantDbmCsc.workingCondition.fieldWorkFrequency
                      )}
                    </View>
                    <View style={[styles.w30]}>
                      {renderIsFrequentCheckBox(
                        applicantDbmCsc.workingCondition.fieldWorkFrequency
                      )}
                    </View>
                  </View>

                  <View style={[styles.w50, styles.rowContainer]}></View>
                </View>
              </View>
            </View>
          </View>

          {/* ROW 12 */}
          <View style={[styles.borderAll]} wrap={false}>
            <View>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                19. BRIEF DESCRIPTION OF THE GENERAL FUNCTION OF THE UNIT OR
                SECTION
              </Text>

              <Text
                style={[
                  styles.bodyText,
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tDataVerticalCenter,
                ]}
              >
                {applicantDbmCsc.generalFunctionOfUnit}
              </Text>
            </View>
          </View>

          {/* ROW 13 */}
          <View style={[styles.borderAll]} wrap={false}>
            <View>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                20. BRIEF DESCRIPTION OF THE GENERAL FUNCTION OF THE POSITION
                (Job Summary)
              </Text>

              <Text
                style={[
                  styles.bodyText,
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tDataVerticalCenter,
                ]}
              >
                {applicantDbmCsc.jobSummary}
              </Text>
            </View>
          </View>

          {/* ROW 14 */}
          <View style={[styles.borderAll]} wrap={false}>
            <View>
              <Text
                style={[
                  styles.bodyTextBold,
                  styles.tDataColored,
                  styles.borderBottom,
                ]}
              >
                21. QUALIFICATION STANDARDS
              </Text>

              <View style={[styles.tDataColored, styles.borderBottom]}>
                <View style={[styles.rowContainer]}>
                  <View style={[styles.w25]}>
                    <Text
                      style={[
                        styles.bodyTextBold,
                        styles.borderRight,
                        styles.horizontalCenter,
                      ]}
                    >
                      21a. Education
                    </Text>
                  </View>

                  <View style={[styles.w25]}>
                    <Text
                      style={[
                        styles.bodyTextBold,
                        styles.borderRight,
                        styles.horizontalCenter,
                      ]}
                    >
                      21b. Experience
                    </Text>
                  </View>

                  <View style={[styles.w25]}>
                    <Text
                      style={[
                        styles.bodyTextBold,
                        styles.borderRight,
                        styles.horizontalCenter,
                      ]}
                    >
                      21c. Training
                    </Text>
                  </View>

                  <View style={[styles.w25]}>
                    <Text
                      style={[styles.bodyTextBold, styles.horizontalCenter]}
                    >
                      21d. Eligibility
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                <View style={[styles.rowContainer]}>
                  <View
                    style={[
                      styles.w25,
                      styles.borderRight,
                      styles.tDataVerticalCenter,
                    ]}
                  >
                    <Text
                      style={[
                        styles.bodyText,
                        styles.horizontalCenter,
                        styles.verticalCenter,
                      ]}
                    >
                      {applicantDbmCsc.qualificationStandards.education}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.w25,
                      styles.borderRight,
                      styles.tDataVerticalCenter,
                    ]}
                  >
                    <Text
                      style={[
                        styles.bodyText,
                        styles.horizontalCenter,
                        styles.verticalCenter,
                      ]}
                    >
                      {applicantDbmCsc.qualificationStandards.experience}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.w25,
                      styles.borderRight,
                      styles.tDataVerticalCenter,
                    ]}
                  >
                    <Text
                      style={[
                        styles.bodyText,
                        styles.horizontalCenter,
                        styles.verticalCenter,
                      ]}
                    >
                      {applicantDbmCsc.qualificationStandards.training}
                    </Text>
                  </View>

                  <View style={[styles.w25, styles.tDataVerticalCenter]}>
                    <Text
                      style={[
                        styles.bodyText,
                        styles.horizontalCenter,
                        styles.verticalCenter,
                      ]}
                    >
                      {applicantDbmCsc.qualificationStandards.eligibility}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* ROW 15 */}
          <View>
            <View style={[styles.rowContainer, styles.borderAll]} wrap={false}>
              <View style={[styles.w75, styles.borderRight]}>
                <Text style={[styles.bodyTextBold, styles.tDataColored]}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;21e.
                  Core Competencies
                </Text>
              </View>
              <View style={[styles.w25]}>
                <Text
                  style={[
                    styles.bodyTextBold,
                    styles.tDataColored,
                    styles.horizontalCenter,
                  ]}
                >
                  Competency Level
                </Text>
              </View>
            </View>

            {renderCompetencies(applicantDbmCsc.competencies.core)}
          </View>

          {/* ROW 16 */}
          <View>
            <View style={[styles.rowContainer, styles.borderAll]} wrap={false}>
              <View style={[styles.w75, styles.borderRight]}>
                <Text style={[styles.bodyTextBold, styles.tDataColored]}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;21f.
                  Functional/Leadership Competencies
                </Text>
              </View>
              <View style={[styles.w25]}>
                <Text
                  style={[
                    styles.bodyTextBold,
                    styles.tDataColored,
                    styles.horizontalCenter,
                  ]}
                >
                  Competency Level
                </Text>
              </View>
            </View>

            {renderCompetencies(
              applicantDbmCsc.competencies.functionalManagerial
            )}
          </View>

          <View>
            {/* ROW 17 */}
            <View>
              <View style={[styles.rowContainer, styles.borderAll]}>
                <View style={[styles.w75, styles.borderRight]}>
                  <Text style={[styles.bodyTextBold, styles.tDataColored]}>
                    22. STATEMENT OF DUTIES AND RESPONSIBILITIES (Technical
                    Competencies)
                  </Text>
                </View>
                <View style={[styles.w25]}>
                  <Text
                    style={[
                      styles.bodyTextBold,
                      styles.tDataColored,
                      styles.horizontalCenter,
                    ]}
                  >
                    Competency Level
                  </Text>
                </View>
              </View>

              {/* Header */}
              <View style={[styles.rowContainer, styles.borderAll]}>
                <View style={[styles.w25, styles.borderRight]}>
                  <Text
                    style={[
                      styles.bodyTextItalic,
                      styles.horizontalCenter,
                      styles.verticalCenter,
                    ]}
                  >
                    Percentage of Work
                  </Text>
                </View>
                <View style={[styles.w50, styles.borderRight]}>
                  <Text
                    style={[
                      styles.bodyTextItalic,
                      styles.horizontalCenter,
                      styles.verticalCenter,
                    ]}
                  >
                    (State the duties and responsibilities here:)
                  </Text>
                </View>
                <View style={[styles.w25]}>
                  <Text
                    style={[
                      styles.bodyTextItalic,
                      styles.horizontalCenter,
                      styles.verticalCenter,
                    ]}
                  >
                    (Indicate the required Competency Level here)
                  </Text>
                </View>
              </View>

              {renderDuties(applicantDbmCsc.dutiesAndResponsibilities.core)}

              {/* Last row */}
              <View
                style={[styles.rowContainer, styles.borderAll]}
                wrap={false}
              >
                <View style={[styles.w25, styles.borderRight]}>
                  <Text
                    style={[
                      styles.bodyTextBold,
                      styles.horizontalCenter,
                      styles.verticalCenter,
                      { fontSize: 9.5 },
                    ]}
                  >
                    100%
                  </Text>
                </View>
                <View style={[styles.w50, styles.borderRight]}>
                  <Text></Text>
                </View>
                <View style={[styles.w25]}>
                  <Text></Text>
                </View>
              </View>
            </View>

            {/* ROW 18 */}
            <View style={[styles.borderAll]} wrap={false}>
              <View style={[styles.borderBottom]}>
                <View>
                  <Text style={[styles.tDataColored]}> </Text>
                </View>
              </View>

              <View style={[{ paddingTop: 5, paddingBottom: 25 }]}>
                <Text style={[styles.bodyText]}>
                  &nbsp;&nbsp; I have received a copy of this position
                  description. It has been discussed with me and I have frely
                  choosen to comply with the performance and behavior/conduct
                  expectations contained herein.
                </Text>
              </View>

              <View style={[styles.rowContainer, { paddingBottom: 3 }]}>
                <View style={[styles.w50]}>
                  <Text
                    style={[
                      styles.bodyTextBoldUppercase,
                      styles.horizontalCenter,
                      styles.verticalCenter,
                    ]}
                  >
                    {applicantDbmCsc.signatories.employee}
                  </Text>
                  <Text
                    style={[
                      styles.bodyTextBold,
                      styles.horizontalCenter,
                      styles.verticalCenter,
                      { paddingTop: 0 },
                    ]}
                  >
                    Employee&apos;s Name, Date and Signature
                  </Text>
                </View>
                <View style={[styles.w50]}>
                  <Text
                    style={[
                      styles.bodyTextBoldUppercase,
                      styles.horizontalCenter,
                      styles.verticalCenter,
                    ]}
                  >
                    {applicantDbmCsc.signatories.requestingEntity.employeeName}
                  </Text>
                  <Text
                    style={[
                      styles.bodyTextBold,
                      styles.horizontalCenter,
                      styles.verticalCenter,
                      { paddingTop: 0 },
                    ]}
                  >
                    {applicantDbmCsc.signatories.requestingEntity.positionTitle}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  )
}

PdDbmCscDocument.propTypes = {
  applicantDbmCsc: PropTypes.object.isRequired,
}
export default PdDbmCscDocument
