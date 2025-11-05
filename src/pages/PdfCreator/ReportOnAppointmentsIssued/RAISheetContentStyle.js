const merge = [
  // Top left text
  { s: { c: 0, r: 0 }, e: { c: 1, r: 0 } },
  { s: { c: 0, r: 1 }, e: { c: 1, r: 1 } },

  // Top right text
  { s: { c: 12, r: 1 }, e: { c: 18, r: 1 } },

  // Center document header
  { s: { c: 0, r: 3 }, e: { c: 18, r: 3 } },
  { s: { c: 0, r: 4 }, e: { c: 18, r: 4 } },

  // CSC FO/RO Box
  { s: { c: 13, r: 7 }, e: { c: 18, r: 7 } },
  { s: { c: 13, r: 8 }, e: { c: 18, r: 12 } },

  // Agency
  { s: { c: 0, r: 10 }, e: { c: 1, r: 10 } },
  { s: { c: 2, r: 10 }, e: { c: 5, r: 10 } },

  // CSC Reso
  { s: { c: 7, r: 10 }, e: { c: 8, r: 10 } },
  { s: { c: 9, r: 10 }, e: { c: 10, r: 10 } },

  // Instructions
  { s: { c: 0, r: 12 }, e: { c: 1, r: 12 } },
  { s: { c: 2, r: 12 }, e: { c: 10, r: 12 } },
  { s: { c: 2, r: 13 }, e: { c: 10, r: 13 } },
  { s: { c: 2, r: 14 }, e: { c: 10, r: 14 } },
  { s: { c: 2, r: 15 }, e: { c: 10, r: 15 } },
  { s: { c: 2, r: 16 }, e: { c: 10, r: 16 } },
  { s: { c: 0, r: 18 }, e: { c: 3, r: 18 } },

  // Table Header
  { s: { c: 0, r: 20 }, e: { c: 0, r: 21 } }, // No.
  { s: { c: 1, r: 20 }, e: { c: 1, r: 21 } }, // Date issued

  { s: { c: 2, r: 20 }, e: { c: 5, r: 20 } }, // Name of Appooitee

  { s: { c: 6, r: 20 }, e: { c: 6, r: 21 } }, // Pos Title
  { s: { c: 7, r: 20 }, e: { c: 7, r: 21 } }, // Item No.
  { s: { c: 8, r: 20 }, e: { c: 8, r: 21 } }, // SG/PG
  { s: { c: 9, r: 20 }, e: { c: 9, r: 21 } }, // Salary rate
  { s: { c: 10, r: 20 }, e: { c: 10, r: 21 } }, // Status
  { s: { c: 11, r: 20 }, e: { c: 11, r: 21 } }, // Period of Employment
  { s: { c: 12, r: 20 }, e: { c: 12, r: 21 } }, // Nature of Appointment

  { s: { c: 13, r: 20 }, e: { c: 14, r: 20 } }, // Publication

  { s: { c: 15, r: 20 }, e: { c: 18, r: 20 } }, // CSC Action

  { s: { c: 0, r: 33 }, e: { c: 4, r: 33 } }, // Signature Title 1
  { s: { c: 7, r: 33 }, e: { c: 10, r: 33 } }, // Signature Title 2
  { s: { c: 13, r: 33 }, e: { c: 16, r: 33 } }, // Signature Title 3

  { s: { c: 0, r: 35 }, e: { c: 4, r: 37 } }, // Certification description 1
  { s: { c: 7, r: 35 }, e: { c: 10, r: 37 } }, // Certification description 2

  { s: { c: 0, r: 39 }, e: { c: 4, r: 39 } }, // Signature Field 1
  { s: { c: 7, r: 39 }, e: { c: 10, r: 39 } }, // Signature Field 2
  { s: { c: 13, r: 39 }, e: { c: 16, r: 39 } }, // Signature Field 3

  { s: { c: 0, r: 40 }, e: { c: 4, r: 40 } }, // Signatory Position 1
  { s: { c: 7, r: 40 }, e: { c: 10, r: 40 } }, // Signatory Position 2
  { s: { c: 13, r: 40 }, e: { c: 16, r: 40 } }, // Signatory Position 3

  { s: { c: 0, r: 41 }, e: { c: 18, r: 41 } },
  { s: { c: 0, r: 42 }, e: { c: 18, r: 42 } },
  { s: { c: 0, r: 43 }, e: { c: 18, r: 43 } },
  { s: { c: 0, r: 44 }, e: { c: 18, r: 44 } },
  { s: { c: 0, r: 45 }, e: { c: 18, r: 45 } },
]

