import React, { useState } from "react"
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer"
import ArialRegular from "assets/fonts/uploads/arial.ttf"
import ArialNarrow from "assets/fonts/uploads/arial-narrow.ttf"
import ArialNarrowItalic from "assets/fonts/uploads/arial-narrow-italic.ttf"
import ArialNarrowBold from "assets/fonts/uploads/arial-narrow-bold.ttf"
import ArialNarrowBoldItalic from "assets/fonts/uploads/arial-narrow-bold-italic.ttf"
import PropTypes from "prop-types"

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: "row",
  },
  sectionTitleContainer: {
    backgroundColor: "#969696",
    padding: 1.5,
  },
  sectionTitleText: {
    color: "#ffffff",
    fontFamily: "ArialNarrowBoldItalic",
    fontSize: 9.2,
  },
  sectionSubtitleText: {
    color: "#ffffff",
    fontFamily: "ArialNarrowBoldItalic",
    fontSize: 6.5,
    paddingTop: 2,
  },

  // Field Styles
  inputKey: {
    backgroundColor: "#EAEAEA",
    fontFamily: "Arial",
    fontWeight: 100,
    fontSize: 6.7,
    padding: "3.5 5",
  },
  inputValue: {
    fontFamily: "Arial",
    fontWeight: 100,
    fontSize: 6.7,
    padding: "5.5 8",
  },
  inputAddressKey: {
    fontFamily: "Arial",
    fontWeight: 100,
    fontStyle: "italic",
    fontSize: 6.7,
    padding: "0 8",
  },
  warningText: {
    fontFamily: "ArialNarrowBoldItalic",
    textAlign: "center",
    fontSize: 6.7,
    color: "red",
  },
  verticalCenter: { margin: "auto 0" },
  horizontalCenter: { textAlign: "center" },

  // Border Styles
  borderTop: {
    borderTop: "1px solid #000000",
  },
  borderRight: {
    borderRight: "1px solid #000000",
  },

  // Width Styles
  w100: { width: "100%" },
  w50: { width: "50%" },
  w34: { width: "34%" },
  w21_8: { width: "21.8%" },
  w15_1: { width: "15.1%" },
  w14: { width: "14%" },
})

Font.register({
  family: "Arial",
  fonts: [
    { src: ArialRegular },
    { src: ArialNarrow, fontWeight: 100 },
    { src: ArialNarrowBold, fontWeight: 500 },
    { src: ArialNarrowItalic, fontWeight: 100, fontStyle: "italic" },
  ],
})

Font.register({
  family: "ArialNarrowBoldItalic",
  src: ArialNarrowBoldItalic,
})

Font.registerHyphenationCallback(word => [word])

