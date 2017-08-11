import assign from 'lodash/assign'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  A_ACCOUNT_LOGIN,
  A_SMS_COUNT_DOWN,
  A_CLEAN_LOGIN_INFO
} from 'constants/actionTypes/a/login/account'

const COUNT_DOWN_NUMBER = 60

export default function loginReducer (state = {}, action) {
  switch (action.type) {
    case A_ACCOUNT_LOGIN:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, action.payload, {mobile: action.requestData.mobile})
      }
      break
    case A_SMS_COUNT_DOWN:
      state = assign({}, state, {
        countDown: state.countDown ? --state.countDown : COUNT_DOWN_NUMBER
      })
      break
    case A_CLEAN_LOGIN_INFO:
      state = {}
      break
  }
  return state
}
