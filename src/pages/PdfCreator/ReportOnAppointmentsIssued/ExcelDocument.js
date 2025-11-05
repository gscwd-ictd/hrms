import dayjs from 'dayjs'
// import * as rai from './RAISheetContentStyle'
import { RaiSheetGeneration } from './RAISheetGeneration'

// Generation of excel document of publication
export const createExcelDocument = (
  e,
  reportOnAppointmentsIssued,
  yearMonth
) => {
  e.preventDefault()

  const XLSX = require('sheetjs-style')

  const RAI = XLSX.utils.book_new()

  const defaultCellStyle = {
    font: {
      name: 'Arial',
      sz: 10,
    },
  }

  const worksheet = XLSX.utils.json_to_sheet(
    reportOnAppointmentsIssued.slice(0, 10),
    {
      origin: 'A22',
    }
  )

  RaiSheetGeneration(
    worksheet,
    yearMonth,
    XLSX,
    reportOnAppointmentsIssued.slice(0, 10)?.length
  )

  XLSX.utils.book_append_sheet(RAI, worksheet, 'CS Form No. 2 - Page 1')

  // 2nd Page
  if (reportOnAppointmentsIssued?.length > 10) {
    const worksheet2 = XLSX.utils.json_to_sheet(
      reportOnAppointmentsIssued.slice(10, 20),
      {
        origin: 'A22',
      }
    )

    RaiSheetGeneration(
      worksheet2,
      yearMonth,
      XLSX,
      reportOnAppointmentsIssued.slice(10, 20)?.length
    )

    XLSX.utils.book_append_sheet(RAI, worksheet2, 'CS Form No. 2 - Page 2')
  }

  // 3rd Page
  if (reportOnAppointmentsIssued?.length > 20) {
    const worksheet3 = XLSX.utils.json_to_sheet(
      reportOnAppointmentsIssued.slice(20, 30),
      {
        origin: 'A22',
      }
    )

    RaiSheetGeneration(
      worksheet3,
      yearMonth,
      XLSX,
      reportOnAppointmentsIssued.slice(20, 30)?.length
    )

    XLSX.utils.book_append_sheet(RAI, worksheet3, 'CS Form No. 2 - Page 3')
  }

  // 4th Page
  if (reportOnAppointmentsIssued?.length > 30) {
    const worksheet4 = XLSX.utils.json_to_sheet(
      reportOnAppointmentsIssued.slice(30, 40),
      {
        origin: 'A22',
      }
    )

    RaiSheetGeneration(
      worksheet4,
      yearMonth,
      XLSX,
      reportOnAppointmentsIssued.slice(30, 40)?.length
    )

    XLSX.utils.book_append_sheet(RAI, worksheet4, 'CS Form No. 2 - Page 4')
  }

  // 5th Page
  if (reportOnAppointmentsIssued?.length > 40) {
    const worksheet5 = XLSX.utils.json_to_sheet(
      reportOnAppointmentsIssued.slice(40, 50),
      {
        origin: 'A22',
      }
    )

    RaiSheetGeneration(
      worksheet5,
      yearMonth,
      XLSX,
      reportOnAppointmentsIssued.slice(40, 50)?.length
    )

    XLSX.utils.book_append_sheet(RAI, worksheet5, 'CS Form No. 2 - Page 5')
  }

  // 6th Page
  if (reportOnAppointmentsIssued?.length > 50) {
    const worksheet6 = XLSX.utils.json_to_sheet(
      reportOnAppointmentsIssued.slice(50, 60),
      {
        origin: 'A22',
      }
    )

    RaiSheetGeneration(
      worksheet6,
      yearMonth,
      XLSX,
      reportOnAppointmentsIssued.slice(50, 60)?.length
    )

    XLSX.utils.book_append_sheet(RAI, worksheet6, 'CS Form No. 2 - Page 6')
  }

  // 7th Page
  if (reportOnAppointmentsIssued?.length > 60) {
    const worksheet7 = XLSX.utils.json_to_sheet(
      reportOnAppointmentsIssued.slice(60, 70),
      {
        origin: 'A22',
      }
    )

    RaiSheetGeneration(
      worksheet7,
      yearMonth,
      XLSX,
      reportOnAppointmentsIssued.slice(60, 70)?.length
    )

    XLSX.utils.book_append_sheet(RAI, worksheet7, 'CS Form No. 2 - Page 7')
  }

  // 8th Page
  if (reportOnAppointmentsIssued?.length > 70) {
    const worksheet8 = XLSX.utils.json_to_sheet(
      reportOnAppointmentsIssued.slice(70, 80),
      {
        origin: 'A22',
      }
    )

    RaiSheetGeneration(
      worksheet8,
      yearMonth,
      XLSX,
      reportOnAppointmentsIssued.slice(70, 80)?.length
    )

    XLSX.utils.book_append_sheet(RAI, worksheet8, 'CS Form No. 2 - Page 8')
  }

  // ---------------------------------------------------------------------

  // CHECKLIST Sheet
  const checklist = XLSX.utils.aoa_to_sheet([], {
    origin: 'A1',
  })

  const columnLetterArrayCl = ['A', 'B', 'C', 'D']

  // Set colum width
  var clcols = [
    { wch: 2.0 }, // A
    { wch: 50.29 }, // B
    { wch: 37 }, // C
    { wch: 37 }, // D
  ]
  checklist['!cols'] = clcols

  // Set row height
  var clrows = [
    { hpx: 6 }, // 1
    { hpx: 20.25 }, // 2
    { hpx: 15.75 }, // 3
    { hpx: 47.25 }, // 4
    { hpx: 47.25 }, // 5
    { hpx: 47.25 }, // 6
    { hpx: 47.25 }, // 7
    { hpx: 47.25 }, // 8
    { hpx: 47.25 }, // 9
    { hpx: 47.25 }, // 10
    { hpx: 51.75 }, // 11
    { hpx: 43.5 }, // 12
    { hpx: 12 }, // 13
  ]
  checklist['!rows'] = clrows

  // Add top left text9
  XLSX.utils.sheet_add_aoa(
    checklist,
    [
      ['CHECKLIST OF COMMON REQUIREMENTS', '', 'HRMO', 'CSC FO'], // 2
      [
        'Instructions: Put a check if the requirements are complete. If incomplete, use the space provided to indicate the name of appointee and the lacking requirement/s.',
        '',
        '',
        '',
      ], // 3
      [
        '1',
        'APPOINTMENT FORM (CS Form No. 33-B, Revised 2025) - Certified True Copy of appointment form',
        '',
        '',
      ], // 4
      [
        '2',
        'PLANTILLA OF CASUAL APPOINTMENT (CS Form No. 34-B, Revised 2025) - Certified True Copy for CSC',
        '',
        '',
      ], // 5
      ['3', 'PERSONAL DATA SHEET (CS Form No. 212, Revised 2025)', '', ''], // 6
      [
        '4',
        `PROOF OF ELIGIBILITY - Report of rating/license/certificate of admission to the Bar/ certificate of eligibility/ eligibility card (original copy, authenticated copy, certified true copy, photocopy, scanned copy, or site/screen capture of eligibility using CSC's CSEVS, PRC's LERIS, or SC's Lawyer's List)`,
        '',
        '',
      ], // 7
      [
        '5',
        'POSITION DESCRIPTION FORM (DBM-CSC Form No. 1, Revised 2017)',
        '',
        '',
      ], // 8
      [
        '6',
        'PANUNUMPA SA KATUNGKULAN (SS Porma Blg. 32, Narebisa 2025)',
        '',
        '',
      ], // 9
      [
        '7',
        'CERTIFICATE OF ASSUMPTION TO DUTY (CS Form No. 4, Revised 2025)',
        '',
        '',
      ], // 10
      [
        '',
        '',
        '     This is to certify that I have checked the veracity, authenticity, and completeness of all the requirements in support of the appointments attached herein.',
        '     This is to certify that I have checked all the requirements in support of the appointments attached herein and found these to be  [  ] complete /  [  ]   lacking.',
      ], // 11
      [
        '',
        '',
        '____________________________________            HRMO',
        '____________________________________            CSC FO Receiving Officer',
      ], // 12
      ['', '', '', ''], // 13
    ],
    { origin: 'A2' }
  )

  // Set the cells need to be merged
  const clmerge = [
    // Top left text
    { s: { c: 0, r: 1 }, e: { c: 1, r: 1 } },
    { s: { c: 0, r: 2 }, e: { c: 3, r: 2 } },
  ]
  checklist['!merges'] = clmerge

  // Checklist Sheet Styling
  checklist['A2'].s = {
    font: {
      sz: 11,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
      left: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  checklist['B2'].s = {
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  checklist['C2'].s = {
    font: {
      sz: 11,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  checklist['D2'].s = {
    font: {
      sz: 11,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      top: { style: 'medium', color: { rgb: '000000' } },
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
    },
  }

  checklist['A3'].s = {
    font: {
      sz: 8,
    },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: {
      left: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  checklist['D3'].s = {
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
    },
  }

  for (let x = 4; x <= 10; x++) {
    columnLetterArrayCl.map(letter => {
      if (letter === 'B') {
        checklist[letter + x.toString()].s = {
          font: {
            sz: 7,
            italic: true,
          },
          alignment: { horizontal: 'left', vertical: 'center', wrapText: true },
          border: {
            top: { style: 'medium', color: { rgb: '000000' } },
            right: { style: 'medium', color: { rgb: '000000' } },
            bottom: { style: 'medium', color: { rgb: '000000' } },
            left: { style: 'medium', color: { rgb: '000000' } },
          },
        }
      } else {
        checklist[letter + x.toString()].s = {
          alignment: {
            horizontal: 'center',
            vertical: 'center',
            wrapText: true,
          },
          border: {
            top: { style: 'medium', color: { rgb: '000000' } },
            right: { style: 'medium', color: { rgb: '000000' } },
            bottom: { style: 'medium', color: { rgb: '000000' } },
            left: { style: 'medium', color: { rgb: '000000' } },
          },
        }
      }
    })
  }

  checklist['C11'].s = {
    font: {
      sz: 8,
    },
    alignment: { horizontal: 'left', vertical: 'top', wrapText: true },
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      left: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  checklist['D11'].s = {
    font: {
      sz: 8,
    },
    alignment: { horizontal: 'left', vertical: 'top', wrapText: true },
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      left: { style: 'medium', color: { rgb: '000000' } },
    },
  }

  checklist['C12'].s = {
    font: {
      sz: 8,
    },
    alignment: { horizontal: 'center', vertical: 'bottom', wrapText: true },
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
      left: { style: 'medium', color: { rgb: '000000' } },
    },
  }
  checklist['D12'].s = {
    font: {
      sz: 8,
    },
    alignment: { horizontal: 'center', vertical: 'bottom', wrapText: true },
    border: {
      right: { style: 'medium', color: { rgb: '000000' } },
      bottom: { style: 'medium', color: { rgb: '000000' } },
      left: { style: 'medium', color: { rgb: '000000' } },
    },
  }

  XLSX.utils.book_append_sheet(RAI, checklist, 'Checklist')

  XLSX.writeFile(
    RAI,
    `Reports_On_Appointments_Issued_${dayjs(yearMonth).format(
      'MMMM_YYYY'
    )}.xlsx`,
    {
      defaultCellStyle: defaultCellStyle,
    }
  )

  return
}
