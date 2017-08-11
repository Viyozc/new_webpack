import { API_CODE_NEED_LOGIN, API_CODE_NO_ACCESS, API_CODE_NO_ROLE } from 'constants'
import { router } from 'utils'

function FetchError (msg, code) {
  return {
    message: msg,
    code: code
  }
}

function url (api) {
  return api += '?t=' + +new Date() // eslint-disable-line
}

function json (response) {
  if (response.status >= 400) {
    throw FetchError(response.statusText, response.status)
  }
  return response.json()
}

function success (scheme, data) {
  return function (json) {
    if (!json) {
      throw FetchError('未知错误', -1)
    }
    if (!json.success) {
      throw FetchError(json.msg || json.message, json.code)
    }

    scheme.success && scheme.success(json.data)
    scheme.dispatch({
      type: scheme.types[1],
      payload: json.data,
      requestData: data,
      raw: json
    })
  }
}

function error (scheme, data) {
  return function (error) {
    if (error.code && error.code === API_CODE_NEED_LOGIN) {
      return router.replace('/login?redirect=' + encodeURIComponent(location.href))
    } else if (error.code && (error.code === API_CODE_NO_ACCESS || error.code === API_CODE_NO_ROLE) && scheme.types[0] !== 'FETCH_USER_CHOSE_ROLE') {
      return router.replace('/')
    }
    scheme.dispatch({
      type: scheme.types[2],
      error: error,
      requestData: data
    })
  }
}

function get (api, data) {
  return fetch(url(api) + ('&data=' + encodeURIComponent(JSON.stringify(data || {}))), {
    credentials: 'same-origin'
  }).then(json)
}

function post (api, data) {
  return fetch(url(api), {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'data=' + encodeURIComponent(JSON.stringify(data))
  })
    .then(json)
}

// exports
export default {
  get: function (scheme, api, data) {
    if (typeof scheme === 'string') {
      return get(scheme, api)
    }

    scheme.dispatch({
      type: scheme.types[0],
      requestData: data
    })

    return get(api, data)
            .then(success(scheme, data))
            .catch(error(scheme, data))
  },
  post: function (scheme, api, data) {
    if (typeof scheme === 'string') {
      return post(scheme, api)
    }
    scheme.dispatch({
      type: scheme.types[0]
    })
    return post(api, data)
            .then(success(scheme, data))
            .catch(error(scheme, data))
  }
}
