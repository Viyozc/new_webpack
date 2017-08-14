import createHistory from 'history/createBrowserHistory'
import keys from 'lodash/keys'
import CONSTANTS from 'constants'

const router = createHistory()
const needMock = window.location.search.indexOf('mock') > -1

const url = (api) => {
  api += '?t=' + +new Date()
  return needMock ? ' //rap.kongge.com/mockjsdata/16' + api : api
}

const unparams = (str) => {
  let params = {}
  str = str.split('&')
  for (let i = 0; i < str.length; i++) {
    let item = str[i].split('=')
    params[item[0]] = decodeURIComponent(item[1])
  }
  return params
}
const params = (obj) => {
  let str = []
  for (let k in obj) {
    if (typeof obj[k] !== 'undefined') {
      str.push(k + '=' + encodeURIComponent(obj[k]))
    }
  }
  return str.join('&')
}
const parseQuery = (search) => {
  if (!search || search.length === 1) {
    return {}
  }
  return unparams(search.slice(1))
}
const parseSearch = (query) => {
  return '?' + params(query)
}
const timeUnitFormat = (time) => {
  if (time < 1) {
    return '00'
  } else if (time < 10) {
    return '0' + time
  } else {
    return time
  }
}
const secondsToTime = (secs) => {
  if (parseInt(secs || 0) === 0) {
    return '00:00'
  }
  secs = Math.round(secs)
  let hours = Math.floor(secs / (60 * 60))

  let divisorForMinutes = secs % (60 * 60)
  let minutes = Math.floor(divisorForMinutes / 60)

  let divisorForSeconds = divisorForMinutes % 60
  let seconds = Math.ceil(divisorForSeconds)

  let time = ''
  if (hours > 0) {
    time += hours + ':'
  }

  time += timeUnitFormat(minutes) + ':'
  time += timeUnitFormat(seconds)
  return time
}

const cropCDNImage = (image, number, status = 'w') => {
  return image && image.indexOf('lhc-image') > -1 && image.indexOf('.gif') === -1
  ? `${image}?x-oss-process=image/resize,${status}_${number}`
  : image
}

const limitFontSize = (text, limit, needEllipsis) => {
  if (text.length > limit) {
    return needEllipsis ? text.substr(0, limit) + '...' : text.substr(0, limit)
  } else {
    return text
  }
}

const limitFontSizeInCenter = (text, leftNum, rightNum) => {
  if (text.length > (leftNum + rightNum + 1)) {
    return text.substr(0, leftNum) + '...' + text.substr(text.length - rightNum, rightNum)
  } else {
    return text
  }
}

const usedTime = (totalTime) => {
  let day = 0
  let hour = 0
  let minute = 0
  totalTime = parseInt(totalTime / 60)
  if (totalTime < 60) {
    minute = totalTime || 0
  } else if (totalTime >= 60 && totalTime < 1440) {
    hour = parseInt(totalTime / 60)
    minute = totalTime - hour * 60
  } else {
    day = parseInt(totalTime / 1440)
    hour = parseInt((totalTime - day * 1440) / 60)
    minute = totalTime - day * 1440 - hour * 60
  }
  return {day, hour, minute}
}

const formatDistance = (distance) => {
  if (distance > 1000) {
    return '相距很远'
  } else if (distance < 1 && distance > 0) {
    let metre = distance * 1000
    if (metre < 5) {
      return '小于5米'
    }
    return '' + Math.ceil(metre) + '米'
  } else if (distance > 0) {
    return '' + distance.toFixed(1) + '公里'
  } else {
    return ''
  }
}

const raw = (args) => {
  var _keys = keys(args)
  _keys = _keys.sort()
  var newArgs = {}
  _keys.forEach(function (key) {
    newArgs[key] = args[key]
  })

  var string = ''
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k]
  }
  string = string.substr(1)
  return string
}

export {
  router,
  url,
  unparams,
  params,
  parseQuery,
  parseSearch,
  secondsToTime,
  cropCDNImage,
  limitFontSize,
  limitFontSizeInCenter,
  usedTime,
  formatDistance,
  raw
}
