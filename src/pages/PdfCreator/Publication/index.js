import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { fetchPublicationDocumentDetails, fetchPRFTrail } from "store/actions"

import { Container, Form, Button } from "reactstrap"
import { PDFViewer } from "@react-pdf/renderer"
import PublicationDocument from "./PublicationDocument"

// Extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const PublicationPdf = props => {
  const dispatch = useDispatch()
  const [filteredPublicationData, setFilteredPublicationData] = useState([])

  // Redux state for job description
  const {
    publicationDocumentDetails,
    loadingPublicationDocumentDetails,
    errorPublicationDocumentDetails,
  } = useSelector(state => ({
    publicationDocumentDetails: state.publications.publicationDocumentDetails,
    loadingPublicationDocumentDetails:
      state.publications.loading.loadingPublicationDocumentDetails,
    errorPublicationDocumentDetails:
      state.publications.error.errorPublicationDocumentDetails,
  }))

  // redux state for PRF trail of signatories
  const { prfTrail, loadingPrfTrail, errorPrfTrail } = useSelector(state => ({
    prfTrail: state.positionRequest.prfTrail,
    loadingPrfTrail: state.positionRequest.loading.loadingPrfTrail,
    errorPrfTrail: state.positionRequest.error.errorPrfTrail,
  }))

  const formatDate = assignedDate => dayjs(assignedDate).format("MMMM DD, YYYY")

  // Generation of excel document of publication
  const createExcelDocument = e => {
    e.preventDefault()

    const XLSX = require("sheetjs-style")
    // const XLSX = require("xlsx")

    const defaultCellStyle = {
      font: {
        name: "Arial",
        sz: 10,
      },
    }

    // const worksheet = XLSX.utils.json_to_sheet(filteredPublicationData, {
    //   origin: "A26",
    // })
    var worksheet = XLSX.utils.aoa_to_sheet(filteredPublicationData, {
      origin: "A18",
    })

    // Set colum width
    var wscols = [
      { wch: 4 }, // A
      { wch: 16.9 }, // B
      { wch: 10 }, // C
      { wch: 11 }, // D
      { wch: 11.9 }, // E
      { wch: 16 }, // F
      { wch: 16.2 }, // G
      { wch: 12 }, // H
      { wch: 14.5 }, // I
      { wch: 35 }, // J
      { wch: 12 }, // K
    ]
    worksheet["!cols"] = wscols

    // Set row height
    var wsrows = [
      { hpx: 13.8 }, // 1
      { hpx: 13.8 }, // 2
      { hpx: 13.8 }, // 3
      { hpx: 13.8 }, // 4
      { hpx: 13.8 }, // 5
      { hpx: 13.8 }, // 6
      { hpx: 13.8 }, // 7
      { hpx: 3.6 }, // 8
      { hpx: 13.8 }, // 9
      { hpx: 13.8 }, // 10
      { hpx: 13.8 }, // 11
      { hpx: 13.8 }, // 12
      { hpx: 3.6 }, // 13
      { hpx: 13.8 }, // 14
      { hpx: 3.6 }, // 15
      { hpx: 13.8 }, // 16
      { hpx: 13.8 }, // 17
      {}, // 18
      {}, // 19
      {}, // 20
      { hpx: 6 }, // 21
      { hpx: 27.6 }, // 22
      { hpx: 3.6 }, // 23
      { hpx: 18.6 }, // 24
      { hpx: 13.8 }, // 25
      { hpx: 13.8 }, // 26
      { hpx: 13.8 }, // 27
      { hpx: 13 }, // 28
      { hpx: 13.8 }, // 29
      { hpx: 13 }, // 30
      { hpx: 14.5 }, // 31
      { hpx: 14.5 }, // 32
      { hpx: 14.5 }, // 33
      { hpx: 14.5 }, // 34
    ]
    worksheet["!rows"] = wsrows

    // Add header text
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "CS Form No. 9",
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          "Electronic copy to be submitted to the CSC FO  must be in MS Excel format",
        ],
        ["Series of 2017", , , , , , , , , ,],
        ["Republic of the Philippines", , , , , , , , , ,],
        ["GENERAL SANTOS CITY WATER DISTRICT", , , , , , , , , ,],
        ["Request for Publication of Vacant Positions", , , , , , , , , ,],
        [],
        ["To: CIVIL SERVICE COMMISSION (CSC)", , , , , , , , , ,],
        [],
        [
          ,
          "This is to request the publication of the following vacant positions of",
          ,
          ,
          ,
          "   General Santos City Water District   ",
          ,
          "in the CSC website:",
          ,
          ,
          ,
        ],
      ],
      { origin: "A1" }
    )

    // Add GM name and date of approval
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [prfTrail.gm.name.toUpperCase(), "", ""],
        ["(Head of Agency)", "", ""],
      ],
      {
        origin: "I11",
      }
    )
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["Date:", formatDate(prfTrail.gm.updatedAt)]],
      {
        origin: "I14",
      }
    )

    // Add table header
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "No.",
          "Position Title",
          "Plantilla Item No.",
          "Salary/ Job/ Pay Grade",
          "Annual Salary",
          "Qualification Standards",
          "",
          "",
          "",
          "",
          "Place of Assignment",
        ],
      ],
      { origin: "A16" }
    )
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "",
          "",
          "",
          "",
          "",
          " Education",
          " Training",
          "Experience",
          "Eligibility",
          "Competency",
          "",
        ],
      ],
      { origin: "A17" }
    )

    // Add requirements text
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "Interested and qualified applicants should signify their interest in writing. Attach the following documents to the application letter and send to the address below not later than ____________________.",
        ],
      ],
      { origin: "A22" }
    )
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "1. Fully accomplished Personal Data Sheet (PDS) with recent passport-sized picture (CS Form No. 212, Revised 2017) which can be downloaded at www.csc.gov.ph;",
        ],
        [
          "2. Performance rating  in the present position for one (1) year (if applicable);",
        ],
        ["3. Photocopy of certificate of eligibility/rating/license; and"],
        ["4. Photocopy of Transcript of Records."],
      ],
      { origin: "B24" }
    )

    // Bottom left text
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "QUALIFIED APPLICANTS",
          ,
          "are advised to hand in or send through courier/email their application to:",
        ],
      ],
      {
        origin: "A29",
      }
    )
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [prfTrail.gm.name.toUpperCase(), "", ""],
        [prfTrail.gm.position, "", ""],
        ["E. Fernandez St., Lagao, General Santos City", "", ""],
        ["hrd_gscwd@yahoo.com", "", ""],
      ],
      {
        origin: "B31",
      }
    )

    // Bottom right text
    // HR tagline
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "GSCWD values diversity in its workforce and encourages qualified women and men to apply regardless of religion, sex, gender or physical disability",
          "",
          "",
          "",
        ],
      ],
      {
        origin: "H29",
      }
    )
    // Reminder text
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "APPLICATIONS WITH INCOMPLETE DOCUMENTS SHALL NOT BE ENTERTAINED",
          "",
          "",
          "",
        ],
      ],
      {
        origin: "H34",
      }
    )

    // Set the cells need to be merged
    const merge = [
      // Top right and left text
      { s: { c: 0, r: 0 }, e: { c: 1, r: 0 } },
      { s: { c: 0, r: 1 }, e: { c: 1, r: 1 } },
      { s: { c: 9, r: 0 }, e: { c: 10, r: 1 } },

      // Center document header
      { s: { c: 0, r: 2 }, e: { c: 10, r: 2 } },
      { s: { c: 0, r: 3 }, e: { c: 10, r: 3 } },
      { s: { c: 0, r: 4 }, e: { c: 10, r: 4 } },

      // To CSC
      { s: { c: 0, r: 6 }, e: { c: 2, r: 6 } },
      { s: { c: 1, r: 8 }, e: { c: 4, r: 8 } },
      { s: { c: 5, r: 8 }, e: { c: 6, r: 8 } },
      { s: { c: 7, r: 8 }, e: { c: 8, r: 8 } },

      // GM Header
      { s: { c: 8, r: 10 }, e: { c: 10, r: 10 } },
      { s: { c: 8, r: 11 }, e: { c: 10, r: 11 } },

      // Table Header
      { s: { c: 0, r: 15 }, e: { c: 0, r: 16 } }, // No.
      { s: { c: 1, r: 15 }, e: { c: 1, r: 16 } }, // Position Title
      { s: { c: 2, r: 15 }, e: { c: 2, r: 16 } }, // Plantilla Item No.
      { s: { c: 3, r: 15 }, e: { c: 3, r: 16 } }, // Salary/ Job/ Pay Grade
      { s: { c: 4, r: 15 }, e: { c: 4, r: 16 } }, // Annual Salary

      { s: { c: 5, r: 15 }, e: { c: 9, r: 15 } }, // Qualification Standards

      { s: { c: 10, r: 15 }, e: { c: 10, r: 16 } }, // Place of Assignment

      { s: { c: 0, r: 29 }, e: { c: 1, r: 29 } }, // qualified applicants A29-B29
      { s: { c: 2, r: 29 }, e: { c: 6, r: 29 } }, // are advised to C29-G29

      { s: { c: 1, r: 30 }, e: { c: 3, r: 30 } }, // GM name
      { s: { c: 1, r: 31 }, e: { c: 3, r: 31 } }, // GM position
      { s: { c: 1, r: 32 }, e: { c: 3, r: 32 } }, // Office address
      { s: { c: 1, r: 33 }, e: { c: 3, r: 33 } }, // Email

      { s: { c: 7, r: 28 }, e: { c: 10, r: 32 } }, // HR Tagline H29-K33
      { s: { c: 7, r: 33 }, e: { c: 10, r: 33 } }, // Reminder text H34-K34
    ]
    worksheet["!merges"] = merge

    // Styling of specific cells
    worksheet["A1"].s = {
      font: {
        sz: 11,
        bold: true,
        italic: true,
      },
      alignment: { wrapText: true },
    }
    worksheet["J1"].s = {
      font: {
        sz: 9,
        italic: true,
      },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
    }
    worksheet["A2"].s = {
      font: {
        sz: 9,
        bold: true,
        italic: true,
      },
      alignment: { horizontal: "left", wrapText: true },
    }
    worksheet["A3"].s = {
      font: {
        sz: 11,
        bold: true,
      },
      alignment: { horizontal: "center", wrapText: true },
    }
    worksheet["A4"].s = {
      font: {
        sz: 11,
        bold: true,
      },
      alignment: { horizontal: "center", wrapText: true },
    }
    worksheet["A5"].s = {
      font: {
        sz: 11,
        bold: true,
      },
      alignment: { horizontal: "center", wrapText: true },
    }
    worksheet["A7"].s = {
      font: {
        bold: true,
      },
      alignment: { wrapText: true },
    }
    worksheet["F9"].s = {
      font: {
        bold: true,
        underline: true,
      },
    }

    // GM Name
    worksheet[["I11"]].s = {
      font: {
        bold: true,
      },
      alignment: { horizontal: "center" },
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["J11"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["K11"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }

    worksheet["I12"].s = {
      alignment: { horizontal: "center" },
    }
    worksheet["I14"].s = {
      alignment: { horizontal: "center" },
    }

    // GM Date of Signatory
    worksheet[["J14"]].s = {
      alignment: { horizontal: "center" },
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }

    // Table header styling
    worksheet["A16"].s = {
      font: {
        bold: true,
      },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["A17"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }

    worksheet["B16"].s = {
      font: {
        bold: true,
      },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["B17"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }

    worksheet["C16"].s = {
      font: {
        bold: true,
      },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["C17"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }

    worksheet["D16"].s = {
      font: {
        bold: true,
      },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["D17"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }

    worksheet["E16"].s = {
      font: {
        bold: true,
      },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["E17"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }

    // qualification standard
    worksheet["F16"].s = {
      font: {
        bold: true,
      },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["G16"].s = {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["G16"].s = {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["H16"].s = {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["I16"].s = {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["J16"].s = {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }

    // qs areas
    worksheet["F17"].s = {
      font: {
        bold: true,
      },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["G17"].s = {
      font: {
        bold: true,
      },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["H17"].s = {
      font: {
        bold: true,
      },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["I17"].s = {
      font: {
        bold: true,
      },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["J17"].s = {
      font: {
        bold: true,
      },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }

    // place of assignment
    worksheet["K16"].s = {
      font: {
        bold: true,
      },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["K17"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    }

    // table data styling
    const columnLetterArray = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
    ]
    const positionCount = filteredPublicationData.length + 18
    for (let x = 18; x < positionCount; x++) {
      columnLetterArray.map(letter => {
        if (letter !== "J") {
          worksheet[letter + x].s = {
            alignment: {
              horizontal: "center",
              vertical: "center",
              wrapText: true,
            },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          }
        } else {
          worksheet[letter + x].s = {
            font: {
              sz: 7,
            },
            alignment: {
              horizontal: "center",
              vertical: "center",
              wrapText: true,
            },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          }
        }
      })
    }

    // Bottom left
    worksheet["A29"].s = {
      font: {
        bold: true,
      },
    }
    // Row 1
    worksheet[["B31"]].s = {
      font: {
        bold: true,
      },
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["C31"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["D31"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    // Row 2
    worksheet["B32"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["C32"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["D32"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    // Row 3
    worksheet["B33"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["C33"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["D33"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    // Row 4
    worksheet["B34"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["C34"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }
    worksheet["D34"].s = {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    }

    // HR tagline
    worksheet["H29"].s = {
      font: {
        sz: 13,
        bold: true,
      },
      alignment: {
        wrapText: true,
        horizontal: "center",
        vertical: "center",
      },
    }
    // Reminder text
    worksheet["H34"].s = {
      font: {
        color: { rgb: "ff0000" },
        bold: true,
      },
      alignment: {
        wrapText: true,
        horizontal: "center",
        vertical: "center",
      },
    }

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Publication")

    XLSX.writeFile(workbook, "Publication.xlsx", {
      defaultCellStyle: defaultCellStyle,
    })
  }

  // Convert functional competency (array of objects) to string
  const arrayToString = arr => {
    let result = ""

    arr.map(competency => {
      result +=
        "\n" +
        competency.name.toUpperCase() +
        " - " +
        competency.description +
        "\n Competency Level: " +
        competency.level
    })

    return result
  }

  // Rearranging of objects in the array to fit in pushing to excel document
  useEffect(() => {
    if (!isEmpty(publicationDocumentDetails)) {
      let array = []
      publicationDocumentDetails.map((singlePosition, index) => {
        // change object to array
        const objectToArray = Object.values(publicationDocumentDetails[index])

        // swap experience and eligibility
        const temp1 = objectToArray[12]
        objectToArray[12] = objectToArray[11]
        objectToArray[11] = temp1

        // swap place of assignment to prf no.
        const temp2 = objectToArray[14]
        objectToArray[14] = objectToArray[13]
        objectToArray[13] = temp2

        // swap competencies to prf no.
        const temp3 = objectToArray[18]
        objectToArray[18] = objectToArray[13]
        objectToArray[13] = temp3

        // Remove first 6 elements from array and 10th - 13th elements
        objectToArray.splice(0, 5)
        objectToArray.splice(10, 13)

        // Add index element to start of array
        objectToArray.unshift(index + 1)

        // Assign temp value to functional competency only
        const temp4 = objectToArray[9].functional
        const functionalCompetencyString = arrayToString(temp4)

        // replace element value at 9 with string competency
        objectToArray.splice(9, 1, functionalCompetencyString)

        array.push(objectToArray)
      })
      setFilteredPublicationData(array)
    }
  }, [publicationDocumentDetails])

  // Fetch data of document
  useEffect(() => {
    dispatch(fetchPublicationDocumentDetails(props.match.params.prfId)) //  fetch publication document details
    dispatch(fetchPRFTrail(props.match.params.prfId)) //  fetch trail of signatories
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Prf_list">
        <div className="page-content">
          <Container fluid={true}>
            {/* Notifications */}
            {errorPublicationDocumentDetails ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorPublicationDocumentDetails}
              />
            ) : null}

            {errorPrfTrail ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorPrfTrail}
              />
            ) : null}

            {loadingPublicationDocumentDetails || loadingPrfTrail ? (
              <LoadingIndicator />
            ) : (
              <>
                <Form onSubmit={e => createExcelDocument(e)} className="mb-2">
                  <Button type="submit" color="info">
                    XLSX Document
                  </Button>
                </Form>

                <PDFViewer width={"100%"} height={700} showToolbar>
                  <PublicationDocument
                    publicationDocumentDetails={publicationDocumentDetails}
                    prfTrail={prfTrail}
                    formatDate={formatDate}
                  />
                </PDFViewer>
              </>
            )}
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Prf_list">
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </React.Fragment>
  )
}

PublicationPdf.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
}
export default PublicationPdf
