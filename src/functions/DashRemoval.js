import { isEmpty } from 'lodash'

export const DashRemoval = text => {
  if (!isEmpty(text)) {
    return text.split('-').join(' ')
  } else {
    return
  }
}
