import * as rai from './RAISheetContentStyle'
import dayjs from 'dayjs'

export const RaiSheetGeneration = (
  sheetName,
  yearMonth,
  XLSX,
  noOfAppointees
) => {
  // Set colum width
  sheetName['!cols'] = rai.wscols

  // Set row height
  sheetName['!rows'] = rai.wsrows

  // Set the cells need to be merged
  sheetName['!merges'] = rai.merge

  // Add top left text
  XLSX.utils.sheet_add_aoa(sheetName, rai.topLeftText, { origin: 'A1' })

  // Add top right text
  XLSX.utils.sheet_add_aoa(sheetName, rai.topRightText, { origin: 'M2' })

  // Add document title
  XLSX.utils.sheet_add_aoa(sheetName, rai.documentTitle, {
    origin: 'A4',
  })
  XLSX.utils.sheet_add_aoa(
    sheetName,
    [[`For the month of ${dayjs(yearMonth).format('MMMM YYYY')}`]], // 5,
    {
      origin: 'A5',
    }
  )

  // Add CSC RO/FO
  XLSX.utils.sheet_add_aoa(sheetName, rai.cscRoFo, { origin: 'N8' })

  // Agency
  XLSX.utils.sheet_add_aoa(sheetName, rai.agency, { origin: 'A11' })

  // CSC Reso No.
  XLSX.utils.sheet_add_aoa(sheetName, rai.resoNo, { origin: 'H11' })

  // Instructions
  XLSX.utils.sheet_add_aoa(sheetName, rai.instructions, { origin: 'A13' })

  // Table Header
  XLSX.utils.sheet_add_aoa(sheetName, rai.tableHeader, { origin: 'A21' })

  // Signatory
  XLSX.utils.sheet_add_aoa(sheetName, rai.signatory1, { origin: 'A34' })
  XLSX.utils.sheet_add_aoa(sheetName, rai.signatory2, { origin: 'A40' })

  // For CSC Use
  XLSX.utils.sheet_add_aoa(sheetName, rai.cscUse, { origin: 'A42' })

  // Styling of specific cells
  // Top Left Text
  sheetName['A1'].s = {
    font: {
      sz: 11,
      bold: true,
      italic: true,
    },
  }
  sheetName['A2'].s = {
    font: {
      sz: 9,
      italic: true,
    },
  }

  // Top Right Box
  sheetName['M2'].s = {
    font: {
      sz: 11,
      italic: true,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
      left: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['N2'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['O2'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['P2'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['Q2'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['R2'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['S2'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
    },
  }

  // Document Title
  sheetName['A4'].s = {
    font: {
      sz: 14,
      bold: true,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  }
  sheetName['A5'].s = {
    font: {
      sz: 11,
      italic: true,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  }

  // Agency
  sheetName['A11'].s = {
    font: {
      sz: 12,
      bold: true,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  }
  sheetName['C11'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }
  sheetName['D11'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }
  sheetName['E11'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }
  sheetName['F11'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }

  // CSC Reso No.
  sheetName['H11'].s = {
    font: {
      sz: 10,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  }
  sheetName['J11'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }
  sheetName['K11'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }

  // For CSC RO/FO Box
  sheetName['N8'].s = {
    font: {
      sz: 10,
      italic: true,
    },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      left: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['O8'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['P8'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['Q8'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['R8'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['S8'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['N9'].s = {
    font: {
      sz: 10,
    },
    alignment: { vertical: 'top' },
    border: {
      // right: { style: 'medium', color: { rgb: '000000' } },
      left: { style: 'medium', color: { rgb: '000000' } },
      // bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['N10'].s = {
    border: {
      left: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['N11'].s = {
    border: {
      left: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['N12'].s = {
    border: {
      left: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['N13'].s = {
    border: {
      left: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['O13'].s = {
    border: {
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['P13'].s = {
    border: {
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['Q13'].s = {
    border: {
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['R13'].s = {
    border: {
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['S13'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['S12'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['S11'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['S10'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['S9'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
    },
  }

  // Instructions
  sheetName['A13'].s = {
    font: {
      sz: 9,
      bold: true,
      italic: true,
    },
  }
  sheetName['A19'].s = {
    font: {
      sz: 10,
      bold: true,
    },
  }

  // Table header styling
  sheetName['A21'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      left: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['A22'].s = {
    border: {
      left: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }

  sheetName['B21'].s = {
    font: {
      sz: 10,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['B22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }

  sheetName['C21'].s = {
    font: {
      sz: 10,
      bold: true,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['D21'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['E21'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['F21'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['C22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  }
  sheetName['D22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  }
  sheetName['E22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  }
  sheetName['F22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  }

  sheetName['G21'].s = {
    font: {
      sz: 10,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['G22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }

  sheetName['H21'].s = {
    font: {
      sz: 10,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['H22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }

  sheetName['I21'].s = {
    font: {
      sz: 10,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['I22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }

  sheetName['J21'].s = {
    font: {
      sz: 10,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['J22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }

  sheetName['K21'].s = {
    font: {
      sz: 10,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['K22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }

  sheetName['L21'].s = {
    font: {
      sz: 10,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['L22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }

  sheetName['M21'].s = {
    font: {
      sz: 10,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['M22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }

  sheetName['N21'].s = {
    font: {
      sz: 10,
      bold: true,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['O21'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['N22'].s = {
    font: {
      sz: 9,
    },
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  }
  sheetName['O22'].s = {
    font: {
      sz: 9,
    },
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  }

  sheetName['P21'].s = {
    font: {
      sz: 10,
      bold: true,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['Q21'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['R21'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['S21'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  sheetName['P22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  }
  sheetName['Q22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  }
  sheetName['R22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  }
  sheetName['S22'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  }

  // Table data styling
  const columnLetterArrayRai = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
  ]

  const positionCount = noOfAppointees + 23
  for (let x = 23; x < positionCount; x++) {
    // up to 10 rows only
    columnLetterArrayRai.map(letter => {
      sheetName[letter + x.toString()].s = {
        alignment: {
          horizontal: 'center',
          vertical: 'center',
          wrapText: true,
        },
        border: {
          top: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } },
        },
      }
    })
  }

  sheetName['A36'].s = {
    alignment: { horizontal: 'left', vertical: 'center', wrapText: true },
  }
  sheetName['H36'].s = {
    alignment: { horizontal: 'left', vertical: 'center', wrapText: true },
  }

  sheetName['A40'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }
  sheetName['B40'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }
  sheetName['C40'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }
  sheetName['D40'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }
  sheetName['E40'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }

  sheetName['H40'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }
  sheetName['I40'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }
  sheetName['J40'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }
  sheetName['K40'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }

  sheetName['N40'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }
  sheetName['O40'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }
  sheetName['P40'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }
  sheetName['Q40'].s = {
    border: {
      bottom: { style: 'thin', color: { rgb: '000000' } },
    },
  }

  sheetName['A41'].s = {
    alignment: { horizontal: 'center', vertical: 'top', wrapText: true },
  }
  sheetName['H41'].s = {
    alignment: { horizontal: 'center', vertical: 'top', wrapText: true },
  }
  sheetName['N41'].s = {
    alignment: { horizontal: 'center', vertical: 'top', wrapText: true },
  }

  sheetName['A42'].s = {
    font: {
      italic: true,
    },
  }
  sheetName['A43'].s = {
    alignment: { horizontal: 'left', vertical: 'top', wrapText: true },
  }
  columnLetterArrayRai.map(letter => {
    sheetName[letter + 43].s = {
      border: {
        top: { style: 'medium', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'medium', color: { rgb: '000000' } },
        right: { style: 'medium', color: { rgb: '000000' } },
      },
    }
  })
  columnLetterArrayRai.map(letter => {
    sheetName[letter + 44].s = {
      border: {
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'medium', color: { rgb: '000000' } },
        right: { style: 'medium', color: { rgb: '000000' } },
      },
    }
  })
  columnLetterArrayRai.map(letter => {
    sheetName[letter + 45].s = {
      border: {
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'medium', color: { rgb: '000000' } },
        right: { style: 'medium', color: { rgb: '000000' } },
      },
    }
  })
  columnLetterArrayRai.map(letter => {
    sheetName[letter + 46].s = {
      border: {
        bottom: { style: 'medium', color: { rgb: '000000' } },
        left: { style: 'medium', color: { rgb: '000000' } },
        right: { style: 'medium', color: { rgb: '000000' } },
      },
    }
  })

  return
}
