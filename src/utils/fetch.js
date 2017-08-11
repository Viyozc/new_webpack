import {url} from 'utils'
import assign from 'lodash/assign'
require('es6-promise').polyfill()
require('isomorphic-fetch')

let wrapEndpoint = (action) => {
  if (action.method.toUpperCase() === 'GET') {
    return url(action.endpoint) + ('&data=' + encodeURIComponent(JSON.stringify(action.body || {})))
  } else {
    return url(action.endpoint)
  }
}

let wrapAction = (action) => {
  return assign({
    type: action.type,
    endpoint: wrapEndpoint(action),
    requestData: action.body || {}
  }, action.method.toUpperCase() === 'POST' ? {
    body: 'data=' + encodeURIComponent(JSON.stringify(action.body) || {}),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    requestData: action.body || {}
  } : null)
}

export {
 wrapAction
}