const wscols = [
  { wch: 2.71 }, // A
  { wch: 11.57 }, // B
  { wch: 14.29 }, // C
  { wch: 13.29 }, // D
  { wch: 8.57 }, // E
  { wch: 10.43 }, // F
  { wch: 12.57 }, // G
  { wch: 8.29 }, // H
  { wch: 9 }, // I
  { wch: 9.29 }, // J
  { wch: 13 }, // K
  { wch: 23.57 }, // L
  { wch: 13.57 }, // M
  { wch: 11.57 }, // N
  { wch: 13 }, // O
  { wch: 13 }, // P
  { wch: 10.71 }, // Q
  { wch: 14 }, // R
  { wch: 13.29 }, // S
]

const wsrows = [
  { hpx: 21.75 }, // 1
  { hpx: 18.75 }, // 2
  { hpx: 15 }, // 3
  { hpx: 15 }, // 4
  { hpx: 15 }, // 5
  { hpx: 15 }, // 6
  { hpx: 15 }, // 7
  { hpx: 15 }, // 8
  { hpx: 15 }, // 9
  { hpx: 9.75 }, // 10
  { hpx: 15 }, // 11
  { hpx: 10.5 }, // 12
  { hpx: 15 }, // 13
  { hpx: 12 }, // 14
  { hpx: 12 }, // 15
  { hpx: 12 }, // 16
  { hpx: 12 }, // 17
  { hpx: 12 }, // 18
  { hpx: 12.75 }, // 19
  { hpx: 7.5 }, // 20
  { hpx: 15.75 }, // 21
  { hpx: 93 }, // 22
  { hpx: 14.25 }, // 23
  { hpx: 14.25 }, // 24
  { hpx: 14.25 }, // 25
  { hpx: 14.25 }, // 26
  { hpx: 14.25 }, // 27
  { hpx: 14.25 }, // 28
  { hpx: 14.25 }, // 29
  { hpx: 14.25 }, // 30
  { hpx: 14.25 }, // 31
  { hpx: 14.25 }, // 32
  { hpx: 21.75 }, // 33
  { hpx: 12.75 }, // 34
  { hpx: 19.5 }, // 35
  { hpx: 12 }, // 36
  { hpx: 12 }, // 37
  { hpx: 12 }, // 38
  { hpx: 12 }, // 39
  { hpx: 12 }, // 40
  { hpx: 34.5 }, // 41
  { hpx: 13.5 }, // 42
  { hpx: 12 }, // 43
  { hpx: 12 }, // 44
  { hpx: 12 }, // 45
  { hpx: 12 }, // 46
]

const topLeftText = [
  ['CS Form No. 2', , , , , , , , , , , , , , , , , ,], // 1
  ['Revised 2025', , , , , , , , , , , , , , , , , ,], // 2
]

const topRightText = [
  ['For Use of Accredited Agencies Only', '', '', '', '', '', ''], // 2
]

const documentTitle = [
  ['REPORT ON APPOINTMENTS ISSUED (RAI)', , , , , , , , , , , , , , , , , ,], // 4
]

const cscRoFo = [
  [`For CSC RO/FO's Use:`, '', '', '', '', ''], // 8
  [`Date Received:`, '', '', '', '', ''], // 9
  ['', '', '', '', '', ''], // 10
  ['', '', '', '', '', ''], // 11
  ['', '', '', '', '', ''], // 12
  ['', '', '', '', '', ''], // 13
]

