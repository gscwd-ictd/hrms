import React from 'react'
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import ArialNarrowItalic from 'assets/fonts/uploads/arial-narrow-italic.ttf'

const styles = StyleSheet.create({
  // Field Styles
  footerText: {
    fontFamily: 'Arial',
    fontWeight: 100,
    fontStyle: 'italic',
    fontSize: 5.7,
    flexDirection: 'row',
    padding: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 12,
  },
})

Font.register({
  family: 'Arial',
  fonts: [{ src: ArialNarrowItalic, fontWeight: 100, fontStyle: 'italic' }],
})

const FooterPdf = () => {
  return (
    <View style={[styles.footerText]}>
      <Text>CS FORM 212 (Revised 2025), Page </Text>
      <Text
        render={({ pageNumber, totalPages }) => `${pageNumber} of 4`}
        fixed
      />
    </View>
  )
}
export default FooterPdf
