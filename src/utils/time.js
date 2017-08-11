const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

function format (timestamp, formatStr) {
  let date = timestamp ? new Date(timestamp) : new Date()
  let year = date.getFullYear()
  let month = fillZero(date.getMonth() + 1)
  let day = fillZero(date.getDate())
  let hour = fillZero(date.getHours())
  let minute = fillZero(date.getMinutes())
  let second = fillZero(date.getSeconds())

  return formatStr
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hour)
        .replace('mm', minute)
        .replace('ss', second)
}

function formatToInterval (timestamp) {
  let now = Date.now()
  let value = now - timestamp
  value = value < 1 ? 1 : value

  if (value < MINUTE) {
    return Math.floor(value / SECOND) + '秒前'
  }
  if (value < HOUR) {
    return Math.floor(value / MINUTE) + '分钟前'
  }
  if (value < DAY) {
    return Math.floor(value / HOUR) + '小时前'
  }

  return format(timestamp, 'MM月DD日')
}

function formatEndTime (timestamp) {
  let now = Date.now()
  let value = timestamp - now
  if (value <= 0) {
    return '已结束'
  }
  if (value < MINUTE) {
    return '剩余' + Math.floor(value / SECOND) + '秒'
  }
  if (value < HOUR) {
    return '剩余' + Math.floor(value / MINUTE) + '分钟'
  }
  if (value < DAY) {
    return '剩余' + Math.floor(value / HOUR) + '小时'
  }

  return '剩余' + Math.floor(value / DAY) + '天'
}

function fillZero (value) {
  return value < 10 ? ('0' + value) : value
}
function getDateStrByDay (timestamp, addDayCount) {
  var dd = timestamp ? new Date(timestamp) : new Date()
  dd.setDate(dd.getDate() + addDayCount)
  var y = dd.getFullYear()
  var m = fillZero(dd.getMonth() + 1)
  var d = fillZero(dd.getDate())
  return y + '-' + m + '-' + d
}
function getDateStrByMonth (timestamp, addMonthCount) {
  var dd = timestamp ? new Date(timestamp) : new Date()
  dd.setMonth(dd.getMonth() + addMonthCount)
  var y = dd.getFullYear()
  var m = fillZero(dd.getMonth() + 1)
  var d = fillZero(dd.getDate())
  return y + '-' + m + '-' + d
}

function formatPureDate (str) {
  return str && str.split(' ') && str.split(' ').length > 1 ? str.split(' ')[0] : str
}

export default {
  format,
  formatToInterval,
  formatEndTime,
  getDateStrByDay,
  getDateStrByMonth,
  formatPureDate
}
