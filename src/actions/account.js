import {
  wrapAction
} from 'utils/fetch'
import {
  ACCOUNT_GET_SMS_CODE,
  ACCOUNT_LOGIN,
  SMS_COUNT_DOWN,
  CLEAN_LOGIN_INFO
} from 'constants/actionTypes/account'

export function countDown () {
  return {
    type: SMS_COUNT_DOWN
  }
}

export function cleanLoginInfo () {
  return {
    type: CLEAN_LOGIN_INFO
  }
}

export function getSmsCode (mobile) {
  return wrapAction({
    type: ACCOUNT_GET_SMS_CODE,
    endpoint: '/leo/1.0/h5/sendSmsToken',
    body: {mobile},
    method: 'get'
  })
}

export function login (mobile, token) {
  return wrapAction({
    type: ACCOUNT_LOGIN,
    endpoint: '/leo/1.0/h5/login',
    body: {mobile, token},
    method: 'get'
  })
}
