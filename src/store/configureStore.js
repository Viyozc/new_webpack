import Redux, {
  applyMiddleware,
  createStore,
  compose
} from 'redux'
import ReduxLogger from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import fetchMiddleware, {
  configureOptions
} from 'redux-fetch-elegant'
import {
  API_CODE_NEED_LOGIN,
  API_CODE_NO_ACCESS,
  API_CODE_NO_ROLE,
  COOKIT_OPTIONS,
  AGENT_ROLE
} from 'constants'
import { cookie } from 'cookie_js'
import * as localStorage from 'utils/localStorage'

configureOptions({
  credentials: 'same-origin'
})

fetchMiddleware.then((response) => response.json().then((_response) => {
  let json = _response
  if (!json) {
    let err = {message: '未知错误', code: -1}
    throw err
  }
  if (!json.success) {
    if (json.code && json.code === API_CODE_NEED_LOGIN && (/\/b\?/.test(location.href) || /\/b$/.test(location.href) || /\/b\//.test(location.href))) {
      // 商家页面跳转至商家端授权
      location.href = '/leo/1.0/h5/merchant/login?rd=' + encodeURIComponent(location.href)
      return
    }
    if (json.code && json.code === API_CODE_NEED_LOGIN && (location.pathname === '/identity/choose' || location.pathname === '/' || location.pathname === '/login')) {
      location.href = '/login'
      return
    }
    let role = cookie.get('role') || localStorage.getItem('role') || AGENT_ROLE
    if (role === AGENT_ROLE) {
      if (json.code && json.code === API_CODE_NEED_LOGIN) {
        cookie.set('dsid', '', COOKIT_OPTIONS)
        cookie.set('role', '', COOKIT_OPTIONS)
        location.href = '/a/login?redirect=' + encodeURIComponent(location.href)
        return
      }
    } else {
      if (json.code && json.code === API_CODE_NEED_LOGIN) {
        cookie.set('dsid', '', COOKIT_OPTIONS)
        cookie.set('role', '', COOKIT_OPTIONS)
        location.href = '/login?redirect=' + encodeURIComponent(location.href)
        return
      } else if (
      json.code &&
      (json.code === API_CODE_NO_ACCESS || json.code === API_CODE_NO_ROLE) &&
      location.pathname !== '/' &&
      location.pathname !== '/identity/choose') {
        Toast.show(json.msg)
        location.href = location.origin + '/'
        return
      }
    }
    let err
    // einstein.dian.so 暂无数据处理
    if (json.code === 'DE0112000301' || json.code === 'DE0112000302' || json.code === 'DE0112000303' || json.code === 'DE0112000304') {
      err = {message: '暂无数据2', code: json.code}
    } else {
      err = {message: json.msg, code: json.code}
    }
    throw err
  }
  return _response.data
}))

let composeArray = [
  applyMiddleware(ReduxThunk),
  applyMiddleware(fetchMiddleware)
]

// if (DEBUG) {
  composeArray.push(applyMiddleware(ReduxLogger()))
// }

let finalCreateStore = compose.apply(Redux, composeArray)(createStore)

export default finalCreateStore
