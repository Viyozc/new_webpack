import { cookie } from 'cookie_js'
import { COOKIT_OPTIONS, AGENT_ROLE } from 'constants'
import userAgent from './userAgent'
import * as localStorage from 'utils/localStorage'

const hackSyncWechatTitle = () => {
  var iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = '/favicon.ico'
  iframe.onload = () => {
    setTimeout(() => {
      document.body.removeChild(iframe)
    }, 10)
  }
  document.body.appendChild(iframe)
}

function initBridge (callback) {
  if (userAgent.device.isIOS) {
    setupWebViewJavascriptBridge(callback)
  } else {
    if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.callHandler) {
      setupWebViewJavascriptBridge(callback)
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', function (event) {
        // 需要init 不然无法回调
        try {
          event.bridge.init()
        } catch (e) {}
        setupWebViewJavascriptBridge(callback)
      })
    }
  }
}

function parseStr (response, cb) {
  if (typeof response === 'string') {
    response = JSON.parse(response)
  }
  return cb(response)
}

function setupWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) return callback(window.WebViewJavascriptBridge)
  if (window.WVJBCallbacks) return window.WVJBCallbacks.push(callback)
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
}
export function setUser (params) {
  initBridge((bridge) => bridge.callHandler('setUser', params))
}

export function scanQRCode (cb) {
  initBridge((bridge) => bridge.callHandler('scanCode', null, response => parseStr(response, cb)))
}

export function getLocation (cb) {
  initBridge((bridge) => bridge.callHandler('getLocation', null, response => parseStr(response, cb)))
}

export function getAddress (params, cb) {
  initBridge((bridge) => bridge.callHandler('getAddress', params, response => parseStr(response, cb)))
}

export function map (params, cb) {
  initBridge((bridge) => bridge.callHandler('map', params, response => parseStr(response, cb)))
}

export function setNetwork (params, cb) {
  initBridge((bridge) => bridge.callHandler('setNetwork', params, response => parseStr(response, cb)))
}

export function testNetwork (cb, params) {
  if (params) {
    initBridge((bridge) => bridge.callHandler('testNetwork', params, response => parseStr(response, cb)))
  } else {
    initBridge((bridge) => bridge.callHandler('testNetwork', response => parseStr(response, cb)))
  }
}

export function getNetwork (cb) {
  initBridge((bridge) => bridge.callHandler('getNetwork', null, response => parseStr(response, cb)))
}
export function getDate (cb) {
  initBridge((bridge) => bridge.callHandler('getDate', null, response => parseStr(response, cb)))
}
export function selectTime (dateEnabled, timeEnabled, selectedTime, cb) {
  initBridge((bridge) => bridge.callHandler('selectTime', {
    'dateEnabled': dateEnabled,
    'timeEnabled': timeEnabled,
    'selectedTime': selectedTime
  }, response => parseStr(response, cb)))
}
export function getTimeStamp (cb) {
  initBridge((bridge) => bridge.callHandler('getTimeStamp', null, response => parseStr(response, cb)))
}
export function speedTest (cb) {
  initBridge((bridge) => bridge.callHandler('ping', null, response => parseStr(response, cb)))
}

export function uploadImages (data, cb) {
  if (!cb) {
    cb = data
    data = {}
  }
  initBridge((bridge) => bridge.callHandler('uploadImage', data, response => parseStr(response, cb)))
}

export function setNavTitle (title) {
  document.title = title || '小电'
  if (document.title && (/iPad|iPhone|iPod/.test(navigator.userAgent))) {
    hackSyncWechatTitle()
  }
}

export function setLogout () {
  window.WVJBLogout = () => {
    let role = cookie.get('role') || localStorage.getItem('role') || AGENT_ROLE
    cookie.set('dsid', '', COOKIT_OPTIONS)
    cookie.set('role', '', COOKIT_OPTIONS)
    if (location.pathname === '/login') {
      location.href = '/login'
      return
    }
    if (role === AGENT_ROLE) {
      location.href = '/a/login'
    } else {
      location.href = '/login'
    }
  }
  window.WVJBToggleRole = () => {
    location.href = '/identity/choose'
  }
}
