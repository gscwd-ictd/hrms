import React from "react"
import { Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer"

// Fonts
import TimesNewRomanRegular from "assets/fonts/uploads/times-new-roman-regular.ttf"
import TimesNewRomanBold from "assets/fonts/uploads/times-new-roman-bold.ttf"
import ArialBoldItalic from "assets/fonts/uploads/arial-bold-italic.ttf"

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "stretch",
  },

  // Field Styles
  headerText: {
    fontFamily: "TimesNewRomanRegular",
    fontSize: 12,
    marginVertical: "auto",
  },
  documentCodeText: {
    fontFamily: "ArialBoldItalic",
  },
  textBold: {
    fontFamily: "TimesNewRomanBold",
  },
  horizontalCenter: { textAlign: "center" },

  // Width Styles
  w50: { width: "50%" },
  w25: { width: "25%" },
})

Font.register({
  family: "ArialBoldItalic",
  src: ArialBoldItalic,
})

Font.register({
  family: "TimesNewRomanRegular",
  src: TimesNewRomanRegular,
})

Font.register({
  family: "TimesNewRomanBold",
  src: TimesNewRomanBold,
})

const Header = () => {
  return (
    <View style={[styles.rowContainer]}>
      {/* DOCUMENT CODE */}
      <View style={[styles.w25]}>
        <Text style={[styles.documentCodeText, { fontSize: 11 }]}>
          CS Form No. 33-B
        </Text>
        <Text style={[styles.documentCodeText, { fontSize: 10 }]}>
          Revised 2018
        </Text>
      </View>

      {/* CENTER TEXT */}
      <View
        style={[
          styles.w50,
          styles.headerText,
          styles.horizontalCenter,
          { paddingTop: 28 },
        ]}
      >
        <Text>Republic of the Philippines</Text>
        <Text style={[styles.textBold, { paddingTop: 2 }]}>
          GENERAL SANTOS CITY WATER DISTRICT
        </Text>
        <Text style={[{ paddingTop: 2 }]}>
          E. Fernandez St., Lagao, General Santos City
        </Text>
      </View>

      {/* ISO Document Code */}
      <View style={[styles.w25]}></View>
    </View>
  )
}
export default Header