const agency = [
  ['AGENCY:', '', '', '', '', ''], // 11
]

const resoNo = [
  ['CSC Resolution No:', '', '', ''], // 11
]

const instructions = [
  [
    'INSTRUCTIONS:',
    '',
    '(1) Fill out the data needed in the form completely and accurately. ',
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
  ], // 13
  [
    ,
    ,
    '(2) Do not abbreviate entries in the form.',
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
  ], // 14
  [
    ,
    ,
    '(3) Accomplish the Checklist of Common Requirements and sign the certification.',
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
  ], // 15
  [
    ,
    ,
    '(4) Submit the duly accomplished form in electronic and printed copy (2 copies) to the CSC Field Office',
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
  ], // 16
  [
    ,
    ,
    '     together with the original CSC copy of appointments and supporting documents within the 30th day of the succeeding month.',
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
  ], // 17
  [], // 18
  ['Pertinent data on appointment/s issued', , , , , , , , , , , , , , , , , ,], // 19
]

const tableHeader = [
  [
    '',
    'Date Issued/Effectivity (mm/dd/yyyy)',
    'NAME OF APPOINTEE/S',
    '',
    '',
    '',
    'POSITION TITLE(Indicate parenthetical title, if applicable)',
    'ITEM NO.',
    'SALARY/ JOB/ PAY GRADE',
    'SALARY RATE (Monthly)',
    'EMPLOYMENT STATUS',
    'PERIOD OF EMPLOYMENT (For Temporary, Casual/ Contractual Appointments) (mm/dd/yyyy to mm/dd/yyyy)',
    'NATURE OF APPOINTMENT',
    'PUBLICATION',
    '',
    'CSC ACTION',
    '',
    '',
    '',
  ], // 21
  [
    '',
    '',
    'Last Name',
    'First Name',
    'Name Extension  (Jr./III)',
    'Middle Name',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'DATE (Indicate period of publication) (mm/dd/yyyy to mm/dd/yyyy)',
    'MODE (CSC Bulletin of Vacant Positions, Agency Website, Newspaper, etc.)',
    'Appointment Identification No.',
    'V-Validated INV-Invalidated',
    'Date of Action (mm/dd/yyyy)',
    'Date of Release (mm/dd/yyyy)',
  ], // 22
]

const tableDataEmpty = [
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // 24
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // 25
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // 26
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // 27
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // 28
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // 29
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // 30
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // 31
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // 32
]

const signatory1 = [
  [
    'CERTIFICATION:',
    '',
    '',
    '',
    '',
    '',
    '',
    'CERTIFICATION:',
    '',
    '',
    '',
    '',
    '',
    'Post-Audited by:',
    '',
    '',
    '',
    '',
    '',
  ], // 34
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // 35
  [
    'This is to certify that the information contained in this report are true, correct, and complete based on the Plantilla of Personnel and appointment/s issued.',
    '',
    '',
    '',
    '',
    '',
    '',
    'This is to certify that the appointment/s issued is/are in accordance with existing Civil Service Law, rules, and regulations.',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ], // 36
]

const signatory2 = [
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // 40,
  [
    'HRMO',
    '',
    '',
    '',
    '',
    '',
    '',
    'Agency Head or Authorized Official',
    '',
    '',
    '',
    '',
    '',
    'CSC Official',
    '',
    '',
    '',
    '',
    '',
  ], // 41
]

const cscUse = [
  [
    'For CSC Use Only:',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ], // 42,
  [
    'REMARKS/COMMENTS/RECOMMENDATIONS (e.g. Reasons for Invalidation):',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ], // 43
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // 44
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // 45
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // 46
]

export {
  merge,
  wscols,
  wsrows,
  topLeftText,
  topRightText,
  documentTitle,
  cscRoFo,
  agency,
  resoNo,
  instructions,
  tableHeader,
  tableDataEmpty,
  signatory1,
  signatory2,
  cscUse,
}
