import React from 'react'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer'

// Fonts
import CalibriRegularBold from '../../../assets/fonts/uploads/calibri-regular-bold.ttf'
import CalibriRegularBoldItalic from '../../../assets/fonts/uploads/calibri-bold-italic.ttf'

Font.register({
  family: 'CalibriRegularBold',
  src: CalibriRegularBold,
})

Font.register({
  family: 'CalibriRegularBoldItalic',
  src: CalibriRegularBoldItalic,
})

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  headerText: {
    fontFamily: 'CalibriRegularBold',
    fontSize: 11,
    padding: '15 1 1 1',
    marginVertical: 'auto',
  },
  subHeaderText: {
    fontFamily: 'CalibriRegularBoldItalic',
    fontSize: 9,
    textTransform: 'uppercase',
  },
  leftText: {
    fontFamily: 'CalibriRegularBoldItalic',
    fontSize: 9,
    padding: '0 0 0 10',
    textAlign: 'left',
  },
  rightText: {
    fontFamily: 'CalibriRegularBoldItalic',
    fontSize: 9,
    padding: '0 10 0 0',
    textAlign: 'center',
  },
  horizontalCenter: { textAlign: 'center' },

  // Width Styles
  w35: { width: '35%' },
  w30: { width: '30%' },
})

const Header = props => {
  const { yearMonth } = props
  const formatDate = assignedDate => dayjs(assignedDate).format('MMMM YYYY')

  return (
    <View style={[styles.rowContainer, { paddingBottom: 15 }]} fixed>
      {/* Top Left */}
      <View style={[styles.w35, styles.leftText]}>
        <Text>CS Form No. 2</Text>
        <Text>Revised 2025</Text>
      </View>

      {/* Center Text */}
      <View style={[styles.w30, styles.headerText, styles.horizontalCenter]}>
        <Text style={[styles.arialSemiBold]}>
          REPORT ON APPOINTMENTS ISSUED (RAI)
        </Text>
        <Text style={[styles.subHeaderText]}>
          For the month of{' '}
          <Text style={{ color: 'red' }}>{formatDate(yearMonth)}</Text>
        </Text>
      </View>

      {/* Top Right */}
      <View style={[styles.w35, styles.rightText]}>
        <Text style={[{ border: '1.5px solid #000000', paddingTop: 4 }]}>
          For Use of Accredited Agencies Only
        </Text>
      </View>
    </View>
  )
}

Header.propTypes = {
  yearMonth: PropTypes.string.isRequired,
}

export default Header
