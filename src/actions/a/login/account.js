import {
  wrapAction
} from 'utils/fetch'
import {
  A_ACCOUNT_GET_SMS_CODE,
  A_ACCOUNT_LOGIN,
  A_SMS_COUNT_DOWN,
  A_CLEAN_LOGIN_INFO
} from 'constants/actionTypes/a/login/account'

export function countDown () {
  return {
    type: A_SMS_COUNT_DOWN
  }
}

export function cleanLoginInfo () {
  return {
    type: A_CLEAN_LOGIN_INFO
  }
}

export function getSmsCode (mobile) {
  return wrapAction({
    type: A_ACCOUNT_GET_SMS_CODE,
    endpoint: '/leo/1.0/h5/sendSmsToken',
    body: {mobile},
    method: 'get'
  })
}

export function login (mobile, token) {
  return wrapAction({
    type: A_ACCOUNT_LOGIN,
    endpoint: '/leo/1.0/h5/agent/login',
    body: {mobile, token},
    method: 'get'
  })
}
