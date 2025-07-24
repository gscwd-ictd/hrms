const publicationStatus = {
  FORCSCAPPROVAL: 'For CSC approval',
  OPENFORAPP: 'Open for application',
  CLOSEDFORAPP: 'Closed for application',

  REQENTITYSELECT: 'Requesting entity selection',
  REQENTITYSELECTDONE: 'Requesting entity selection done',

  SCHEDFOREXAM: 'Scheduled for examination',
  EXAMDONE: 'Examination done',

  SCHEDFORINTERVIEW: 'Scheduled for interview',
  INTERVIEWDONE: 'Interview done',

  APPAUTHSELECTION: 'Appointing authority selection',
  APPAUTHSELECTIONDONE: 'Appointing authority selection done',

  HIRINGDONE: 'Hiring process done',
  DOESET: 'Date of effectivity set',
}

const publicationStatusGuide = [
  {
    status: 'For CSC approval',
    desc: 'Set the deadline of submission based from the approved CSC publication.',
  },
  {
    status: 'Open for application',
    desc: 'Publication is now open to recieve application.\n\n Publication details will also be available in the Portal and Job Portal.',
  },
  {
    status: 'Closed for application',
    desc: 'Publication will no longer be accepting applicants.\n\n PSB members will also be initially set.',
  },
  {
    status: 'Requesting entity selection',
    desc: 'Qualified applicants will endorsed to the Requesting manager for shortlisting.',
  },
  {
    status: 'Requesting entity selection done',
    desc: 'Requesting manager has succesfuly shortlisted the applicants.\n\n Examination date (Available only if the position is requested for an examination) or Interview date can now be sheduled.',
  },
  {
    status: 'Scheduled for examination',
    desc: 'Position is now set for examiniation.\n\n Examination scores of each applicant can now be set only if the current date is the same to the scheduled exam date.',
  },
  {
    status: 'Examination done',
    desc: 'The interview date can now be scheduled.',
  },
  {
    status: 'Scheduled for interview',
    desc: 'Position is now set for interview and available on the PSB system.\n\n Rating will be allowed if the current date is the same to interview date.\n\n Closing of the Interview can only be done by the PSB Chairman.',
  },
  {
    status: 'Interview done',
    desc: 'PSB Rating Summary can now be sent to the General Manager for selection.\n\n Selection doucments can now be generated.',
  },
  {
    status: 'Appointing authority selection',
    desc: 'The General Manager can view and review the PSB Summary.\n\n The General Manager is ready to pick an applicant/s',
  },
  {
    status: 'Appointing authority selection done',
    desc: 'The General Manager has picked an applicant/s for the open position.',
  },
  {
    status: 'Hiring process done',
    desc: 'Effectivity date of Appointment can now be set.',
  },
  {
    status: 'Date of effectivity set',
    desc: 'Last status of publication.\n\n Appointed applicant/s can now be checked in the Results of Hiring Section.',
  },
]

export { publicationStatus, publicationStatusGuide }
