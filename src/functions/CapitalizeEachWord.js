export const CapitalizeEachWord = sentence => {
  if (sentence.length === 0) {
    return ''
  }
  const words = sentence.split(/[\n' ']/)
  const capitalizedWords = words.map(word => {
    if (word.length === 0) {
      return ''
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })
  return capitalizedWords.join(' ')
}
