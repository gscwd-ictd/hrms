import dayjs from 'dayjs'
import { isEmpty } from 'lodash'

export const DateFormatter = (assignedDate, format) => {
  if (isEmpty(format)) {
    format = 'MM-DD-YYYY hh:mm A'
  }

  if (assignedDate) {
    const convertedDate = dayjs(assignedDate).format(format)
    return convertedDate
  } else {
    const invalidDate = '-- -- ---- --:-- --'
    return invalidDate
  }
}
