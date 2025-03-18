import dayjs from 'dayjs'
import { isEmpty } from 'lodash'

// Date formatter using dayjs
export const dateFormatter = (assignedDate, format) => {
  if (!isEmpty(assignedDate)) {
    const date = new Date(assignedDate)
    return dayjs(date.toLocaleDateString()).format(format)
  } else {
    return ''
  }
}
