import React, { useState } from "react"
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer"
import ArialRegular from "assets/fonts/uploads/arial.ttf"
import ArialNarrow from "assets/fonts/uploads/arial-narrow.ttf"
import ArialNarrowItalic from "assets/fonts/uploads/arial-narrow-italic.ttf"
import ArialNarrowBold from "assets/fonts/uploads/arial-narrow-bold.ttf"
import ArialNarrowBoldItalic from "assets/fonts/uploads/arial-narrow-bold-italic.ttf"
import PropTypes from "prop-types"

const styles = StyleSheet.create({
  sectionTitleContainer: {
    backgroundColor: "#969696",
    padding: 1.5,
  },
  sectionTitleText: {
    color: "#ffffff",
    fontFamily: "ArialNarrowBoldItalic",
    fontSize: 9.2,
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
    padding: "4 8",
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
  w46_2: { width: "46.2%" },
  w29_8: { width: "29.8%" },
  w18: { width: "18%" },
  w6: { width: "6%" },
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

const VoluntaryWorkPdf = props => {
  const { voluntaryWork, formatDate } = props
  const [emptyVoluntaryWorkRows, setEmptyVoluntaryWorkRows] = useState(7)

  const renderVoluntaryWorkRows = () => {
    var content = voluntaryWork.slice(0, 7).map((voluntaryWork, index) => (
      <View
        style={[
          styles.borderTop,
          { flexDirection: "row", alignItems: "stretch" },
        ]}
        key={index}
      >
        {/* Name & Address of Org */}
        <View
          style={[
            styles.inputValue,
            styles.borderRight,
            styles.horizontalCenter,
            styles.w46_2,
            { flexDirection: "row" },
          ]}
        >
          <Text>{voluntaryWork.organizationName || "N/A"}</Text>
        </View>

        {/* Inclusive Dates */}
        <View
          style={[
            styles.horizontalCenter,
            styles.borderRight,
            styles.inputValue,
            styles.w18,
            { padding: "0", flexDirection: "row" },
          ]}
        >
          <View
            style={[styles.w50, styles.horizontalCenter, styles.borderRight]}
          >
            <Text style={[styles.verticalCenter, { padding: "3 0" }]}>
              {formatDate(voluntaryWork.from) || "N/A"}
            </Text>
          </View>
          <View style={[styles.w50, styles.horizontalCenter]}>
            <View style={[styles.verticalCenter, { padding: "3 0" }]}>
              <Text>{formatDate(voluntaryWork.to) || "N/A"}</Text>
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
            <Text>{voluntaryWork.numberOfHours || "N/A"}</Text>
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
            <Text>{voluntaryWork.position || "N/A"}</Text>
          </View>
        </View>
      </View>
    ))

    return content
  }

  const renderEmptyVoluntaryWorkRows = () => {
    let content = []
    const rowToRender = emptyVoluntaryWorkRows - voluntaryWork.length

    for (let i = 0; i < rowToRender; i++) {
      content.push(
        <View
          style={[
            styles.borderTop,
            { flexDirection: "row", alignItems: "stretch" },
          ]}
          key={i}
        >
          {/* Name & Address of Org */}
          <View
            style={[
              styles.inputValue,
              styles.borderRight,
              styles.horizontalCenter,
              styles.w46_2,
              { flexDirection: "row" },
            ]}
          >
            <Text>N/A</Text>
          </View>

          {/* Inclusive Dates */}
          <View
            style={[
              styles.horizontalCenter,
              styles.borderRight,
              styles.inputValue,
              styles.w18,
              { padding: "0", flexDirection: "row" },
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
              <Text>N/A</Text>
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
              <Text>N/A</Text>
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
          VI. VOLUNTARY WORK OR INVOLVEMENT IN CIVIC / NON-GOVERNMENT / PEOPLE /
          VOLUNTARY ORGANIZATION/S
        </Text>
      </View>

      {/* Voluntary Work header */}
      <View
        style={[
          styles.borderTop,
          { flexDirection: "row", alignItems: "stretch" },
        ]}
      >
        {/* Name & Address of Org */}
        <View
          style={[
            styles.inputKey,
            styles.borderRight,
            styles.horizontalCenter,
            styles.w46_2,
            { flexDirection: "row" },
          ]}
        >
          <Text style={[styles.verticalCenter]}>29.</Text>
          <View
            style={[
              styles.verticalCenter,
              styles.horizontalCenter,
              { padding: "3 10", width: "100%" },
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
            { padding: "0" },
          ]}
        >
          <View style={[styles.w100, { textAlign: "center", padding: "4" }]}>
            <Text>INCLUSIVE DATES</Text>
            <Text>(mm/dd/yyyy)</Text>
          </View>

          <View style={[styles.borderTop, { flexDirection: "row" }]}>
            <View
              style={[styles.w50, styles.horizontalCenter, styles.borderRight]}
            >
              <Text style={[styles.verticalCenter, { padding: "3 0" }]}>
                From
              </Text>
            </View>
            <View style={[styles.w50, styles.horizontalCenter]}>
              <View style={[styles.verticalCenter, { padding: "3 0" }]}>
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
            <Text style={{ fontSize: 5.7 }}>NUMBER OF HOURS</Text>
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

      {renderVoluntaryWorkRows()}

      {voluntaryWork.length < 28 ? <>{renderEmptyVoluntaryWorkRows()}</> : null}

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

VoluntaryWorkPdf.propTypes = {
  voluntaryWork: PropTypes.arrayOf(
    PropTypes.shape({
      organizationName: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string,
      numberOfHours: PropTypes.number,
      position: PropTypes.string,
    })
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default VoluntaryWorkPdf
