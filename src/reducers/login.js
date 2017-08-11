import assign from 'lodash/assign'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  ACCOUNT_LOGIN,
  SMS_COUNT_DOWN,
  CLEAN_LOGIN_INFO
} from 'constants/actionTypes/account'
import BActionTypes from 'constants/actionTypes/b'

const COUNT_DOWN_NUMBER = 60

export default function loginReducer (state = {}, action) {
  switch (action.type) {
    case BActionTypes.B_ACCOUNT_CHECK_SMS_CODE:
    case ACCOUNT_LOGIN:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, action.payload, {mobile: action.requestData.mobile})
      }
      break
    case BActionTypes.B_ACCOUNT_SIGNUP:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {signed: true})
      }
      break
    case BActionTypes.B_SMS_COUNT_DOWN:
    case SMS_COUNT_DOWN:
      state = assign({}, state, {
        countDown: state.countDown ? --state.countDown : COUNT_DOWN_NUMBER
      })
      break
    case CLEAN_LOGIN_INFO:
      state = {}
      break
    case BActionTypes.RESET_SMS_CHECK:
      return assign(state, {mobile: null})
    break
    case BActionTypes.B_ACCOUNT_GET_SIGNUP:
      if (action.status === STATUS_SUCCESS) {
        state = assign({existData: action.payload}, state)
      }
  }
  return state
}
