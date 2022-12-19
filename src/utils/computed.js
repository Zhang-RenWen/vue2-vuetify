import moment from 'moment'

const byteCount = (str) => {
  return str ? new Blob([str]).size : 0
}

const parseROCDate = (value) => {
  const regRocDate = /^(\d{3})\/(\d{1,2})\/(\d{1,2})$/
  const regRocTimeDate = /^(\d{3})\/(\d{1,2})\/(\d{1,2}) (\d{1,2}):(\d{1,2})[:(\d{1,2})]*$/
  if (regRocDate.test(value)) {
    const [, year, m, d] = regRocDate.exec(value)
    return new Date(+year, 1911 + m - 1, d)
  }
  if (regRocTimeDate.test(value)) {
    const [, rocDate, hour, minutes] = regRocTimeDate.exec(value)
    const [year, m, d] = rocDate.split('/')
    return new Date(+year + 1911 + m - 1, d, hour, minutes)
  }
  return value
}

const getAge_moment = (birthDate, baseDate = new Date()) => {
  return moment(baseDate).diff(moment(birthDate), 'year')
}

export { byteCount, parseROCDate, getAge_moment }
