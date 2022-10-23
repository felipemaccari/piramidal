export const onlyNumbers = (text = '') => {
  try {
    return text.replace(/[^0-9]/g, '')
  } catch (error) {
    return text
  }
}

export const formatPhone = (phone = '') => {
  try {
    const hasDDI = phone[0] === '+'
    const formattedPhone = phone.substring(hasDDI ? 2 : 0, hasDDI ? 13 : 11)

    if (formattedPhone.length === 11) {
      return formattedPhone.replace(/^(\d{2})(\d{5})(\d)/g, '($1) $2-$3')
    }

    return formattedPhone
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/^(.{9})(\d)/g, '$1-$2')
  } catch (error) {
    return phone
  }
}

export const formatDate = (value = '') => {
  try {
    const formattedDate = onlyNumbers(value).substring(0, 8)

    return formattedDate
      .replace(/^(\d{2})(\d)/g, '$1/$2')
      .replace(/^(.{5})(\d)/g, '$1/$2')
  } catch (error) {
    return value
  }
}
