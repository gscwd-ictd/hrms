import React from "react"
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer"
import ArialNarrowItalic from "assets/fonts/uploads/arial-narrow-italic.ttf"

const styles = StyleSheet.create({
  // Border Styles
  borderTop: {
    borderTop: "1px solid #000000",
  },
  // Field Styles
  footerText: {
    fontFamily: "Arial",
    fontWeight: 100,
    fontStyle: "italic",
    fontSize: 5.7,
    flexDirection: "row",
    padding: 1,
    justifyContent: "flex-end"
  },
})

Font.register({
  family: "Arial",
  fonts: [{ src: ArialNarrowItalic, fontWeight: 100, fontStyle: "italic" }],
})

const FooterPdf = () => {
  return (
    <View style={[styles.footerText, styles.borderTop]}>
      <Text>
        CS FORM 212 (Revised 2017), Page{" "}
      </Text>
      <Text
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} of 4`
        }
        fixed
      />
    </View>
  )
}
export default FooterPdf
