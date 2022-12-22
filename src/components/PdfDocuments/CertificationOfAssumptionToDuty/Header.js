import React from "react"
import { Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer"

// Fonts
import CalibriRegular from "assets/fonts/uploads/calibri-regular.ttf"
import CalibriRegularBold from "assets/fonts/uploads/calibri-regular-bold.ttf"

// Logo
import GSCWDLogo from "assets/images/main_logo_transparent.png"

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  logo: {
    width: 70,
    height: 70,
    margin: "auto",
  },

  // Border Styles
  bodyBorder: {
    margin: 10,
    border: "2px solid #000000",
  },
  borderTop: {
    borderTop: "1px solid #000000",
  },
  borderRight: {
    borderRight: "1px solid #000000",
  },

  // Field Styles
  headerText: {
    fontFamily: "CalibriRegular",
    fontSize: 11,
    marginVertical: "auto",
  },
  textBold: {
    fontFamily: "CalibriRegularBold",
  },
  verticalCenter: { margin: "auto 0" },
  horizontalCenter: { textAlign: "center" },

  // Width Styles
  w100: { width: "100%" },
  w50: { width: "50%" },
  w25: { width: "25%" },
})

Font.register({
  family: "CalibriRegular",
  src: CalibriRegular,
})

Font.register({
  family: "CalibriRegularBold",
  src: CalibriRegularBold,
})

const Header = () => {
  return (
    <View style={[styles.rowContainer]}>
      {/* Logo */}
      <View style={[styles.w25, { padding: "10 0 0 15" }]}>
        <Image src={GSCWDLogo} style={[styles.logo]} />
      </View>

      {/* Center Text */}
      <View style={[styles.w50, styles.headerText, styles.horizontalCenter]}>
        <Text style={[styles.textBold]}>Republic of the Philippines</Text>
        <Text
          style={[
            styles.textBold,
            { fontSize: 16, color: "#1E79AC", paddingTop: 1 },
          ]}
        >
          GENERAL SANTOS CITY WATER DISTRICT
        </Text>
        <Text style={[styles.textBold, { paddingTop: 1 }]}>
          E. Fernandez St., Brgy. Lagao, General Santos City
        </Text>
        <Text style={[{ paddingTop: 1 }]}>
          Telephone No.: 552-3824; Telefax No.: 553-4960
        </Text>
        <Text style={[{ paddingTop: 1 }]}>
          Email Address: gscwaterdistrict@yahoo.com
        </Text>
      </View>

      {/* ISO Document Code */}
      <View style={[styles.w25]}></View>
    </View>
  )
}
export default Header
