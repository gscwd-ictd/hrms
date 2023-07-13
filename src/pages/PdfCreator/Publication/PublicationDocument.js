import React from 'react'
import PropTypes from 'prop-types'

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import Header from 'components/PdfDocuments/Publication/Header'

// Fonts
import CalibriRegular from '../../../assets/fonts/uploads/calibri-regular.ttf'
import CalibriRegularBold from '../../../assets/fonts/uploads/calibri-regular-bold.ttf'
import CalibriRegularBoldItalic from '../../../assets/fonts/uploads/calibri-bold-italic.ttf'

export const chunkSubstr = (str, size) => {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }

  return chunks
}

function breakPlaceOfAssignment(word) {
  if (word.length > 5) {
    return chunkSubstr(word, 10)
  } else {
    return [word]
  }
}

Font.register({
  family: 'CalibriRegular',
  src: CalibriRegular,
})

Font.register({
  family: 'CalibriRegularBold',
  src: CalibriRegularBold,
})

Font.register({
  family: 'CalibriRegularBoldItalic',
  src: CalibriRegularBoldItalic,
})

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 5,
  },
  bodyBorder: {
    marginTop: 5,
    marginBottom: 8,
    marginHorizontal: 8,
  },

  // Table Styles
  tableBorder: {
    border: '1px solid #000000',
  },
  rowContainerTable: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tableHeader: {},
  tableData: {},

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

  // Container Styles
  sectionOne: {
    fontFamily: 'CalibriRegular',
    fontSize: 10,
  },
  sectionTwo: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  sectionTwoHeader: {
    fontFamily: 'CalibriRegularBold',
    fontSize: 10,
  },
  sectionThree: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  // Field Styles
  bodyText: {
    fontFamily: 'CalibriRegular',
    fontSize: 10,
  },
  bodyTextBold: {
    fontFamily: 'CalibriRegularBold',
    fontSize: 10,
  },
  tableBodyText: {
    fontFamily: 'CalibriRegular',
    fontSize: 8.5,
  },
  tableBodyTextBold: {
    fontFamily: 'CalibriRegularBold',
    fontSize: 8.5,
  },
  tableBodyCompetencyText: {
    fontFamily: 'CalibriRegular',
    fontSize: 7,
  },
  tableBodyCompetencyTextBold: {
    fontFamily: 'CalibriRegularBold',
    textDecoration: 'underline',
    fontSize: 7,
  },
  hrTagLineText: {
    fontFamily: 'CalibriRegularBoldItalic',
    fontSize: 14,
  },
  reminderText: {
    fontFamily: 'CalibriRegularBold',
    fontSize: 12,
    color: '#ff0000',
    paddingTop: 5,
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  signatoryName: {
    fontFamily: 'CalibriRegularBold',
    textTransform: 'uppercase',
    paddingTop: 3,
  },

  verticalCenter: { margin: 'auto 0' },
  horizontalCenter: { textAlign: 'center' },
  signature: {
    width: 100,
    marginHorizontal: 'auto',
  },

  // Width Styles
  w100: { width: '100%' },
  w90: { width: '90%' },
  w80: { width: '80%' },
  w75: { width: '75%' },
  w70: { width: '70%' },
  w59: { width: '59%' },
  w50: { width: '50%' },
  w46: { width: '46%' },
  w40: { width: '40%' },
  w30: { width: '30%' },
  w20: { width: '20%' },
  w13: { width: '13%' },
  w12: { width: '12%' },
  w12_5: { width: '12.5%' },
  w10: { width: '10%' },
  w7: { width: '7%' },
  w6_5: { width: '6.5%' },
  w6: { width: '6%' },
  w5_5: { width: '5.5%' },
  w2_5: { width: '2.5%' },
})

