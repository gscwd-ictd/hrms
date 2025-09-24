import ArialRegular from 'assets/fonts/uploads/arial.ttf'
import ArialBlack from 'assets/fonts/uploads/arial-black.ttf'
import ArialItalic from 'assets/fonts/uploads/arial-italic.ttf'
import ArialNarrow from 'assets/fonts/uploads/arial-narrow.ttf'
import ArialNarrowItalic from 'assets/fonts/uploads/arial-narrow-italic.ttf'
import ArialNarrowBold from 'assets/fonts/uploads/arial-narrow-bold.ttf'
import ArialBoldItalic from 'assets/fonts/uploads/arial-bold-italic.ttf'
import CalibriBoldItalic from 'assets/fonts/uploads/calibri-bold-italic.ttf'

import { StyleSheet, Font } from '@react-pdf/renderer'

// Create styles
export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
  },
  bodyBorder: {
    margin: '10 10 0 10',
    border: '2px solid #000000',
  },
  mainTitleContainer: {
    width: '100%',
    textAlign: 'center',
    // flexGrow: 1,
  },
  mainTitle: {
    fontFamily: 'Arial',
    fontWeight: 800,
    fontSize: 18,
    paddingTop: 8,
  },
  csFormContainer: {
    position: 'absolute',
    top: 1,
    left: 1,
  },
  csForm: {
    fontFamily: 'Calibri',
    fontWeight: 600,
    fontStyle: 'italic',
    fontSize: 8,
  },
  revised2017: {
    fontFamily: 'Calibri',
    fontWeight: 600,
    fontStyle: 'italic',
    fontSize: 6.5,
  },
  line4Child1: {
    fontFamily: 'Arial',
    fontWeight: 600,
    fontStyle: 'italic',
    fontSize: 6.7,
    padding: '8 1 0 1',
  },
  line5Child1: {
    fontFamily: 'Arial',
    fontWeight: 600,
    fontStyle: 'italic',
    fontSize: 6.7,
    padding: '2 1 0 1',
  },
  line7Container: { flexDirection: 'row' },
  line7Child1Container: {
    flexDirection: 'row',
    width: '81%',
  },
  line7Child1: {
    fontFamily: 'Arial',
    fontWeight: 100,
    fontSize: 6.7,
    padding: '1 1 0 1',
  },
  line7Child2Container: {
    flexDirection: 'row',
    borderTop: '1px solid #000000',
    borderLeft: '1px solid #000000',
    width: '29%',
  },
  line7Child2Key: {
    backgroundColor: '#969696',
    borderRight: '1px solid #000000',
    fontFamily: 'Arial',
    fontWeight: 100,
    fontSize: 6.7,
    padding: '1',
    width: '21%',
    textAlign: 'center',
  },
  line7Child2Value: {
    fontFamily: 'Arial',
    fontWeight: 100,
    fontSize: 6.7,
    textAlign: 'right',
    padding: '1',
    width: '79%',
    textAlign: 'right',
  },

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

  // Field Styles
  inputKey: {
    backgroundColor: '#EAEAEA',
    fontFamily: 'Arial',
    fontWeight: 100,
    fontSize: 6.7,
    padding: '4 5',
  },
  inputValue: {
    fontFamily: 'Arial',
    fontWeight: 100,
    fontSize: 6.7,
    padding: '4 8',
    textTransform: 'uppercase',
  },
  verticalCenter: { margin: 'auto 0' },
  horizontalCenter: { textAlign: 'center' },
  sectionTitleContainer: {
    backgroundColor: '#969696',
    padding: 1.5,
  },
  sectionTitleText: {
    color: '#ffffff',
    fontFamily: 'ArialNarrowBoldItalic',
    fontSize: 9.2,
  },
  sectionSubtitleText: {
    color: '#ffffff',
    fontFamily: 'ArialNarrowBoldItalic',
    fontSize: 6.5,
    paddingTop: 2,
  },

  // Width Styles
  w100: { width: '100%' },
  w64_2: { width: '64.2%' },
  w50: { width: '50%' },
  w46_2: { width: '46.2%' },
  w35_8: { width: '35.8%' },
  w34: { width: '34%' },
  w33_3: { width: '33.3%' },
  w29_9: { width: '29.9%' },
  w29_8: { width: '29.8%' },
  w24_5: { width: '24.5%' },
  w23_8: { width: '23.8%' },
  w22_5: { width: '22.5%' },
  w21_8: { width: '21.8%' },
  w18_6: { width: '18.6%' },
  w18: { width: '18%' },
  w17_2: { width: '17.2%' },
  w15_1: { width: '15.1%' },
  w14: { width: '14%' },
  w12: { width: '12%' },
  w9_8: { width: '9.8%' },
  w8_9: { width: '8.9%' },
  w7_45: { width: '7.45%' },
  w7: { width: '7%' },
  w6: { width: '6%' },
})

Font.register({
  family: 'Arial',
  fonts: [
    { src: ArialRegular },
    { src: ArialBlack, fontWeight: 800 },
    { src: ArialItalic, fontStyle: 'italic' },
    { src: ArialNarrow, fontWeight: 100 },
    { src: ArialNarrowBold, fontWeight: 200 },
    { src: ArialNarrowItalic, fontWeight: 100, fontStyle: 'italic' },
    { src: ArialBoldItalic, fontWeight: 600, fontStyle: 'italic' },
  ],
})

Font.register({
  family: 'Calibri',
  fonts: [{ src: CalibriBoldItalic, fontWeight: 600, fontStyle: 'italic' }],
})
