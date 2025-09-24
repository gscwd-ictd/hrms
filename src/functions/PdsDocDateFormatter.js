import { isEmpty } from 'lodash'
import dayjs from 'dayjs'

// Date formatter based on PDS document DD/MM/YYYY
export const PdsDocDateFormatter = assignedDate => {
  if (!isEmpty(assignedDate)) {
    const date = new Date(assignedDate)
    return dayjs(date.toLocaleDateString()).format('DD/MM/YYYY')
  } else {
    return ''
  }
}

export default PdsDocDateFormatter
