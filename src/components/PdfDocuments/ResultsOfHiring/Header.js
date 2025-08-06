import React from 'react'
import { Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer'

// Fonts
import ArialRegular from 'assets/fonts/uploads/arial-regular.ttf'
import ArialSemiBold from 'assets/fonts/uploads/arial.ttf'
import CalibriRegular from 'assets/fonts/uploads/calibri-regular.ttf'

// Logo
import GSCWDLogo from 'assets/images/main_logo_transparent.png'

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  logo: {
    width: 70,
    height: 70,
    margin: 'auto',
  },

  // Field Styles
  headerText: {
    fontFamily: 'ArialRegular',
    fontSize: 9,
    padding: 1,
    marginVertical: 'auto',
  },
  documentCode: {
    fontFamily: 'CalibriRegular',
    fontSize: 11,
    padding: '10 15 0 0',
    textAlign: 'right',
  },
  arialSemiBold: {
    fontFamily: 'ArialSemiBold',
  },
  verticalCenter: { margin: 'auto 0' },
  horizontalCenter: { textAlign: 'center' },

  // Width Styles
  w40: { width: '40%' },
  w30: { width: '30%' },
})

Font.register({
  family: 'ArialRegular',
  src: ArialRegular,
})

Font.register({
  family: 'ArialSemiBold',
  src: ArialSemiBold,
})

Font.register({
  family: 'CalibriRegular',
  src: CalibriRegular,
})

const Header = () => {
  return (
    <View style={[styles.rowContainer, { paddingBottom: 15 }]} fixed>
      {/* Logo */}
      <View style={[styles.w30, { paddingLeft: 15 }]}>
        <Image src={GSCWDLogo} style={[styles.logo]} />
      </View>

      {/* Center Text */}
      <View style={[styles.w40, styles.headerText, styles.horizontalCenter]}>
        <Text>Republic of the Philippines</Text>
        <Text style={[styles.arialSemiBold]}>
          GENERAL SANTOS CITY WATER DISTRICT
        </Text>
        <Text>E. Fernandez St., Brgy. Lagao, General Santos City</Text>
        <Text>Telephone No.: 552-3824; Telefax No.: 553-4960</Text>
        <Text>Email Address: gscwaterdistrict@yahoo.com</Text>
      </View>

      {/* ISO Document Code */}
      <View style={[styles.w30, styles.documentCode]}>
        <Text>HRD-005-2</Text>
      </View>
    </View>
  )
}
export default Header
