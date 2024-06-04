const sexes = ['Male', 'Female']

const civilStatuses = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated']

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const levels = ['BASIC', 'INTERMEDIATE', 'ADVANCED', 'SUPERIOR']

const salaryGrades = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
]

const applicantStatuses = ['For review', 'Qualified', 'Not Qualified']

const psb23AndBelow = [1, 2, 3, 4, 5, 6]
const psb24 = [1, 2, 3, 4, 5, 6, 7, 8]
const psb26AndAbove = [1, 2, 3, 4, 5, 6, 7]

const examInterviewVenues = ['Board Room', 'Orientation Room', 'Training Hall']

const workstations = ['Office', 'Field']

const supervisorManagers = [
  'Supervising Industrial Relations Development Officer A',
  'Division Manager A',
  'Department Manager A',
  'Assistant General Manager',
  'General Manager',
]

const appointmentTypes = [
  'Original',
  'Promotion',
  'Reappointment',
  'Coterminous',
]

const publicationModes = [
  'CSC Website www.csc.gov.ph',
  'GSCWD Bulletin, Website, Agency facebook page',
  'CSC Bulletin of Vacant Positions',
]

const frequencies = [
  { name: 'Occasional', value: true },
  { name: 'Frequent', value: false },
]

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const listOfRestDays = [
  { label: 'Sunday', value: 0 },
  { label: 'Monday', value: 1 },
  { label: 'Tuesday', value: 2 },
  { label: 'Wednesday', value: 3 },
  { label: 'Thursday', value: 4 },
  { label: 'Friday', value: 5 },
  { label: 'Saturday', value: 6 },
]

const reports = [
  {
    label: 'Report on Employee Information',
    value: 'report on employee information',
  },
  {
    label: 'Sample Report',
    value: 'sample report',
  },
]

const natureOfAppointment = [
  {
    label: 'Contract of Service',
    value: 'contractOfService',
  },
  {
    label: 'Job Order',
    value: 'jobOrder',
  },
  {
    label: 'Casual',
    value: 'casual',
  },
  {
    label: 'Permanent',
    value: 'permanent',
  },
]

export {
  sexes,
  civilStatuses,
  bloodTypes,
  levels,
  salaryGrades,
  applicantStatuses,
  psb23AndBelow,
  psb24,
  psb26AndAbove,
  examInterviewVenues,
  workstations,
  supervisorManagers,
  appointmentTypes,
  publicationModes,
  frequencies,
  months,
  listOfRestDays,
  reports,
  natureOfAppointment,
}
