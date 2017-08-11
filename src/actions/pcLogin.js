import {
  wrapAction
} from 'utils/fetch'
import {
  PC_LOGIN,
  RESET_PC_LOGIN
} from 'constants/actionTypes/pcLogin'

export function login (params) {
  return wrapAction({
    type: PC_LOGIN,
    endpoint: '/leo/1.0/BDLogin',
    body: params,
    method: 'get'
  })
}

export function resetPCLogin () {
  return {
    type: RESET_PC_LOGIN
  }
}
