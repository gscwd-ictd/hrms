import { isEmpty } from 'lodash'

export const SnakeToCapital = text => {
  if (!isEmpty(text)) {
    return text
      .split('_')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ')
  } else {
    return
  }
}
