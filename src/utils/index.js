import { browserHistory } from 'react-router'
const needMock = location.search.indexOf('mock') > -1

export {
    browserHistory as router
}

export function url (api) {
  api += '?t=' + +new Date()
  return needMock ? ' http://rap.kongge.com/mockjsdata/35' + api : api
}

export function unparams (str) {
  var params = {}
  str = str.split('&')
  for (var i = 0; i < str.length; i++) {
    var item = str[i].split('=')
    params[item[0]] = decodeURIComponent(item[1])
  }
  return params
}

export function params (obj) {
  var str = []
  for (var k in obj) {
    if (typeof (obj[k]) !== 'undefined') {
      str.push(k + '=' + encodeURIComponent(obj[k]))
    }
  }
  return str.join('&')
}

export function cropCDNImage (image, number, status = 'w') {
  return image && image.indexOf('lhc-image') > -1 && image.indexOf('.gif') === -1
      ? `${image}?x-oss-process=image/resize,${status}_${number}`
      : image
}

export function eventDelegation (elem, selector, type, callback) {
  elem && elem.addEventListener(type, function (event) {
    if (event.target && event.target.matches(selector)) {
      callback && callback(event)
      event.stopPropagation()
      event.preventDefault()
    }
  }, false)
}

export function docready (callback) {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', doready, false)
  } else if (document.lastChild === document.body) {
    callback()
  }

  function doready () {
    document.removeEventListener('DOMContentLoaded', doready, false)
    callback()
  }
}

export function limitFontSize (text, limit, needEllipsis) {
  if (text.length > limit) {
    return needEllipsis ? text.substr(0, limit) + '...' : text.substr(0, limit)
  } else {
    return text
  }
}

export function limitFontSizeInCenter (text, leftNum, rightNum) {
  if (text.length > (leftNum + rightNum + 1)) {
    return text.substr(0, leftNum) + '...' + text.substr(text.length - rightNum, rightNum)
  } else {
    return text
  }
}

export function compareTime (prevTime, nextTime) {
  let arrayPrev = prevTime && prevTime.split(':')
  let arrayNext = nextTime && nextTime.split(':')
  if (parseInt(arrayPrev[0]) > parseInt(arrayNext[0])) {
    return 'gt'
  } else if (parseInt(arrayPrev[0]) < parseInt(arrayNext[0])) {
    return 'lt'
  } else {
    if (parseInt(arrayPrev[1]) > parseInt(arrayNext[1])) {
      return 'gt'
    } else if (parseInt(arrayPrev[1]) < parseInt(arrayNext[1])) {
      return 'lt'
    } else {
      return 'eq'
    }
  }
}

export function batteryInDevice (battery) {
  return !isNaN(parseInt(battery, 10))
}
