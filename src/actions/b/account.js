import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/b'

export function countDown () {
  return {
    type: ActionTypes.B_SMS_COUNT_DOWN
  }
}

export function getMerchantSmsCode (mobile) {
  return wrapAction({
    type: ActionTypes.B_ACCOUNT_GET_SMS_CODE,
    endpoint: '/leo/1.0/merchant/sendSmsToken',
    body: {mobile},
    method: 'get'
  })
}

export function verify (mobile, smsToken) {
  return wrapAction({
    type: ActionTypes.B_ACCOUNT_CHECK_SMS_CODE,
    endpoint: '/leo/1.0/merchant/checkSmsToken',
    body: {mobile, smsToken},
    method: 'get'
  })
}

export function signUp (params) {
  return wrapAction({
    type: ActionTypes.B_ACCOUNT_SIGNUP,
    endpoint: '/leo/1.0/merchant/signUp',
    body: params,
    method: 'get'
  })
}

export function getSignInfo (params) {
  return wrapAction({
    type: ActionTypes.B_ACCOUNT_GET_SIGNUP,
    endpoint: '/leo/1.0/merchant/getExistMerchantInfo',
    body: params,
    method: 'get'
  })
}