const EligibilityPdf = props => {
  const { formatDate, eligibilityInfo } = props
  const [emptyEligibilityRows, setEmptyEligibilityRows] = useState(7)

  const renderEligibilityRows = () => {
    var content = eligibilityInfo.slice(0, 7).map((eligibility, index) => (
      <View
        style={[
          styles.borderTop,
          { flexDirection: "row", alignItems: "stretch" },
        ]}
        key={index}
      >
        {/* Eligibility Name */}
        <View
          style={[
            styles.inputValue,
            styles.borderRight,
            styles.w34,
            { flexDirection: "row" },
          ]}
        >
          <Text style={[styles.verticalCenter]}>
            {eligibility.name || "N/A"}
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
            {eligibility.rating || "N/A"}
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
            <Text>{eligibility.examDate || "N/A"}</Text>
          </View>
        </View>

        {/* Place of examination */}
        <View
          style={[
            styles.borderRight,
            styles.inputValue,
            styles.horizontalCenter,
            styles.w21_8,
            { padding: "0 2" },
          ]}
        >
          <View style={[styles.verticalCenter]}>
            <Text>{eligibility.examPlace || "N/A"}</Text>
          </View>
        </View>

        {/* License */}
        <View
          style={[
            styles.inputValue,
            styles.w14,
            { padding: 0, flexDirection: "row" },
          ]}
        >
          <View
            style={[styles.w50, styles.horizontalCenter, styles.borderRight]}
          >
            <Text style={[styles.verticalCenter, { padding: "3 0" }]}>
              {eligibility.licenseNumber || "N/A"}
            </Text>
          </View>
          <View style={[styles.w50, styles.horizontalCenter]}>
            <View style={[styles.verticalCenter, { padding: "3 0" }]}>
              <Text>{formatDate(eligibility.validity) || "N/A"}</Text>
            </View>
          </View>
        </View>
      </View>
    ))

    return content
  }

  const renderEmptyEligibilityRows = () => {
    let content = []
    const rowToRender = emptyEligibilityRows - eligibilityInfo.length

    for (let i = 0; i < rowToRender; i++) {
      content.push(
        <View
          style={[
            styles.borderTop,
            { flexDirection: "row", alignItems: "stretch" },
          ]}
          key={i}
        >
          {/* Eligibility Name */}
          <View
            style={[
              styles.inputValue,
              styles.borderRight,
              styles.w34,
              { flexDirection: "row" },
            ]}
          >
            <Text style={[styles.verticalCenter]}>N/A</Text>
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
            <Text style={[styles.verticalCenter]}>N/A</Text>
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
              <Text>N/A</Text>
            </View>
          </View>

          {/* Place of examination */}
          <View
            style={[
              styles.borderRight,
              styles.inputValue,
              styles.horizontalCenter,
              styles.w21_8,
              { padding: "0 2" },
            ]}
          >
            <View style={[styles.verticalCenter]}>
              <Text>N/A</Text>
            </View>
          </View>

          {/* License */}
          <View
            style={[
              styles.inputValue,
              styles.w14,
              { padding: 0, flexDirection: "row" },
            ]}
          >
            <View
              style={[styles.w50, styles.horizontalCenter, styles.borderRight]}
            >
              <Text style={[styles.verticalCenter, { padding: "3 0" }]}>
                N/A
              </Text>
            </View>
            <View style={[styles.w50, styles.horizontalCenter]}>
              <View style={[styles.verticalCenter, { padding: "3 0" }]}>
                <Text>N/A</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }
    return content
  }

  return (
    <View>
      <View style={[styles.sectionTitleContainer]}>
        <Text style={styles.sectionTitleText}>
          IV. CIVIL SERVICE ELIGIBILITY
        </Text>
      </View>

      {/* Eligiblity Header */}
      <View
        style={[
          styles.borderTop,
          { flexDirection: "row", alignItems: "stretch" },
        ]}
      >
        {/* Eligibility Name */}
        <View
          style={[
            styles.inputKey,
            styles.borderRight,
            styles.horizontalCenter,
            styles.w34,
            { flexDirection: "row" },
          ]}
        >
          <Text style={[styles.verticalCenter]}>27.</Text>
          <View
            style={[
              styles.verticalCenter,
              styles.horizontalCenter,
              { padding: "3 10", width: "100%" },
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
            { padding: "0 2" },
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
            { padding: "0" },
          ]}
        >
          <View style={[{ margin: "auto 0", padding: "6 1" }]}>
            <Text>LICENSE (if applicable)</Text>
          </View>

          <View style={[styles.borderTop, { flexDirection: "row" }]}>
            <View
              style={[styles.w50, styles.horizontalCenter, styles.borderRight]}
            >
              <Text style={[styles.verticalCenter, { padding: "3 0" }]}>
                NUMBER
              </Text>
            </View>
            <View style={[styles.w50, styles.horizontalCenter]}>
              <View style={[styles.verticalCenter, { padding: "3 0" }]}>
                <Text>Date of</Text>
                <Text>Validity</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Eligiblities */}
      {renderEligibilityRows()}

      {eligibilityInfo.length < 7 ? <>{renderEmptyEligibilityRows()}</> : null}

      <View style={[styles.borderTop]}>
        <View style={[styles.inputKey, styles.w100, { padding: "1 0" }]}>
          <Text style={styles.warningText}>
            (Continue on separate sheet if necessary)
          </Text>
        </View>
      </View>
    </View>
  )
}

EligibilityPdf.propTypes = {
  eligibilityInfo: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.string,
      examDate: PropTypes.string,
      examPlace: PropTypes.string,
      licenseNumber: PropTypes.string,
      validity: PropTypes.string,
    })
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default EligibilityPdf
