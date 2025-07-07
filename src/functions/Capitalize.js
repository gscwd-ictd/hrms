import { isEmpty } from 'lodash'

export const Capitalize = string => {
  if (!isEmpty(string)) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  } else {
    return ''
  }
}
