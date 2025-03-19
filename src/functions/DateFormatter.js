import dayjs from 'dayjs'
import { isEmpty } from 'lodash'

export const DateFormatter = (assignedDate, format) => {
  if (!isEmpty(assignedDate)) {
    const date = new Date(assignedDate)
    return dayjs(date.toLocaleDateString()).format(format)
  } else {
    return ''
  }
}