const PublicationDocument = props => {
  const { publicationDocumentDetails, prfTrail, formatDate } = props

  const renderFunctionalCompetencies = index => {
    var content = publicationDocumentDetails[index].competencies.functional.map(
      (competency, competencyIndex) => (
        <View style={[styles.tableBodyCompetencyText]} key={competencyIndex}>
          <View
            style={[
              styles.verticalCenter,
              styles.horizontalCenter,
              { paddingHorizontal: 4, paddingVertical: 2 },
            ]}
          >
            <Text>
              <Text style={[{ textTransform: 'uppercase' }]}>
                {competency.name} -{' '}
              </Text>
              <Text>{competency.description}</Text>
            </Text>

            <Text style={[styles.tableBodyCompetencyTextBold]}>
              Competency Level: {competency.level}
            </Text>
          </View>
        </View>
      )
    )

    return content
  }

  const renderManagerialCompetencies = index => {
    var content = publicationDocumentDetails[index].competencies.managerial.map(
      (competency, competencyIndex) => (
        <View style={[styles.tableBodyCompetencyText]} key={competencyIndex}>
          <View
            style={[
              styles.verticalCenter,
              styles.horizontalCenter,
              { paddingHorizontal: 4, paddingVertical: 2 },
            ]}
          >
            <Text>
              <Text style={[{ textTransform: 'uppercase' }]}>
                {competency.name} -{' '}
              </Text>
              <Text>{competency.description}</Text>
            </Text>

            <Text style={[styles.tableBodyCompetencyTextBold]}>
              Competency Level: {competency.level}
            </Text>
          </View>
        </View>
      )
    )

    return content
  }

  return (
    <Document
      author="General Santos City Water District"
      subject="CS Form No. 9 | Series of 2017"
      title="Publication"
    >
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Header />

        <View style={[styles.bodyBorder, styles.bodyText]}>
          {/* DETAILS BEFORE TABLE */}
          <View style={[styles.sectionOne]}>
            <Text style={[styles.bodyTextBold]}>
              To: CIVIL SERVICE COMMISSION (CSC)
            </Text>
            <Text style={[{ marginLeft: 20 }]}>
              This is to request the publication of the following vacant
              positions of{' '}
              <Text
                style={[styles.bodyTextBold, { textDecoration: 'underline' }]}
              >
                General Santos City Water District
              </Text>{' '}
              in the CSC website:
            </Text>
          </View>
          <View style={[styles.sectionTwo]}>
            <View style={[styles.w50]}></View>
            <View
              style={[
                styles.w50,
                styles.horizontalCenter,
                styles.sectionTwoHeader,
              ]}
            >
              <Text style={[styles.upperCase]}>{prfTrail.gm.name}</Text>
              <Text
                style={[styles.borderTop, styles.bodyText, { paddingTop: 3 }]}
              >
                (Head of Agency)
              </Text>
            </View>
          </View>
          <View style={[styles.sectionThree]}>
            <View style={[styles.w50]}></View>
            <View
              style={[
                styles.w50,
                { flexDirection: 'row', alignItems: 'stretch' },
              ]}
            >
              <Text>Date:</Text>
              <View style={[styles.w100, { paddingRight: 25 }]}>
                <Text
                  style={[
                    styles.bodyTextBold,
                    styles.upperCase,
                    styles.borderBottom,
                    styles.w30,
                    styles.horizontalCenter,
                    { marginHorizontal: 'auto' },
                  ]}
                >
                  {formatDate(prfTrail.gm.updatedAt)}
                </Text>
              </View>
            </View>
          </View>

          {/* TABLE */}
          <View style={[styles.tableBorder, styles.tableBodyText]}>
            {/* TABLE HEADER */}
            <View style={[styles.rowContainerTable]}>
              <View
                style={[styles.tableHeader, styles.borderRight, styles.w2_5]}
              >
                <Text
                  style={[
                    styles.verticalCenter,
                    styles.horizontalCenter,
                    { paddingHorizontal: 2 },
                  ]}
                >
                  No.
                </Text>
              </View>

              <View
                style={[styles.tableHeader, styles.borderRight, styles.w12]}
              >
                <Text
                  style={[
                    styles.verticalCenter,
                    styles.horizontalCenter,
                    { paddingHorizontal: 2 },
                  ]}
                >
                  Position Title
                </Text>
              </View>

              <View style={[styles.tableHeader, styles.borderRight, styles.w7]}>
                <Text
                  style={[
                    styles.verticalCenter,
                    styles.horizontalCenter,
                    { paddingHorizontal: 2 },
                  ]}
                >
                  Plantilla Item No.
                </Text>
              </View>

              <View style={[styles.tableHeader, styles.borderRight, styles.w7]}>
                <Text
                  style={[
                    styles.verticalCenter,
                    styles.horizontalCenter,
                    { paddingHorizontal: 2 },
                  ]}
                >
                  {'Salary Job/\n Pay Grade'}
                </Text>
              </View>

              <View style={[styles.tableHeader, styles.borderRight, styles.w6]}>
                <Text
                  style={[
                    styles.verticalCenter,
                    styles.horizontalCenter,
                    { paddingHorizontal: 2 },
                  ]}
                >
                  {'Annual \nSalary'}
                </Text>
              </View>

              {/* Qualification Header */}
              <View style={[styles.borderRight, styles.w59]}>
                <View style={[styles.tableHeader]}>
                  <Text
                    style={[
                      styles.verticalCenter,
                      styles.horizontalCenter,
                      { paddingTop: 2 },
                    ]}
                  >
                    Qualification Standards
                  </Text>
                </View>
                <View style={[styles.rowContainerTable, styles.borderTop]}>
                  <View
                    style={[
                      styles.borderRight,
                      styles.w12_5,
                      { paddingTop: 2 },
                    ]}
                  >
                    <Text
                      style={[styles.verticalCenter, styles.horizontalCenter]}
                    >
                      Education
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.borderRight,
                      styles.w12_5,
                      { paddingTop: 2 },
                    ]}
                  >
                    <Text
                      style={[styles.verticalCenter, styles.horizontalCenter]}
                    >
                      Training
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.borderRight,
                      styles.w12_5,
                      { paddingTop: 2 },
                    ]}
                  >
                    <Text
                      style={[styles.verticalCenter, styles.horizontalCenter]}
                    >
                      Experience
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.borderRight,
                      styles.w12_5,
                      { paddingTop: 2 },
                    ]}
                  >
                    <Text
                      style={[styles.verticalCenter, styles.horizontalCenter]}
                    >
                      Eligibility
                    </Text>
                  </View>

                  <View style={[styles.w50, { paddingTop: 2 }]}>
                    <Text
                      style={[styles.verticalCenter, styles.horizontalCenter]}
                    >
                      Competency
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[styles.tableHeader, styles.w6_5]}>
                <Text style={[styles.verticalCenter, styles.horizontalCenter]}>
                  {'Place of \n Assignment'}
                </Text>
              </View>
            </View>

            {/* TABLE BODY */}
            {publicationDocumentDetails.map((position, index) => (
              <View
                style={[styles.rowContainerTable, styles.borderTop]}
                key={index}
              >
                {/* NO */}
                <View
                  style={[styles.tableHeader, styles.borderRight, styles.w2_5]}
                >
                  <Text
                    style={[
                      styles.verticalCenter,
                      styles.horizontalCenter,
                      { paddingHorizontal: 2 },
                    ]}
                  >
                    {index + 1}
                  </Text>
                </View>

                {/* POSITION TITLE */}
                <View
                  style={[styles.tableHeader, styles.borderRight, styles.w12]}
                >
                  <Text
                    style={[
                      styles.verticalCenter,
                      styles.horizontalCenter,
                      styles.tableBodyTextBold,
                      { paddingHorizontal: 2 },
                    ]}
                  >
                    {position.positionTitle}
                  </Text>
                </View>

                {/* ITEM NO. */}
                <View
                  style={[styles.tableHeader, styles.borderRight, styles.w7]}
                >
                  <Text
                    style={[
                      styles.verticalCenter,
                      styles.horizontalCenter,
                      { paddingHorizontal: 2 },
                    ]}
                  >
                    {position.itemNumber}
                  </Text>
                </View>

                {/* SALARY GRADE */}
                <View
                  style={[styles.tableHeader, styles.borderRight, styles.w7]}
                >
                  <Text
                    style={[
                      styles.verticalCenter,
                      styles.horizontalCenter,
                      { paddingHorizontal: 2 },
                    ]}
                  >
                    {position.salaryGrade}
                  </Text>
                </View>

                {/* ANNUAL SALARY */}
                <View
                  style={[styles.tableHeader, styles.borderRight, styles.w6]}
                >
                  <Text
                    style={[
                      styles.verticalCenter,
                      styles.horizontalCenter,
                      { paddingHorizontal: 2 },
                    ]}
                  >
                    {position.annualSalary}
                  </Text>
                </View>

                {/* Qualification Standards */}
                <View style={[styles.rowContainerTable, styles.w59]}>
                  {/* EDUCATION */}
                  <View style={[styles.borderRight, styles.w12_5]}>
                    <Text
                      style={[
                        styles.verticalCenter,
                        styles.horizontalCenter,
                        { paddingHorizontal: 2 },
                      ]}
                    >
                      {position.education || 'N/A'}
                    </Text>
                  </View>

                  {/* TRAINING */}
                  <View style={[styles.borderRight, styles.w12_5]}>
                    <Text
                      style={[
                        styles.verticalCenter,
                        styles.horizontalCenter,
                        { paddingHorizontal: 2 },
                      ]}
                    >
                      {position.training || 'N/A'}
                    </Text>
                  </View>

                  {/* EXPERIENCE */}
                  <View style={[styles.borderRight, styles.w12_5]}>
                    <Text
                      style={[
                        styles.verticalCenter,
                        styles.horizontalCenter,
                        { paddingHorizontal: 2 },
                      ]}
                    >
                      {position.experience || 'N/A'}
                    </Text>
                  </View>

                  {/* ELIGIBILITY */}
                  <View style={[styles.borderRight, styles.w12_5]}>
                    <Text
                      style={[
                        styles.verticalCenter,
                        styles.horizontalCenter,
                        { paddingHorizontal: 2 },
                      ]}
                    >
                      {position.eligibility || 'N/A'}
                    </Text>
                  </View>

                  {/* COMPETENCY */}
                  <View style={[styles.borderRight, styles.w50]}>
                    {renderFunctionalCompetencies(index)}
                    {renderManagerialCompetencies(index)}
                  </View>
                </View>

                {/* PLACE OF ASSIGNMENT */}
                <View style={[styles.tableHeader, styles.w6_5]}>
                  <Text
                    style={[
                      styles.verticalCenter,
                      styles.horizontalCenter,
                      {
                        textTransform: 'uppercase',
                        textOverflow: 'ellipsis',
                        marginHorizontal: 3,
                      },
                    ]}
                    hyphenationCallback={e => breakPlaceOfAssignment(e)}
                  >
                    {position.placeOfAssignment || 'N/A'}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* DETAILS AFTER TABLE */}
          <View>
            <View style={[styles.rowContainer]}>
              <Text>
                Interested and qualified applicants should signify their
                interest in writing. Attach the following documents to the
                application letter and send to the address below not later than
              </Text>
              <View style={[styles.borderBottom, styles.w6_5]}></View>
            </View>
            <View style={[{ paddingTop: 3, paddingLeft: 6 }]}>
              <Text>
                1. Fully accomplished Personal Data Sheet (PDS) with recent
                passport-sized picture (CS Form No. 212, Revised 2017) which can
                be downloaded ar www.csc.gov.ph;
              </Text>
              <Text>
                2. Performance rating in the present position for one (1) year
                (if applicable);
              </Text>
              <Text>
                3. Photocopy of certificate of eligibility/rating/license; and
              </Text>
              <Text>4. Photocopy of Transcript of Records.</Text>
            </View>

            <View style={[styles.rowContainer]}>
              {/* QUALIFIED APPLICANTS */}
              <View style={[styles.w50, { paddingTop: 10 }]}>
                <View>
                  <Text>
                    <Text style={[styles.upperCase, styles.bodyTextBold]}>
                      QUALIFIED APPLICANTS
                    </Text>{' '}
                    are advised to hand in or send through courier/email theri
                    application to
                  </Text>
                </View>

                <View style={[styles.w46, { paddingLeft: 6 }]}>
                  <Text
                    style={[
                      styles.borderBottom,
                      styles.upperCase,
                      styles.bodyTextBold,
                      { paddingTop: 2 },
                    ]}
                  >
                    {prfTrail.gm.name}
                  </Text>
                  <Text style={[styles.borderBottom, { paddingTop: 2 }]}>
                    {prfTrail.gm.position}
                  </Text>
                  <Text style={[styles.borderBottom, { paddingTop: 2 }]}>
                    E. Fernandez St., Lagao, General Santos City
                  </Text>
                  <Text style={[styles.borderBottom, { paddingTop: 2 }]}>
                    hrd_gscwd@yahoo.com
                  </Text>
                </View>
              </View>

              {/* TAGLINE */}
              <View style={[styles.w50]}>
                <View
                  style={[
                    styles.horizontalCenter,
                    styles.verticalCenter,
                    styles.hrTagLineText,
                  ]}
                >
                  <Text>
                    GSCWD values diversity in its workforce and encourages
                  </Text>
                  <Text>
                    qualified women and men to apply regardless of religion,
                    sex,
                  </Text>
                  <Text>gender, or physical disability</Text>
                </View>

                <View>
                  <Text style={[styles.reminderText]}>
                    APPLICATIONS WITH INCOMPLETE DOCUMENTS SHALL NOT BE
                    ENTERTAINED.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

PublicationDocument.propTypes = {
  publicationDocumentDetails: PropTypes.array.isRequired,
  prfTrail: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
}
export default PublicationDocument
