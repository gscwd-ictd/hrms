import React from "react"
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer"

// Fonts
import CalibriRegularBold from "../../../assets/fonts/uploads/calibri-regular-bold.ttf"
import CalibriRegularItalic from "../../../assets/fonts/uploads/calibri-regular-italic.ttf"

Font.register({
  family: "CalibriRegularItalic",
  src: CalibriRegularItalic,
})

Font.register({
  family: "CalibriRegularBold",
  src: CalibriRegularBold,
})

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 10,
  },
  headerText: {
    fontFamily: "CalibriRegularBold",
    fontSize: 11,
    padding: 1,
    marginVertical: "auto",
  },
  leftText: {
    fontFamily: "CalibriRegularBold",
    fontSize: 9,
    padding: "5 0 0 10",
    textAlign: "left",
  },
  rightText: {
    fontFamily: "CalibriRegularItalic",
    fontSize: 9,
    padding: "5 0 0 22",
    textAlign: "center",
  },
  horizontalCenter: { textAlign: "center" },

  // Width Styles
  w50: { width: "50%" },
  w25: { width: "25%" },
})

const Header = () => {
  return (
    <View style={[styles.rowContainer]}>
      {/* Logo */}
      <View style={[styles.w25, styles.leftText]}>
        <Text>CS Form No. 9</Text>
        <Text>Series of 2017</Text>
      </View>

      {/* Center Text */}
      <View style={[styles.w50, styles.headerText, styles.horizontalCenter]}>
        <Text>Republic of the Philippines</Text>
        <Text style={[styles.arialSemiBold]}>
          GENERAL SANTOS CITY WATER DISTRICT
        </Text>
        <Text>Request for Publication of Vacant Positions</Text>
      </View>

      {/* ISO Document Code */}
      <View style={[styles.w25, styles.rightText]}>
        <Text>Electronic copy to be submitted to the CSC FO</Text>
        <Text>must be in MS Excel Format</Text>
      </View>
    </View>
  )
}
export default Header
